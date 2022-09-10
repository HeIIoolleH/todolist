const db = require('../models/index.js');
const todos = db.todos;


const todoDelete = (data) => {
    try {
        todos.destroy({ where: {todoId: data.todoId} });
    } catch (e) {
        console.error(err);
    }
};


module.exports = todoDelete;