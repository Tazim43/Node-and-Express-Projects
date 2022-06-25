const Task = require("../models/Task");

// get all tasks
const getAllTasks = async (req, res) => {
   try {
      const task = await Task.find({});
      res.status(201).json({ task });
   } catch (err) {
      res.status(500).json({ msg: err.message });
   }
};

// create new task
const createNewTask = async (req, res) => {
   try {
      const task = await Task.create(req.body);
      res.status(201).json({ task });
   } catch (err) {
      res.status(500).json({ msg: err.message });
   }
};

// Get single task
const getSingleTask = async (req, res) => {
   try {
      const task = await Task.findOne({ _id: req.params.id });
      if (!task) {
         return res
            .status(404)
            .json({ msg: `Task not found with id:${req.params.id}` });
      } else res.status(200).json({ task });
   } catch (err) {
      res.status(500).json({ msg: err.message });
   }
};

// Update task
const updateTask = async (req, res) => {
   try {
      const task = await Task.findOneAndUpdate(
         { _id: req.params.id },
         req.body
      );
      if (!task) {
         return res
            .status(404)
            .json({ msg: `No Task found with id:${req.params.id}` });
      }
      res.status(200).json({ task });
   } catch (err) {
      res.status(500).json({ msg: err.message });
   }
};

// delete task
const deleteTask = async (req, res) => {
   try {
      const task = await Task.findOneAndDelete({ _id: req.params.id });
      if (!task) {
         return res
            .status(404)
            .json({ msg: `No task with id:${req.params.id}` });
      }
      res.status(201).json({ task });
   } catch (err) {
      res.status(500).json({ msg: err.message });
   }
};

//
module.exports = {
   getAllTasks,
   createNewTask,
   getSingleTask,
   updateTask,
   deleteTask,
};
