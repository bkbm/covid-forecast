import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootStateOrAny } from 'react-redux'
import type { RootState } from '../../app/store'

export interface DailyPoint {
    date: string,
    cases: number | undefined,
    predictedCases: number,
    deaths: number | undefined
    predictedDeaths: number
}

export interface forecastState {
    [index: string]: DailyPoint
}


const initialState: forecastState = {1: { date: "2022-1-31", cases: 5, predictedCases: 6, deaths: 2, predictedDeaths: 3}}

export const forecastSlice = createSlice({
    name: 'forecast',
    initialState,
    reducers: {
        dataLoaded: (state, action:PayloadAction<forecastState>) => {
            return action.payload
        }
    },
    extraReducers: builder => {
        builder
                .addCase(fetchData.fulfilled, (state, action) => {
                    for (const key in action.payload) {
                        if (Object.prototype.hasOwnProperty.call(action.payload, key)) {
                            const element = action.payload[key];
                            state[key] = element;
                        }
                    }
                })
    }
})

export const fetchData = createAsyncThunk('forecast/fetchData', async () => {
    console.log('hi')
    const response = await axios.get("http://localhost:8000/data/");
    return response.data
})

export const {dataLoaded} = forecastSlice.actions
export const a = forecastSlice.caseReducers

export const selectForecast = (state: RootState) => state.forecast
export const selectForecastAsArray = (state : RootState) => {
    const out : DailyPoint[] = []
    for (const key in state.forecast) {
        if (Object.prototype.hasOwnProperty.call(state.forecast, key)) {
            const element = state.forecast[key];
            out.push(element)
        }
    }
    return out
}

export default forecastSlice.reducer