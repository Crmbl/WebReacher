function save_options() {
  var link = <HTMLInputElement> document.getElementById('webreacher-link');

  chrome.storage.sync.set({
    'link': link.value
  }, function() {
    var status = document.getElementById('webreacher-status');
    status.innerHTML = 'C\'est en place !';
    setTimeout(function() {
      status.innerHTML = '';

    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    link: ''
  }, function(items: {link}) {
    var linkElement = <HTMLInputElement> document.getElementById('webreacher-link');
    linkElement.value = items.link;
  });
}

document.getElementById('webreacher-save').addEventListener('click', save_options);
restore_options();
document.addEventListener('DOMContentLoaded', restore_options);