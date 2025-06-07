export const CHAR_SEQUENCE = "S0aMNbcRLdTKefJgIhi8QjklO9E61mUF7DnPo24GZp5qHrVsAt3YuCWvBwxXyz";

export const numberSequencer = (num: number): string => {
  let encoding = "";
  const base = CHAR_SEQUENCE.length;

  while (num > 0) {
    const index = num % base;
    encoding = CHAR_SEQUENCE[index] + encoding;
    num = Math.floor(num / base);
  }

  return encoding.padStart(6, CHAR_SEQUENCE[0]);
};

