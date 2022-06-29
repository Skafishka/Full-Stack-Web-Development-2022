import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '98-918-30', },
    { name: 'Ada Lovalave', number: '23-231-3131', },
    { name: 'Dan Abramov', number: '12-312-314' },
    { name: 'Mary Poppendieck', number: '12-131-314' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [showFiltered, setShowFiltered] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newPhone,
    }
    persons.find(q => {return (JSON.stringify(q.name) === JSON.stringify(newName)) }) 
      !== undefined 
      ? window.alert(`${newName} is already added to phonebook`) 
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

  const handleFilterChange = (event) => {
    setShowFiltered(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:
        <input
        value={showFiltered}
        onChange={handleFilterChange}
        />
      </div>
      <h2>Add a new</h2>
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
      <div>
        {persons.filter(person => person.name.toLowerCase().includes(showFiltered.toLowerCase())).map((filteredName, id) => (
          <li key={id.toString()}>
            {filteredName.name} {filteredName.number}
          </li>
        ))}
      </div>
    </div>
  );
}

export default App;