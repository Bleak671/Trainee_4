export function getHash(str) {
  var hash = 0, i, chr;
  for (i = 0; i < str.length; i++) {
    chr   = str[i];
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return String(hash);
}