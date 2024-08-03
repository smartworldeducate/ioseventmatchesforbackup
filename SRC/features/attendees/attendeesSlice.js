import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { attendeeService } from "../attendees/attendessService";
export const attendeeHandler=createAsyncThunk("attendee/list",async(userData,thunkAPI)=>{
    try {
        return await attendeeService.attendeeServices(userData)
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
export const attendeeSlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(attendeeHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(attendeeHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(attendeeHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default attendeeSlice.reducer