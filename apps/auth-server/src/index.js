require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

app.use(express.json());

const posts = [
  { username: "Alex", title: "Post 1" },
  { username: "Kyle", title: "Post 2" },
  { username: "Kyle", title: "Post 3" },
];

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) {
    res.sendStatus(401);
  }
  jwt.verify(token, ACCESS_TOKEN_SECRET, undefined, (err, user) => {
    console.log(user);
    if (err) return res.sendStatus(403);
    res.user = user;
    next();
  });
}

app.get("/api/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === res.user.name));
});

app.post("/api/login", (req, res) => {
  // Authenticate user

  const username = req.body.username;

  const user = {
    name: username,
  };

  const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, undefined, undefined);
  res.json({ accessToken });
});

app.listen(3010);
