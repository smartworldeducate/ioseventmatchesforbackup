import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { alleventService } from "../allevents/alleventService";
export const eventsListHandler=createAsyncThunk("all/events",async(userData,thunkAPI)=>{
    try {
        return await alleventService.eventListServices(userData)
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
export const eventsListSlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(eventsListHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(eventsListHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(eventsListHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default eventsListSlice.reducer