import { useState } from 'react'

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const avg = ((props.good * 1) + (props.neutral * 0) + (props.bad * -1)) / all
  const pos = (props.good / all) * 100 + "%"

  if (all > 0) {
    return (
      <div>
        <StatisticLine text="Good" value={props.good}/>
        <StatisticLine text="Neutral" value={props.neutral}/>
        <StatisticLine text="Bad" value={props.bad}/>
        <StatisticLine text="All" value={all}/>
        <StatisticLine text="Average" value={avg}/>
        <StatisticLine text="Positive" value={pos}/>
      </div>
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