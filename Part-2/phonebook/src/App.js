import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
    }

    setPersons(persons.concat(noteObject))
    setNewName('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNote}>
        <div>
          <input 
          value={newName}
          onChange={handleNoteChange}
          />
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((name) => 
          <li key={name.toString()}>
            {name.name}
          </li>
        )}   
      </div>
    </div>
  );
}

export default App;