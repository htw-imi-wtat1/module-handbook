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

app.use(express.static("public"));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.json());

app.set("port", process.env.PORT || 3002);


app.get("/students", homeController.showStudentView);
app.get("/about", homeController.showAbout);
app.get("/", homeController.showIndex);

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});
