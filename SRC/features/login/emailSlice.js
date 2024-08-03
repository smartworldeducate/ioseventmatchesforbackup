import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { emailService } from "../login/emailServices";
export const verifyEmailHandler=createAsyncThunk("user/email",async(userData,thunkAPI)=>{
    try {
        return await emailService.verifyEmailServices(userData)
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
export const verifiEmailSlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(verifyEmailHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(verifyEmailHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(verifyEmailHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default verifiEmailSlice.reducer