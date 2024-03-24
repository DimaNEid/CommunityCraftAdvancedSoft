
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../database/connection');
const  tokenBlacklist  = require('../middlewares/blackList');
exports.signup = (req, res) => {
  const { Username, Email, Password, FullName, Bio, Locations, Birthdate, Gender, Phone, SocialLinks } = req.body;

  // Check if the username already exists
  const checkUsernameSql = 'SELECT * FROM user WHERE Username = ?';
  connection.query(checkUsernameSql, [Username], (usernameErr, usernameResult) => {
    if (usernameErr) {
      console.error('Error checking username existence:', usernameErr);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (usernameResult.length > 0) {
      // Username already exists
      res.status(400).json({ error: 'Username already exists' });
      return;
    }

    // Hash the password
    bcrypt.hash(Password, 10, (hashErr, hash) => {
      if (hashErr) {
        console.error('Error hashing password:', hashErr);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      // Stringify socialLinks
      const socialLinksStr = JSON.stringify(SocialLinks);

      // Insert user data into the database
      const sql = 'INSERT INTO user (Username, Email, Password, FullName, Bio, Locations, Birthdate, Gender, Phone, SocialLinks) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?)';
      connection.query(sql, [Username, Email, hash, FullName, Bio, Locations, Birthdate, Gender, Phone, SocialLinks], (insertErr, result) => {
        if (insertErr) {
          console.error('Error inserting user into database:', insertErr);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        res.status(200).json({ message: 'User registered successfully' });
      });
    });
  });
};

exports.login = (req, res) => {
  const { Username, Password } = req.body;
  const sql = 'SELECT * FROM user WHERE Username = ?';

  connection.query(sql, [Username], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    const user = results[0];

    bcrypt.compare(Password, user.Password, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Ensure JWT_SECRET is loaded
      if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is not defined.');
        return res.status(500).json({ message: 'Internal server error' });
      }

      // User authenticated, create a JWT token
      const token = jwt.sign({ id: user.UserID }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    });
  });
};

exports.getUserProfile = (req, res) => {
  // The JWT token should have included 'id' in its payload, and
  // the verifyToken middleware should have decoded this and set it on req.user.
  // Make sure your verifyToken middleware is attached to the route that uses this controller method.
  const userId = req.user.id; // Ensure this matches the payload property name in the token.
  const token = req.headers.authorization;
  console.log(userId);
  console.log(token);
  console.log(tokenBlacklist);
  if(!tokenBlacklist.includes(token)){
  connection.query(
    'SELECT UserID, Username, Email, FullName, Bio, Locations, Birthdate, Gender, Phone, SocialLinks FROM user WHERE UserID = ?', [userId],
    (error, results) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Assuming the database fields are named as above and the password field is named 'Password'.
      // The password should not have been selected in the first place if it's not needed.
      const userProfile = results[0];
      return res.status(200).json({ userProfile });
    }
  );}else return res.status(500).json({ message: 'Token revoked. Please log in again' });

};
//let tokenBlacklist = [];
exports.logout= (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
      return res.status(400).json({ message: 'Token not provided' });
  }

  // Add token to blacklist
  tokenBlacklist.push(token);
  console.log(tokenBlacklist);
  return res.status(200).json({ message: 'Logout successful' });
  
};

exports.getAllProfiles=(req,res)=>{
 // const userId = req.user.id; // Ensure this matches the payload property name in the token.
  const token = req.headers.authorization;
  if(!tokenBlacklist.includes(token)){
  connection.query(
    'SELECT UserID, Username, Email, FullName, Bio, Locations, Birthdate, Gender, Phone, SocialLinks FROM user',
    (error, results) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Assuming the database fields are named as above and the password field is named 'Password'.
      // The password should not have been selected in the first place if it's not needed.
     // const userProfile = results[0];
      return res.status(200).json( results );
    }
  );}else return res.status(500).json({ message: 'Token revoked. Please log in again' });

};
exports.updateBio= (req,res)=>{
  const userId = req.user.id; // Ensure this matches the payload property name in the token.
  const token = req.headers.authorization;
  const  bio   = req.body.Bio;
  console.log(tokenBlacklist);
  console.log(userId);
  console.log(bio);
  if (!tokenBlacklist.includes(token)) {
    const sql = 'UPDATE user SET Bio = ? WHERE UserID = ?'; // Assuming your table name is 'users'

    connection.query(sql,[bio,userId], (err, result) => {
      if (err) {
        console.error('Error updating user bio:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      return res.status(200).json({ message: 'User bio updated successfully' });
    });
  } else {
    return res.status(500).json({ message: 'Token revoked. Please log in again' });
  }
};
exports.updateUsername= (req,res)=>{
  const userId = req.user.id; // Ensure this matches the payload property name in the token.
  const token = req.headers.authorization;
  const  username   = req.body.Username;
   console.log(tokenBlacklist);
   console.log(userId);
   console.log(username);
  if (!tokenBlacklist.includes(token)) {
    const sql = 'UPDATE user SET Username = ? WHERE UserID = ?'; // Assuming your table name is 'users'

    connection.query(sql,[username,userId], (err, result) => {
      if (err) {
        console.error('Error updating Username:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      return res.status(200).json({ message: 'Username updated successfully' });
    });
  } else {
    return res.status(500).json({ message: 'Token revoked. Please log in again' });
  }
};
exports.updatePass = (req,res)=>{
  const userId = req.user.id; // Ensure this matches the payload property name in the token.
  const token = req.headers.authorization;
  const pass   = req.body.Password;
   console.log(tokenBlacklist);
   console.log(userId);
   console.log(pass);
  if (!tokenBlacklist.includes(token)) {
    const sql = 'UPDATE user SET Password = ? WHERE UserID = ?'; // Assuming your table name is 'users'

    connection.query(sql,[pass,userId], (err, result) => {
      if (err) {
        console.error('Error updating Password:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      return res.status(200).json({ message: 'Password updated successfully' });
    });
  } else {
    return res.status(500).json({ message: 'Token revoked. Please log in again' });
  }
};

exports.addSkillToUser = (req, res) => {
  const userId = req.user.id; // Assuming the user ID is extracted from the JWT token
  const  skillName  = req.body.Skill_Name; // Assuming the skill name is provided in the request body
  const token = req.headers.authorization;
  if (!tokenBlacklist.includes(token)) {
  // Execute the SQL query to insert the skill into the database
  const sql = 'INSERT INTO skills_user (UserID, Skill_Name) VALUES (?, ?)';
  connection.query(sql, [userId, skillName], (err, result) => {
      if (err) {
          console.error('Error adding skill to user:', err);
          return res.status(500).json({ error: 'Internal server error' });
      }

      // Check if the skill was added successfully
      if (result.affectedRows === 1) {
          return res.status(200).json({ message: 'Skill added successfully' });
      } else {
          return res.status(500).json({ error: 'Failed to add skill' });
      }
  });}else  return res.status(500).json({ message: 'Token revoked. Please log in again' });
};