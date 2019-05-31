//console.log("Extension go?");

/*chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
    console.log(message.txt);
    if (message.txt == "running"){
        let paragraphs = document.getElementsByTagName('p');
        for (elt of paragraphs) {
            elt.style['background-color'] = '#FF00FF';
        }  

    }
}*/

window.addEventListener('mouseup', wordSelected);

function wordSelected() {
    let selectedText = window.getSelection().toString().trim();
    console.log(selectedText);
    if (selectedText.length > 0) {
        let message = {
            text: selectedText
        };
        chrome.runtime.sendMessage(message);
    }
}