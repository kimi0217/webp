const log = document.getElementById('log');

document.addEventListener('keydown', logKey);

function logKey(e) {
    log.textContent+=event.key;
}