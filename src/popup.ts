import * as moment from 'moment';
import * as $ from 'jquery';

let count = 0;

$(function() {
  const queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    $('#url').text(tabs[0].url);
    $('#time').text(moment().format('YYYY-MM-DD HH:mm:ss'));
  });

  chrome.browserAction.setBadgeText({text: count.toString()});
  $('#countUp').click(()=>{
    chrome.browserAction.setBadgeText({text: (++count).toString()});
  });

  $('#test').click(()=>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, "createOverlay",
      function(response) {
        console.log(response);
      });
    });
  });
});
