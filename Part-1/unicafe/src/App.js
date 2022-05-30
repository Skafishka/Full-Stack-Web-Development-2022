import { useState } from 'react'

const Header = (props) => {
  return (
    <>
      <h1>{props.appName}</h1>
    </>
  )
}

const Statistics = (props) => {
  return (
    <>
      <h1>{props.appStatistics}</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
    </>
  )
}

const App = () => {
const appName = 'give feedback'
const appStatistics = 'statistics'
  // save clicks of each button to its onw state
const [good, setGood] = useState(0)
const [neutral, setNeutral] = useState(0)
const [bad, setBad] = useState(0)

  return (
    <div>
      <Header appName={appName} />
      <button onClick={() => setGood(good + 1)}>
        good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        bad
      </button>
      <Statistics appStatistics={appStatistics} good={good} neutral={neutral} bad={bad}/> 
    </div>
  );
}

export default App;
