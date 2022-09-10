const db = require('../models/index.js');
const todos = db.todos;


const todoUpdate = (data) => {
    try {
        todos.update({state: data.state}, {
        where: {todoId: data.todoId}});
    } catch (e) {
        console.error(err);
    }
}

module.exports = todoUpdate;