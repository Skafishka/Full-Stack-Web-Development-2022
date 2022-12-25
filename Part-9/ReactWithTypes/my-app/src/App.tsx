const Header = (props: { name: string }) => {
  return <h1>{props.name}</h1>;
};

interface CourseParts {
  name: string;
  exerciseCount: number;
}

const Content = (props: { parts: CourseParts[] }) => {
  return (
    <>
      {props.parts.map((q: CourseParts) => (
        <p key={q.name}>
          {q.name} {q.exerciseCount}
        </p>
      ))}
    </>
  );
};

const Footer = (props: { parts: CourseParts[] }) => {
  return (
    <p>
      Number of exercises{" "}
      {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Footer parts={courseParts} />
    </div>
  );
};

export default App;