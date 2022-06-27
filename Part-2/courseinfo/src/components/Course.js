const Note = ({note}) => {
    return (
        <>
            <p>{note.content} {note.important}</p>
        </>
    )
}

export default Note    