require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person.js')

app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.get('/q', (req, res) => {
  Person.find({}).sort( {id : -1} ).then(q => {res.json(q)})
})

/* deprecated
const generateId = () => {
  const maxId = Person.estimatedDocumentCount() > 0
  ? Person.estimatedDocumentCount() + 1
  : 1
  return maxId
}
*/

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  const person = new Person({
    id: body.id,
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.get('/info', (request, response) => {
  Person.find().estimatedDocumentCount(function(result) {
    response.send(result)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})