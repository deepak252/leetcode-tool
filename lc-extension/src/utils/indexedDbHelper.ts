export async function getProblemCodeFromIndexedDB(
  dbName: string,
  storeName: string,
  keyPrefix: string
): Promise<{ key: string; value: any } | null> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const tx = db.transaction(storeName, 'readonly')
      const store = tx.objectStore(storeName)

      const allKeysReq = store.getAllKeys()

      allKeysReq.onsuccess = () => {
        const matchedKey = (allKeysReq.result as string[]).find((k) =>
          k.startsWith(keyPrefix)
        )

        if (!matchedKey) {
          resolve(null)
          return
        }

        const valueReq = store.get(matchedKey)
        valueReq.onsuccess = () =>
          resolve({ key: matchedKey, value: valueReq.result })
        valueReq.onerror = () => reject(valueReq.error)
      }

      allKeysReq.onerror = () => reject(allKeysReq.error)
    }
  })
}
