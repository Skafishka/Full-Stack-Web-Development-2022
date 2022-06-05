import { useState } from 'react';

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Text = (props) => {
  return (
    <>
      <p>{props.anecdotes}</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software projects makes it later',
    'The best way to get a project done faster is to start sooner',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'How does a project get to be a year late?... One day at a time.',
    'Every good work of software starts by scratching a developers personal itch',
    'Prolific programmers contribute to certain disaster',
    'It is better to wait for a productive programmer to become available than it is to wait for the first available programmer to become productive',
    'Simplicity is prerequisite for reliability',
    'Correctness is clearly the prime quality. If a system does not do what it is supposed to do, then everything else about it matters little.',
    'If you cannot grok the overall structure of a program while taking a shower, you are not ready to code it.',
    'If something is worth doing once, its worth building a tool to do it.',
    'Conceptual integrity is the most important consideration in system design.'
  ]

  const [selected, setSelected] = useState(0)
  const [value, setValue] = useState(0)
  const [click, setClick] = useState(0)

  const vote = () => {
    setValue(value + 1)
    setClick(click + 1)
  }

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const points = Array.apply(null, {length: anecdotes.length}).map(function() {return 0;})
  const copy = points
  copy[selected] += click
 
  
  console.log(copy)
   
  return (
    <>
      <Text anecdotes={anecdotes[selected]}/>
      <Button text='vote' handleClick={vote}/>
      <Button text='Next anecdote' handleClick={nextAnecdote}/>  
    </>
  )
}

export default App;
