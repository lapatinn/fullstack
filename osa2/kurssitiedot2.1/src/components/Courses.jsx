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

const Course = ( {course} ) => {
  return (
    <div>
      <Header course_name={course.name} />
      <Content course={course} />
    </div>
  )
}

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

const Part = (props) => {
  return (
    <div>
      <p>{props.partname} {props.ecount}</p>
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

export default Courses