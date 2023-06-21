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
    // NOTE: multiplying by 1.0 to force a float division
    return (total * 1.0) / arr.length;
};
