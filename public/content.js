/* global browser */
// We can only access the TABs DOM with this script.
// It will get the credentials via message passing from the popup
// It is also responsible to copy strings to the clipboard

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'fill_creds') {
        var passwordNode, usernameNode;
        
        usernameNode = document.querySelector('input[id*="username" i]')
        passwordNode = document.querySelector('input[id*="password" i]')
    
        

        if (usernameNode !== null) {
            usernameNode.value = request.username;
            passwordNode.value = request.password;
        }
    }
  }
  );
  