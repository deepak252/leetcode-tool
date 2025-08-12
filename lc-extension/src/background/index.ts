chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed!')
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GREET') {
    console.log('Message received in background:', request.message)

    // Send reply back to popup
    sendResponse('Hi Popup, Background here 👋')
  }

  // Return true to indicate async response (required for some APIs)
  return true
})

// import axios from "axios";

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === "QUESTION_DETAILS") {
//     console.log("[Background] Received question data", message.payload);

//     axios.post("https://your-server.com/leetcode", message.payload)
//       .then(() => console.log("[Background] Data sent to server"))
//       .catch(err => console.error("[Background] Failed to send data", err));
//   }
// });
