type KeySpec = { k: string; v: string };

type BuildLedHighlightsInput = {
  keySpecs?: ReadonlyArray<KeySpec>;
  pitch?: string;
  quickFeatures?: readonly string[];
  bestFor?: readonly string[];
  subtitle?: string;
  category?: string;
};

function getSpecValue(
  specs: ReadonlyArray<KeySpec> | undefined,
  patterns: RegExp[],
): string {
  const match = specs?.find((spec) => patterns.some((pattern) => pattern.test(spec.k)));
  return match?.v?.trim() ?? "";
}

function sanitizeSpecText(text: string): string {
  return text
    .replace(/\u00d7|\ufffd/g, " x ")
    .replace(/\u00b1|\ufffd/g, "+/-")
    .replace(/\u00b0|\ufffd/g, "deg")
    .replace(/m\u00b2|m\ufffd/g, "m2")
    .replace(/\u2265/g, ">=")
    .replace(/\u2264/g, "<=")
    .replace(/\u2019/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function sentenceCase(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function cleanHighlightText(text: string): string {
  const normalized = sanitizeSpecText(text)
    .replace(/^[\-\u2022\s]+/, "")
    .replace(/\s*[:|-]\s*$/, "")
    .replace(/\bvs\b/gi, "vs.")
    .replace(/\bgood for\b/gi, "Suitable for")
    .replace(/\bbest for\b/gi, "Ideal for")
    .replace(/\bbudget friendly\b/gi, "Budget-friendly")
    .replace(/\bevent friendly\b/gi, "Event-ready")
    .replace(/\beasy servicing\b/gi, "Service-friendly maintenance access")
    .replace(/\bstable performance\b/gi, "Stable operating performance")
    .replace(/\bweather resistant\b/gi, "Weather-resistant design for outdoor installation")
    .replace(/\bdaylight visibility planning\b/gi, "Daylight-visible output for outdoor signage")
    .replace(/\bdaylight visibility\b/gi, "Daylight-visible output")
    .replace(/\bsunlight visible\b/gi, "Sunlight-readable output")
    .replace(/\bhigh brightness\b/gi, "High-brightness output")
    .replace(/\bwide viewing angle\b/gi, "Wide viewing angle coverage")
    .replace(/\bsharp visuals\b/gi, "Sharp visual performance")
    .replace(/\bquick lock system\b/gi, "Quick-lock cabinet system")
    .replace(/\blightweight cabinet\b(?!\s+design)/gi, "Lightweight cabinet design")
    .replace(/\bcost effective for bigger area\b/gi, "Cost-efficient for larger display areas")
    .replace(/\bgreat for far viewing\b/gi, "Suitable for longer viewing distances")
    .replace(/\bgood for far viewing\b/gi, "Suitable for longer viewing distances")
    .replace(/\bgood for medium viewing distance\b/gi, "Suitable for medium viewing distance applications")
    .replace(/\bgood for close viewing content\b/gi, "Suitable for close-view content")
    .replace(/\s+/g, " ")
    .trim();

  return sentenceCase(normalized);
}

export function formatProductCardHighlights(
  highlights: readonly string[],
  fallback?: readonly string[],
): string[] {
  const source = highlights.length ? highlights : (fallback ?? []);
  const seen = new Set<string>();
  const refined: string[] = [];

  for (const item of source) {
    const cleaned = cleanHighlightText(item);
    if (!cleaned) continue;
    if (/^(pixel pitch|module size|resolution|brightness)\s*:?\s*$/i.test(cleaned)) continue;
    if (cleaned.length < 6) continue;

    const key = cleaned.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    refined.push(cleaned);

    if (refined.length === 4) break;
  }

  return refined;
}

function getViewingContext(category?: string, bestFor?: readonly string[]): string {
  if (bestFor?.[0]) return bestFor[0].toLowerCase();
  if (category === "indoor") return "close-view indoor applications";
  if (category === "outdoor") return "daylight-facing outdoor installations";
  if (category === "rental") return "rental and event applications";
  return "professional display applications";
}

function getBrightnessContext(category?: string): string {
  if (category === "indoor") return "controlled indoor viewing";
  if (category === "outdoor") return "daylight-visible outdoor operation";
  if (category === "rental") return "event and stage workflows";
  return "professional installation use";
}

export function buildLedProductCardHighlights({
  keySpecs,
  pitch,
  quickFeatures = [],
  bestFor = [],
  subtitle,
  category,
}: BuildLedHighlightsInput): string[] {
  const pixelPitch = sanitizeSpecText(getSpecValue(keySpecs, [/pixel pitch/i])) || sanitizeSpecText(pitch ?? "");
  const moduleSize =
    sanitizeSpecText(getSpecValue(keySpecs, [/^module size/i, /^module size \(/i])) ||
    sanitizeSpecText(getSpecValue(keySpecs, [/module size/i]));
  const resolution =
    sanitizeSpecText(getSpecValue(keySpecs, [/^module resolution/i, /^resolution$/i])) ||
    sanitizeSpecText(getSpecValue(keySpecs, [/module resolution/i]));
  const brightness = sanitizeSpecText(getSpecValue(keySpecs, [/^brightness$/i]));

  const generated: string[] = [];
  const viewingContext = getViewingContext(category, bestFor);
  const brightnessContext = getBrightnessContext(category);

  if (pixelPitch) generated.push(`Pixel pitch ${pixelPitch} for ${viewingContext}`);
  if (moduleSize) generated.push(`Module size ${moduleSize} for standard cabinet integration`);
  if (resolution) generated.push(`Module resolution ${resolution}`);
  if (brightness) generated.push(`Brightness ${brightness} for ${brightnessContext}`);

  const subtitleFallback = subtitle ? [subtitle] : [];
  const refinedQuickFeatures = formatProductCardHighlights(quickFeatures, subtitleFallback);
  return formatProductCardHighlights([...generated, ...refinedQuickFeatures]);
}
