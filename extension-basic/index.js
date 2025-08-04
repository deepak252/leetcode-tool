async function sayHello() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log("Popup context");

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      console.log("Page context");
      // This runs in the web page (not the popup)
      // document.body.innerHTML = "";
      alert("Hello from my extension");
    },
  });
}

// This runs in the extension popup (isolated from web pages)
document.getElementById("myButton").addEventListener("click", sayHello);
