console.log('background running');

/*chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
    let msg = {
        txt: "running"
    }
    chrome.tabs.sendMessage(tab.id, msg);
}*/

chrome.runtime.onMessage.addListener(receiver);

window.word = "coding train";

function receiver(request, sender, sendResponse) {
    console.log(request);
    word = request.text;
}