import { evaluate } from "mathjs";

export const mathCal = async ({ exp }) => {
  const result = evaluate(exp);
  return String(result);
};
