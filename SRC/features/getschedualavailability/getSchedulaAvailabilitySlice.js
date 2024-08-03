import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getScheduleAvailabilityService } from "../getschedualavailability/getScheduleAvailabilityService";
export const getScheduleAvailabilityHandler=createAsyncThunk("getSchedule/availability",async(userData,thunkAPI)=>{
    try {
        return await getScheduleAvailabilityService.getScheduleAvailabilityServices(userData)
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
export const getScheduleAvailabilitySlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getScheduleAvailabilityHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(getScheduleAvailabilityHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(getScheduleAvailabilityHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default getScheduleAvailabilitySlice.reducer