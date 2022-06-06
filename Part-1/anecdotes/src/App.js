import { useState } from 'react';

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Text = (props) => {

  if (props.value !== 0) {
    return (
      <>
        <p>{props.anecdotes}</p>
        <p> the anecdote has {props.value} votes</p>
      </>
    )
  }
  else if (props.value === 0 && props.q === 0) (
      <>
        <p>{props.anecdotes}</p>
        <p> the anecdote has 0 votes</p>
    </>
    )
  

}

const Anecdotes = [
  '0. If it hurts, do it more often',
  '1. Adding manpower to a late software projects makes it later',
  '2. The best way to get a project done faster is to start sooner',
  '3. The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  '4. How does a project get to be a year late?... One day at a time.',
  '5. Every good work of software starts by scratching a developers personal itch',
  '6. Prolific programmers contribute to certain disaster',
  '7. It is better to wait for a productive programmer to become available than it is to wait for the first available programmer to become productive',
  '8. Simplicity is prerequisite for reliability',
  '9. Correctness is clearly the prime quality. If a system does not do what it is supposed to do, then everything else about it matters little.',
  '10. If you cannot grok the overall structure of a program while taking a shower, you are not ready to code it.',
  '11. If something is worth doing once, its worth building a tool to do it.',
  '12. Conceptual integrity is the most important consideration in system design.'
]

const points = Array.from({length: Anecdotes.length}).fill(0)
const copy = points


const App = () => {
  
  const [selected, setSelected] = useState(0)
  const [value, setValue] = useState(0)
  const [q, setQ] = useState(0)
    
  const vote = () => {
    console.log(copy)
    copy[selected] += 1
    console.log(copy[selected])
    setValue(copy[selected])
    
    console.log("votes " + copy[selected])
  }

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * Anecdotes.length)) 
    setQ(q+1) 
  } 
  
  return (
    <>
      <Text anecdotes={Anecdotes[selected]} value={value} q={q}/>
      <Button text='vote' handleClick={vote}/>
      <Button text='Next anecdote' handleClick={nextAnecdote}/>
      
    </>
  )
}

export default App;
