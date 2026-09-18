import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const avg = ((good * 1) + (neutral * 0) + (bad * -1)) / all
  const pos = good / all

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
        <p>
          Good: {good}<br />
          Neutral: {neutral} <br />
          Bad: {bad} <br />
          All: {all} <br />
          Average: {avg} <br />
          Positive: {pos}% 
        </p>
      </div>
    </div>
  )
}

export default App