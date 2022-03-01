import forecastReducer from '../features/forecastGraph/forecastSlice';
import filterReducer from '../features/filter/filterSlice'
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    forecast: forecastReducer,
    filter: filterReducer
})

export default rootReducer;