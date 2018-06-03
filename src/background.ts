function click() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "enable");
    });
}

chrome.browserAction.onClicked.addListener(click);