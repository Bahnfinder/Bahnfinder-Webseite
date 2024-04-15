/** */
export const getFormattedDate = (date) =>
date
  ? new Date(date).toLocaleDateString("de-DE", {
      year: "numeric",
      month: "long", // Changed to "long" for the full month name.
      day: "2-digit", // Changed to "2-digit" for the day to include leading zeros.
    })
  : "";