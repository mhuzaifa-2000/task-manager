const express = require("express");

const mongoose = require("mongoose");
// import schoolRoute from "./routes/school";
// import studentRoute from "./routes/student";
const User = require("./models/user.model");
const Task = require("./models/task.model");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/register", (req, res) => {
  const { name, email, userType, password } = req.body;
  const usr = new User({
    name: name,
    email: email,
    password: password,
    userType: userType,
  });
  usr
    .save()
    .then((data) => res.status(200).json({ message: "New User Created", data }))
    .catch((err) => res.status(400).json({ message: "Error Occured", ...err }));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((data) => {
      if (data.password == password)
        res.status(200).json({ message: "Logged In", data });
      else res.status(200).json({ message: "Wrong Password" });
    })
    .catch((err) => res.status(400).json(err));
});

app.post("/assignTask", (req, res) => {
  const { title, description, code, assignedTo } = req.body;
  const task = new Task({
    title: title,
    description: description,
    assignedTo: assignedTo,
    code: code,
  });
  task
    .save()
    .then((data) =>
      res.status(200).json({ message: "New Task Assigned", data })
    )
    .catch((err) => res.status(400).json({ message: "Error Occured", ...err }));
});
app.get("/tasks", (req, res) => {
  Task.find({})
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});
app.get("/developers", (req, res) => {
  User.find({ userType: "Developer" })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});
//MongoDB connection
mongoose.connect(
  "mongodb+srv://admin:admin123@cluster1.r7ipy.mongodb.net/taskManagerDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connected Successfully");
});

//routes
//Server Port
app.listen(5000, () => {
  console.log("Server up and running");
});
