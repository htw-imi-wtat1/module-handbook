# Some notes on Mongoose in repl

- use `node customRepl.js`
- some examples:



    let user
    User.findById(userId).then(u => user = u)
    
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
     
      User.updateOne({ _id: userId}, { $set: { 'email': 'themail@mail.com' } }).then(o => user = o).catch(e => console.log(e))
    
      User.findOne({ _id: userId, 'logBook._id': logEntryId }).then(o => l = o)
       
      const userId = "5ec66f095352408d71212cba"
      const logEntryId = "5ec6e8b93b4805a7df488071"
      let user 
      User.findById(userId).then(o => user = o)
      let logEntry = user.logBook.id(logEntryId)
      logEntry.set(params)