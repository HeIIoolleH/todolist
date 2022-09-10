const todoDelete = require('../service/todoDelete.js')
const express = require('express');
const app = express();


const deleteTodos = (data) => {
    todoDelete(data)
};

module.exports = deleteTodos;