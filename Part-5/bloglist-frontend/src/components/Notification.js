const Notification = ({ message }) => {
  const style = {
    color: 'red',
    fontStyle: 'normal',
    fontFamily: 'Sans-Serif',
    fontSize: 16,
    textShadow: 5,
    backgroundColor: 'lightgrey',
    padding: '10px',
    fontWeight: 'bold',
    border: '2px solid red'
  }
  if (message === null) {
    return null
  }

  return (
    <div style={style} className='error'>
      {message}
    </div>
  )
}

export default Notification