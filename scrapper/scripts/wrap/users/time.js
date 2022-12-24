const moment = require("moment/moment");

const fillHours = (hoursArray, message) => {
  const hour = moment(message.timestamp).hour();

  let index = hoursArray.findIndex(c => c.hour === hour);
  if (index === -1) {
    hoursArray.push({
      hour,
      count: 0,
    });
    index = hoursArray.length - 1;
  }
  hoursArray[index].count += 1;

  return hoursArray;
};

const fillDays = (daysArray, message) => {
  const day = moment(message.timestamp).isoWeekday();
  const dayName = moment(message.timestamp).format("dddd");

  let index = daysArray.findIndex(c => c.day === day);
  if (index === -1) {
    daysArray.push({
      day,
      name: dayName,
      count: 0,
    });
    index = daysArray.length - 1;
  }
  daysArray[index].count += 1;

  return daysArray;
};

const fillMonths = (monthArray, message) => {
  const month = moment(message.timestamp).month();
  const monthName = moment(message.timestamp).format("MMMM");

  let index = monthArray.findIndex(c => c.month === month);
  if (index === -1) {
    monthArray.push({
      month,
      name: monthName,
      count: 0,
    });
    index = monthArray.length - 1;
  }
  monthArray[index].count += 1;

  return monthArray;
};

const fillDates = (datesArray, message) => {
  const date = moment(message.timestamp).startOf("day").unix();
  const formatted = moment(message.timestamp).startOf("day").format("DD/MM");

  let index = datesArray.findIndex(c => c.date === date);
  if (index === -1) {
    datesArray.push({
      date, formatted,
      count: 0,
    });
    index = datesArray.length - 1;
  }
  datesArray[index].count += 1;

  return datesArray;
};

module.exports = { fillDays, fillHours, fillMonths, fillDates };
