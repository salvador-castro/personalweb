export function formatDate(date: string, includeRelative = false) {
  const currentDate = new Date();

  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }

  const targetDate = new Date(date);
  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `hace ${yearsAgo} a`;
  } else if (monthsAgo > 0) {
    formattedDate = `hace ${monthsAgo} m`;
  } else if (daysAgo > 0) {
    formattedDate = `hace ${daysAgo} d`;
  } else {
    formattedDate = "Hoy";
  }

  const fullDate = targetDate.toLocaleString("es-AR", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
