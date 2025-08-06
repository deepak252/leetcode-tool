// Sends a message to the background when clicked

document.getElementById("myButton").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Send message to background
    chrome.runtime.sendMessage({
        action: "runScript",
        tabId: tab.id
    });
});
