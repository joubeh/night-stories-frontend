export default function numberFormat(
  number,
  decimals = 0,
  decimalPoint = ".",
  thousandsSeparator = ","
) {
  const fixedNumber = parseFloat(number).toFixed(decimals);
  const [integerPart, decimalPart] = fixedNumber.split(".");
  const formattedInteger = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandsSeparator
  );
  return decimalPart
    ? formattedInteger + decimalPoint + decimalPart
    : formattedInteger;
}
