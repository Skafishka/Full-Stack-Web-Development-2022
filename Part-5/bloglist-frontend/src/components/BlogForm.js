import { useState } from 'react'

const BlogForm = ({
  createBlog
}) => {
  const [newTitle, setTitles] = useState('')
  const [newAuthor, setAuthors] = useState('')
  const [newUrl, setUrls] = useState('')

  const handleTitleChange = (event) => {
    setTitles(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthors(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrls(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setTitles('')
    setAuthors('')
    setUrls('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <>
                title: <input
            id='title'
            value={newTitle}
            onChange={handleTitleChange}
            placeholder='write-content-here'

          />
                author: <input
            id='author'
            value={newAuthor}
            onChange={handleAuthorChange}
            placeholder='write-content-here'
          />
                url: <input
            id='url'
            value={newUrl}
            onChange={handleUrlChange}
            placeholder='write-content-here'
          />
        </> <button id='create-blog-button' type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm