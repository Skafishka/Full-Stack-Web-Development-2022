

const App = ({courses}) => {
  return (
    <div>
      <ul>
        <h1>Web development curriculum</h1>
      </ul>
      {courses.map(note =>
        <ul key={note.id}>
          <h2>{note.name}</h2>
          <div>
            {note.parts.map(notes =>
              <p key={notes.id}>
                {notes.name} {notes.exercises} 
              </p>
            )}
            <b>Number of exercises is {note.parts.reduce((s, p) => s + p.exercises, 0)} </b>  
          </div>
        </ul>
      )}
    </div>
  )
  
}

export default App;
