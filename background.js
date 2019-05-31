// console.log('background running');

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
    let msg = {
        txt: "running"
    }
    chrome.tabs.sendMessage(tab.id, msg);
}