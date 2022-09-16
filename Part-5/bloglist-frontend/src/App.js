import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setTitles] = useState('')
  const [newAuthor, setAuthors] = useState('')
  const [newUrl, setUrls] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.clear()
    } catch (exception) {
      setErrorMessage('Log-out is impossible')
    }
  }

  const loginForm = () => {
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  }

  const createBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    
    blogService
      .create(blogObject)
      .then(() => {
        setBlogs(blogs.concat(blogObject))
        setTitles('')
        setAuthors('')
        setUrls('')
      })
  }

  const handleTitleChange = (event) => {
    setTitles(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthors(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrls(event.target.value)
  }



  const blogForm = () => (
    <form onSubmit={createBlog}>
      <>
        title: <input
          value={newTitle}
          onChange={handleTitleChange}
        />
        author: <input
          value={newAuthor}
          onChange={handleAuthorChange}
        />
        url: <input
          value={newUrl}
          onChange={handleUrlChange}
        />
        </> <button type="submit">save</button>
        </form>
  )
  
  if (user === null) {
    return (
      <div>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
    
  return (
    <div>
      <h2>User</h2>     
      <form onSubmit={handleLogOut}>
        {user.name} logged-in <button type='submit'>logout</button>
      </form>
      <h2>create new</h2>
      {blogForm()}
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog} 
        />
      )}
    </div>
  )
}

export default App