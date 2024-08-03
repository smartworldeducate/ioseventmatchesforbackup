import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getFavroitAttendeeService } from "../getFavouriteAttendee/favroitAttendeeService";
export const getFavroitAttendeeHandler=createAsyncThunk("favroit/attendee",async(userData,thunkAPI)=>{
    try {
        return await getFavroitAttendeeService.getFavroitAttendeeServices(userData)
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
export const getFavroitAttendeeSlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getFavroitAttendeeHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(getFavroitAttendeeHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(getFavroitAttendeeHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default getFavroitAttendeeSlice.reducer