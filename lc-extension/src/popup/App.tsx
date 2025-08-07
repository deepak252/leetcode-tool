export default function Popup() {
  const handleClick = () => {
    chrome.runtime.sendMessage(
      { type: 'GREET', message: 'Hello from Popup' },
      (response) => {
        console.log('Background replied:', response)
      }
    )
  }

  return (
    <div className="p-4 w-64">
      <h1 className="text-lg font-bold text-blue-600">My Extension</h1>
      <button
        className="bg-blue-500 text-white p-2 rounded mt-2"
        onClick={handleClick}
      >
        Click Me
      </button>
    </div>
  )
}
