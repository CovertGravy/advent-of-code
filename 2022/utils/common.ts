export const sumReducer = (acc: number, value: number) => acc + value;
export const sortCompareFn = (a: number, b: number) => b - a;

export const getInputAsText = (fileName: string) => fetch(`../inputs/${fileName}.txt`).then(r => r.text()); 