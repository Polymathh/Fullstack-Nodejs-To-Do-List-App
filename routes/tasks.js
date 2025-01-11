const express = require('express');
const router = express.Router();
const db = require('../db/connection');

//Get all tasks
router.get('/', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if(err) return res.status(500).send(err.message);
        res.json(results);
    });
});

//Add new tasks
router.post('/', (req, res) => {
    const { title } = req.body;
    db.query('INSERT INTO tasks (title) VALUES (?)', [title], (err, result) => {
        if(err) return res.status(500).send(err.message);
        res.json({ id: result.insertId, title, status:'pending'});
    });
});

//Update tasks
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    db.query(
        'UPDATE tasks SET status = ? WHERE id = ?',
    [status, id],
    (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'Task updated successfully!'});
    }
);
});


//Delete task
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'Task deleted successfully!'});
    });
});

module.exports = router;