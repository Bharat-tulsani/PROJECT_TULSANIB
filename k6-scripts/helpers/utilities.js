// This file contains utility functions that can be reused across k6 scripts, such as data generation or logging functions.

export function log(message) {
    console.log(`K6 Log: ${message}`);
}

export function generateRandomId(prefix = '') {
    return `${prefix}${Math.floor(Math.random() * 1000000)}`;
}

export function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}