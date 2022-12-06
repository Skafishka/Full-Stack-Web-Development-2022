import { useField } from '../hooks'
import { useNavigate } from 'react-router-dom'

const CreateNew = (props) => {
    const {...content} = useField('content')
    const {...author} = useField('author')
    const {...info} = useField('info')
  
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
          <button type='submit'>create</button>
        </form>
      </div>
    )
  }

export default CreateNew