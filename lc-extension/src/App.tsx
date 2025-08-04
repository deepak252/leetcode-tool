import Logo from '@/assets/react.svg?react'
import { useState } from 'react'

function App() {
  const [color, setColor] = useState<any>()

  const onClick = async () => {
    // Popup Context
    console.log('Popup context')
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    })
    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id! },
      args: [color],
      func: (color) => {
        console.log('Page context')
        // This runs in the web page (not the popup)
        // document.body.innerHTML = "";
        // document.body.style.backgroundColor = 'red'
        document.body.style.backgroundColor = color
        // alert('Hello from my extension')
      },
    })
  }

  // const onClick = async () => {
  //   // Popup Context
  //   console.log('Page context')
  //   const [tab] = await chrome.tabs.query({
  //     active: true,
  //     currentWindow: true,
  //   })
  //   chrome.scripting.executeScript({
  //     target: { tabId: tab.id! },
  //     func: () => {
  //       console.log('Page context')
  //       // This runs in the web page (not the popup)
  //       // document.body.innerHTML = "";
  //       // document.body.style.backgroundColor = 'red'
  //       alert('Hello from my extension')
  //     },
  //   })
  // }

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <Logo width={100} className="logo react" height={40} fill="blue" />
        </a>
      </div>
      <h1 className="bg-red-400">My Vite Extension</h1>
      <div className="card">
        <input type="color" onChange={(e) => setColor(e.currentTarget.value)} />
        <button onClick={onClick}>Click Me</button>
      </div>
    </>
  )
}

export default App
