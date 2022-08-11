import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { BrandResponse, ModelResponse } from 'src/types'

const initialState = {
  anos: [],
  modelos: []
} as ModelResponse

export const vehicleSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    updateModel: (state, action: PayloadAction<ModelResponse>) => {
      state.anos = action.payload.anos
      state.modelos = action.payload.modelos
    },
    updateYear: (state, action: PayloadAction<BrandResponse>) => {
      // state.year.push(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateModel, updateYear } = vehicleSlice.actions

// export const selectCount = (state: RootState) => state.vehicle

export default vehicleSlice.reducer
