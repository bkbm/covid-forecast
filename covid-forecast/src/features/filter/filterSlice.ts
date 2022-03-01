import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface FilterState {
    cases: boolean,
    casesForecast: boolean,
    deaths: boolean,
    deathsForecast: boolean
}

const initialState: FilterState = {
    cases: false,
    casesForecast: false,
    deaths: false,
    deathsForecast:false
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        casesFilterToggle: state => {
            state.cases = !state.cases
        },
        casesForecastFilterToggle: state => {
            state.casesForecast = !state.casesForecast
        },
        deathsFilterToggle: state => {
            state.deaths = !state.deaths
        },
        deathsForecastFilterToggle: state => {
            state.deathsForecast = !state.deathsForecast
        },
    }
})

export const {casesFilterToggle, casesForecastFilterToggle, deathsFilterToggle, deathsForecastFilterToggle} = filterSlice.actions

export const selectCasesFilter = (state: RootState) => state.filter.cases
export const selectCasesForecastFilter = (state: RootState) => state.filter.casesForecast
export const selectDeathsFilter = (state: RootState) => state.filter.deaths
export const selectDeathsForecastFilter = (state: RootState) => state.filter.deathsForecast
 
export default filterSlice.reducer