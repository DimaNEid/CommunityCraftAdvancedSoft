const connection = require('../database/connection');


exports.createCollaboration = (req, res) => {
    const { status, time, users_ids } = req.body;

    const sqlQuery = 'INSERT INTO collaborations (status, time) VALUES (?, ?)';
    connection.query(sqlQuery, [status, time], (err, result) => {
        if (err) {
            res.status(500).json({ error: err });
            return;
        }

        const sqlQuery = 'INSERT INTO collaborations_users (collaboration_id, user_id) VALUES ?';

        const values = [];

        for (const id of users_ids) {
            values.push([result.insertId, id])
        }

        connection.query(sqlQuery, [values], (err, result) => {
            if (err) {
                res.status(500).json({ error: err });
                return;
            }

            res.status(200).json({ message: 'Collaboration craeted successfully' })
        });
    });

};

exports.getLoggedInUserCollaborations = (req, res) => {
    const userId = req.user.id;

    const sqlQuery = 'SELECT collaboration_id FROM collaborations_users WHERE user_id = ?';

    connection.query(sqlQuery, [userId], (err, result) => {
        if (err) {
            res.status(500).json({ error: err });
            return;
        }

        const sqlQuery = 'SELECT * FROM collaborations where collaboration_id in (?) ';

        const collaborationsIds = [];

        for (const collaboration of result) {
            collaborationsIds.push(collaboration.collaboration_id);
        }

        connection.query(sqlQuery, [collaborationsIds], (err, result) => {
            if (err) {
                res.status(500).json({ error: err });
                return;
            }

            res.status(200).json({ collaborations: result })
        });
    });


}


exports.getLoggedInUserCollaborationById = (req, res) => {
    const collaborationId = req.params.id;
    const userId = req.user.id;

    const sqlQuery = 'SELECT COUNT(*) FROM collaborations_users WHERE collaboration_id = ? AND user_id = ?';

    connection.query(sqlQuery, [collaborationId, userId], (err, count) => {
        if (err) {
            res.status(500).json({ error: err });
            return;
        }
        if (!count) {
            res.status(500).json({ error: "You are not in this collaboration, id=" + collaborationId });
            return;
        }

        const sqlQuery = 'SELECT * FROM collaborations where collaboration_id in (?) ';

        connection.query(sqlQuery, [collaborationId], (err, result) => {
            if (err) {
                res.status(500).json({ error: err });
                return;
            }

            res.status(200).json({ collaboration: result })
        });

    });
}