const faker = require('faker')
faker.locale = 'de'
const id = function () {
  return (Math.ceil(Math.random() * 1000000)).toString()
}

module.exports = {
  id: id,
  randomUserData: () => {
    let zip = faker.address.zipCode('#####')
    zip = ((zip[0] === '0') ? '1' : zip[0]) + zip.substring(1, 5)
    const first = faker.name.firstName()
    const last = faker.name.lastName()
    const email = first + '.' + last + '_' + id() + '@' + faker.internet.domainName()
    const fullName = first + ' ' + last
    return {
      name: {
        first: first,
        last: last
      },
      email: email,
      zipCode: zip,
      password: faker.internet.password(),
      fullName: fullName
    }
  }
}
