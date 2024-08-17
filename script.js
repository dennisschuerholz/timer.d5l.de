let countdown;
let timeRemaining = 0;
let timerValue = 0;
let isTimerRunning = false;
const timeDisplay = document.getElementById("timeDisplay");

function parseKeydown(e) {
    if (document.querySelector("dialog[open]") != null) return;
    let action = findKey(e.key, keybindings);
    switch (action) {
        case "startstop":
            startStopTimer();
            break;
        case "reset":
            resetTimer();
            break;
        case "timer":
            editTimer();
            break;
        case "timeplus":
            incrementTimer();
            break;
        case "timeminus":
            decrementTimer();
            break;
        case "recall":
            recall();
            break;
        /*case "nextphase":
            break;
        case "previousphase":
            break;*/
        case "presets":
            preset(e.key);
        /*case "mute":
            toggleMute();
            break;*/
        case "fullscreen":
            if (
                document.fullscreenElement /* Standard syntax */ ||
                document.webkitFullscreenElement /* Safari and Opera syntax */ ||
                document.msFullscreenElement /* IE11 syntax */
            ) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    /* Safari */
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    /* IE11 */
                    document.msExitFullscreen();
                }
            } else {
                const elem = document.documentElement;
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.webkitRequestFullscreen) {
                    /* Safari */
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) {
                    /* IE11 */
                    elem.msRequestFullscreen();
                }
            }
            break;
        case "togglesettings":
            openSettings();
            break;
        default:
            console.debug(`No Action for key: ${e.key} (${e.keyCode})`);
    }
    if (action != null) {
        e.preventDefault();
    }
}
document.addEventListener("keydown", parseKeydown);

function preset(key) {
    if (!isTimerRunning) {
        setTimer(presets[key]);
    }
}

function openSettings() {
    const settings = document.querySelector("#settings");
    settings.returnValue = "none";
    settings.showModal();
}

document.querySelector("#settings").addEventListener("cancel", (e) => {
    if (document.querySelector("#settings").returnValue === "none")
        e.preventDefault();
});

document.querySelector("#settings").addEventListener("close", (e) => {
    if (document.querySelector("#settings").returnValue === "save") {
        saveSettings();
    }
    loadSettings();
    document.querySelector("#settingsButton").blur();
});

function displayTimeLeft(seconds) {
    timeDisplay.textContent = formatTime(seconds);
}

function timer() {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + timeRemaining * 1000;
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countdown);
            isTimerRunning = false;
            document.body.classList.remove("timerRunning");
            timeRemaining = 0;
            return;
        }
        timeRemaining = secondsLeft;
        displayTimeLeft(timeRemaining);
    }, 1000);
}

function setTimer(seconds) {
    timeRemaining = timerValue = seconds;
    displayTimeLeft(timeRemaining);
}

function startStopTimer() {
    if (!isTimerRunning) {
        timer();
        isTimerRunning = true;
        document.body.classList.add("timerRunning");
        //startStopButton.innerHTML = '<i class="fas fa-stop"></i>';
    } else {
        clearInterval(countdown);
        isTimerRunning = false;
        document.body.classList.remove("timerRunning");
        //startStopButton.innerHTML = '<i class="fas fa-play"></i>';
    }
    //startStopButton.blur();
}
//startStopButton.addEventListener("click", startStopTimer);

function resetTimer() {
    if (!isTimerRunning) {
        setTimer(timerValue);
    }
    //resetButton.blur();
}
//resetButton.addEventListener("click", resetTimer);

function editTimer() {
    if (!isTimerRunning) {
        document.querySelector("#timerEditDialog").returnValue = "none";
        document.querySelector("#timerEditDialog").showModal();
    }
}
//editTimeButton.addEventListener("click", editTimer);

document.querySelector("#timerEditDialog").addEventListener("close", (e) => {
    const dialog = document.querySelector("#timerEditDialog");
    const userTime = dialog.querySelector("input").value;
    dialog.querySelector("input").value = "";
    //editTimeButton.blur();
    if (dialog.returnValue === "none") return;
    if (userTime !== "") {
        const parsedTime = parseTime(userTime);
        if (parsedTime <= 0) {
            const message = document.querySelector("#messageDialog");
            message.querySelector("h1").innerText = "Invalid Timer Value";
            message.querySelector(
                "p"
            ).innerHTML = `Ungültige Eingabe '${userTime}'<br>Mögliche Formate: 7.5, 7:30, 450s<br>Nur potive Werte erlaubt.`;
            message.showModal();
            return;
        } else {
            setTimer(parsedTime);
        }
    }
});

function incrementTimer() {
    if (!isTimerRunning) {
        setTimer(timerValue + stepSize);
    }
    //incrementTimeButton.blur();
}
//incrementTimeButton.addEventListener("click", incrementTimer);

function decrementTimer() {
    if (!isTimerRunning) {
        setTimer(Math.max(timerValue - stepSize, 0));
    }
    //decrementTimeButton.blur();
}
//decrementTimeButton.addEventListener("click", decrementTimer);
