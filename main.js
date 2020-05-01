"use strict";

const express = require("express"),
    app = express(),
    homeController = require("./controllers/homeController"),
    // errorController = require("./controllers/errorController"),
    layouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.use(layouts);

app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.json());

app.set("port", process.env.PORT || 3002);

// from https://stackoverflow.com/questions/9285880/node-js-express-js-how-to-override-intercept-res-render-function
const menu_items = [
    {path: "/modules/list", text: "Module List"},
    {path: "/modules/tabular", text: "Module Table"},
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
app.get("/", homeController.showIndex);

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});
