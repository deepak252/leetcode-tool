// export type ApiState<T = any> = {
//   status: 'idle' | 'loading' | 'success' | 'error'
//   data: T | null
//   error?: string | null
// }

// interface DataState {
//   loading: boolean
//   error: string | null
//   data: any
// }

export type DataState<T = any> = {
  status: 'idle' | 'loading' | 'success' | 'error'
  data: T | null
  error?: string | null
}

export type MessageRequest =
  | { type: 'FETCH_DATA_REQUEST'; payload?: { forceRefresh?: boolean } }
  | { type: 'GET_STATE'; payload?: { slice?: string } }
  | { type: 'PING' }

export type MessageResponse = any
