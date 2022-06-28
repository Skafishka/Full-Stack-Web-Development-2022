import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas" }
  ])
  const [newName, setNewName] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
    }
    persons.find(q => {return JSON.stringify(q.name) === JSON.stringify(newName);}) !== undefined ? window.alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(noteObject))  
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
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map((element, index) => 
          <li key={index.toString()}>
            {element.name}
          </li>
        )}
    </div>
  );
}

export default App;