import Note from './components/Course'

const App = ({notes}) => {
  return (
    <>
      <ul>
        <h1>Web development curriculum</h1>
        {notes.map(note =>
          <Note key={note.id} note={note}/>
        )}
      </ul>
    </>
  )
}

export default App;
