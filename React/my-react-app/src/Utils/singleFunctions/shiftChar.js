export function shiftChar(offset) {
  return function(char) {
      char = String.fromCharCode(char.charCodeAt(0) + offset);
      return char;
  }
}