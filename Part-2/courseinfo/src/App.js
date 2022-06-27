import { useState } from 'react'
import Note from './components/Course'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll 
    ? notes 
    : notes.filter(note => note.important === true)

  return (
    <>
      <ul>
        <h1>Web development curriculum</h1>
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all'}
          </button>
        </div>
        {notesToShow.map(note =>
          <Note key={note.id} note={note}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
         value={newNote}
         onChange={handleNoteChange}
        />
        <button type='submit'>save</button>
      </form>
    </>
  )
}

export default App;