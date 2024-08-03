import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { meetingService } from "../schedulemeeting/meetingService";
export const meetingHandler=createAsyncThunk("speaker/meeting",async(userData,thunkAPI)=>{
    try {
        return await meetingService.meetingServices(userData)
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
export const meetingSlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(meetingHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(meetingHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(meetingHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default meetingSlice.reducer