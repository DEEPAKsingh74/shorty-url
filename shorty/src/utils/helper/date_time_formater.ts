export const dateTimeFormatter = (dateTime: string): string => {
    const date = new Date(dateTime);
  
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short", // Use "long" for full month name
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
  
    return date.toLocaleString("en-US", options);
  };
  