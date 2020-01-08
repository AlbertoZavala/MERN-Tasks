const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    console.log(tasks);
    res.json(tasks);
});

router.post('/', async (req, res) => {
    const {title, description} = req.body;
    const task = new Task({title, description});
    
    const result = await task.save();

    res.json({status: 'Task saved'});
});

router.put('/:id', async (req, res) => {
    const {title, description } = req.body;
    const newTask = {title, description };
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({status: 'Task Updated'})
    
    //console.log(req.params.id);
    //res.json('received');
});

router.delete('/:id', async (req, res) => { 
    const id = req.params.id;
    console.log('================= id: ', id);
    await Task.findByIdAndRemove(id);
    res.json({status: 'Task Deleted'});
});

router.get('/:id', async(req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);    
});

module.exports = router;