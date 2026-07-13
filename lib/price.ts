const TAKA_SYMBOL = "\u09F3";

function addTakaPrefix(value: string): string {
  if (!value) return value;
  if (value.startsWith(TAKA_SYMBOL) || value.startsWith("≈")) return value;
  return `${TAKA_SYMBOL}${value}`;
}

export function formatBdtRange([min, max]: readonly [number, number]): string {
  return `${TAKA_SYMBOL}${min.toLocaleString("en-BD")} - ${TAKA_SYMBOL}${max.toLocaleString("en-BD")}`;
}

export function looksLikePriceText(text: string): boolean {
  const normalized = text.trim();
  if (!normalized) return false;

  return /^(price:\s*)?(?:[?৳≈]|\d|tk\b|bdt\b|on request|project-based)/i.test(normalized);
}

export function normalizeDisplayedPriceText(text: string): string {
  const normalized = text.trim();
  if (!normalized) return normalized;

  const match = normalized.match(/^(Price:\s*)(.+)$/i);
  const prefix = match?.[1] ?? "";
  let value = match?.[2]?.trim() ?? normalized;

  value = value
    .replace(/[–—]/g, "-")
    .replace(/â€“|â€”/g, "-")
    .replace(/\?/g, TAKA_SYMBOL)
    .replace(/≈\s*Tk\b\.?\s*/gi, `≈ ${TAKA_SYMBOL}`)
    .replace(/\bTk\b\.?\s*/gi, `${TAKA_SYMBOL}`)
    .replace(/\s*BDT\b/gi, "");

  value = value
    .replace(
      new RegExp(`${TAKA_SYMBOL}\\s*(\\d[\\d,]*(?:\\.\\d+)?)\\s*[-–—]\\s*(\\d[\\d,]*(?:\\.\\d+)?)`, "g"),
      `${TAKA_SYMBOL}$1 - ${TAKA_SYMBOL}$2`
    )
    .replace(/(\d[\d,]*(?:\.\d+)?)\s*[-–—]\s*(\d[\d,]*(?:\.\d+)?)/g, (_, min: string, max: string) => {
      return `${TAKA_SYMBOL}${min} - ${TAKA_SYMBOL}${max}`;
    })
    .replace(/^≈\s*(\d[\d,]*(?:\.\d+)?)/, (_, amount: string) => `≈ ${TAKA_SYMBOL}${amount}`)
    .replace(/^(\d[\d,]*(?:\.\d+)?)(?=\s|$|\()/, (_, amount: string) => addTakaPrefix(amount));

  value = value
    .replace(new RegExp(`${TAKA_SYMBOL}\\s+`, "g"), `${TAKA_SYMBOL}`)
    .replace(/\s{2,}/g, " ")
    .trim();

  return prefix ? `${prefix}${value}` : value;
}
