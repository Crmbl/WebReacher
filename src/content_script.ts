
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    // if (msg.color) {
    //     console.log('Receive color = ' + msg.color);
    //     document.body.style.backgroundColor = msg.color;
    //     sendResponse('Change color to ' + msg.color);
    // } else {
    //     sendResponse('Color message is none.');
    // }

    // if (msg == "createOverlay") {
    //     createOverlay();
    //     sendResponse("success");
    // }

    if (msg.enable != undefined) {
        if (msg.enable == true) {
            createOverlay();
            document.body.style.overflow = "hidden";
        } else {
            removeOverlay();
            document.body.style.overflow = null;
        }
        
        sendResponse("success");
    }
});

function createOverlay() {
    var div = document.createElement("div");
    div.id = "test";
    document.body.appendChild(div);
}

function removeOverlay() {
    var div = document.getElementById("test");
    document.body.removeChild(div);
}