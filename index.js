import express from "express";
import { databaseConnection } from "./database/connection.js";
import { Post } from "./database/models/post.model.js";
import { User } from "./database/models/user.model.js";

const app = express();

app.use(express.json());

databaseConnection();

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.status(200).json({ message: "success", users });
});

app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;

  const existedUser = await User.findOne({ email });
  if (existedUser)
    return res.status(409).json({ message: "User already exists" });

  const newUser = await User.create({ name, email, password });
  res.status(201).json({ message: "success", user: newUser });
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const updatedUser = await User.findByIdAndUpdate(id, { name }, { new: true });

  if (!updatedUser) return res.status(404).json({ message: "User not found" });

  res.status(200).json({ message: "success", user: updatedUser });
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) return res.status(404).json({ message: "User not found" });

  res.status(200).json({ message: "success", user: deletedUser });
});

app.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.status(200).json({ message: "success", posts });
});

app.post("/posts", async (req, res) => {
  const { title, content } = req.body;

  const newPost = await Post.create({ title, content });
  res.status(201).json({ message: "success", newPost });
});

app.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { title, content },
    { new: true },
  );

  if (!updatedPost) return res.status(404).json({ message: "post not found" });
  res.json({ message: "success", updatedPost });
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;

  const deletedPost = await Post.findByIdAndDelete(id);

  if (!deletedPost) return res.status(404).json({ message: "post not found" });

  res.status(200).json({ message: "success", deletedPost });
});

const port = process.env.PORT || 3000;

export const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

export default server;
