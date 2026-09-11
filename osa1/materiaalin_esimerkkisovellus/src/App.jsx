const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const nimi = "Pekka"
  const ika = 10

  console.log('Hello from komponentti')

  const now = new Date()
  const a = 10
  const b = 20

  console.log(now, a + b)

  return (
    <div>
      <p>Hello world</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
      <Hello name="Lauri"/>
      <Hello name="Jake"/>

      <Hello name={nimi} age={ika}/>
    </div>
  )
}

/* Tärkee rivi älä poista */
export default App