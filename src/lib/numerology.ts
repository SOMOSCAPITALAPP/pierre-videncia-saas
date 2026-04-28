export function calculateLifePathNumber(date: string) {
  const digits = date.replace(/\D/g, "");

  if (digits.length < 8) {
    return 0;
  }

  let total = digits.split("").reduce((sum, digit) => sum + Number(digit), 0);

  while (total > 9 && total !== 11 && total !== 22) {
    total = String(total)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }

  return total;
}
