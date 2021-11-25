/*global chrome*/
function mainLoaded() {
  //var resultList = document.getElementById('resultList');
  var currentUrl;

  var tabs = chrome.tabs.query({ active: true, currentWindow: true }, function (tabs){
    currentUrl = tabs[0].url;
  });
}

export function fillCredentialsInBrowser(username, password) {
  console.log("filling: " + username + "   " + password);
    var tabs = chrome.tabs.query({ active: true, currentWindow: true }, function (tabs){
        console.log(tabs[0].id)
        chrome.tabs.sendMessage(tabs[0].id, {
            message: 'fill_creds',
            username: username,
            password: password
        });
    });
}
// document.getElementById("test").addEventListener('click', () => {
//     console.log("aaaaa");
//     fillCredentialsInBrowser("aaa", "bbb")
// });
document.addEventListener('DOMContentLoaded', mainLoaded, false);