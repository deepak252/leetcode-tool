// Listens for popup messages & injects script

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log("background listener")
    if (msg.action === "runScript") {
        chrome.scripting.executeScript({
            target: { tabId: msg.tabId },
            files: ["content.js"]   // injects our content script
        });
    }
});
