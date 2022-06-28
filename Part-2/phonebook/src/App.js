import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '9891830' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newPhone,
    }
    persons.find(q => {return (JSON.stringify(q.name) === JSON.stringify(newName)) || (JSON.stringify(q.number) === JSON.stringify(newPhone))}) 
      !== undefined 
      ? window.alert(`${newName} or ${newPhone} are already added to phonebook`) 
      : setPersons(persons.concat(noteObject))
    setNewName('')
    setNewPhone('')
    }
  
  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNote}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNoteChange}
          />
        </div>
        <div>
          number:
          <input
            value={newPhone}
            onChange={handlePhoneChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map((element, index) => 
          <li key={index.toString()}>
            {element.name} {element.number}
          </li>
        )}        
    </div>
  );
}

export default App;