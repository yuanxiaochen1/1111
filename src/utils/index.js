function formatNumber(n) {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
}

export function formatTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const t1 = [year, month, day].map(formatNumber).join("-");
  const t2 = [hour, minute, second].map(formatNumber).join(":");

  return `${t1} ${t2}`;
}

export function formatCountTime(remainSeconds) {
  const minute = formatNumber(Math.floor(remainSeconds / 60));
  const second = formatNumber(remainSeconds % 60);

  return `${minute}:${second}`;
}

export function formatCountTimeHms(timestamp) {
  const hour = formatNumber(Math.floor(timestamp / 1000 / 60 / 60));
  const minute = formatNumber(Math.floor((timestamp - hour * 60 * 60 * 1000) / 1000 / 60));
  const second = formatNumber(parseInt((timestamp - hour * 60 * 60 * 1000 - minute * 60 * 1000) / 1000));

  return `${hour}:${minute}:${second}`;
}

export function formatYmd(date) {
  date = new Date(date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day].map(formatNumber).join("-");
}

export function getDateDiff(date) {
  var dateTimeStamp = new Date(date).getTime();
  var result;
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  // var halfamonth = day * 15
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    return;
  }
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  if (monthC >= 1) {
    if (monthC <= 12) {
      result = "" + parseInt(monthC) + "";
    } else {
      result = "" + parseInt(monthC / 12) + "年前";
    }
  } else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周前";
  } else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天前";
  } else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  } else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else {
    result = "刚刚";
  }
  return result;
}
