import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SliderState{
    value: number
}

const initialState: SliderState = {value: 2};

export const SliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {
        changeValue: (state, action:PayloadAction<number>) =>{
            return {value: action.payload} 
        }
    }
})