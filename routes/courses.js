const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
});
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "node",
    author: "umair",
    tags: ["backend", "security"],
  });
  const result = await course.save();
  console.log(result);
}

createCourse();

async function getCourses() {
  const course = await Course.find();
  res.send;
}
