const Header = ({name}) => {
    return (
      <>
        <h1>{name}</h1>
      </>
    )
  }
  
  const Content = ({course}) => {
      return (
        <>
          {course.parts.map(part => 
            <Part key={part.id} name={part.name} exercises={part.exercises} />
          )}
        </>
      )
  }
    
  const Part = ({name, exercises}) => {
    return (
      <>
        <p>
          {name} {exercises}
        </p>
      </>
    )
  }
  
  const TotalCourses = ({course}) => {
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <>
        <p><strong>total of {total} exercises</strong></p>
      </>
    )
  }
  
  const Course = ({courses}) => {
    return (
      <>{
        courses.map(course => 
          <div key={course.id}>
            <Header name={course.name} />
            <Content course={course} />
            <TotalCourses course={course} />
          </div>
        )
      }
      </>
    )
  }

  export default Course