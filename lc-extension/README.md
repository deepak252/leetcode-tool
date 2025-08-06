
**4 separate parts** (popup, options, background, content script) that **work together through Chrome’s extension APIs**.

---

## **1. What happens when you load the extension?**

* When you go to `chrome://extensions` and **Load Unpacked**, Chrome reads `manifest.json`.
* The **manifest** tells Chrome:

  * “This extension has a popup UI (popup.html)”
  * “This extension has a background service worker (background/index.js)”
  * “Inject this content script (content/index.js) into every page”
  * “This extension also has an options page (options.html)”

Chrome then **copies these into memory** and loads them.

---

## **2. Popup (React App)**

* **popup.html** is the HTML file that loads when you click the extension icon.
* Inside it, we mount a **React app** (`popup/index.tsx → App.tsx`) that builds the UI (using Tailwind).
* Vite **compiles** React+TS into a simple JS bundle, Chrome just runs it.
* This is like a tiny web app, but **it only lives while the popup is open**.

**Example:**
When you click the popup’s button, you can use `chrome.runtime.sendMessage()` to talk to the background script.

---

## **3. Background Script (Service Worker)**

* `background/index.ts` runs **all the time**, even when the popup is closed.
* It listens for **browser events** (like install, tab updates, messages).
* It’s like your extension’s **brain** that coordinates tasks.

**Example:**

```ts
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed!");
});
```

This fires when you install the extension.

---

## **4. Content Script**

* `content/index.ts` is **injected into web pages** that match the `"matches": ["<all_urls>"]` rule in the manifest.
* It runs **in the context of the page**, meaning it can **read and modify DOM**.

**Example:**

```ts
console.log("Content script running!");
document.body.style.border = "5px solid red";
```

When you open any website, the border changes — because the content script is modifying the page.

---

## **5. Options Page**

* `options.html` + React app gives a **settings page** for your extension.
* You can save data to `chrome.storage.sync` (Chrome’s key-value storage).

**Example:**

```ts
chrome.storage.sync.set({ theme: "dark" });
```

---

## **6. How They Communicate**

* **Popup → Background**:

  ```ts
  chrome.runtime.sendMessage({ type: "PING" });
  ```
* **Content → Background**:

  ```ts
  chrome.runtime.sendMessage({ action: "highlightText" });
  ```
* **Background → Content** (injecting code):

  ```ts
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => alert("Hello from background!")
  });
  ```

This **separation** makes extensions secure and modular.

---

## **7. Why Vite & Multi-Entry Build?**

By default, Vite builds **one app**.
But we need **4 separate outputs**:

* `popup.html → dist/popup/index.js`
* `options.html → dist/options/index.js`
* `background/index.ts → dist/background/index.js`
* `content/index.ts → dist/content/index.js`

That’s why we **manually tell Vite** in `vite.config.ts`:

```ts
input: {
  popup: resolve(__dirname, 'popup.html'),
  options: resolve(__dirname, 'options.html'),
  background: resolve(__dirname, 'src/background/index.ts'),
  content: resolve(__dirname, 'src/content/index.ts'),
},
```

This ensures each part is compiled **independently**.

---

## **In short:**

* **Popup** = UI that opens when you click the extension icon.
* **Background** = Always running service worker (handles events & messaging).
* **Content** = Code injected into web pages.
* **Options** = Settings page for your extension.
* **Manifest** = The blueprint that tells Chrome how to assemble it.
* **Vite** = Compiles everything into a neat `dist/` folder ready for Chrome.


**Flowchart:**

[ You click extension icon ]
           ↓
[ Chrome loads popup.html ]
           ↓
[ React App (popup/index.tsx) runs ]
           ↓
[ Popup sends a message → Background ]
           ↓
[ Background script (background/index.ts) is always alive ]
           ↓
[ Background can: 
     - Save data (chrome.storage)
     - Inject scripts
     - Talk to content scripts
]
           ↓
[ Content script (content/index.ts) runs in web pages ]
           ↓
[ Content can read/change the page DOM ]


