import { currency, locale } from "utils";

export const formatCurrency = (
  amount: number = 0,
  formatOptions: Intl.NumberFormatOptions = { currency }
) =>
  new Intl.NumberFormat(locale, {
    currency,
    style: "currency",
    ...formatOptions,
  }).format(amount);

export const formatGenericCurrency = (
  amount: number = 0,
  formatOptions: Intl.NumberFormatOptions = {
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
) =>
  new Intl.NumberFormat(locale, { style: "decimal", ...formatOptions }).format(
    amount
  );
