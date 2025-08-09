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
