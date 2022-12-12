interface WeekValues {
    answer1: number;
    answer2: number;
    answer3: number;
    answer4: number,
    answer5: boolean,
    answer6: number,
    answer7: string
}

const printOut = (args: Array<number>): WeekValues => {
    let activeDays = 0;
    let workingHours = 0;
    for (let day of args) {
        workingHours += day;
        if (day > 0) {
            activeDays += 1;
        }
    }
    workingHours = workingHours / 7;
    let target = 4;
    let rating = workingHours * 100 / target;
    let statement = 'Not bad';
    if (rating < 100) {
        statement = 'Keep going ahead!'
    }
    
    console.log(`
    the number of days: ${args.length}, 
    the number of training days: ${activeDays}, 
    the original target value: ${target} h., 
    the calculated average time: ${workingHours} h., 
    if the target was reached: ${workingHours > target}, 
    how well the hours are met: ${rating}%, 
    explaining the rating: ${statement}`)

    return {
        answer1: Number(args.length),
        answer2: Number(activeDays),
        answer3: Number(target),
        answer4: Number(workingHours),
        answer5: Boolean(workingHours > target),
        answer6: Number(rating),
        answer7: String(statement)
    }
}

try {
    (printOut([0, 1, 2, 3, 4, 5, 6]))
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}