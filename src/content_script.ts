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
    ssh.style.marginLeft = window.innerWidth/2 - 300 + "px";
    ssh.style.marginTop = window.innerHeight/2 - 200 + "px";
    document.body.appendChild(ssh);

    var handler = document.createElement("div");
    handler.id = "webreacher-ssh-handler";
    ssh.appendChild(handler);
    dragElement(ssh);
    var separator = document.createElement("hr");
    separator.id = "webreacher-ssh-handler-separator";
    handler.appendChild(separator);

    var iframe = document.createElement("iframe");
    iframe.id = "webreacher-ssh-iframe";
    iframe.src = "INTERNET WEBSITE !";
    iframe.width = "375px";
    iframe.height = "600px";
    ssh.appendChild(iframe);
}

function removeWebReacherDivs() {
    var ssh = document.getElementById("webreacher-ssh");
    document.body.removeChild(ssh);
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "-handler")) {
        document.getElementById(elmnt.id + "-handler").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();

        pos3 = e.clientX;
        pos4 = e.clientY;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        elmnt.style.removeProperty('margin-top');
        elmnt.style.removeProperty('margin-left');
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}