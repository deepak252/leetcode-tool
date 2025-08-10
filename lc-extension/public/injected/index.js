;(function () {
  const DB_NAME = 'LeetCode-problems'
  const STORE_NAME = 'problem_code'
  const KEY_PREFIX = '1_' // the prefix we want

  console.log('Hello world')

  const request = indexedDB.open(DB_NAME)

  request.onsuccess = function (event) {
    const db = event.target.result

    if (!db.objectStoreNames.contains(STORE_NAME)) {
      console.error(`Store '${STORE_NAME}' not found in DB '${DB_NAME}'.`)
      return
    }

    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    const cursorRequest = store.openCursor()

    const matches = []

    cursorRequest.onsuccess = function (event) {
      const cursor = event.target.result
      if (cursor) {
        if (String(cursor.key).startsWith(KEY_PREFIX)) {
          matches.push({ key: cursor.key, value: cursor.value })
        }
        cursor.continue()
      } else {
        console.log(`Found keys starting with '${KEY_PREFIX}':`, matches)

        window.postMessage(
          {
            type: 'INDEXEDDB_DATA',
            payload: { db: DB_NAME, store: STORE_NAME, matches },
          },
          '*'
        )
      }
    }

    cursorRequest.onerror = function (err) {
      console.error('Error reading store with cursor:', err)
    }
  }

  request.onerror = function (err) {
    console.error('Error opening DB:', err)
  }
})()

// (function () {
//   const DB_NAME = "LeetCode-problems";
//   const STORE_NAME = "problem_code";

//   const request = indexedDB.open(DB_NAME);

//   request.onsuccess = function (event) {
//     const db = event.target.result;

//     if (!db.objectStoreNames.contains(STORE_NAME)) {
//       console.error(`Store '${STORE_NAME}' not found in DB '${DB_NAME}'. Available stores:`, Array.from(db.objectStoreNames));
//       return;
//     }

//     const tx = db.transaction(STORE_NAME, "readonly");
//     const store = tx.objectStore(STORE_NAME);
//     const cursorRequest = store.openCursor();

//     const entries = [];

//     cursorRequest.onsuccess = function (event) {
//       const cursor = event.target.result;
//       if (cursor) {
//         // cursor.key → primary key
//         // cursor.value → value object
//         entries.push({ key: cursor.key, value: cursor.value });
//         cursor.continue();
//       } else {
//         // console.log(`Dump from ${DB_NAME}/${STORE_NAME} (keys + values):`, entries);

//         window.postMessage({
//           type: "INDEXEDDB_DATA",
//           payload: { db: DB_NAME, store: STORE_NAME, entries }
//         }, "*");
//       }
//     };

//     cursorRequest.onerror = function (err) {
//       console.error("Error reading store with cursor:", err);
//     };
//   };

//   request.onerror = function (err) {
//     console.error("Error opening DB:", err);
//   };
// })();
