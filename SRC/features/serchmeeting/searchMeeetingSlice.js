import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { ssearchMeetingService } from "../serchmeeting/searchMeetingService";
export const ssearchMeetingHandler=createAsyncThunk("search/meeting",async(userData,thunkAPI)=>{
    try {
        return await ssearchMeetingService.ssearchMeetingServices(userData)
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
export const ssearchMeetingSlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(ssearchMeetingHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(ssearchMeetingHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(ssearchMeetingHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default ssearchMeetingSlice.reducer