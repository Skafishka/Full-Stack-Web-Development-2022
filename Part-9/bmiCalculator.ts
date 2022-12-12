interface Values {
    value1: number;
    value2: number;
}

const parseArguments = (args: Array<string>): Values => {
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])    
        }
    } else {
        throw new Error('Provided values were not numbers!')
    }
}

const calculateBmi = (height: number, mass: number) => {
    const midResult = mass / height;
    let printText: String;
    if (midResult < 25) {
        printText = "Normal"
    } else if (midResult >= 25 && midResult <= 29) {
        printText = "Overweight"
    } else if (midResult >= 30) {
        printText = "Obese"
    }
    return console.log(`${printText} (healthy weight)`);
}

try {
    (calculateBmi(180, 74));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
