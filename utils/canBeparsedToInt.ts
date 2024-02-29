export default function canBeParsedToInt(input: string): [boolean, number] {
  // Attempt to parse the string to an integer
  const num = parseInt(input, 10);

  // Check if the parsed number is an integer and the input matches the parsed number when converted back to a string
  // This additional check with toString ensures that inputs like "123abc" are not falsely accepted
  return [!isNaN(num) && input === num.toString(), num];
}
