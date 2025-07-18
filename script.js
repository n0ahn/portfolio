let savedBrightness = 100;
let savedContrast = 50;
let savedSaturation = 100;
let savedFunmode = false;
let savedAirplanemode = false;
let savedBatterylevel = 67;

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

    if (appId !== 'settings-app') {
        const appContent = app.querySelector(".app-window-content");

        if (!appContent.dataset.originalContent) {
            appContent.dataset.originalContent = appContent.innerHTML;
        }

        if (savedAirplanemode) {
            appContent.innerHTML = '<p class="app-content-text" id="no-connection">No Internet Connection</p>';
        } else {
            appContent.innerHTML = appContent.dataset.originalContent;
        }
    }
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
    const button = document.querySelector('.close-button');
    const settingscontent = document.getElementById('settings-content');
    app.classList.toggle('fullscreen');
    button.classList.toggle('fullscreen');
    settingscontent.classList.toggle('fullscreen');
    

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
                <p class="app-content-text">Content</p>
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
                <div class="input-field" id="funmode-switch">
                    <label class="switch">
                        <input type="checkbox" id="funmode">
                        <span class="slider"></span>
                    </label>
                    <span class="app-content-text">Fun Mode</span>
                </div>
                <p class="app-content-text">Brightness:</p>
                <div class="input-field">
                    <input class="settings-content-range" type="range" id="brightness" name="brightness" min="10" max="100">
                    <span class="app-content-text" id="brightness-value"></span>
                </div>
                <p class="app-content-text">Contrast:</p>
                <div class="input-field">
                    <input class="settings-content-range" type="range" id="contrast" name="contrast" min="10" max="100">
                    <span class="app-content-text" id="contrast-value"></span>
                </div>
                <p class="app-content-text">Saturation:</p>
                <div class="input-field">
                    <input class="settings-content-range" type="range" id="saturation" name="saturation" min="0" max="100">
                    <span class="app-content-text" id="saturation-value"></span>
                </div>
                <button onclick="resetToDefaultDisplay()" class="reset-button">Reset to default settings</button>
           `;
            content.innerHTML = html;

            document.getElementById("settings-content").classList.add("active");
            document.getElementById("settings-sidebar").classList.add("hidden");

            const funmode = document.getElementById('funmode');
            const brightness = document.getElementById('brightness');
            const brightnessValue = document.getElementById('brightness-value');
            const contrast = document.getElementById('contrast');
            const contrastValue = document.getElementById('contrast-value');
            const saturation = document.getElementById('saturation');
            const saturationValue = document.getElementById('saturation-value');
            const desktop = document.getElementById('desktop');

            if (savedFunmode) {
                brightness.max = 500;
                contrast.max = 250;
            } else {
                brightness.max = 100;
                contrast.max = 100;
            }

            brightness.value = savedBrightness;
            contrast.value = savedContrast;
            saturation.value = savedSaturation;
            funmode.checked = savedFunmode;

            brightnessValue.textContent = brightness.value;
            contrastValue.textContent = contrast.value;
            saturationValue.textContent = saturation.value;

            function updateFilters() {
                const brightnessVal = Number(brightness.value) / 100;
                const contrastVal = Number(contrast.value) / 50;
                const saturationVal = 100 - Number(saturation.value);
                desktop.style.filter = `brightness(${brightnessVal}) contrast(${contrastVal}) grayscale(${saturationVal}%)`;
                console.log('Updated filters:', {
                    brightnessVal,
                    contrastVal,
                    saturationVal,
                    filterString: desktop.style.filter
                });
            }

            brightness.addEventListener('input', () => {
                savedBrightness = Number(brightness.value);
                brightnessValue.textContent = brightness.value;
                updateFilters();
            });

            contrast.addEventListener('input', () => {
                savedContrast = Number(contrast.value);
                contrastValue.textContent = contrast.value;
                updateFilters();
            });

            saturation.addEventListener('input', () => {
                savedSaturation = Number(saturation.value);
                saturationValue.textContent = saturation.value;
                updateFilters();
            });

            funmode.addEventListener('change', () => {
                savedFunmode = funmode.checked;
                if (savedFunmode) {
                    brightness.max = 500;
                    contrast.max = 250;
                } else {
                    brightness.max = 100;
                    contrast.max = 100;

                    if (Number(brightness.value) > 99) brightness.value = 100;
                    if (Number(contrast.value) > 99) contrast.value = 50;
                }
                brightnessValue.textContent = brightness.value;
                contrastValue.textContent = contrast.value;
                updateFilters();
            });

            updateFilters();

            break;
        case 'Battery':
            html = `
                <div class="settings-top-bar">
                    <button onclick="closeContent()" class="back-button"><i class="fa-solid fa-arrow-left"></i></button>
                    <h2 class="content-title"><i class="fa-solid fa-battery-three-quarters"></i> &nbsp; Battery Settings</h2>
                </div>
                <p class="app-content-text" id="battery-level-text">Battery level:</p>
                <div class="input-field" id="battery-input">
                    <input class="settings-content-number" type="number" id="battery-level" name="brightness" min="1" max="100">
                    <p class="app-content-text" id="battery-percentage">%</p>
                </div>
                <button onclick="resetToDefaultBattery()" class="reset-button">Reset to default settings</button>
            `;
            content.innerHTML = html;
            document.getElementById("settings-content").classList.add("active");
            document.getElementById("settings-sidebar").classList.add("hidden");
            

            const batteryLevel = document.getElementById("battery-level");
            const batteryText = document.getElementById("battery");
            const batteryIcon = document.getElementById("battery-icon");
            level = savedBatterylevel;
            batteryLevel.value = level;
            batteryLevel.addEventListener('input', () => {
                let level = Number(batteryLevel.value);
                if (level < 0) {
                    level = 0
                } else if (level > 100) {
                    level = 100
                }

                batteryLevel.value = level
                batteryText.innerHTML = `${level}%`;

                savedBatterylevel = level

                batteryIcon.classList.remove(
                    "fa-battery-empty",
                    "fa-battery-quarter",
                    "fa-battery-half",
                    "fa-battery-three-quarters",
                    "fa-battery-full"
                );

                if (level < 2) {
                    batteryIcon.classList.add("fa-battery-empty");
                } else if (level < 30) {
                    batteryIcon.classList.add("fa-battery-quarter");
                } else if (level < 60) {
                    batteryIcon.classList.add("fa-battery-half");
                } else if (level < 90) {
                    batteryIcon.classList.add("fa-battery-three-quarters");
                } else {
                    batteryIcon.classList.add("fa-battery-full");
                }
            });

            break;
        case 'Network':
            html = `
                <div class="settings-top-bar">
                    <button onclick="closeContent()" class="back-button"><i class="fa-solid fa-arrow-left"></i></button>
                    <h2 class="content-title"><i class="fa-solid fa-globe"></i> &nbsp; Network Settings</h2>
                </div>
                <p class="app-content-text">Airplane mode:</p>
                <label class="switch" id="airplane-mode-switch">
                    <input type="checkbox" id="airplane-mode">
                    <span class="slider"></span>
                </label>
                <p class="app-content-text">Network Type:</p>
                <select id="network-select">
                    <option value="wifi">Wifi</option>
                    <option value="ethernet">Ethernet</option>
                </select>
                <p class="app-content-text">Public IP:</p>
                <span class="app-content-text" id="user-ip">X.X.X.X</span>

                <button onclick="resetToDefaultNetwork()" class="reset-button">Reset to default settings</button>
            `;
            content.innerHTML = html;
            document.getElementById("settings-content").classList.add("active");
            document.getElementById("settings-sidebar").classList.add("hidden");
            
            const airplaneModeToggle = document.getElementById("airplane-mode");
            const internetIcon = document.getElementById("wifi-icon");
            const networkSelect = document.getElementById("network-select");
            airplaneModeToggle.checked = savedAirplanemode;
            let selectedNetwork = networkSelect.value;

            airplaneModeToggle.addEventListener('input', () => {
                savedAirplanemode = airplaneModeToggle.checked;

                if (savedAirplanemode) {
                    internetIcon.classList.remove("fa-wifi", "fa-ethernet");
                    internetIcon.classList.add("fa-plane-up");
                } else {
                    updateNetworkIcon(selectedNetwork);
                }
            });

            networkSelect.addEventListener('change', (event) => {
                selectedNetwork = event.target.value;

                if (!savedAirplanemode) {
                    updateNetworkIcon(selectedNetwork);
                }
            });

            function updateNetworkIcon(networkType) {
                internetIcon.classList.remove("fa-wifi", "fa-ethernet", "fa-plane-up");

                if (networkType === "wifi") {
                    internetIcon.classList.add("fa-wifi");
                } else if (networkType === "ethernet") {
                    internetIcon.classList.add("fa-ethernet");
                }
            }

            async function setUserPublicIP() {
                try {
                    const response = await fetch('https://api.ipify.org?format=json');
                    if (!response.ok) throw new Error('Netwerkfout bij IP ophalen');
                    const data = await response.json();
                    const userIpElement = document.getElementById('user-ip');
                    if (userIpElement) {
                        userIpElement.textContent = data.ip;
                    }
                } catch (error) {
                    console.error('Fout bij ophalen van publiek IP:', error);
                }
            }
            setUserPublicIP()
            break;
        case 'Updates':
            html = `
                <div class="settings-top-bar">
                    <button onclick="closeContent()" class="back-button"><i class="fa-solid fa-arrow-left"></i></button>
                    <h2 class="content-title"><i class="fa-solid fa-download"></i> &nbsp; Updates</h2>
                </div>
                <div id="update-info">
                    <p class="app-content-text" style="margin: 0;"><b>Version:</b> NoahOS <span id="os-version">–</span></p>
                    <p class="app-content-text" style="margin: 0;"><b>Type:</b> <span id="os-type">–</span></p>
                    <p class="app-content-text" style="margin: 0;"><b>Changes:</b> <span id="os-notes">–</span></p>
                </div>
                <div id="commit-info">
                    <p class="app-content-text" style="margin: 0;"><b style="font-weight: 1000;">Latest commit:</b></p>
                    <p class="app-content-text" style="margin: 0; margin-left: 20px;"><strong>Message:</strong> <span id="commit-message">–</span></p>
                    <p class="app-content-text" style="margin: 0; margin-left: 20px;"><strong>Date:</strong> <span id="commit-date">–</span></p>
                </div>

                <button style="height: 4vh;" onclick="checkForUpdates()" class="reset-button" id="checkupdates-button">Check for Updates</button>
                <p style="margin-left: 30px;" class="app-content-text">Last checked: <span id="last-checked">Never</span></p>
            `;
            content.innerHTML = html;
            document.getElementById("settings-content").classList.add("active");
            document.getElementById("settings-sidebar").classList.add("hidden");

            checkForUpdates();
            break;


        case 'About':
            checkForUpdates();
            html = `
                <div class="settings-top-bar">
                    <button onclick="closeContent()" class="back-button"><i class="fa-solid fa-arrow-left"></i></button>
                    <h2 class="content-title"><i class="fa-solid fa-circle-info"></i> &nbsp; About this website</h2>
                </div>
                <div class="info-grid">
                    <div class="infolabel app-content-text">Website Name:</div>
                    <div class="infovalue app-content-text">NoahOS Portfolio</div>

                    <div class="infolabel app-content-text">Version:</div>
                    <div class="infovalue app-content-text"><span id="os-version">-</span> (<span id="os-type">-</span>)</div>

                    <div class="infolabel app-content-text">Purpose:</div>
                    <div class="infovalue app-content-text">This website is a professional portfolio designed to showcase my skills and projects through a custom OS-inspired interface.</div>

                    <div class="infolabel app-content-text">Technologies:</div>
                    <div class="infovalue app-content-text">Built using HTML5, CSS3, and modern JavaScript. Utilizes Font Awesome for icons and Google Fonts for typography. Hosted on Vercel.</div>

                    <div class="infolabel app-content-text">Design:</div>
                    <div class="infovalue app-content-text">Responsive layout, optimized for multiple device types, accessible design, taskbar, and window system.</div>

                    <div class="infolabel app-content-text">Credits:</div>
                    <div class="infovalue app-content-text">© 2025 Noah Niemeijer. All rights reserved. Third-party assets used under appropriate licenses.</div>

                    <div class="infolabel app-content-text">Contact:</div>
                    <div class="infovalue app-content-text">Please refer to the Personal Info application for contact details.</div>
                </div>
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

function resetToDefaultDisplay() {
    const brightness = document.getElementById('brightness');
    const contrast = document.getElementById('contrast');
    const saturation = document.getElementById('saturation');
    const brightnessValue = document.getElementById('brightness-value');
    const contrastValue = document.getElementById('contrast-value');
    const saturationValue = document.getElementById('saturation-value');
    const desktop = document.getElementById('desktop');

    brightness.value = 100;
    contrast.value = 50;
    saturation.value = 100;

    brightnessValue.textContent = "100";
    contrastValue.textContent = "50";
    saturationValue.textContent = "100";

    savedBrightness = 100;
    savedContrast = 50;
    savedSaturation = 100;

    desktop.style.filter = `brightness(1) contrast(1) grayscale(0)`;
}

function resetToDefaultBattery() {
    const batteryLevel = document.getElementById("battery-level");
    const batteryIcon = document.getElementById("battery-icon");
    const battery = document.getElementById("battery");
    batteryIcon.classList.remove(
        "fa-battery-empty",
        "fa-battery-quarter",
        "fa-battery-half",
        "fa-battery-full"
    );
    batteryIcon.classList.add("fa-battery-three-quarters");
    savedBatterylevel = 67;
    batteryLevel.value = 67;
    battery.textContent = '67%';
}

function resetToDefaultNetwork() {
    const networkSelect = document.getElementById("network-select");
    const internetIcon = document.getElementById("wifi-icon");
    const airplaneModeToggle = document.getElementById("airplane-mode");
    airplaneModeToggle.checked = false;
    savedAirplanemode = false;

    selectedNetwork = "wifi";
    networkSelect.value = "wifi";

    internetIcon.classList.remove("fa-wifi", "fa-ethernet", "fa-plane-up");
    internetIcon.classList.add("fa-wifi");
}

async function checkForUpdates() {
    try {
        const versionRes = await fetch('./version.json');
        const versionData = await versionRes.json();

        document.getElementById('os-version').textContent = versionData.version;
        document.getElementById('os-type').textContent = versionData.type;
        document.getElementById('os-notes').textContent = versionData.notes;

        const commitsRes = await fetch('https://api.github.com/repos/noahniemeijer/portfolio/commits');
        const commits = await commitsRes.json();
        const latestCommit = commits[0];

        document.getElementById('commit-message').textContent = latestCommit.commit.message;
        document.getElementById('commit-date').textContent = new Date(latestCommit.commit.author.date).toLocaleString();

        const now = new Date();
        document.getElementById('last-checked').textContent = now.toLocaleString();

    } catch (err) {
        document.querySelector('.updates-tab').innerHTML = "<p>❌ Failed to fetch update info</p>";
        console.error('Update check failed:', err);
    }
}
