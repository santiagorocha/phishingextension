//Code for the menu when right clic on link

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

// Code to block certain links

// Location of the proxy script, relative to manifest.json
const proxyScriptURL = "proxy/proxy-script.js";

// Default settings. If there is nothing in storage, use these values.
const defaultSettings = {
   blockedHosts: ["sfedu.ru", "phishing.com"]
 }

// Register the proxy script
browser.proxy.register(proxyScriptURL);

// Log any errors from the proxy script
browser.proxy.onProxyError.addListener(error => {
  console.error(`Proxy error: ${error.message}`);
});

// Initialize the proxy
function handleInit() {
  // update the proxy whenever stored settings change
  browser.storage.onChanged.addListener((newSettings) => {
    browser.runtime.sendMessage(newSettings.blockedHosts.newValue, {toProxyScript: true});
  });

  // get the current settings, then...
  browser.storage.local.get()
    .then((storedSettings) => {
      // if there are stored settings, update the proxy with them...
      if (storedSettings.blockedHosts) {
        browser.runtime.sendMessage(storedSettings.blockedHosts, {toProxyScript: true});
      // ...otherwise, initialize storage with the default values
      } else {
        browser.storage.local.set(defaultSettings);
      }

    })
    .catch(()=> {
      console.log("Error retrieving stored settings");
    });
}

function handleMessage(message, sender) {
  // only handle messages from the proxy script
  if (sender.url !=  browser.extension.getURL(proxyScriptURL)) {
    return;
  }

  if (message === "init") {
    handleInit(message);
  } else {
    // after the init message the only other messages are status messages
    console.log(message);
  }
}

browser.runtime.onMessage.addListener(handleMessage);


/*console.log("background working");

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
    let msg = {
        txt: "running"
    }
    chrome.tabs.sendMessage(tab.id, msg);
}*/