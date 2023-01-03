function formatDateTime(dateTime) {
  // YYYY-MM-DD HH:mm:SS
  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, '0');
  const date = String(dateTime.getDate()).padStart(2, '0');
  const hours = String(dateTime.getHours()).padStart(2, '0');
  const minutes = String(dateTime.getMinutes()).padStart(2, '0');
  const seconds = String(dateTime.getSeconds()).padStart(2, '0');
  return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
}

function displayCurrentLocalDateTime() {
  const currentLocalDateTime = new Date();
  const formattedDateTime = formatDateTime(currentLocalDateTime);
  const currentLocalDateTimeElement = document.getElementById('currentLocalDateTime');
  currentLocalDateTimeElement.innerHTML = formattedDateTime;
}

displayCurrentLocalDateTime();
//setTimeout(displayCurrentLocalDateTime, 1000);
setInterval(displayCurrentLocalDateTime, 1000);
