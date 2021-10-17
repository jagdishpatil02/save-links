chrome.runtime.onInstalled.addListener(openTab);

chrome.action.onClicked.addListener(openTab);

function openTab() {
  chrome.tabs.create({ url: "index.html" });
}
