const todoUpdate = require('../service/todoUpdate.js')


const updateTodos = (data) => {
    try {
        todoUpdate(data);
    } catch (e) {
        console.error(err);
    }
};

module.exports = updateTodos;