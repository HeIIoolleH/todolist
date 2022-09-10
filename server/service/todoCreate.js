const db = require('../models/index.js');
const todos = db.todos;


const todoCreate = (data) => {
    try {
        todos.create({
            todoId: data.todoId,
            state: data.state,
            content: data.content});
    } catch (e) {
        console.error(err);
    }
};

module.exports = todoCreate;