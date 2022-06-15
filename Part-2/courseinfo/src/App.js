import React from "react"

const Result = (props) => {
  return (
    <div>
      <ul>
        <h1>Web development curriculum</h1>
      </ul>
      {props.courses.map(note => 
        <ul key={note.id}>
          <h2>{note.name}</h2>
          <div>
            {note.parts.map(notes =>
              <p key={notes.id}>
                {notes.name} {notes.exercises} 
              </p>
            )}
            <b>Number of exercises is {note.parts.reduce((s, p) => s + p.exercises, 0)} </b>  
          </div>
        </ul>
      )}
    </div>
  )
}

const Course = ({courses}) => {
  return (
    <>
     <Result courses={courses} />
    </>
  )  
}

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
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
          id:2
        }
      ]
    }
  ]
      
  return <Course courses={courses} />
}

export default App;
