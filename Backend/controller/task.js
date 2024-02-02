const model = require("../models/task");
const TASKS = model.TASKS;

exports.CreateTask = async (req, res) => {
  try {
    const tasks = new TASKS(req.body);
    const createdTask = await tasks.save();

    res.status(201).json(createdTask);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};


exports.GetAllTasks = async (req, res) => {
  try {
    const tasks = await TASKS.find();

    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};


exports.ReplaceTasks = async (req, res) => {
  try {
    const id = req.params.id;
    const tasks = await TASKS.findByIdAndUpdate({ _id: id }, req.body);
    res.status(201).json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

exports.UpdateTasks = async (req, res) => {
  try {
    const id = req.params.id;
    const tasks = await TASKS.findByIdAndUpdate({ _id: id }, req.body);
    res.status(201).json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};


exports.DeleteTasks = async (req, res) => {
  try {
    const id = req.params.id;
    const tasks = await TASKS.findByIdAndDelete({ _id: id }, req.body);
    res.status(202).json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};
