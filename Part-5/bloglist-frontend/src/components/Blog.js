import { useState } from "react"

const Blog = ({blogs, user}) => {
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
        {blogs.map((blog, id) => (
          <li key={id.toString()}>
            <b>{blog.title}</b> by {blog.author} <button onClick={toggleVisibility}>view</button>
          </li>
        ))}
      </div>
      <div style={showWhenVisible}>
        {blogs.map((blog, id) => (
          <li key={id.toString()} style={blogStyle}>
            <b>{blog.title}</b> by {blog.author} 
            <ul>link: {blog.url}</ul>
            <ul>likes: {blog.likes} <button>likes</button></ul>
            <ul>user: {user} </ul>
            <button onClick={toggleVisibility}>hide</button>
          </li>
        ))}
      </div>
    </div>
  )
}

export default Blog