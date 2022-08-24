const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.wdy2gzo.mongodb.net/personsApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(() => {
    console.log(`${name} with following number ${number} added to phonebook!`)
    console.log('phonebook:')

    const person = new Person({
      id: 1,
      name: name,
      number: number
    })

    person.save().then(result => {
      console.log(result.name, result.number)
      mongoose.connection.close()
    })
  })

Person.find({}).then(result => {
  result.forEach(person => {
    console.log(person.name, person.number)
  })
})