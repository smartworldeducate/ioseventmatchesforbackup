import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getShortListAttendeeService } from "../getshortlistattndee/shortListAttendeeService";
export const getShortListAttendeeHandler=createAsyncThunk("shortlist/attendee",async(userData,thunkAPI)=>{
    try {
        return await getShortListAttendeeService.getShortListAttendeeServices(userData)
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
export const getShortListAttendeeSlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getShortListAttendeeHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(getShortListAttendeeHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(getShortListAttendeeHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default getShortListAttendeeSlice.reducer