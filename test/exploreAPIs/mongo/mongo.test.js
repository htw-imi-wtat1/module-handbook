const { db } = require('../../commonJest')
describe('insert', () => {
  it('should insert a doc into collection', async done => {
    const users = db.collection('adhocusers')
    const id = 'some-user-id' + Math.ceil((Math.random() * 10000))
    // console.log('key: ' + id)
    const mockUser = { _id: id, name: 'John' }
    await users.insertOne(mockUser)

    const insertedUser = await users.findOne({ _id: id })
    expect(insertedUser).toEqual(mockUser)
    done()
  })
})
