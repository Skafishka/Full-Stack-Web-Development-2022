//import { CoursePart } from "../types";
import { CourseParts } from "../types";
import { Part } from "./Part";
/*
interface ContentProps {
    courseParts: CoursePart[];
}
*/
export const Content = (props: CourseParts) => {
    return (
      <div>
        {props.courseParts.map(part => 
            <Part key={part.name} part={part} />)}
      </div>
    );
};