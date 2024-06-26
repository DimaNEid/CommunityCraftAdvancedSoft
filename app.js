const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const axios = require('axios');
const { fetchTemperature } = require('./externalAPI/weather');

require('dotenv').config();
//console.log(process.env.JWT_SECRET);

const cronJobs = require('./schedulers/cronJobs');

const { notifyUsersOfExpiredBorrows } = require('./schedulers/emailNotificationService');

const app = express();

const userRouter = require('./routes/userRoutes');
const resRouter = require('./routes/resRoutes');
const bookRouter= require('./routes/bookRoutes');
const borrowRouter = require('./routes/borrowRoutes');
const retRouter = require('./routes/retRoutes');
const skillRouter=require('./routes/skillRoutes');
const collaborationsRoutes = require('./routes/collaborations.routes');
const projectroute =require("./routes/projectroutes");



const PORT = process.env.PORT || 3000;

app.use(express.json());

// all Routes here
app.use('/api/users', userRouter);
app.use('/api/resources', resRouter);
app.use('/api/bookingRes', bookRouter);
app.use('/api/borrowRes',borrowRouter );
app.use('/api/retBor',retRouter );
app.use('/api/skill',skillRouter);
app.use('/api/collaborations', collaborationsRoutes);
app.use('/api/project', projectroute);

app.get('/api/temperature', async (req, res) => {
    try {
        const city = req.body.city; 
        console.log(city);
        const temperature = await fetchTemperature(city);
        res.json({ city, temperature });
    } catch (error) {
        console.error('Error fetching temperature:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})




app.listen(PORT, () => {
    console.log(`App running on port ${PORT} .....`);


  //cron.schedule('0 0 * * *', cronJobs.updateExpiredBorrows);
  cron.schedule('0 0 * * *', async () => {
    try {
      const updatedBorrowIds = await cronJobs.updateExpiredBorrows();
      if (updatedBorrowIds.length > 0) {
        notifyUsersOfExpiredBorrows(updatedBorrowIds);
      }
    } catch (error) {
      console.error('Error in scheduled job:', error);
    }
  });
``
   
});

//testing if updateExpiredBorrows works proberly
//cronJobs.updateExpiredBorrows();

cronJobs.updateExpiredBorrows().then(notifyUsersOfExpiredBorrows);


// process.on('SIGINT', () => {
//     // Close database connections, file streams, etc.
//     database.close();
//     server.close(() => {
//       console.log('HTTP server closed.');
//       process.exit(0);
//     });
//   });
