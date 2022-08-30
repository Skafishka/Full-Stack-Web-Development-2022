const blogesRouter = require('express').Router()
const Blog = require('../models/blog')

blogesRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  if (blogs) {
    response.json(blogs)
  } else {
    response.status(404).end()
  }
})

blogesRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogesRouter