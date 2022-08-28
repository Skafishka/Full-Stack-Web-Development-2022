import { useState, useEffect } from 'react'
import noteService from './services/database'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'

const App = () => {
const [blogs, setBlogs] = useState([])
const [newTitle, setTitles] = useState('')
const [newAuthor, setAuthors] = useState('')
const [newUrl, setURLs] = useState('')
const [newLikes, setLikes] = useState('')
const [newMessage, setNewMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes
    }
    noteService
      .create(blogObject)
      .then(() => {
        setBlogs(blogs.concat(blogObject))
        window.alert(`${newTitle} by ${newAuthor} was added`)
        setTitles('')
        setAuthors('')
        setURLs('')
        setLikes('')
      })
      .catch(error => {
        setNewMessage(error.response.data.error)
        setTimeout(() => {
          setNewMessage(null)
        }, 2000)
      })
  }

  const handleTitleChange = (event) => {
    setTitles(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthors(event.target.value)
  }

  const handleUrlChange = (event) => {
    setURLs(event.target.value)
  }

  const handleLikesChange = (event) => {
    setLikes(event.target.value)
  }

  return (
    <>
    <h2>Bloglist</h2>
    <Blogs blogs={blogs} />
    <h2>Add a new</h2>
    <BlogForm addBlog={addBlog} newTitle={newTitle} handleTitleChange={handleTitleChange} 
      newAuthor={newAuthor} handleAuthorChange={handleAuthorChange} 
      newUrl={newUrl} handleUrlChange={handleUrlChange}
      newLikes={newLikes} handleLikesChange={handleLikesChange} />
    </>
  )
}

export default App;