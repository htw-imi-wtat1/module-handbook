"use strict";

const Course = require("../models/course");

exports.getAllCourses = (req, res, next) => {
    Course.find({},(error, courses) => {
        if (error) next (error);
        req.data = courses;
        next();
    })
}