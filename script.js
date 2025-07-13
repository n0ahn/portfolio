const text = document.getElementById('startup-text');
    let dots = 0;

    setInterval(() => {
        dots = (dots + 1) % 4;
        text.textContent = 'Starting' + '.'.repeat(dots);
    }, 500);

    setTimeout(() => {
        startup.classList.add("fade");
    }, 2500);
    setTimeout(() => {
        document.getElementById("startup").style.display = "none";
        document.getElementById("startup").innerHTML = "";
    }, 3500);
    

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

function startWebsite() {
  const login = document.getElementById("login");

  login.classList.add("slide-up");

  setTimeout(() => {
    login.style.display = "none";
  }, 3000);
}

function shutdown() {
    login.classList.add("fade");
    document.getElementById("shutdown").style.display = "flex";
    setTimeout(() => {
        document.getElementById("login").style.display = "none";
        document.getElementById("login").innerHTML = "";
        document.getElementById("main-content").style.display = "none";
        document.getElementById("main-content").innerHTML = "";
    }, 1000);

    const text = document.getElementById('shutdown-text');
    let dots = 0;

    setInterval(() => {
        dots = (dots + 1) % 4;
        text.textContent = 'Shutting down' + '.'.repeat(dots);
    }, 500);


    setTimeout(() => {
        window.open("https://rick.nerial.uk/video.mp4", "_self")
    }, 5000);

}