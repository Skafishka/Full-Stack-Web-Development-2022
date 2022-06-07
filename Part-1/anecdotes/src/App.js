import { useState } from 'react';

const Header = (props) => {
  return (
    <>
      <h1>{props.header}</h1>
    </>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Text = (props) => {
  return (
    <>
      <p>{props.anecdotes}</p>
      <p>The anecdote has {props.value} votes</p>
    </>
  )
}

const Anecdotes = [
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

const points = Array.from({length: Anecdotes.length}).fill(0)
const copy = points

const CheckArr = (props) => {
  for (let i = 0; i < Anecdotes.length; i++) {
    if (props.q === copy[i]) return Anecdotes[i];
  }
}

const App = () => {
  const firstHeader = 'Anecdote of the day'
  const secondHeader = 'Anecdotes with most votes'
  const [selected, setSelected] = useState(0)
  const [value, setValue] = useState(0)
  const q = Math.max.apply(Math, copy)
          
  const vote = () => {
    copy[selected] += 1
    setValue(copy[selected])
  }

  const nextAnecdote = () => {
    setValue(copy[selected] * 0)
    setSelected(Math.floor(Math.random() * Anecdotes.length))
  }
  
  return (
    <>
      <Header header={firstHeader} secondHeader={secondHeader} />
      <Text anecdotes={Anecdotes[selected]} value={copy[selected]} />
      <Button text='Vote' handleClick={vote} />
      <Button text='Next anecdote' handleClick={nextAnecdote} />
      <Header header={secondHeader}/>
      <CheckArr q={q} />
      <Text value={q} />
    </>
  )
}

export default App;