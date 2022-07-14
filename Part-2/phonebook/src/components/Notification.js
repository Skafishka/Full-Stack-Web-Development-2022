const Notification = ({message}) => {
    const style = {
      color: `green`,
      fontStyle: `normal`,
      fontFamily: `Sans-Serif`,
      fontSize: 16,
      textShadow: 5,
      backgroundColor: `lightgrey`,
      padding: "10px",
      fontWeight: `bold`,
      border: `2px solid green`
    }
    if (message === null) {
      return null
    }
  
    return (
      <div style={style}>
        {message}
      </div>
    )
  }

  export default Notification