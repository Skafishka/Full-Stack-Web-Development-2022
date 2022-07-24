const Personform = (props) => {
    return (
      <form onSubmit={props.addNote}>
        <>
          name: <input 
            value={props.newName}
            onChange={props.handleNoteChange}
          /> number: <input
            value={props.newPhone}
            onChange={props.handlePhoneChange} 
          />
        </> <button type="submit">add</button>  
      </form>
    )
  }

  export default Personform