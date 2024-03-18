export default function roundToTwoDecimalPlaces(num: number) {
  // * the unary "+" is to coerce the string to a number
  return +num.toFixed(2);
}
