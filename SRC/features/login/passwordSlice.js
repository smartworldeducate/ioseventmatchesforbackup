import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { passwordService } from "../login/passwordServices";
export const verifyPasswordHandler=createAsyncThunk("user/email",async(userData,thunkAPI)=>{
    try {
        return await passwordService.verifyPasswordServices(userData)
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
export const verifyPasswordSlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(verifyPasswordHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(verifyPasswordHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(verifyPasswordHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default verifyPasswordSlice.reducer