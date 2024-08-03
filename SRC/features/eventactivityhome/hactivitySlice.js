import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { activityHomeService } from "../eventactivityhome/hactivityService";
export const activityHomeHandler=createAsyncThunk("all/activity",async(userData,thunkAPI)=>{
    try {
        return await activityHomeService.activityServices(userData)
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
export const activitySlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{
        resetState: (state) => initialState 
    },
    extraReducers:(builder)=>{
        builder.addCase(activityHomeHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(activityHomeHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(activityHomeHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export const { resetState } = activitySlice.actions;

export default activitySlice.reducer