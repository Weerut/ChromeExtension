// omnibox
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
    suggest([
      {content: "color-divs", description: "Make everything red"}
    ]);
});
chrome.omnibox.onInputEntered.addListener(function(text) {
    if(text == "color-divs") colorDivs();
});

// listening for an event / one-time requests
// coming from the popup
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "clear-body-style":
            clearBodyStyle();
        break;
    }
    return true;
});

// listening for an event / long-lived connections
// coming from devtools
chrome.extension.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (message) {
        switch(port.name) {
            case "color-divs-port":
                colorDivs();
            break;
        }
    });
});

// send a message to the content script
var clearBodyStyle = function() {
    chrome.tabs.getSelected(null, function(tab){
        chrome.tabs.sendMessage(tab.id, {type: "clear-body-style"});
        // setting a badge
        chrome.browserAction.setBadgeText({text: "Cleared!"});
    });
}