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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
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

  const loginForm = () => {
    <form onSubmit={handleLogin}>
      <>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </>
      <>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </>
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

  return (
    <>
      <h2>Blogs</h2>
      {user !== null ?
        loginForm() :
        <div>
          <p>{user} logged in</p>
          {blogForm()}
        </div>
      }
      {blogs.map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog} 
        />
      )}
    </>
  )
}

export default App
