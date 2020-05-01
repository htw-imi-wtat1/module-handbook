"use strict";

const express = require("express"),
    app = express(),
    homeController = require("./controllers/homeController"),
    searchController = require("./controllers/searchController"),
    errorController = require("./controllers/errorController"),
    coursesController = require("./controllers/coursesController"),
    layouts = require("express-ejs-layouts");


app.set("view engine", "ejs");
app.use(layouts);

app.use(
    express.urlencoded({
        extended: false
    })
);

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/modulehandbook_db",
    {useNewUrlParser: true, useUnifiedTopology: true}
);
const Course = require("./models/course");
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.json());

app.set("port", process.env.PORT || 3002);

// from https://stackoverflow.com/questions/9285880/node-js-express-js-how-to-override-intercept-res-render-function
const menu_items = [
    {path: "/modules/list", text: "Module List"},
    {path: "/modules/tabular", text: "Module Table"},
    {path: "/courses", text: "Courses"},
    {path: "/about", text: "About"}
];
app.use(function (req, res, next) {
    var _render = res.render;
    res.render = function (view, options, fn) {
        const newOptions = {...options, currentPath: req.path, menu_items: menu_items};
        _render.call(this, view, newOptions, fn);
    }
    next();
});
app.get("/modules/:format?", homeController.showStudentView);
app.get("/about/", homeController.showAbout);
app.post("/about", searchController.search);
app.get("/", homeController.showIndex);

app.get("/courses", coursesController.getAllCourses,
    (req,res,next) => {
    console.log(req.data);
    res.send(req.data);
    })

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});
