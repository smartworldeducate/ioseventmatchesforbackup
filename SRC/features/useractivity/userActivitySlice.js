import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { useractivityService } from "../useractivity/userActivityService";
export const userActivityHandler=createAsyncThunk("user/activity",async(userData,thunkAPI)=>{
    try {
        return await useractivityService.userActivityServices(userData)
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
export const userActivitySlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(userActivityHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(userActivityHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(userActivityHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default userActivitySlice.reducer