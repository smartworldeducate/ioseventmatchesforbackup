import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { adminService } from "../adminlist/adminService";
export const adminListHandler=createAsyncThunk("user/email",async(userData,thunkAPI)=>{
    try {
        return await adminService.adminListServices(userData)
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
export const adminListSlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(adminListHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(adminListHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(adminListHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default adminListSlice.reducer