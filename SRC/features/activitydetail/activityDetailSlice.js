import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { activityDetailService } from "../activitydetail/activityDtailService";
export const activityDetailHandler=createAsyncThunk("detail/activity",async(userData,thunkAPI)=>{
    try {
        return await activityDetailService.activityDetailServices(userData)
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
export const activityDetailSlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(activityDetailHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(activityDetailHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(activityDetailHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default activityDetailSlice.reducer