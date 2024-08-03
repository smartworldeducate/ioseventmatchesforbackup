import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { setAvailabilityStatusService } from "../setavailability/setAvailabilityService";
export const setAvailabilityStatusHandler=createAsyncThunk("setAvailability/status",async(userData,thunkAPI)=>{
    try {
        return await setAvailabilityStatusService.setAvailabilityStatusServices(userData)
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
export const setAvailabilityStatusSlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(setAvailabilityStatusHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(setAvailabilityStatusHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(setAvailabilityStatusHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default setAvailabilityStatusSlice.reducer