import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Coordinate {
  lat: number
  lng: number
}

interface Bounds {
  topLeft: Coordinate
  topRight: Coordinate
  bottomLeft: Coordinate
  bottomRight: Coordinate
}

interface MapState {
  bounds: Bounds
}

const initialState: MapState = {
  bounds: {
    topLeft: { lat: 0, lng: 0 },
    topRight: { lat: 0, lng: 0 },
    bottomLeft: { lat: 0, lng: 0 },
    bottomRight: { lat: 0, lng: 0 }
  }
}

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setBounds: (state: any, action: PayloadAction<Bounds>) => {
      state.bounds = action.payload
    }
  }
})

export const { setBounds } = mapSlice.actions

const store = configureStore({
  reducer: {
    map: mapSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
