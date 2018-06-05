window.addEventListener('resize', function(event) {
    var ssh = document.getElementById("webreacher-ssh");
    ssh.style.left = window.innerWidth/2 - 325 + "px";
});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg == "enable") {
        if (document.getElementById("webreacher-ssh") == null)
            createWebReacherDivs();
        else
            removeWebReacherDivs();
    }
});

function createWebReacherDivs() {
    var ssh = document.createElement("div");
    ssh.id = "webreacher-ssh";
    ssh.style.left = window.innerWidth/2 - 325 + "px";
    document.body.appendChild(ssh);

    chrome.storage.sync.get('link', function(response) {
        if (response.link == "" || response.link == undefined) return;
        if (response.link.indexOf("https") == -1)
            response.link = response.link.replace("http", "https");

        var iframe = document.createElement("iframe");
        iframe.id = "webreacher-ssh-iframe";
        iframe.src = response.link;
        iframe.addEventListener('mouseenter', function() { mouseEnter(); });
        ssh.appendChild(iframe);

        var handler = document.createElement("div");
        handler.id = "webreacher-ssh-handler";
        handler.addEventListener('click', function() { toggleTerminal(); });
        handler.addEventListener("webkitTransitionEnd", function(event) { transitionEnd(event); }, false );
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

function transitionEnd(event) {
    var iframe = document.getElementById("webreacher-ssh-iframe");
    if (iframe.style.top == "-365px") {
        iframe.style.display = "none";
    } else {
        iframe.style.display = "block";
        iframe.focus();
    }
}

function mouseEnter() {
    var iframe = document.getElementById("webreacher-ssh-iframe");
    iframe.focus();
}

function toggleTerminal() {
    var iframe = document.getElementById("webreacher-ssh-iframe");
    var ssh = document.getElementById("webreacher-ssh");
    var handler = document.getElementById("webreacher-ssh-handler");

    if (iframe.style.top == "-365px") {
        iframe.style.top = "5px";
        ssh.style.top = "0px";
        handler.style.top = "375px";
    }
    else {
        iframe.style.top = "-365px";
        ssh.style.top = "-400px";
        handler.style.top = "0px";
    }
}