const text = document.getElementById('startup-text');
    let dots = 0;

    setInterval(() => {
        dots = (dots + 1) % 4;
        text.textContent = 'Starting' + '.'.repeat(dots);
    }, 500);

    setTimeout(() => {
        startup.classList.add("fade");
    }, 2000);
    setTimeout(() => {
        document.getElementById("startup").style.display = "none";
        document.getElementById("startup").innerHTML = "";
    }, 2500);
    

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
    login.classList.remove("slide-down");
    login.classList.remove("fade");
    login.classList.add("slide-up");

    setTimeout(() => {
        document.getElementById("shutdown-window").style.display = "none";
    }, 3000);
}


function logout() {
    const login = document.getElementById("login");
    const start = document.getElementById('start-menu');
    document.getElementById("toggleCheckbox").checked = false;
    start.classList.remove('active');
    closeLogoutWindow();
    login.style.display = "flex";
    login.classList.remove("slide-up", "fade");
    login.classList.add("slide-down")
    document.getElementById("start-menu").style.display
}

function shutdown() {
    login.classList.add("fade");
    document.getElementById("shutdown-window").classList.add("out");
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
    }, 3000);

}

function restart() {
    location.reload();
}

function openShutdownWindow() {
    document.getElementById("shutdown-window").classList.remove("out"); 
    document.getElementById("shutdown-window").style.display = "flex";
}
function closeShutdownWindow() {
    document.getElementById("shutdown-window").classList.add("out");
    setTimeout(() => {
        document.getElementById("shutdown-window").style.display = "none";
    }, 300);
}
function openRestartWindow() {
    document.getElementById("restart-window").classList.remove("out"); 
    document.getElementById("restart-window").style.display = "flex";
}
function closeRestartWindow() {
    document.getElementById("restart-window").classList.add("out");
    setTimeout(() => {
        document.getElementById("restart-window").style.display = "none";
    }, 300);
}
function openLogoutWindow() {
    document.getElementById("logout-window").classList.remove("out"); 
    document.getElementById("logout-window").style.display = "flex";
}
function closeLogoutWindow() {
    document.getElementById("logout-window").classList.add("out");
    setTimeout(() => {
        document.getElementById("logout-window").style.display = "none";
    }, 300);
}

function toggleStart() {
    const checkbox = document.getElementById('toggleCheckbox');
    const start = document.getElementById('start-menu');

    if (checkbox.checked) {
        setTimeout(() => {
            start.classList.add('active');
        }, 1);
    } 
    else if (!checkbox.checked) {
        start.classList.remove('active');
    }
  }
