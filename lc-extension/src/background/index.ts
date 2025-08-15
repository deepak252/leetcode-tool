import { fetchDataRequest } from './slices/dataSlice'
import { store } from './store'

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === 'FETCH_DATA') {
    console.log('Fetch Data')
    // await chrome.storage.local.set({ token: 'accessToken' })
    console.log(await chrome.storage.local.get('token'))

    store.dispatch(fetchDataRequest())
    sendResponse({ status: 'fetch_started' })
  }
  return true // keep sendResponse async
})

chrome.action.onClicked.addListener(() => {
  console.log('clicked')

  chrome.windows.create({
    url: 'popup.html',
    type: 'popup',
    width: 400,
    height: 300,
  })
})

// chrome.action.onClicked.addListener(async (tab) => {
//   if (!tab.id) return
//   await chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     func: () => {
//       if (document.getElementById('my-sidebar')) return // avoid duplicates
//       let panel = document.createElement('div')
//       panel.id = 'my-sidebar'
//       panel.style = `
//         position: fixed;
//         right: 0;
//         top: 0;
//         width: 300px;
//         height: 100%;
//         background: white;
//         z-index: 999999;
//         border-left: 1px solid #ccc;
//       `
//       document.body.appendChild(panel)
//     },
//   })
// })

// chrome.runtime.onInstalled.addListener(() => {
//   console.log('Extension installed!')
// })

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.type === 'GREET') {
//     console.log('Message received in background:', request.message)

//     // Send reply back to popup
//     sendResponse('Hi Popup, Background here 👋')
//   }

//   // Return true to indicate async response (required for some APIs)
//   return true
// })
