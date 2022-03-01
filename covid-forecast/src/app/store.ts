import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import forecastReducer from '../features/forecastGraph/forecastSlice';
import filterReducer from '../features/filter/filterSlice'
export const store = configureStore({
  reducer: {
    forecast: forecastReducer,
    filter: filterReducer
  },
  devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
