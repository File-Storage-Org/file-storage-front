const formatDate = (dateStr: string | Date): string | null => {
  const creating_date = new Date(new Date(dateStr).getTime() + 2 * 60 * 60 * 1000);

  const kyivFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Kyiv",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const nowInKyiv = new Date(kyivFormatter.format(new Date()));

  const timeDifference = nowInKyiv.getTime() - creating_date.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);

  if (daysDifference === 0) {
    if (hoursDifference === 0) {
      if (minutesDifference === 0) {
        return "just now";
      } else if (minutesDifference === 1) {
        return "1 minute ago";
      } else {
        return `${minutesDifference} minutes ago`;
      }
    } else if (hoursDifference === 1) {
      return "1 hour ago";
    } else {
      return `${hoursDifference} hours ago`;
    }
  } else if (daysDifference === 1) {
    return "yesterday";
  } else {
    return `${daysDifference} days ago`;
  }
};

export default formatDate;
