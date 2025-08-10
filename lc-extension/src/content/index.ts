import { getProblemCodeFromIndexedDB } from '@/utils/indexedDbHelper'
import { fetchQuestionDetails } from '@/utils/leetcodeApi'

console.log('Content script running!')

function getSlugFromUrl(): string | null {
  const match = window.location.pathname.match(/^\/problems\/([^\/]+)/)
  return match ? match[1] : null
}

async function handleQuestionPage() {
  const slug = getSlugFromUrl()
  if (!slug) return

  console.log(`[Extension] Detected problem: ${slug}`)

  try {
    // Step 1: Fetch question details from LeetCode GraphQL
    const questionData = await fetchQuestionDetails(slug)
    console.log(`[Extension] GraphQL Data:`, questionData)

    // Step 2: Get related problem code from IndexedDB
    const questionId = questionData.questionId
    const indexedDbResult = await getProblemCodeFromIndexedDB(
      'LeetCode-problems',
      'problem_code',
      `${questionId}_`
    )

    if (indexedDbResult) {
      console.log(
        `[Extension] IndexedDB Data for ${indexedDbResult.key}:`,
        indexedDbResult.value
      )
    } else {
      console.warn(`[Extension] No IndexedDB entry found for ${questionId}_`)
    }

    // Step 3: Send combined data to background script
    chrome.runtime.sendMessage({
      type: 'QUESTION_DETAILS_WITH_CODE',
      payload: {
        slug,
        questionData,
        problemCode: indexedDbResult,
      },
    })
  } catch (error) {
    console.error(`[Extension] Failed on ${slug}`, error)
  }
}

handleQuestionPage()

// function injectScript(filePath: string) {
//   const script = document.createElement('script')
//   script.src = chrome.runtime.getURL(filePath)
//   script.onload = () => {
//     script.remove()
//   }
//   console.log(script.src)
//   ;(document.head || document.documentElement).appendChild(script)
// }

// injectScript('injected/index.js')

// Listen for messages from injected script
window.addEventListener('message', (event) => {
  if (event.source !== window) return
  if (event.data.type === 'INDEXEDDB_DATA') {
    console.log('Content script received IndexedDB data:', event.data.payload)

    // Send to background
    chrome.runtime.sendMessage({
      type: 'INDEXEDDB_DATA',
      payload: event.data.payload,
    })
  }
})
