const Header = (props) => {
  return (
    <div>
      <h1>{props.course_name}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part partname={props.parts[0].name} ecount={props.parts[0].exercises}/>
      <Part partname={props.parts[1].name} ecount={props.parts[1].exercises}/>
      <Part partname={props.parts[2].name} ecount={props.parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  let sum = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
  return (
    <div>
      <p>Number of exercises {sum}</p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.partname} {props.ecount}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course_name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App