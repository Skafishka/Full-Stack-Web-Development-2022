import React from "react"

const Header = (props) => {
  return (
    <>
      <h1>{props.courses.name}</h1>
    </>
  )
}

const Result = (props) => {
  return props.courses.map(note => <div key={note.id}> <h1>{note.name}</h1> {console.log(note)} </div> ) 
}

const Content = (props) => {
  return (
    <>
      <p>{props.parts[0].name} {props.parts[0].exercises}</p>
      <p>{props.parts[1].name} {props.parts[1].exercises}</p>
      <p>{props.parts[2].name} {props.parts[2].exercises}</p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <b>Number of exercises is {props.parts.reduce((s, p) => s + p.exercises, 0)} </b>
    </>
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
