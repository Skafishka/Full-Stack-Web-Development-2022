import { useState, useEffect } from 'react'
import axios from 'axios'

const Personform = (props) => {
  return (
    <form onSubmit={props.addNote}>
      <>
        name: 
        <input 
          value={props.newName}
          onChange={props.handleNoteChange}
        />
      </>
      <>
        number:
        <input
          value={props.newPhone}
          onChange={props.handlePhoneChange}
        />
      </>
      <>
        <button type="submit">add</button>
      </>
    </form> 
  )
}

const Filter = (props) => {
  return (
    <>
      {props.persons.filter(person => person.name.toLowerCase().includes(props.showFiltered.toLowerCase())).map((filteredName, id) => (
        <li key={id.toString()}>
          {filteredName.name} {filteredName.number}
        </li>
      ))}
    </>
  )
}

const Persons = (props) => {
  return (
    <>
      filter shown with:
      <input
      value={props.showFiltered}
      onChange={props.handleFilterChange}
      />
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [showFiltered, setShowFiltered] = useState('')

useEffect(() => {
  console.log('effect')
  axios
    .get('http://localhost:3001/persons').then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
}, [])
console.log('render', persons.length, 'persons')

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
      <Persons showFiltered={showFiltered} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <Personform addNote={addNote} newName={newName} handleNoteChange={handleNoteChange} newPhone={newPhone} handlePhoneChange={handlePhoneChange} />
      <h2>Numbers</h2>
      <Filter persons={persons} showFiltered={showFiltered} />
    </div>
  );
}

export default App;