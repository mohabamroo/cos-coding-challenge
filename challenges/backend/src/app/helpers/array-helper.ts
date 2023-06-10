/**
 * Compute the average of an array of objects by a key
 * @param arr
 * @param key
 * @returns the average of the array of objects by the key
 */
export const calculateAverageByKey = (
    arr: { [k: string]: any | number }[],
    key: string
): number => {
    if (!arr?.length) return 0;
    const total = arr
        .filter((x) => x[key])
        .reduce((acc, x) => {
            return acc + <number>x[key];
        }, 0);
    return (total * 1.0) / arr.length;
};

/**
 * Compute the average of an array of numbers
 * @param arr
 * @returns the average of the array of numbers
 * @throws if the array is empty
 * @throws if the array contains non-numbers
 * @throws if the array is undefined
 */
export const calculateAverage = (arr: number[]): number => {
    if (!arr?.length) return 0;
    const total = arr.reduce((acc, x) => {
        return acc + x;
    }, 0);

    return (total * 1.0) / arr.length;
};
