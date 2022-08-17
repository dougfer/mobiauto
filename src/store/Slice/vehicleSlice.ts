import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type State = {
  brand: string
  model: string
  year: string
  value: string
}

const initialState = {
  brand: '',
  model: '',
  year: ''
} as State

export const vehicleSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    updateCarInfo: (state, action: PayloadAction<State>) => {
      Object.assign(state, action.payload)
    },

  },
})

export const { updateCarInfo } = vehicleSlice.actions

// export const selectCount = (state: RootState) => state.vehicle

export default vehicleSlice.reducer
