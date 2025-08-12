import { fetchDataRequest } from './slices/dataSlice'
import type { MessageRequest } from './types'
import type { Store } from '@reduxjs/toolkit'

export function registerMessageHandlers(store: Store) {
  chrome.runtime.onMessage.addListener(
    (msg: MessageRequest, sender, sendResponse) => {
      try {
        if (!msg || typeof msg !== 'object') return
        switch (msg.type) {
          case 'FETCH_DATA_REQUEST': {
            // dispatch saga-driven request in background store
            store.dispatch(fetchDataRequest())
            // we will respond once store updates by subscribing
            const unsub = store.subscribe(() => {
              const state: any = (store as any).getState()
              if (state.data?.status === 'success') {
                sendResponse({ ok: true, data: state.data.data })
                unsub()
              }
              if (state.data?.status === 'error') {
                sendResponse({ ok: false, error: state.data.error })
                unsub()
              }
            })
            // return true to indicate async sendResponse
            return true
          }
          case 'GET_STATE': {
            const state = (store as any).getState()
            if (msg.payload?.slice)
              sendResponse({ ok: true, data: state[msg.payload.slice] })
            else sendResponse({ ok: true, data: state })
            break
          }
          case 'PING': {
            sendResponse({ ok: true, ts: Date.now() })
            break
          }
        }
      } catch (e) {
        sendResponse({ ok: false, error: (e as Error).message })
      }
    }
  )
}
