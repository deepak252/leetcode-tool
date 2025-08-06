
chrome.action.onClicked.addListener(tab => {
    console.log("onClicked Background")
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: ()=>{
            console.log("Inside Background")
            alert("Hello from my extension")
        }
    })
})

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log("onMessage Background")
    if (msg.action === "runScript") {
        chrome.scripting.executeScript({
            target: { tabId: msg.tabId },
            func: () => alert("Hello from background"),
        });
    }
});