# Some notes on Mongoose in repl

- use `node customRepl.js`

## Seeing the result of queries

    let user
    User.findById(userId).then(u => user = u)
    
    // user is now available
    
## Updating subdocuments

      let user 
      User.findById(userId).then(o => user = o)
      let logEntry = user.logBook.id(logEntryId)
      logEntry.set(params)
      user.save()
    
## This didn't work for updating subdocuments
(error about timestamp consistency)

    let userId = "5ec66f095352408d71212cac"
    let logEntryId = "5ec704088b8cd0b203587487"
    let params  = {
                     course: 'M08',
                     event: 'passed',
                     date: '2020-09-01',
                     semester: 12,
                     notes: 'notes on class'
                   }
      User.updateOne({ _id: userId, 'logBook._id': logEntryId }, { $set: { 'logBook.$': params } }).then(o => user = o).catch(e => console.log(e))
     
