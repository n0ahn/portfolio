
function saveSetting(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadSetting(key, defaultValue) {
    const stored = localStorage.getItem(key);
    return stored !== null ? JSON.parse(stored) : defaultValue;
}

let savedBrightness = loadSetting('brightness', 100)
let savedContrast = loadSetting('contrast', 50);
let savedSaturation = loadSetting('saturation', 100);
let savedFunmode = loadSetting('funmode', false);
let savedAirplanemode = loadSetting('airplanemode', false);
let savedBatterylevel = loadSetting('batterylevel', 67);
let savedBackground = loadSetting('background', "wall");
let savedOSLogo = loadSetting('oslogo', false);
let savedTheme = loadSetting('theme', "dark");

console.log(savedOSLogo);


const darkThemeColors = {
    '--color-background-primary': '#0C1428',
    '--color-background-secondary': '#182036',
    '--color-accent-primary': '#5ccbff',

    '--color-text-primary': '#FFFFFF',
    '--color-text-secondary': '#FFFFFF',
    '--color-text-danger': 'rgba(87, 0, 0, 1)',

    '--color-background-overlay-dark': 'rgba(0,0,0,0.5)',
    '--color-background-overlay-medium': 'rgba(0,0,0,0.4)',
    '--color-background-overlay-light': 'rgba(0,0,0,0.2)',
    '--color-background-overlay-slight': 'rgba(0,0,0,0.3)',
    '--color-background-dark-alpha': '#090f1bd4',
    '--color-background-app-button': '#3f495ebd',
    '--color-background-app-info': '#3f495ebd',
    '--color-background-shutdown': '#000000',

    '--color-border-primary': '#ccc',
    '--color-border-secondary': '#465168',
    '--color-border-profile': '#313a50'
};

const lightThemeColors = {
    '--color-background-primary': '#eff1f5',
    '--color-background-secondary': '#e6e9ef',
    '--color-accent-primary': '#5ccbff',

    '--color-text-primary': '#4c4f69',
    '--color-text-secondary': '#000000',
    '--color-text-danger': '#d20f39',

    '--color-background-overlay-dark': 'rgba(236, 239, 244, 0.5)',
    '--color-background-overlay-medium': 'rgba(236, 239, 244, 0.4)',
    '--color-background-overlay-light': 'rgba(236, 239, 244, 0.2)',
    '--color-background-overlay-slight': 'rgba(236, 239, 244, 0.3)',
    '--color-background-dark-alpha': '#ffffffd4',

    '--color-background-app-button': '#ccd0da',
    '--color-background-app-info': '#bcc0cc',
    '--color-background-shutdown': '#dce0e8', 

    '--color-border-primary': '#acb0be',
    '--color-border-secondary': '#9ca0b0',
    '--color-border-profile': '#ccd0da'
};



function applyTheme(themeName) {
    const root = document.documentElement; // Dit verwijst naar het <html> element (CSS :root)
    const colorsToApply = themeName === 'dark' ? darkThemeColors : lightThemeColors;

    for (const [property, value] of Object.entries(colorsToApply)) {
        root.style.setProperty(property, value);
    }
    savedTheme = themeName;
}

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
    const appContent = app.querySelector(".app-window-content");
    const aboutmeAppContent = document.getElementById("aboutme-window-content");

    activeAppId = appId;

    container.style.display = "flex";
    setTimeout(() => {
        container.classList.add("visible");
        app.classList.add("active");
    }, 10);

    if (appId !== 'settings-app' && appId !== 'aboutme-app') {
        if (appContent) {
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

    if (appId === 'aboutme-app') {
        const aboutmeAppContent = document.getElementById("aboutme-window-content");

        if (!aboutmeAppContent.dataset.originalContent) {
            aboutmeAppContent.dataset.originalContent = aboutmeAppContent.innerHTML;
        }

        if (savedAirplanemode) {
            aboutmeAppContent.innerHTML = '<p class="app-content-text" id="no-connection">No Internet Connection</p>';
        } else {
            aboutmeAppContent.innerHTML = aboutmeAppContent.dataset.originalContent;
            calculateAge();
        }
        
} else if (appId === 'websites-app') {
    const searchInput = document.getElementById('web-searchbar');
    const websitesList = document.getElementById('websites-list');
    const websites = Array.from(websitesList.getElementsByTagName('li'));
    const iframe = document.getElementById('web-viewer');
    const fallbackContainer = document.getElementById('iframe-fallback-message');

    let filteredWebsites = websites;
    let selectedIndex = -1;
    let blockedDomains = [];

    fetch('./data/blocked-sites.json')
        .then(res => res.json())
        .then(data => {
            blockedDomains = data.map(domain => domain.toLowerCase());
        })
        .catch(err => {
            console.error('Failed to load blocked sites list:', err);
            blockedDomains = [];
        });

    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase();
        selectedIndex = -1;

        if (!filter) {
            websitesList.style.display = 'none';
            filteredWebsites = [];
            updateFocus();
            return;
        } else {
            websitesList.style.display = '';
        }

        filteredWebsites = websites.filter(site => {
            const name = site.textContent.toLowerCase();
            const url = site.dataset.url.toLowerCase();
            const match = name.includes(filter) || url.includes(filter);
            site.style.display = match ? '' : 'none';
            return match;
        });

        selectedIndex = filteredWebsites.length > 0 ? 0 : -1;
        updateFocus();
    });

    websites.forEach(li => {
        li.addEventListener('click', () => {
            loadInIframeOrFallback(li.dataset.url);
            websitesList.style.display = 'none';
            searchInput.value = '';
        });
    });

    searchInput.addEventListener('keydown', e => {
        if (e.key === 'Tab') {
            e.preventDefault();
            if (filteredWebsites.length === 0) return;
            selectedIndex = (selectedIndex + 1) % filteredWebsites.length;
            updateFocus();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const inputValue = searchInput.value.trim();

            if (filteredWebsites.length === 0 || selectedIndex === -1) {
                let url = inputValue;
                if (!/^https?:\/\//i.test(url)) {
                    url = 'https://' + url;
                }
                loadInIframeOrFallback(url);
            } else {
                filteredWebsites[selectedIndex].click();
            }

            websitesList.style.display = 'none';
        } else if (e.key === 'Escape') {
            websitesList.style.display = 'none';
            searchInput.blur();
        }
    });

    function updateFocus() {
        filteredWebsites.forEach((el, i) => {
            el.classList.toggle('selected', i === selectedIndex);
        });
    }

    function loadInIframeOrFallback(url) {
        fallbackContainer.style.display = 'none';
        iframe.style.display = 'block';

        if (isBlocked(url)) {
            iframe.style.display = 'none';
            fallbackContainer.innerHTML = `
                <div style="padding: 20px; font-family: sans-serif; color: var(--color-text-primary);">
                    <p>This site cannot be displayed inside the app.</p>
                    <a href="${url}" target="_blank" rel="noopener" style="color: var(--color-accent-primary); text-decoration: underline;">
                        Open in a new tab
                    </a>
                </div>
            `;
            fallbackContainer.style.display = 'block';
            iframe.src = '';
        } else {
            fallbackContainer.style.display = 'none';
            iframe.src = url;
        }
    }

    function isBlocked(url) {
        try {
            const domain = (new URL(url)).hostname.toLowerCase();
            return blockedDomains.some(blocked => domain === blocked || domain.endsWith('.' + blocked));
        } catch {
            return false;
        }
    }

    websitesList.style.display = 'none';
    } else if (appId === 'projects-app') {
        const container = document.getElementById('projects-window-content');
        if (container) {
            container.innerHTML = '<p class="app-content-text">Loading repositories...</p>';

            fetch('https://api.github.com/users/n0ahn/repos')
                .then(res => res.json())
                .then(repos => {
                container.innerHTML = '';

                repos.forEach(repo => {
                    const card = document.createElement('div');
                    card.className = 'repo-card';
                    card.innerHTML = `
                    <h3 class="content-title" style="margin: 0; margin-bottom: 15px;">${repo.name}</h3>
                    <p class="app-content-text" style="margin: 0; margin-bottom: 15px;">${repo.description || 'No description'}</p>
                    <p><i style="color: white;" class="fa-brands fa-github"></i> <a class="app-content-text" style="margin: 0;" href="${repo.html_url}" target="_blank">View on GitHub</a></p>
                    `;
                    container.appendChild(card);
                });
                })
                .catch(err => {
                container.innerHTML = '<p class="app-content-text">Failed to load repositories.</p>';
                console.error(err);
                });
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
                <p class="app-content-text">Theme:</p>
                <select id="theme-select">
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                </select>
                <p class="app-content-text">Background:</p>
                <select id="background-select">
                    <option value="none">None</option>
                    <optgroup label="Dark Theme">
                        <option value="wall">Midnight Mountain</option>
                        <option value="lunar-flow">Lunar Flow</option>
                        <option value="sunset-river">Sunset River</option>
                        <option value="snowy-mountain">Snowy Mountain</option>
                    </optgroup>
                    <optgroup label="Light Theme">
                        <option value="sunrise-vulcano">Sunrise Vulcano</option>
                        <option value="snowy-sunset">Snowy Sunset</option>
                        <option value="sunlight-horizon">Sunlight Horizon</option>
                        <option value="fluid-light">Fluid Light</option>
                    </optgroup>
                </select>
                <p class="app-content-text">Disable OS Logo:</p>
                <label class="switch" id="oslogo-switch">
                    <input type="checkbox" id="oslogo">
                    <span class="slider"></span>
                </label>
            `;
            content.innerHTML = html;
            document.getElementById("settings-content").classList.add("active");
            document.getElementById("settings-sidebar").classList.add("hidden");

            bgselect = document.getElementById("background-select");
            bg = document.getElementById("main-content");
            loginbg = document.getElementById("login-bg");
            oslogoToggle = document.getElementById("oslogo");
            oslogo = document.getElementById("logo-large");
            oslogo.checked = savedOSLogo;
            themeselect = document.getElementById("theme-select");

            if (themeselect) { 
                themeselect.value = savedTheme;
                themeselect.addEventListener('change', () => {
                    savedTheme = themeselect.value;
                    saveSetting('theme', savedTheme);
                    if (savedTheme === "dark") {
                       applyTheme("dark"); 
                    } else if (savedTheme === "light") {
                       applyTheme("light");
                    }
                });
            }


            bgselect.addEventListener('change', () => {
                savedBackground = bgselect.value;
                saveSetting('background', savedBackground);
                if (savedBackground === "none") {
                    bg.style.backgroundImage = "none"
                } else {
                    bg.style.backgroundImage = `url('../assets/${savedBackground}.jpg')`
                    loginbg.style.backgroundImage = `url('../assets/${savedBackground}.jpg')`
                }
            });
            oslogoToggle.addEventListener('change', () => {
                savedOSLogo = oslogoToggle.checked;
                saveSetting('oslogo', savedOSLogo);
                if (savedOSLogo) {
                    oslogo.classList.add("hidden");
                } else {
                    oslogo.classList.remove("hidden");
                }
            });
            oslogoToggle.checked = savedOSLogo;
            bgselect.value = savedBackground;
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
                saveSetting('brightness', savedBrightness);
                brightnessValue.textContent = brightness.value;
                updateFilters();
            });

            contrast.addEventListener('input', () => {
                savedContrast = Number(contrast.value);
                saveSetting('contrast', savedContrast);
                contrastValue.textContent = contrast.value;
                updateFilters();
            });

            saturation.addEventListener('input', () => {
                savedSaturation = Number(saturation.value);
                saveSetting('saturation', savedSaturation);
                saturationValue.textContent = saturation.value;
                updateFilters();
            });

            funmode.addEventListener('change', () => {
                saveSetting('funmode', savedFunmode);
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
                saveSetting('batterylevel', savedBatterylevel);

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
                saveSetting('airplanemode', savedAirplanemode);

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
                    <div class="infovalue app-content-text">© 2025 Noah N. All rights reserved. Third-party assets used under appropriate licenses.</div>
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
        const versionRes = await fetch('../version.json');
        const versionData = await versionRes.json();

        document.getElementById('os-version').textContent = versionData.version;
        document.getElementById('os-type').textContent = versionData.type;
        document.getElementById('os-notes').textContent = versionData.notes;

        const commitsRes = await fetch('https://api.github.com/repos/n0ahn/portfolio/commits');
        const commits = await commitsRes.json();
        const latestCommit = commits[0];

        document.getElementById('commit-message').textContent = latestCommit.commit.message;
        document.getElementById('commit-date').textContent = new Date(latestCommit.commit.author.date).toLocaleString();

        const now = new Date();
        document.getElementById('last-checked').textContent = now.toLocaleString();

    } catch (err) {
        document.querySelector('.updates-tab').innerHTML = "<p>Failed to fetch update info</p>";
        console.error('Update check failed:', err);
    }
}

content = document.getElementById("aboutme-window-content");
defaultContent = content.innerHTML;

function calculateAge() {
    ageText = document.getElementById("ageNumber");
    ageRounded = document.getElementById("age-rounded");
    const age = dayjs().diff(dayjs('2010-03-06'), 'days');
    ageInDecimals = age / 365.25;
    ageText.innerHTML = `${ageInDecimals.toFixed(1)} years`;
    ageRounded.innerHTML = `${ageInDecimals.toFixed(0)}`;
}

function openAgeTab() {
    content.innerHTML = `
        <div id="age-tab-top-bar">
            <button id="close-age-tab" onclick="closeAgeTab()">
                <i class="fa-solid fa-arrow-left"></i>
            </button>
        </div>
        <div id="age">
            <p class="big-content-title">Birthday Countdown 🎉</p>
            <div id="birthday-countdown-container">
                <div class="countdown-box">
                    <span id="countdown-days" class="countdown-value"></span>
                    <span class="countdown-label">days</span>
                </div>
                <div class="countdown-box">
                    <span id="countdown-hours" class="countdown-value"></span>
                    <span class="countdown-label">hours</span>
                </div>
                <div class="countdown-box">
                    <span id="countdown-minutes" class="countdown-value"></span>
                    <span class="countdown-label">minutes</span>
                </div>
                <div class="countdown-box">
                    <span id="countdown-seconds" class="countdown-value"></span>
                    <span class="countdown-label">seconds</span>
                </div>
            </div>
            <p class="content-title">My Exact Age</p>
            <div id="precise-age" class="app-content-text"></div>
        </div>
    `;

    const birthDate = dayjs("2010-03-06");

    function updateCountdown() {
        if (!(content.innerHTML === defaultContent)) {
            const now = dayjs();

            const ageInMilliseconds = now.diff(birthDate);
            const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.2425);
            const ageElem = document.getElementById("precise-age");
            if (ageElem) {
                ageElem.textContent = ageInYears.toFixed(9) + " years old";
            }

            let nextBirthday = dayjs(`${now.year()}-${birthDate.format("MM-DD")}`);
            if (nextBirthday.isBefore(now)) {
                nextBirthday = nextBirthday.add(1, "year");
            }

            const diffMs = nextBirthday.diff(now);
            const duration = dayjs.duration(diffMs);

            const days = Math.floor(duration.asDays());
            const hours = duration.hours();
            const minutes = duration.minutes();
            const seconds = duration.seconds();

            const daysElem = document.getElementById("countdown-days");
            if (daysElem) {
                daysElem.textContent = days;
            }

            const hoursElem = document.getElementById("countdown-hours");
            if (hoursElem) {
                hoursElem.textContent = hours;
            }

            const minutesElem = document.getElementById("countdown-minutes");
            if (minutesElem) {
                minutesElem.textContent = minutes;
            }

            const secondsElem = document.getElementById("countdown-seconds");
            if (secondsElem) {
                secondsElem.textContent = seconds;
            }
        }
    }

    

    updateCountdown();
    setInterval(updateCountdown, 1);
}


function closeAgeTab() {
    content.innerHTML = defaultContent;
    calculateAge();
}

const galleryImages = [
  // Fill when needed
];

const gallery = document.getElementById('gallery-grid');
galleryImages.forEach(src => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = 'Gallery image';
  img.style.width = '150px';
  img.style.height = '150px';
  img.style.objectFit = 'cover';
  img.style.borderRadius = '8px';
  img.style.boxShadow = '0 0 4px rgba(0,0,0,0.2)';
  img.style.cursor = 'pointer';
  gallery.appendChild(img);
});

const documentsFiles = [
  // Fill when needed
];

const documents = document.getElementById('documents-grid');
documentsFiles.forEach(src => {
    // Finish Later
});


function applySavedSettings() {
    applyTheme(savedTheme);

    const bg = document.getElementById("main-content");
    const loginbg = document.getElementById("login-bg");
    if (savedBackground === "none") {
        bg.style.backgroundImage = "none";
        loginbg.style.backgroundImage = "none";
    } else {
        bg.style.backgroundImage = `url('../assets/${savedBackground}.jpg')`;
        if (loginbg) {
            loginbg.style.backgroundImage = `url('../assets/${savedBackground}.jpg')`;
        }
    }

    const oslogo = document.getElementById("logo-large");
    if (savedOSLogo) {
        oslogo.classList.add("hidden");
    } else {
        oslogo.classList.remove("hidden");
    }

    const desktop = document.getElementById("desktop");
    const brightnessVal = savedBrightness / 100;
    const contrastVal = savedContrast / 50;
    const saturationVal = 100 - savedSaturation;
    desktop.style.filter = `brightness(${brightnessVal}) contrast(${contrastVal}) grayscale(${saturationVal}%)`;
    
    const battery = document.getElementById("battery");
    const batteryIcon = document.getElementById("battery-icon");
    if (battery && batteryIcon) {
        battery.innerHTML = `${savedBatterylevel}%`;
        batteryIcon.classList.remove(
            "fa-battery-empty",
            "fa-battery-quarter",
            "fa-battery-half",
            "fa-battery-three-quarters",
            "fa-battery-full"
        );
        if (savedBatterylevel < 2) {
            batteryIcon.classList.add("fa-battery-empty");
        } else if (savedBatterylevel < 30) {
            batteryIcon.classList.add("fa-battery-quarter");
        } else if (savedBatterylevel < 60) {
            batteryIcon.classList.add("fa-battery-half");
        } else if (savedBatterylevel < 90) {
            batteryIcon.classList.add("fa-battery-three-quarters");
        } else {
            batteryIcon.classList.add("fa-battery-full");
        }
    }

    const wifiIcon = document.getElementById("wifi-icon");
    if (wifiIcon) {
        wifiIcon.classList.remove("fa-wifi", "fa-ethernet", "fa-plane-up");
        if (savedAirplanemode) {
            wifiIcon.classList.add("fa-plane-up");
        } else {
            wifiIcon.classList.add("fa-wifi");
        }
    }
}

let originalBodyHTML = null;
let countdownInterval = null;

function handleHash() {
  if (location.hash === "#age") {
    if (!originalBodyHTML) originalBodyHTML = document.body.innerHTML;
    document.body.classList.add('age');
    document.body.innerHTML = `
      <div id="age">
        <p class="big-content-title">Birthday Countdown 🎉</p>
        <div id="birthday-countdown-container">
          <div class="countdown-box">
            <span id="countdown-days" class="countdown-value"></span>
            <span class="countdown-label">days</span>
          </div>
          <div class="countdown-box">
            <span id="countdown-hours" class="countdown-value"></span>
            <span class="countdown-label">hours</span>
          </div>
          <div class="countdown-box">
            <span id="countdown-minutes" class="countdown-value"></span>
            <span class="countdown-label">minutes</span>
          </div>
          <div class="countdown-box">
            <span id="countdown-seconds" class="countdown-value"></span>
            <span class="countdown-label">seconds</span>
          </div>
        </div>
        <p class="content-title">My Exact Age</p>
        <div id="precise-age" class="app-content-text" style="margin: 0;"></div>
      </div>`;

    startCountdown();
  } else {
    document.body.classList.remove('age');
    if (originalBodyHTML) {
      clearInterval(countdownInterval);
      countdownInterval = null;
      document.body.innerHTML = originalBodyHTML;
    }
  }
}


function startCountdown() {
  const birthDate = dayjs("2010-03-06");
  const defaultContent = ""; // If you want to check for content changes, else remove this check.

  function updateCountdown() {
    // Only update if #age div exists on page (means age content is showing)
    if (document.getElementById("age")) {
      const now = dayjs();

      const ageInMilliseconds = now.diff(birthDate);
      const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.2425);
      const ageElem = document.getElementById("precise-age");
      if (ageElem) {
        ageElem.textContent = ageInYears.toFixed(9) + " years old";
      }

      let nextBirthday = dayjs(`${now.year()}-${birthDate.format("MM-DD")}`);
      if (nextBirthday.isBefore(now)) {
        nextBirthday = nextBirthday.add(1, "year");
      }

      const diffMs = nextBirthday.diff(now);
      const duration = dayjs.duration(diffMs);

      const days = Math.floor(duration.asDays());
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      const daysElem = document.getElementById("countdown-days");
      if (daysElem) daysElem.textContent = days;

      const hoursElem = document.getElementById("countdown-hours");
      if (hoursElem) hoursElem.textContent = hours;

      const minutesElem = document.getElementById("countdown-minutes");
      if (minutesElem) minutesElem.textContent = minutes;

      const secondsElem = document.getElementById("countdown-seconds");
      if (secondsElem) secondsElem.textContent = seconds;
    }
  }

  updateCountdown();
  if (countdownInterval) clearInterval(countdownInterval);
  countdownInterval = setInterval(updateCountdown, 1);
}

window.addEventListener("load", handleHash);
window.addEventListener("hashchange", handleHash);


document.addEventListener("DOMContentLoaded", () => {
    applySavedSettings();
});