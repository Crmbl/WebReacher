window.addEventListener('resize', function() {
    var canvas = <HTMLCanvasElement> document.getElementById('webreacher-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg == "enable") {
        if (document.getElementById("webreacher-ssh") == null) {
            createWebReacherDivs();
        } else {
            removeWebReacherDivs();
        }
    }
});

function createWebReacherDivs() {
    var ssh = document.createElement("div");
    ssh.id = "webreacher-ssh";
    ssh.style.left = window.innerWidth/2 - 325 + "px";
    document.body.appendChild(ssh);

    chrome.storage.sync.get('link', function(response) {
        if (response.link.indexOf("https") == -1)
            response.link = response.link.replace("http", "https");

        var iframe = document.createElement("iframe");
        iframe.id = "webreacher-ssh-iframe";
        iframe.src = response.link;
        iframe.style.height = "375px";
        ssh.appendChild(iframe);

        var handler = document.createElement("div");
        handler.id = "webreacher-ssh-handler";
        handler.addEventListener('click', function() { toggleTerminal(); });
        ssh.appendChild(handler);
        var separator = document.createElement("hr");
        separator.id = "webreacher-ssh-handler-separator";
        handler.appendChild(separator);
    });
}

function removeWebReacherDivs() {
    var ssh = document.getElementById("webreacher-ssh");
    document.body.removeChild(ssh);
}

function toggleTerminal() {
    var iframe = document.getElementById("webreacher-ssh-iframe");
    var ssh = document.getElementById("webreacher-ssh");
    var handler = document.getElementById("webreacher-ssh-handler");

    if (iframe.style.height == "0px") {
        iframe.style.height = "375px";
        ssh.style.height = "400px";
        handler.style.top = "375px";
    }
    else {
        iframe.style.height = "0px";
        ssh.style.height = "25px"
        handler.style.top = "0px";
    }
}