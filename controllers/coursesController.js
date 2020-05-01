"use strict";

const Course = require("../models/course");
const fields = Object.keys(Course.schema.paths);
// const fields = ["code","name","ects","mission","examination","objectives","contents","prerequisites","literature","methods","skills_knowledge_understanding","skills_intellectual","skills_practical","skills_general","_id","__v"];


console.log(fields);


exports.getAllCourses = (req, res, next) => {
    Course.find({}, (error, courses) => {
        if (error) next(error);
        req.data = courses;
        res.render("courses", {courses: req.data});
    })
}
exports.getCourse = (req, res, next) => {
    Course.findOne({code: 'B9'}, (error, course) => {
        if (error) next(error);
       // res.send(fields);
        res.render("course", {course: course, fields: fields});
    });
}