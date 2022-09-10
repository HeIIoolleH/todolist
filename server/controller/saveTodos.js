const todoCreate = require('../service/todoCreate.js')
const todoDelete = require('../service/todoDelete.js')



const saveTodos = (async(data) => {
    try {
        console.log(data);
        await todoDelete(data);
        await todoCreate(data);
    } catch (e) {
        console.error(err);
    }
});

module.exports = saveTodos;