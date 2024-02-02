const express = require('express')
const TasksController = require("../controller/task.js")


const router = express.Router()

router
.post('/', TasksController.CreateTask)
.get('/', TasksController.GetAllTasks)
.put('/:id', TasksController.UpdateTasks)
.patch('/:id', TasksController.ReplaceTasks)
.delete('/:id', TasksController.DeleteTasks)

exports.router = router