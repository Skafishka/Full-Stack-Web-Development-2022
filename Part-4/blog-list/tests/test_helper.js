const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Arthur',
    author: 'Konan',
    url: 'www.url.com',
    likes: 4
  },
  {
    title: 'How to live',
    author: 'Andrew',
    url: 'qwqw.aase.er',
    likes: 8
  },
  {
    title: 'Qaz',
    author: 'Wsx',
    url: 'asda.eae',
    likes: 898
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb
}