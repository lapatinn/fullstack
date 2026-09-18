import { useState } from 'react'

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const avg = ((props.good * 1) + (props.neutral * 0) + (props.bad * -1)) / all
  const pos = (props.good / all) * 100

  return (
    <div>
      Good: {props.good}<br />
      Neutral: {props.neutral} <br />
      Bad: {props.bad} <br />
      All: {all} <br />
      Average: {avg} <br />
      Positive: {pos}% 
    </div>
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
        <button onClick={() => setGood(good + 1)}>
          Good
        </button>
        <button onClick={() => setNeutral(neutral + 1)}>
          Neutral
        </button>
        <button onClick={() => setBad(bad + 1)}>
          Bad
        </button>
      </div>

      <div>
        <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
    </div>
  )
}

export default App