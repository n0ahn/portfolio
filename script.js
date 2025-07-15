const startupElement = document.getElementById("startup");

if (startupElement && startupElement.style.display !== "none") {
    const text = document.getElementById('startup-text');
    let dots = 0;

    setInterval(() => {
        dots = (dots + 1) % 4;
        text.textContent = 'Starting' + '.'.repeat(dots);
    }, 500);

    setTimeout(() => {
        startupElement.classList.add("fade");
    }, 2000);
    setTimeout(() => {
        document.getElementById("startup").style.display = "none";
        document.getElementById("startup").innerHTML = "";
    }, 2500);
}

(function () {
    var clockElement = document.getElementById("clock");
    var dateElement = document.getElementById("date");

    function updateClockandDate(clock, date) {
        clock.innerHTML = new Date().toLocaleTimeString();
        date.innerHTML = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
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
    login.classList.add("slide-down");
    document.getElementById("start-menu").style.display;
}

function shutdown() {
    const login = document.getElementById("login");
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
        window.open("https://rick.nerial.uk/video.mp4", "_self");
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

let activeAppId = null;

function openApp(appId) {
    const container = document.getElementById("app-window-container");
    const app = document.getElementById(appId);

    activeAppId = appId;

    container.style.display = "flex";
    setTimeout(() => {
        container.classList.add("visible");
        app.classList.add("active");
    }, 10);
}

function closeApp(appId) {
    const container = document.getElementById("app-window-container");
    const app = document.getElementById(appId);

    if (activeAppId === appId) activeAppId = null;

    container.classList.remove("visible");
    app.classList.remove("active");

    setTimeout(() => {
        container.style.display = "none";
    }, 300);
}

function toggleFullscreen(appId) {
    const app = document.getElementById(appId);
    app.classList.toggle('fullscreen');

    const icon = app.querySelector('.fullscreen-button i');
    if (app.classList.contains('fullscreen')) {
        icon.classList.remove('fa-expand');
        icon.classList.add('fa-compress');
    } else {
        icon.classList.remove('fa-compress');
        icon.classList.add('fa-expand');
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && activeAppId) {
        const app = document.getElementById(activeAppId);
        if (!app) return;

        const isFullscreen = app.classList.contains('fullscreen');
        const container = document.getElementById("app-window-container");

        if (isFullscreen) {
            toggleFullscreen(activeAppId);
        } else if (container.style.display !== 'none' && container.style.display !== '') {
            closeApp(activeAppId);
        }
    }
});

function openContent(section) {
    const content = document.getElementById('settings-content');

    let html = '';

    switch (section) {
        case 'General':
            html = `
                <div class="settings-top-bar">
                    <button onclick="closeContent()" class="back-button"><i class="fa-solid fa-arrow-left"></i></button>
                    <h2 class="content-title"><i class="fa-solid fa-gear"></i> &nbsp; General Settings</h2>
                </div>
                <p class="settings-content-text">Content</p>
            `;
            content.innerHTML = html;
            document.getElementById("settings-content").classList.add("active");
            document.getElementById("settings-sidebar").classList.add("hidden");
            break;
        case 'Display':
            html = `
                <div class="settings-top-bar">
                    <button onclick="closeContent()" class="back-button"><i class="fa-solid fa-arrow-left"></i></button>
                    <h2 class="content-title"><i class="fa-solid fa-display"></i> &nbsp; Display Settings</h2>
                </div>
                <div class="input-field">
                    <label class="switch">
                        <input type="checkbox" id="funmode">
                        <span class="slider"></span>
                    </label>
                    <span class="settings-content-text">Fun Mode</span>
                </div>
                <p class="settings-content-text">Brightness:</p>
                <div class="input-field">
                    <input class="settings-content-input" type="range" id="brightness" name="brightness" min="10" max="100" value="100">
                    <span class="settings-content-text" id="brightness-value">100</span>
                </div>
                <p class="settings-content-text">Contrast:</p>
                <div class="input-field">
                    <input class="settings-content-input" type="range" id="contrast" name="contrast" min="10" max="100" value="50">
                    <span class="settings-content-text" id="contrast-value">50</span>
                </div>
           `;
            content.innerHTML = html;

            document.getElementById("settings-content").classList.add("active");
            document.getElementById("settings-sidebar").classList.add("hidden");

            const funmode = document.getElementById('funmode');
            const brightness = document.getElementById('brightness');
            const brightnessValue = document.getElementById('brightness-value');
            const contrast = document.getElementById('contrast');
            const contrastValue = document.getElementById('contrast-value');
            const desktop = document.getElementById('desktop');

            function updateFilters() {
                const brightnessVal = brightness.value / 100;
                const contrastVal = contrast.value / 50;
                desktop.style.filter = `brightness(${brightnessVal}) contrast(${contrastVal})`;
            }

            brightness.addEventListener('input', () => {
                brightnessValue.textContent = brightness.value;
                updateFilters();
            });

            contrast.addEventListener('input', () => {
                contrastValue.textContent = contrast.value;
                updateFilters();
            });

            funmode.addEventListener('change', () => {
                if (funmode.checked) {
                    brightness.max = 500;
                    contrast.max = 250;

                    brightness.value = 100;
                    contrast.value = 50;
                } else {
                    brightness.max = 100;
                    contrast.max = 100;

                    if (brightness.value > 99) brightness.value = 100;
                    if (contrast.value > 49) contrast.value = 50;
                }
                brightnessValue.textContent = brightness.value;
                contrastValue.textContent = contrast.value;
                updateFilters();
            });
            break;
        case 'Battery':
            html = `
                <div class="settings-top-bar">
                    <button onclick="closeContent()" class="back-button"><i class="fa-solid fa-arrow-left"></i></button>
                    <h2 class="content-title"><i class="fa-solid fa-battery-three-quarters"></i> &nbsp; Battery Settings</h2>
                </div>
                 <p class="settings-content-text">Content</p>
            `;
            content.innerHTML = html;
            document.getElementById("settings-content").classList.add("active");
            document.getElementById("settings-sidebar").classList.add("hidden");
            break;
        case 'Network':
            html = `
                <div class="settings-top-bar">
                    <button onclick="closeContent()" class="back-button"><i class="fa-solid fa-arrow-left"></i></button>
                    <h2 class="content-title"><i class="fa-solid fa-globe"></i> &nbsp; Network Settings</h2>
                </div>
                <p class="settings-content-text">Content</p>
            `;
            content.innerHTML = html;
            document.getElementById("settings-content").classList.add("active");
            document.getElementById("settings-sidebar").classList.add("hidden");
            break;
        case 'Updates':
            html = `
                <div class="settings-top-bar">
                    <button onclick="closeContent()" class="back-button"><i class="fa-solid fa-arrow-left"></i></button>
                    <h2 class="content-title"><i class="fa-solid fa-download"></i> &nbsp; Updates</h2>
                </div>
                <p class="settings-content-text">Content</p>
            `;
            content.innerHTML = html;
            document.getElementById("settings-content").classList.add("active");
            document.getElementById("settings-sidebar").classList.add("hidden");
            break;
        case 'About':
            html = `
                <div class="settings-top-bar">
                    <button onclick="closeContent()" class="back-button"><i class="fa-solid fa-arrow-left"></i></button>
                    <h2 class="content-title"><i class="fa-solid fa-circle-info"></i> &nbsp; About this website</h2>
                </div>
                <p class="settings-content-text">Content</p>
            `;
            content.innerHTML = html;
            document.getElementById("settings-content").classList.add("active");
            document.getElementById("settings-sidebar").classList.add("hidden");
            break;
    }
}

function closeContent() {
    document.getElementById("settings-content").classList.remove("active");
    document.getElementById("settings-sidebar").classList.remove("hidden");
}
