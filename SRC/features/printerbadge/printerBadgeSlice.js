import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getPrintBadgeService } from "../printerbadge/printerBadgeService";
export const getPrintBadgeHandler=createAsyncThunk("printer/badge",async(userData,thunkAPI)=>{
    try {
        return await getPrintBadgeService.getPrintBadgeServices(userData)
    } catch (error) {
       return thunkAPI.rejectWithValue(error) 
    }
})

const initialState={
    user:"",
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}
export const getPrintBadgeSlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getPrintBadgeHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(getPrintBadgeHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(getPrintBadgeHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default getPrintBadgeSlice.reducer