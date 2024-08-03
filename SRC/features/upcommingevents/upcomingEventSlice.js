import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { futureEventsService } from "../upcommingevents/upcomingEventService";
export const futureEventHandler=createAsyncThunk("future/event",async(userData,thunkAPI)=>{
    try {
        return await futureEventsService.futureEentServices(userData)
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
export const futureEventSlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(futureEventHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(futureEventHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(futureEventHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default futureEventSlice.reducer