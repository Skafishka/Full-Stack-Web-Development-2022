const http = require('http')
const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const Person = require('./models/person')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('---')
  next()
}

/*const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(mongoUrl)*/

app.use(express.json())

app.use(cors())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(requestLogger)

app.use(express.static('build'))

app.post('/api/blogs', (request, response, next) => {
  const body = request.body
  console.log(body);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  blog.save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      if (blogs) {
        response.json(blogs)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})