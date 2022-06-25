const express = require("express");
const router = require("./routes/router");
const connectDB = require("./db/connect");
require("dotenv").config();

const app = express();
const port = 8000;
// Middlewares
app.use(express.json());

// routes
app.use("/api/v1/tasks", router);

app.get("/", (req, res) => {
   res.json({
      "API Endpoints": {
         "app.get('/api/v1/tasks')": "Get all the tasks",
         "app.post('/api/v1/tasks')": "Create a new task",
         "app.get('/api/v1/tasks/:id')": "Get a single task",
         "app.patch('/api/v1/tasks/:id')": "Update a task",
         "app.delete('/api/v1/tasks/:id')": "Delete a task",
      },
   });
});

const start = async () => {
   try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port, console.log(`Server Listening At Port ${port}`));
   } catch (err) {
      console.log(err);
   }
};

start();
