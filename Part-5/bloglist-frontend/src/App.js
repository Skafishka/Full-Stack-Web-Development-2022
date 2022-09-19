import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setTitles] = useState('')
  const [newAuthor, setAuthors] = useState('')
  const [newUrl, setUrls] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [newMessage, setNewMessage] = useState(null)
  const [updatedLikes, setUpdatedLikes] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
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
        setNewMessage(`a new blog ${newTitle} by ${newAuthor} added`)
        setTimeout(() => {
          setNewMessage(null)
        }, 2000)
        setTitles('')
        setAuthors('')
        setUrls('')
      })
      .catch(error => {
        setNewMessage(error.response.data.error)
        setTimeout(() => {
          setNewMessage(null)
        }, 2000)
      })
  }

  const updateBlog = (id) => {
    
    const blog = blogs.find(q => q.id === id)
    const changedBlog = { ...blog, likes: updatedLikes }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
        setUpdatedLikes('')
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

  const handleUpdatedLikesChange = (event) => {
    setUpdatedLikes(event.target.value)
  }

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>User</h2>
      <form onSubmit={handleLogOut}>
        {user.name} logged-in <button type='submit'>logout</button>
      </form>
      <Notification message={newMessage} />

      <h2>Create new</h2>
        <Togglable buttonLabel="new blog">
          <BlogForm 
            onSubmit={createBlog} 
            newTitle={newTitle} 
            handleTitleChange={handleTitleChange}
            newAuthor={newAuthor} 
            handleAuthorChange={handleAuthorChange} 
            newUrl={newUrl} 
            handleUrlChange={handleUrlChange}
          />
        </Togglable>
     
      <h2>Blogs</h2>
      <Blog 
        blogs={blogs} 
        user={user.name} 
        updateBlog={updateBlog}
        updatedLikes={updatedLikes}
        handleUpdatedLikesChange={handleUpdatedLikesChange}
      />
    </div>
  )
}

export default App