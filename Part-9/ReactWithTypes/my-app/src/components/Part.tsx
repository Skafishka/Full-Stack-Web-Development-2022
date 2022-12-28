import { CoursePart } from "../types";

export const Part = ({ part } : { part: CoursePart }) => {
    switch (part.type) {
        case "normal":
            return (
                <p>
                    <b>{part.name} {part.exerciseCount}</b><br/>
                    <i>{part.description}</i>
                </p>
            )
        case "groupProject":
            return (
                <p>
                    <b>{part.name} {part.exerciseCount}</b><br/>
                    Project exercises: {part.groupProjectCount} 
                </p>
            )
        case "submission":
            return (
                <p>
                    <b>{part.name} {part.exerciseCount}</b><br/>
                    <i>{part.description}</i><br/>
                    Submission link: {part.exerciseSubmissionLink} 
                </p>
            )
        case "special":
            return (
                <p>
                    <b>{part.name} {part.exerciseCount}</b><br/>
                    <i>{part.description}</i><br/>
                    required skills: {part.requirements.join(", ")} 
                </p>
            )
        default:
            return <></>
    }
};