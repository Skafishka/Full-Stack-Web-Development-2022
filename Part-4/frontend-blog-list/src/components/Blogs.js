const Blogs = (props) => {
    return (
      <>
        {props.blogs.map((blog, id) => (
          <li key={id.toString()}>
            title: {blog.title}, author: {blog.author}, url: {blog.url}, likes: {blog.likes}.
          </li>
        ))}
      </>
    )
  }

  export default Blogs