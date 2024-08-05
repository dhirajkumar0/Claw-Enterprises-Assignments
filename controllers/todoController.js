const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createTodo = async (req, res) => {
    try {
        const newTodo = new Todo({
            description: req.body.description,
            isCompleted: req.body.isCompleted
        });
        const savedTodo = await newTodo.save();
        res.json(savedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTodo) return res.status(404).json({ error: 'Todo not found' });
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Todo.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
