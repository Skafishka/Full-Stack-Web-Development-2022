const BlogForm = (props) => {
    return (
        <form onSubmit={props.addBlog}>
            <>
                title: <input
                    value={props.newTitle}
                    onChange={props.handleTitleChange}
                />
                author: <input
                    value={props.newAuthor}
                    onChange={props.handleAuthorChange}
                />
                url: <input
                    value={props.newUrl}
                    onChange={props.handleUrlChange}
                />
            </> <button type="submit">save</button>
        </form>
    )
}

export default BlogForm