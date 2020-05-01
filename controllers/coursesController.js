"use strict";

const Course = require("../models/course");
//const fields = Object.keys(Course.schema.paths);
const fields = ["code", "name", "ects", "mission", "examination", "objectives", "contents", "prerequisites", "literature", "methods", "skills_knowledge_understanding", "skills_intellectual", "skills_practical", "skills_general"];


//console.log(fields);


exports.getAllCourses = (req, res, next) => {
    Course.find({}, (error, courses) => {
        if (error) next(error);
        req.data = courses;
        res.render("courses", {courses: req.data});
    })
}
exports.getCourse = (req, res, next) => {
    //console.log(req.params);
    const courseId = req.params.id;
    //const code = 'B2';
    Course.findById(courseId, (error, course) => {
        if (error) next(error);
        // res.send(fields);
        res.render("course", {course: course, notice: "", fields: fields});
    });
}
exports.createCourse = (req, res, next) => {
    res.render("createCourse", {fields: fields});
}


exports.saveCourse = (req, res, next) => {
    let o = {};
    fields.forEach(f => {o[f] = req.body[f];})
    let newCourse = new Course(o);
    newCourse.save((error, result) => {
        if (error) res.send(error);
        res.render("course",{notice: 'Course created',course: newCourse, fields: fields});
    })
}