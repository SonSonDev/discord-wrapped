const moment = require("moment/moment");

const fillHours = (hoursArray, message) => {
  if (!hoursArray.length) {
    hoursArray = (new Array(24)).fill(1).map((_, i) => ({
      hour: i,
      count: 0,
    }));
  }
  const hour = moment(message.timestamp).hour();

  let index = hoursArray.findIndex(c => c.hour === hour);
  hoursArray[index].count += 24 / 365;

  return hoursArray;
};

const fillDays = (daysArray, message) => {
  const day = moment(message.timestamp).isoWeekday();
  const dayName = moment(message.timestamp).format("ddd");

  let index = daysArray.findIndex(c => c.day === day);
  if (index === -1) {
    daysArray.push({
      day,
      name: dayName,
      count: 0,
    });
    index = daysArray.length - 1;
  }
  daysArray[index].count += 7 / 365;

  return daysArray;
};

const fillMonths = (monthArray, message) => {
  if (!monthArray.length) {
    monthArray = (new Array(12)).fill(1).map((_, i) => ({
      month: i,
      name: moment(i + 1, "M").format("MMM"),
      count: 0,
    }));
  }
  const month = moment(message.timestamp).month();

  let index = monthArray.findIndex(c => c.month === month);
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
