exports.search = (req, res) => {
    //console.log("query: "+ JSON.stringify(req.query));
    // console.log(req.body);
    res.render("about", {query: req.body.query});
}
