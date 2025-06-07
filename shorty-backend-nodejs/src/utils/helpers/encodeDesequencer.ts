import { CHAR_SEQUENCE } from "./numberSequencer";

const BASE = CHAR_SEQUENCE.length;

export const numberDesequencer = (str: string): number => {
  let num = 0;

  for (let i = 0; i < str.length; i++) {
    const index = CHAR_SEQUENCE.indexOf(str[i]);
    if (index === -1) throw new Error(`Invalid character '${str[i]}'`);
    num = num * BASE + index;
  }

  return num;
};
