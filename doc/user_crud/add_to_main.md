Copy this structure to the root of your application

     cp -r doc/user_crud .

Install 

    npm install method-override
    
These things need to be added to main.js or app.js

Needs to be added once:

    const methodOverride = require("method-override");

    router.use(
      methodOverride("_method", {
        methods: ["POST", "GET"]
      })
    );

Needs to be added for each resource accordingly:

    const User = require("./models/user");
    const usersController = require("./controllers/usersController")
    app.get("/users", usersController.index, usersController.indexView);
    app.get("/users/new", usersController.new);
    app.post("/users/create", usersController.create, usersController.redirectView);
    app.get("/users/:id/edit", usersController.edit);
    app.put("/users/:id/update", usersController.update, usersController.redirectView);
    app.get("/users/:id", usersController.show, usersController.showView);
    app.delete("/users/:id/delete", usersController.delete, usersController.redirectView);
