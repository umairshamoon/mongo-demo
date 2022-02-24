//joi version is 13.1.0
const mongoose = require("mongoose");
const express = require("express");
const boolean = require("joi/lib/types/boolean");
const func = require("joi/lib/types/func");
//console.error("fuck");
const uri =
  "mongodb+srv://umairshamoon:ChotaRana214@cluster0.cad3p.mongodb.net/mongo-demo?retryWrites=true&w=majority";
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connection successfull");
  })
  .catch((error) => {
    console.error("fuck error is ", error);
  });

const router = express.Router();

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
  author: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "course must have at least one tag",
    },
    lowercase: true,
    //uppercase: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: Number,
    required: function () {
      return this.ispublished;
    },
    min: 200,
    max: 2000,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
  ispublished: Boolean,
});
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  try {
    const course = new Course({
      name: "python",
      author: "hammad validator",
      tags: ["backend", "security", "privacy"],
      price: 500,
      ispublished: false,
    });
    return await course.save();
  } catch (error) {
    console.error(error.message);
  }
}

//createCourse();

//exercise 1
// async function getCourses() {
//   return await Course.find({ ispublished: true, tags: "backend" })
//     .sort({ name: 1 })
//     .select({ name: 1, author: 1 });
// }

//exercise 2
// async function getCourses() {
//   return await Course.find({
//     ispublished: true,
//     tags: { $in: ["backend", "frontend"] },
//   })
//     .sort({ price: -1 })
//     .select({ name: 1, author: 1 });
// }

//exercise 3
// async function getCourses() {
//   return await Course.find({ ispublished: true })
//     .or([{ price: { $gt: 300 }, author: /.*ma*./i }])
//     .sort({ price: -1 })
//     .select({ name: 1, author: 1 });
// }

//query first approach
// async function updateCourse(id) {
//   const course = await Course.findById(id);
//   if (!course) return;
//   course.ispublished = true;
//   course.author = "chota rana";
//   course.name = "modren concepts of node";
//   return await course.save();
// }

//update first approach
async function updateCourse(id) {
  return await Course.update(
    { _id: id },
    {
      $set: {
        ispublished: false,
        author: "update first umair",
        name: "update first node",
      },
    }
  );
}

async function removeCourse(id) {
  return await Course.deleteOne({ _id: id });
}
async function run() {
  const result = await createCourse();
  console.log("result is ", result);
}
//run();
