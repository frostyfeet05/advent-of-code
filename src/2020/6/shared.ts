export const input = ``;

export type Answers = string[];
export type CustomFormGroup = Answers[];

export const CustomFormGroup = {
    parse: (input: string): CustomFormGroup[] => {
        return input.split('\n\n')
            .map(group => group.split('\n')
                .map(answers => answers.split('')));
    },
    countUniqueAnswers: (group: CustomFormGroup): number => {
        const occurrences = countOccurrences(group);
        return Object.values(occurrences).length;
    },
    countCommonAnsers: (group: CustomFormGroup): number => {
        const occurrences = countOccurrences(group);
        const length = group.length;
        return Object.values(occurrences).filter(x => x === length).length;
    }
};

const countOccurrences = (group: CustomFormGroup): { [key: string]: number } => {
    return group.flatMap(answers => answers)
        .reduce((occ: { [key: string]: number }, answer) => ({
            ...occ,
            [answer]: (occ[answer] || 0) + 1
        }), {});
};
