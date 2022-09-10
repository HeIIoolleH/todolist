const todoCreate = require('../service/todoCreate.js')



const createTodos = (async(data) => {
    try {
        await todoCreate(data);
    } catch (e) {
        console.error(err);
    }
});

module.exports = createTodos;