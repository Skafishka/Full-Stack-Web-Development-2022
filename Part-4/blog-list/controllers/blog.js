const blogesRouter = require('express').Router()
const Blog = require('../models/blog')

blogesRouter.post('/api/blogs', (request, response, next) => {
    const body = request.body
  
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
  
  blogesRouter.get('/api/blogs', (request, response) => {
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
  
module.exports = blogesRouter