// Util function, adds 0 if the number in time rendered is single digit
export const addZero = (num: number) => (num < 10 ? `0${num}` : `${num}`);

export const changeTimeFormat = (time: string): string => {
  return `${new Date(time).getHours()}:${new Date(
    time
  ).getMinutes()}:${new Date(time).getSeconds()}`;
};
