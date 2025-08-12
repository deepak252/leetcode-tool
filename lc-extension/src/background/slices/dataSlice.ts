import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { DataState } from '../types'

type Item = { id: string; title: string }

const initialState: DataState<Item[]> = {
  status: 'idle',
  data: null,
  error: null,
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    fetchDataRequest(state) {
      state.status = 'loading'
      state.error = null
    },
    fetchDataSuccess(state, action: PayloadAction<Item[]>) {
      state.status = 'success'
      state.data = action.payload
      state.error = null
    },
    fetchDataFailure(state, action: PayloadAction<string>) {
      state.status = 'error'
      state.error = action.payload
    },
    clearData(state) {
      state.status = 'idle'
      state.data = null
      state.error = null
    },
  },
})

export const {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
  clearData,
} = dataSlice.actions
export default dataSlice.reducer
