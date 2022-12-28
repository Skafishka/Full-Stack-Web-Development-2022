import { CourseParts } from "../types";

export const Footer = (props: CourseParts) => {
    return (
      <p>
        Number of exercises{" "}
        {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    );
};