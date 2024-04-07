/** */
export const getFormattedDate = (dateString) => {
  const parts = dateString.split(".");
  if (parts.length === 3) {
    const [day, month, year] = parts.map(part => parseInt(part, 10));
    const date = new Date(year, month - 1, day); // Monate sind 0-basiert in JavaScript
    if (!isNaN(date)) {
      return date.toLocaleDateString("de-de", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  }
  console.error("Ungültiges Datum: ", dateString);
  return ""; // Oder eine passende Fehlerbehandlung / Standardwert
};
