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
  {props.text} average {props.value}
  </>
)

const Statistics = (props) => {
  if (props.allClicks === 0) {
    return (
      <>
      <table>
        <tbody>
          <tr>
            <th><h1>{props.appStatistics}</h1></th>
          </tr>
          <tr>
            <td>No feedback given</td>
          </tr>
        </tbody>
      </table>
      </>
    )
  } 
  else if ((props.valueQ > 0 && props.good > 0) || (props.valueQ > 0 && props.bad > 0) || (props.valueQ > 0 && props.neutral > 0)) {
    return (
    <>
    <table>
      <tbody>
        <tr>
          <th><h1>{props.appStatistics}</h1></th>
        </tr>
        <tr>
          <td>good</td>
          <td>{props.good}</td>
        </tr>
        <tr>
          <td><StatisticsLine text="good" /></td>
          <td>{props.average} </td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{props.neutral}</td>
        </tr>
        <tr>
          <td><StatisticsLine text="neutral" /></td>
          <td>{props.average} </td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{props.bad}</td>
        </tr>
        <tr>
          <td><StatisticsLine text="bad" /></td>
          <td>{props.average} </td>
        </tr>
        <tr>
          <td>all </td> 
          <td>{props.all}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{props.positive} % </td>
        </tr>
      </tbody>
    </table>
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
    <div className='App'>
      <Header appName={appName} />
      <Button text="good" handleClick={goodClick} />
      <Button text="neutral" handleClick={neutralClick} />
      <Button text="bad" handleClick={badClick} />
      <Statistics appStatistics={appStatistics} allClicks={allClicks.length} good={good} neutral={neutral} bad={bad} all={allClicks.length} average={number / allClicks.length} positive={good * 100 / allClicks.length} valueQ={valueQ}/>
      <Button text="Submitting feedback" handleClick={submitFeedback} />
    </div>  
  )
  
}

export default App;