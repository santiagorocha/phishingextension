'use strict';

const openLabelledId = "open-labelled";

browser.menus.create({
  id: openLabelledId,
  title: "Check Phishing",
  contexts: ["link"]
});

browser.menus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === openLabelledId) {
    browser.tabs.update(tab.id, {
      url: "https://www.virustotal.com/gui/home/url"
    });
  }
});

function updateMenuItem(linkHostname) {
  browser.menus.update(openLabelledId, {
    title: `Check phishing on (${linkHostname})`
  });
  browser.menus.refresh();
}

browser.menus.onShown.addListener(info => {
  if (!info.linkUrl) {
    return;
  }
  let linkElement = document.createElement("a");
  linkElement.href = info.linkUrl;
  updateMenuItem(linkElement.hostname);
});


/*console.log("background working");

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
    let msg = {
        txt: "running"
    }
    chrome.tabs.sendMessage(tab.id, msg);
}*/