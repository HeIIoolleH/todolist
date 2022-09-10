const db = require('../models/index.js');
const todos = db.todos;



const todoRead = async() => {
    const todoDataAll = await todos.findAll();
    return todoDataAll;
}


module.exports = todoRead;