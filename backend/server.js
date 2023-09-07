const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 4000; // You can change this to your desired port

app.use(bodyParser.json());
app.use(cors());

// Sample user data (for demo purposes)
const users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

// Create a simple get request that returns a greeting
// res.send("Hello World!)

app.get('/', (req, res) => {
  res.send('hello world');
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res
      .status(200)
      .json({ message: "Login successful", token: "your_token_here" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.post("/api/signup", (req, res) => {
  const { username, password } = req.body;

  const existingUser = users.find((u) => u.username === username);

  if (existingUser) {
    res.status(409).json({ message: "Username already exists" });
  } else {
    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
