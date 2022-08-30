const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialNotes)
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are three blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(3)
})

test('the first note title is Arthur', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].title).toBe('Arthur')
})

test('creating a new post', async () => {
  const newBlog = {
    title: 'How to add a new Note',
    author: 'Wheil Conrad',
    url: 'www.qwerty.com',
    likes: 55
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialNotes.length + 1)

  const title = blogsAtEnd.map(q => q.title)
  expect(title).toContain('How to add a new Note')
})

afterAll(() => {
  mongoose.connection.close()
})