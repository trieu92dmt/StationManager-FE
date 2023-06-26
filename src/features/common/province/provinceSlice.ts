import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { ApiSuccessResponse, District, ListParams } from "models";

export interface ProvinceState{
    list: District[];
    filter?: ListParams;
}

const initialState: ProvinceState = {
    list: [],
    filter: {
        keyword: ''
    }
}

const provinceSlice = createSlice({
    name: 'province',
    initialState,
    reducers: {
        fetchProvinceList(state, action: PayloadAction<ListParams>){
            //Do nothing
        },
        fetchProvinceListSuccess(state, action: PayloadAction<ApiSuccessResponse<District[]>>){
            state.list = action.payload.data
        },
        fetchProvinceListFailed(state, action: PayloadAction<string>){
            //Do nothing
        },

        setFilter(state, action: PayloadAction<ListParams>) {
            state.filter = action.payload
        },
    },
});

//Action
export const provinceAction = provinceSlice.actions;

//Selectors
export const selectProvinceList = (state: RootState) => state.province.list

//Reducer
const provinceReducer = provinceSlice.reducer;
export default provinceReducer;