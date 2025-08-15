import { call, put, takeLatest } from 'redux-saga/effects'
import apiClient from '../utils/apiClient'
import {
  fetchDataFailure,
  fetchDataRequest,
  fetchDataSuccess,
} from '../slices/dataSlice'

function* fetchDataWorker(): Generator {
  try {
    const response = yield call(apiClient.get, '/my-endpoint')
    yield put(fetchDataSuccess(response.data))
  } catch (error: any) {
    console.log(error)
    yield put(fetchDataFailure(error.message || 'Failed to fetch data'))
  }
}

export default function* dataSaga() {
  yield takeLatest(fetchDataRequest.type, fetchDataWorker)
}

// import { call, put, takeLatest, delay } from 'redux-saga/effects'
// import { fetchRequest, fetchSuccess, fetchError } from '../slices/dataSlice'
// import { apiFetch } from '../api'

// // configurable constants
// const API_URL = 'https://api.example.com/data' // <-- replace with your production API
// const MAX_RETRIES = 3

// function* handleFetch() {
//   let attempt = 0
//   try {
//     while (attempt < MAX_RETRIES) {
//       try {
//         const data = yield call(apiFetch, API_URL)
//         // data validation could go here
//         yield put(fetchSuccess(data))
//         return
//       } catch (err: any) {
//         attempt += 1
//         if (attempt >= MAX_RETRIES) throw err
//         // exponential backoff
//         yield delay(500 * Math.pow(2, attempt - 1))
//       }
//     }
//   } catch (err: any) {
//     yield put(fetchError(err?.message || 'Unknown error'))
//   }
// }

// export default function* watchFetchData() {
//   yield takeLatest(fetchRequest.type, handleFetch as any)
// }
