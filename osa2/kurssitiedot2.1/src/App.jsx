const Header = (props) => {
  return (
    <div>
      <h2>{props.course_name}</h2>
    </div>
  )
}

const Content = ( {course} ) => {
  const parts = course.parts

  const part = parts.map(part =>
    <li key={part.id}>
      <Part partname={part.name} ecount={part.exercises} />
    </li>
  )

  return (
    <div>
      {part}
      <Total course={course}/>
    </div>
  )
}

const Total = ({ course }) => {
  const exercises = course.parts.map(part => part.exercises)
  const sum = exercises.reduce((a, b) => a + b, 0)

  return (
    <div>
      <b>Total of {sum} exercises</b>
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

const Course = ( {course} ) => {
  return (
    <div>
      <Header course_name={course.name} />
      <Content course={course} />
    </div>
  )
}

const Courses = ( {courses} ) => {
  const courselist = courses.map(course =>
    <Course key={course.id} course={course} />
  )

  return(
    <div>
      {courselist}
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ] 

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Courses courses={courses}/>
    </div>
  )
}

export default App