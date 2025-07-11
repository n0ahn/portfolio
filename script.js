(function () {

  var clockElement = document.getElementById("clock");
  var dateElement = document.getElementById("date");

  function updateClockandDate (clock, date) {
    clock.innerHTML = new Date().toLocaleTimeString();
    date.innerHTML = new Date().toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric'});
  }

  setInterval(function () {
      updateClockandDate(clockElement, dateElement);
  }, 1000);

  updateClockandDate(clockElement, dateElement);
}());