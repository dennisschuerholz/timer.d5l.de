let keybindings = {
    startstop: [" ", "Spacebar"],
    reset: "Backspace",
    timer: "T",
    timeplus: ["Up", "ArrowUp", "Right", "ArrowRight", "+"],
    timeminus: ["Down", "ArrowDown", "Left", "ArrowLeft", "-"],
    recall: "R",
    //nextphase: ["N", "Enter"],
    //previousphase: "P",
    mute: 'M',
    fullscreen: ["F11", "F"],
    togglesettings: "Q",
    presets: ['0', '1', '2','3','4','5','6','7','8','9'],
};
let stepSize = 30;
let presets = {
    1: 60,
    2: 120,
    3: 180,
    4: 240,
    5: 300,
    6: 360,
    7: 420,
    8: 480,
    9: 540,
    0: 600,
}
let timeRemaining = 0;
let timerStart = null;
let shouldTimerRun = false;

function getSetting(key, def = null) {
    const setting = localStorage.getItem(key);
    if (setting == null || setting === "undefined" || setting === "") {
        return def;
    }
    return setting;
}
function getBooleanSetting(key, def = false) {
    const setting = getSetting(key, def);
    if (typeof setting == "string") {
        return setting.toLowerCase() === "true";
    }
    return setting === true;
}

function getNumericSetting(key, def = "0") {
    const setting = getSetting(key, def);
    return Number(setting);
}

function setSetting(key, value) {
    localStorage.setItem(key, value);
    return value;
}

/**
 * Load settings from **localStorage** and apply them to the app
 */
function loadSettings() {
    stepSize = getNumericSetting("settings_timer_stepsize", "30");
    document.getElementById("stepSizeInput").value = formatTime(stepSize);
    for (let i = 1; i < 10; i++) {// let i = 0
        presets[i] = getNumericSetting(`settings_preset_${i}`, `${presets[i]}`);
        document.getElementById(`preset${i}Input`).value = formatTime(presets[i]);
    }
    let bind1, bind2, bind3;
    keybindings["startstop"] = document.getElementById("timerstart").innerHTML =
        getSetting("settings_key_timerstart", "Spacebar");
    /*keybindings["recall"] = document.getElementById("recall").innerHTML =
        getSetting("settings_key_recall", "R");*/
    /*bind1 = document.getElementById("phasenext").innerHTML =
        getSetting("settings_key_phasenext", "N");
    bind2 = document.getElementById("phasenextalt").innerHTML =
        getSetting("settings_key_phasenextalt", "Enter");
    keybindings["nextphase"] = [bind1, bind2];
    keybindings["previousphase"] = document.getElementById("phaseprev").innerHTML =
        getSetting("settings_key_phaseprev", "P");*/
    keybindings["reset"] = document.getElementById("timerreset").innerHTML =
        getSetting("settings_key_timerreset", "Backspace");
    keybindings["timer"] = document.getElementById("timeredit").innerHTML =
        getSetting("settings_key_timeredit", "T");
    bind1 = document.getElementById("timerplus").innerHTML =
        getSetting("settings_key_timerplus", "ArrowUp");
    bind2 = document.getElementById("timerplusalt").innerHTML =
        getSetting("settings_key_timerplusalt", "ArrowRight");
    bind3 = document.getElementById("timerplusalt2").innerHTML =
        getSetting("settings_key_timerplusalt2", "+");
    keybindings["timeplus"] = [bind1, bind2, bind3];
    bind1 = document.getElementById("timerminus").innerHTML =
        getSetting("settings_key_timerminus", "ArrowDown");
    bind2 = document.getElementById("timerminusalt").innerHTML =
        getSetting("settings_key_timerminusalt", "ArrowLeft");
    bind3 = document.getElementById("timerminusalt2").innerHTML =
        getSetting("settings_key_timerminusalt2", "-");
    keybindings["timeminus"] = [bind1, bind2, bind3];
    /*keybindings["mute"] = document.getElementById("togglemute").innerHTML =
        getSetting("settings_key_togglemute", "M");*/
    keybindings["fullscreen"] = [document.getElementById("togglefullscreen").innerHTML =
        getSetting("settings_key_togglefullscreen", "F"), "F11"];
    keybindings["togglesettings"] = document.getElementById("togglesettings").innerHTML =
        getSetting("settings_key_togglesettings", "Q");
    fillAlternativeKeys(keybindings);
    shouldTimerRun = getBooleanSetting('state_timer_running');
    timeRemaining = getNumericSetting('state_timer_remaining');
    timerStart = getNumericSetting('state_timer_start');
    if (shouldTimerRun) {
        timeRemaining = timeRemaining - Math.floor((Date.now() - timerStart)/1000);
        if (timeRemaining < 0) timeRemaining = 0;
    }
}
loadSettings();

function fillAlternativeKeys(keys) {
    for (const k in keys) {
        if (typeof keys[k] === "string") {
            keys[k] = [keys[k]];
        }
        if (keys[k].includes("Spacebar")) keys[k].push(" ");
        else if (keys[k].includes(" ")) keys[k].push("Spacebar");
        if (keys[k].includes("Up")) keys[k].push("ArrowUp");
        else if (keys[k].includes("ArrowUp")) keys[k].push("Up");
        if (keys[k].includes("Down")) keys[k].push("ArrowDown");
        else if (keys[k].includes("ArrowDown")) keys[k].push("Down");
        if (keys[k].includes("Left")) keys[k].push("ArrowLeft");
        else if (keys[k].includes("ArrowLeft")) keys[k].push("Left");
        if (keys[k].includes("Right")) keys[k].push("ArrowRight");
        else if (keys[k].includes("ArrowRight")) keys[k].push("Right");
    }
}

/**
 * Store settings to **localStorage** and apply them to the app
 */
function saveSettings() {
    setSetting("settings_timer_stepsize", parseTime(document.getElementById("stepSizeInput").value));
    for (let i = 1; i < 10; i++) {// let i = 0
        setSetting(`settings_preset_${i}`, parseTime(document.getElementById(`preset${i}Input`).value));
    }
    setSetting("settings_key_timerstart", document.getElementById("timerstart").innerHTML);
    //setSetting("settings_key_recall", document.getElementById("recall").innerHTML);
    //setSetting("settings_key_phasenext", document.getElementById("phasenext").innerHTML);
    //setSetting("settings_key_phasenextalt", document.getElementById("phasenextalt").innerHTML);
    //setSetting("settings_key_phaseprev", document.getElementById("phaseprev").innerHTML);
    setSetting("settings_key_timerreset", document.getElementById("timerreset").innerHTML);
    setSetting("settings_key_timeredit", document.getElementById("timeredit").innerHTML);
    setSetting("settings_key_timerplus", document.getElementById("timerplus").innerHTML);
    setSetting("settings_key_timerplusalt", document.getElementById("timerplusalt").innerHTML);
    setSetting("settings_key_timerplusalt2", document.getElementById("timerplusalt2").innerHTML);
    setSetting("settings_key_timerminus", document.getElementById("timerminus").innerHTML);
    setSetting("settings_key_timerminusalt", document.getElementById("timerminusalt").innerHTML);
    setSetting("settings_key_timerminusalt2", document.getElementById("timerminusalt2").innerHTML);
    //setSetting("settings_key_togglemute", document.getElementById("togglemute").innerHTML);
    setSetting("settings_key_togglefullscreen", document.getElementById("togglefullscreen").innerHTML);
    setSetting("settings_key_togglesettings", document.getElementById("togglesettings").innerHTML);
}

let keyId = null;
function waitForKey(e) {
    keyId = e.target.id;
    document.querySelectorAll(".key.active").forEach((elem) => {
        elem.classList.remove("active");
    });
    document.getElementById(keyId).classList.add("active");
    document.addEventListener(
        "keydown",
        (ke) => {
            let key = ke.key.length === 1 ? ke.key.toUpperCase() : ke.key;
            if (key === " ") key = "Spacebar";
            if (! ["Escape", '0', '1', '2','3','4','5','6','7','8','9'].includes(key)) {
                document.getElementById(keyId).innerText = key;
            }
            document.getElementById(keyId).classList.remove("active");
            document.getElementById(keyId).blur();
            ke.preventDefault();
        },
        { once: true }
    );
    e.preventDefault(); // prevent dialog from closing
}
document
    .querySelector("#settings")
    .querySelectorAll(".key")
    .forEach((elem) => {
        elem.addEventListener("click", waitForKey);
    });
