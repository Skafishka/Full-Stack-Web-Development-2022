import { useState } from 'react'

const Header = (props) => {
  return (
    <>
      <h1>{props.appName}</h1>
    </>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticsLine = (props) => (
  <>
  <p>{props.text} average {props.value} </p>
  </>
)

const Statistics = (props) => {
  if (props.allClicks === 0) {
    return (
      
      <>
      
        <h1>{props.appStatistics}</h1>
        <p>No feedback given</p>
      
      </>
      
    )
  } 
  else if (props.valueQ > 0 && props.good > 0 || props.valueQ > 0 && props.bad > 0 || props.valueQ > 0 && props.neutral > 0) {
    return (
    <>
      <h1>{props.appStatistics}</h1>
      <StatisticsLine text="good" value={props.average}  />
      <StatisticsLine text="neutral" value={props.average} />
      <StatisticsLine text="bad" value={props.average} />
      <p>all {props.all}</p>
      <p>positive {props.positive} %</p> 
    </>
    )
  }
  return (
    <>
      <h1>{props.appStatistics}</h1>
    </>
  )
}

const App = () => {
const appName = 'give feedback'
const appStatistics = 'statistics'
const [good, setGood] = useState(0)
const [neutral, setNeutral] = useState(0)
const [bad, setBad] = useState(0)
const [allClicks, setAll] = useState([])
const [number, setAverage] = useState(0)
const [valueQ, setValue] = useState(0)

const goodClick = () => {
  setAll(allClicks.concat(1))
  setGood(good + 1)
  setAverage(number + 1)
}

const neutralClick = () => {
  setAll(allClicks.concat(0))
  setNeutral(neutral + 1)
  setAverage(number + 0)
}

const badClick = () => {
  setAll(allClicks.concat(-1))
  setBad(bad + 1)
  setAverage(number - 1)
}

const submitFeedback = () => {
  setValue(valueQ + 1)
}

  return (
    <div>
      <table>
        <tr>
          <th><Header appName={appName} /></th>
        </tr>
        <tr>
          <Button text="good" handleClick={goodClick} />
          <Button text="neutral" handleClick={neutralClick} />
          <Button text="bad" handleClick={badClick} />
        </tr>
        <tr><Statistics appStatistics={appStatistics} allClicks={allClicks.length} good={good} neutral={neutral} bad={bad} all={allClicks.length} average={number / allClicks.length} positive={good * 100 / allClicks.length} valueQ={valueQ}/></tr>
        <Button text="Submitting feedback" handleClick={submitFeedback} />
      </table>
    </div>
  )
}

export default App;