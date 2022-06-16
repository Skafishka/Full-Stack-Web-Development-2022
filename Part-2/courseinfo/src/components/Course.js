const Note = ({note}) => {
    return (
        <>
            <h2>{note.name}</h2>
            {note.parts.map(notes =>
                <p key={notes.id}> {notes.name} {notes.exercises} </p>
            )}
            <b>Number of exercises is {note.parts.reduce((s, p) => s + p.exercises, 0)} </b>   
        </>
    )
}

export default Note    