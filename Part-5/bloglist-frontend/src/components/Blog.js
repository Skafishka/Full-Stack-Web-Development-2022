import { useState } from 'react'

const Blog = ({
  blogs,
  user,
  updateBlog,
  updatedLikes,
  handleUpdatedLikesChange,
  deleteBlog
}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible,setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog, id) => (
            <li key={id.toString()}>
              <b>{blog.title}</b> by {blog.author} <button id='view' onClick={toggleVisibility}>view</button>
            </li>
          ))
        }
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={updateBlog}>
          <>
            put new likes amount: <input id='new-likes-amount' value={updatedLikes} onChange={handleUpdatedLikesChange}/>
          </>
        </form>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog, id) => (
            <li key={id.toString()} style={blogStyle} className='blog'>
              <b>{blog.title}</b> by {blog.author} <button onClick={toggleVisibility}>hide blog</button>
              <ul>link: {blog.url}</ul>
              <ul>likes: {blog.likes} <button id='update-likes' onClick={() => updateBlog(blog.id)}>update likes</button></ul>
              <ul>user: {user} </ul>
              <button id='delete' onClick={() => deleteBlog(blog.id)}>remove</button>
            </li>
          ))
        }
      </div>
    </div>
  )
}

export default Blog