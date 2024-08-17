function findKey(search, map) {
    if (search.length == 1) search = search.toUpperCase();
    for (const key in map) {
        if (
            (typeof map[key] === "string" && map[key] === search) ||
            (typeof map[key] === "object" && map[key].includes(search))
        ) {
            return key;
        }
    }
    return null;
}

function roundToNearestQuarter(n, q = 4) {
    return Math.round(n * q) / q;
}

function convertToSeconds(values) {
    return values.map((value) => value * 60);
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60) % 60;
    const remainingSeconds = Math.round(seconds % 60);
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedSeconds =
        remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
    return `${hours !== 0 ? (formattedHours + ':') : ''}${formattedMinutes}:${formattedSeconds}`;
}

function parseTime(timeValue) {
    timeValue = timeValue.replace(',', '.');
    let parsedTime = 0;
    if (/^-?\d*\.?\d+h$/.test(timeValue)) {
        timeValue = timeValue.replace("h", "");
        parsedTime = Math.round(timeValue * 3600);
    } else if (/^-?\d*\.?\d+m?$/.test(timeValue)) {
        if (typeof timeValue === "string") timeValue = timeValue.replace("m", "");
        parsedTime = Math.round(timeValue * 60);
    } else if (timeValue.includes(":")) {
        if (timeValue.includes("-")) {
            return 0;
        }
        timeValue = timeValue.split(":");
        for (let i = 0; i < timeValue.length; i++) {
            parsedTime += timeValue[i] * Math.pow(60, timeValue.length - i - 1);
        }
    } else if (timeValue.endsWith("s")) {
        parsedTime = Math.round(timeValue.substr(0, timeValue.length - 1));
    }
    return parsedTime;
}