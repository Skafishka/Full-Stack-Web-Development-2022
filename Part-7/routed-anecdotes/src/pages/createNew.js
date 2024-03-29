import { useField } from '../hooks'
import { useNavigate } from 'react-router-dom'

const CreateNew = (props) => {
  const {reset: resetContent, ...content} = useField('content')
  const {reset: resetAuthor, ...author} = useField('author')
  const {reset: resetInfo, ...info} = useField('info')
  
  const navigate = useNavigate()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
       votes: 0
    })
    navigate('/')
  }

  const handleSubmitReset = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }
  
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        content:
        <input {...content} />
        <br/>
        author:
        <input {...author} />
        <br/>
        url for more info:
        <input {...info} />
        <br />
        <button>create</button>
        <button onClick={handleSubmitReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew