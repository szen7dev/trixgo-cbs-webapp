export default function romanize(num: number): string | number {
  if (isNaN(num)) return NaN;

  const digits = String(+num).split("");
  if (!digits.length) return NaN;
  const key = [
    "",
    "C",
    "CC",
    "CCC",
    "CD",
    "D",
    "DC",
    "DCC",
    "DCCC",
    "CM",
    "",
    "X",
    "XX",
    "XXX",
    "XL",
    "L",
    "LX",
    "LXX",
    "LXXX",
    "XC",
    "",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
  ];
  let roman = "",
    i = 3;
  while (i--) roman = (key[+(digits.pop() || 0) + i * 10] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}
