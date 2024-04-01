const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Create a project
exports.createProject = (req, res) => {
    const { Title, Description, Difficulty, Material_id, Skills, GroupSize, Ranging } = req.body;

    const sqlQuery = 'INSERT INTO project (Title, Description, Difficulty, Material_id, Skills, GroupSize, Ranging) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    connection.query(sqlQuery, [Title, Description, Difficulty, Material_id, Skills, GroupSize, Ranging], (err, result) => {
        if (err) {
            console.error("Error creating project:", err);
            return res.status(500).json({ error: 'Could not create the new Project.' });
        }

        console.log("Project created successfully");
        const projectId = result.insertId; // Fetch the ID of the newly created project
        res.status(201).json({ message: 'Project created successfully', projectId });
    });
};

// Read all projects
exports.getAllProjects = (req, res) => {
    const sqlQuery = 'SELECT * FROM project';

    connection.query(sqlQuery, (err, result) => {
        if (err) {
            res.status(500).json({ error: err });
            return;
        }

        res.status(200).json({ projects: result });
    });
};

// Read a project by ID

exports.getProjectByIdNew = (req, res) => {
    const projectId = req.params.id;

    const sqlQuery = 'SELECT * FROM project WHERE ProjectID = ?';

    connection.query(sqlQuery, [projectId], (err, result) => {
        if (err) {
            console.error("Error retrieving project:", err);
            return res.status(500).json({ error: 'Could not retrieve project.' });
        }
        
        if (result.length === 0) {
            return res.status(404).json({ message: 'No project found with the specified ID.' });
        }

        console.log("Project retrieved successfully");
        res.status(200).json({ project: result });
    });
};

// Update a project
exports.updateProject = (req, res) => {
    const projectId = req.params.id;
    const { Title, Description, Difficulty, Material_id, Skills, GroupSize, Ranging } = req.body;

    console.log('Received projectId:', projectId);
    console.log('Received data:', { Title, Description, Difficulty, Material_id, Skills, GroupSize, Ranging });


    const sqlQuery = 'UPDATE project SET Title = ?, Description = ?, Difficulty = ?, Material_id = ?, Skills = ?, GroupSize = ?, Ranging = ? WHERE ProjectID = ?';

    connection.query(sqlQuery, [Title, Description, Difficulty, Material_id, Skills, GroupSize, Ranging, projectId], (err, result) => {
        if (err) {
            res.status(500).json({ error: err });
            return;
        }

        res.status(200).json({ message: 'Project updated successfully' });
    });
};


// Delete a project
exports.deleteProjectnew = (req, res) => {
    console.log("Hi");
    const projectId = req.params.id;

    const sqlQuery = 'DELETE FROM project WHERE ProjectID = ?';
    console.log(sqlQuery + " : " + projectId);
    console.log("hi delete");
    connection.query(sqlQuery, projectId, (err, result) => {
        if (err) {
            res.status(500).json({ error: err });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }

        res.status(200).json({ message: 'Project deleted successfully' });
    });
};

// Get projects by difficulty
exports.getProjectsByDifficulty = (req, res) => {
    console.log("difficulty filter");
    const difficulty = req.params.difficulty;
    console.log("Difficulty  is:   " + difficulty);
    const sqlQuery = 'SELECT * FROM project WHERE Difficulty = ?';

    connection.query(sqlQuery, [difficulty], (err, result) => {
        if (err) {
            res.status(500).json({ error: err , message: "Error in retrieving data from database"});
            return;
        }

        res.status(200).json({ projects: result });
    });
};

// Get projects by category (skills, materials, group size)
exports.getProjectsByCategory = (req, res) => {
    const category = req.params.category;
    const value = req.params.value;

    let columnName;
    switch (category) {
        case 'skills':
            columnName = 'Skills';
            break;
        case 'materials':
            columnName = 'Material_id'; // Assuming this corresponds to the MaterialID in the material table
            break;
        case 'groupSize':
            columnName = 'GroupSize';
            break;
        default:
            res.status(400).json({ error: 'Invalid category' });
            return;
    }

    const sqlQuery = `SELECT * FROM project WHERE ${columnName} = ?`;

    connection.query(sqlQuery, value, (err, result) => {
        if (err) {
            res.status(500).json({ error: err });
            return;
        }

        res.status(200).json({ projects: result });
    });
};

// Display a project
exports.display = (req, res) => {
    const projectId = req.params.id;

    const sqlQuery = 'SELECT * FROM project WHERE ProjectID = ?';

    connection.query(sqlQuery, [projectId], (err, result) => {
        if (err) {
            console.error("Error retrieving project:", err);
            return res.status(500).json({ error: 'Could not retrieve project.' });
        }
        
        if (result.length === 0) {
            return res.status(404).json({ message: 'No project found with the specified ID.' });
        }

        console.log("Project retrieved successfully");
        res.status(200).json({ project: result });
    });
};

// Share a project
exports.share = (req, res) => {
    // Implement the logic for sharing the project on social media
    // This could involve generating a shareable link and/or calling a social media API
};

// Comment on a project
exports.comment = (req, res) => {
    const projectId = req.params.id;
    const { commentText, userId } = req.body;

    const sqlQuery = 'INSERT INTO comments (ProjectID, CommentText, UserID) VALUES (?, ?, ?)';

    connection.query(sqlQuery, [projectId, commentText, userId], (err, result) => {
        if (err) {
            console.error("Error adding comment:", err);
            return res.status(500).json({ error: 'Could not add comment to project.' });
        }

        console.log("Comment added successfully");
        res.status(200).json({ message: 'Comment added successfully' });
    });
};

// Like a project
exports.like = (req, res) => {
    const projectId = req.params.id;
    const { userId } = req.body;

    const sqlQuery = 'INSERT INTO likes (ProjectID, UserID) VALUES (?, ?)';

    connection.query(sqlQuery, [projectId, userId], (err, result) => {
        if (err) {
            console.error("Error adding like:", err);
            return res.status(500).json({ error: 'Could not add like to project.' });
        }

        console.log("Like added successfully");
        res.status(200).json({ message: 'Like added successfully' });
    });
};

// Search for projects
exports.search = (req, res) => {
    const searchQuery = req.query.q;

    const sqlQuery = 'SELECT * FROM project WHERE Title LIKE ? OR Description LIKE ?';

    connection.query(sqlQuery, [`%${searchQuery}%`, `%${searchQuery}%`], (err, result) => {
        if (err) {
            console.error("Error searching projects:", err);
            return res.status(500).json({ error: 'Could not search for projects.' });
        }

        console.log("Projects searched successfully");
        res.status(200).json({ projects: result });
    });
};