const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

const bcrypt = require('bcryptjs')
const User = require('../models/user')

describe('checking the initial condition of blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
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
})

describe('adding blogs', () => {
  test('creating a new blog', async () => {
    const newBlog = {
      title: 'How to add a new Blog',
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
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const title = blogsAtEnd.map(q => q.title)
    expect(title).toContain('How to add a new Blog')
  })

  describe('4.9*: Blog list tests, step2', () => {
    test('verifies that the unique identifier property posts is id', async () => {
      const response = await api.get('/api/blogs')

      expect(response.body[0].id).toBeDefined()
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        blogsAtStart.length - 1
      )

      const titles = blogsAtEnd.map(q => q.content)

      expect(titles).not.toContain(blogToDelete.title)
    })
  })

  describe('update a likes amoount', () => {
    test('put succeeds', async () => {
      const Start = await helper.blogsInDb()
      const blogToUpdate = Start[1]
      const updateLikes = { likes: 56 }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updateLikes)
        .expect(200)

      const End = await helper.blogsInDb()
      const likesNumber = End.map(q => q.likes)
      expect(likesNumber).toContain(56)
    })
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Garry',
      name: 'Garry Richardson',
      password: 'qwerty'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(() => {
  mongoose.connection.close()
})