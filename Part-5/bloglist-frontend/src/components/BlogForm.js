const BlogForm = ({ 
    onSubmit, 
    newTitle, 
    handleTitleChange, 
    newAuthor, 
    handleAuthorChange, 
    newUrl, 
    handleUrlChange 
    }) => {
    return (
        <form onSubmit={onSubmit}>
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
}

export default BlogForm