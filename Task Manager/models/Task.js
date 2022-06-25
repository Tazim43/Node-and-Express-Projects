const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "Name must provide"],
      trim: true,
      maxlength: [20, `Name can't be more than 20 char`],
   },
   completed: {
      type: Boolean,
      default: false,
   },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
