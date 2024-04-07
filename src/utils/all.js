export const getFormattedDate = (dateString) => {
  if (!dateString) return "";

  // Split the date string to access day, month, and year individually
  const parts = dateString.split(".");
  // Adjust the format to "mm/dd/yyyy" which is reliably parsed by the Date constructor across environments
  const formattedDateString = `${parts[1]}/${parts[0]}/${parts[2]}`;

  // Now, create a Date object
  const date = new Date(formattedDateString);

  // Return the formatted date string
  return date.toLocaleDateString("de-de", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
