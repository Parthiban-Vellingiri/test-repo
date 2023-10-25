const moment = require('moment');

export function getCurrentDate() {
    const today = new Date();
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    return today.toLocaleDateString('en-US', options).replace(/\//g, '');
}

export function getCurrentTime24HrsFormat() {
    const currentTime = moment().format('HH:mm');
    return currentTime.replace(/\//g, '');
}

export function getPastTimeFromCurrentTime(hour) {
    let currentTime = moment().subtract(hour, 'hours').format('HH:mm');
    let currentDate = moment().subtract(hour, 'hours').format('DD/MM/YY');
    return { date: currentDate.replace(/\//g, ''), time: currentTime };
}

export function getFutureTimeFromCurrentTime(hour) {
    let currentTime = moment().add(hour, 'hours').format('HH:mm');
    let currentDate = moment().add(hour, 'hours').format('DD/MM/YY');
    return { date: currentDate.replace(/\//g, ''), time: currentTime };
}
