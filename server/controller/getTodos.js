const todoRead = require('../service/todoRead.js')


const getTodos = async() => {
    const todoDataAll = await todoRead();
    return todoDataAll;
};

module.exports = getTodos;