export function normalizeMerchant(name: string) {
  const merchant = name.toUpperCase();

  if (merchant.includes("SWIGGY")) return "SWIGGY";
  if (merchant.includes("ZOMATO")) return "ZOMATO";
  if (merchant.includes("BIGBASKET")) return "BIGBASKET";
  if (merchant.includes("APOLLO")) return "APOLLO PHARMACY";
  if (merchant.includes("INDIGO")) return "INDIGO";
  if (merchant.includes("AIR INDIA")) return "AIR INDIA";

  return merchant;
}