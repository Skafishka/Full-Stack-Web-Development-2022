import React from "react"

const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
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
      <b>Number of exercises is {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</b>
    </>
  )
}

const Course = ({course}) => {
  return (
    <>
     <Header course={course} />
     <Content parts={course.parts} />
     <Total parts={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
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
      }
    ]
  }
      
  return <Course course={course} />
}

export default App;
