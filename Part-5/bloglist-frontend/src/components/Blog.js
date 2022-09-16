const Blog = (props) => {
  return (
    <>
      {props.blogs.map((blog, id) => (
        <li key={id.toString()}>
          <b>{blog.title}</b> by {blog.author}
        </li>
      ))}
    </>
  )
}

export default Blog