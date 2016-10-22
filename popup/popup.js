// popup.js
window.onload = function() {
    document.getElementById("button").onclick = function() {
        chrome.extension.sendMessage({
            type: "clear-body-style"
        });
    }
}