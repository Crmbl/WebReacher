var isEnabled = true;

function click() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {"enable" : isEnabled}, function(msg) {
            if (msg == "success")
                isEnabled = !isEnabled;
        });
    });
}

chrome.browserAction.onClicked.addListener(click);