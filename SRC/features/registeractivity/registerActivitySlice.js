import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { registerActivityServicesService } from "../registeractivity/registerActivityService.js";
export const registerActivityHandler=createAsyncThunk("register/activity",async(userData,thunkAPI)=>{
    try {
        return await registerActivityServicesService.registerActivityServices(userData)
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
export const registerActivitySlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(registerActivityHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(registerActivityHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(registerActivityHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default registerActivitySlice.reducer