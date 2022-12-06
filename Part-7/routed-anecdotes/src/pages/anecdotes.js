import { Link, useParams } from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => 
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        )}
      </ul>
    </div>
  )

  const Anecdote = ({ anecdotes }) => {
    const id = useParams().id
    const anecdote = anecdotes.find(q => q.id === Number(id))
    return (
      <div>
        <h2>{anecdote.content}</h2>
        <div>{'\n'}{`has ${anecdote.votes} votes`}</div>
        <div>{`for more info see: ${anecdote.info}`}</div>
      </div>
    )
  }
  
export { AnecdoteList, Anecdote }