const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../database/connection');
//const  tokenBlacklist  = require('../middlewares/blackList');

exports.showSkill = (req, res) => {
    const  userID = req.user.id; // Assuming userID and skillID are provided in the URL params
  const skill_id=req.body.skill_id;
  console.log(userID);
  console.log(skill_id);
    // Define the SQL query to join the user and skill tables
    const sql = `
      SELECT user.FullName, skills_user.skill_Name
      FROM user
      INNER JOIN skills_user ON user.UserID = ? AND skills_user.skill_id = ?
    `;
  
    // Execute the SQL query with the provided userID and skillID
    connection.query(sql, [userID, skill_id], (err, results) => {
      if (err) {
        console.error('Error retrieving user skill:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'User or skill not found' });
      }
  
      // Extract the full name and skill name from the query result
      const { FullName, skill_Name } = results[0];
      // Construct the response object
      const response = {
        FullName,
        skill_Name
      };
  
      // Send the response
      res.status(200).json(response);
    });
  };

 

exports.showUsersBySkill = (req, res) => {
    const  skill_id  = req.body.skill_id;
console.log(skill_id);
    // Define the SQL query to join the user and skill tables and filter by skill_id
    const sql = `
        SELECT user.UserID, user.FullName, user.Email, user.Bio
        FROM user
        INNER JOIN skills_user ON user.UserID = skills_user.UserID
        WHERE skills_user.skill_id = ?
    `;

    // Execute the SQL query with the provided skill_id
    connection.query(sql, [skill_id], (err, results) => {
        if (err) {
            console.error('Error retrieving users by skill:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Users with the specified skill not found' });
        }

        // Send the response with user information
        res.status(200).json(results);
    });
};
