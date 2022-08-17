import { configureStore } from '@reduxjs/toolkit'
import vehicleReducer from './Slice/vehicleSlice'
import { carInfoApi } from 'src/service/vehicle'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    vehicle: vehicleReducer,
    [carInfoApi.reducerPath]: carInfoApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(carInfoApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch