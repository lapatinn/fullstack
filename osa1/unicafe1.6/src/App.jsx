import { useState } from 'react'

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const avg = parseFloat(((props.good * 1) + (props.neutral * 0) + (props.bad * -1)) / all).toFixed(2)
  const pos = parseFloat((props.good / all) * 100).toFixed(2) + " %"

  if (all > 0) {
    return (
      <table>
        <tbody>
          <tr>
            <td>Good</td>
            <td>{props.good}</td>
          </tr>
          <tr>
            <td>Neutral</td>
            <td>{props.neutral}</td>
          </tr>
          <tr>
            <td>Bad</td>
            <td>{props.bad}</td>
          </tr>
          <tr>
            <td>All</td>
            <td>{all}</td>
          </tr>
          <tr>
            <td>Average</td>
            <td>{avg}</td>
          </tr>
          <tr>
            <td>Positive</td>
            <td>{pos}</td>
          </tr>
        </tbody>
      </table>
    )
  }
  else {
    return (
      <div>
        No feedback given
      </div>
    )
  }
}

const StatisticLine = (props) => {
  return(
    <div>{props.text}: {props.value}</div>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <h1>Give feedback</h1>
        <Button text="Good" onClick={() => setGood(good + 1)}/>
        <Button text="Neutral" onClick={() => setNeutral(neutral + 1)}/>
        <Button text="Bad" onClick={() => setBad(bad + 1)}/>
      </div>

      <div>
        <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
    </div>
  )
}

export default App