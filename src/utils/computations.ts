export const incrementNumberString = (value: string) => {
    return JSON.stringify(Number(value) + 1);
};

export const decrementNumberString = (value: string) => {
    return JSON.stringify(Number(value) - 1);
};

export const isBetween = (num: number, min: number, max: number) => {
    return num >= min && num <= max;
};