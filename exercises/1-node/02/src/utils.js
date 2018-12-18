const reverseIterative = (input) => {
  let output = '';
  for(let i= input.length; i>=0; i--) {
    output = output + input.charAt(i);
  }
  return output;
}

const reverseRecursive = (input) =>
  input.length === 1 ? input : input.charAt(input.length - 1) + reverseRecursive(input.slice(0, -1));

exports.reverseString = (input) => reverseRecursive(input);
