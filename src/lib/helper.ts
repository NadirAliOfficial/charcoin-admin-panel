import { format, parseISO } from "date-fns";

// Get ordinal suffix for a number (1st, 2nd, 3rd, etc.)
export const getOrdinalSuffix = (num: number) => {
  if ([11, 12, 13].includes(num % 100)) return "th";
  const suffixes = ["th", "st", "nd", "rd"];
  const mod10 = num % 10;
  return suffixes[mod10] || suffixes[0];
};


// Format number with an ordinal suffix
export const formatNumberWithOrdinal = (num: number) => {
  if (!num) return "";
  return `${num.toLocaleString()}${getOrdinalSuffix(num)}`;
};

// Format date using date-fns
export const formatDate = (date: Date | string) => {
  return format(typeof date === "string" ? parseISO(date) : date, "MMM d, yyyy");
};

// Convert RGBA to HEX
export function rgbaToHex(rgba: string): string {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!match) return "#000000"; // Default to black if invalid

  let [_, r, g, b, a] = match; // Extract values as strings
  r = parseInt(r).toString(16).padStart(2, "0");
  g = parseInt(g).toString(16).padStart(2, "0");
  b = parseInt(b).toString(16).padStart(2, "0");

  if (a !== undefined) {
    a = Math.round(parseFloat(a) * 255)
      .toString(16)
      .padStart(2, "0");
    return `#${r}${g}${b}${a}`.toUpperCase(); // RGBA with alpha
  }

  return `#${r}${g}${b}`.toUpperCase(); // RGB to HEX
}

export const formatDateRange = (startIso: string, endIso: string) => {
  if (!startIso || !endIso) {
    return "Invalid date"; // Handle missing dates
  }

  const startDate = parseISO(startIso);
  const endDate = parseISO(endIso);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return "Invalid date range"; // Handle parsing failure
  }

  if (startDate.getFullYear() === endDate.getFullYear()) {
    return `${format(startDate, "MMM d")} to ${format(endDate, "MMM d, yyyy")}`;
  }

  return `${format(startDate, "MMM d, yyyy")} to ${format(endDate, "MMM d, yyyy")}`;
};
