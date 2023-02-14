const getEventTime = (start: string, end: string) => {
  const startDate = {
    date: new Date(Number(start)),
    dayOfMonth() {
      return this.date.getDate();
    },
    month() {
      return this.date.getMonth();
    },
    year() {
      return this.date.getFullYear();
    },
    time() {
      return this.date.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    },
  };
  const endDate = {
    date: new Date(Number(end)),
    dayOfMonth() {
      return this.date.getDate();
    },
    month() {
      return this.date.getMonth();
    },
    year() {
      return this.date.getFullYear();
    },
    time() {
      return this.date.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    },
  };

  return `${startDate.dayOfMonth()} ${
    MONTHS[startDate.month()]
  } ${startDate.time()} - ${endDate.time()}`;
};

const getTimestamp = (date: string) => new Date(date).getTime();

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export { getEventTime, getTimestamp };
