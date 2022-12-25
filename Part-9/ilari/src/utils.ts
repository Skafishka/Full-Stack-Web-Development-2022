import { NewDiaryEntry } from "./types";

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    const newEntry: NewDiaryEntry = {
        date,
        weather,
        visibility,
        comment,
    };

    return newEntry;
};

export default toNewDiaryEntry;