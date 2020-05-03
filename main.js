'use strict'

const app = require("./app")

app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}`)
})
