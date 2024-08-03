import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { registerService } from "../register/registerServices";
export const registerUserHandler=createAsyncThunk("register/user",async(userData,thunkAPI)=>{
    try {
        return await registerService.regiterServices(userData)
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
export const registerUserSlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(registerUserHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(registerUserHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(registerUserHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default registerUserSlice.reducer