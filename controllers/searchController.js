exports.search = (req, res) => {
  // console.log("query: "+ JSON.stringify(req.query));
  // console.log(req.body);
  // debugger;
  res.render('about', { query: req.body.query })
}
