import diagnoses from "../../data/diagnoses";

import { DiagnosEntry } from "../types";

const getDiagnosEntries = (): DiagnosEntry[] => {
    return diagnoses;
};

export default { getDiagnosEntries };