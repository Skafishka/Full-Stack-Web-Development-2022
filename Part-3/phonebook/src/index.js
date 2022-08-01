const express = require('express')
const morgan = require('morgan')
const app = express()
const mongoose = require ('mongoose')

const password = 'FBIHxBYdqnBTGoBD'

const url = `mongodb+srv://fullstack:${password}@cluster0.wdy2gzo.mongodb.net/personsApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

app.use(express.json())

app.use(express.static('build'))

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.id
    delete returnedObject.__v
  }
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + Math.floor(Math.random() * 1000)
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (body.name === undefined || body.number === undefined || (body.id === generateId())) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: generateId(),
    name: 'default',
    number: 'default',
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/info', (request, response) => {
  const maxId = persons.length > 0
    ? persons.length
    : 0
  response.send(`<h2>Phonebook has info for ${maxId} people<h2>
  <h3>${new Date()}</h3>`)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})