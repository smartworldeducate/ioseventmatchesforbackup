import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { speakersService } from "../sponser/speakerService";
export const sponserHandler=createAsyncThunk("sponser/list",async(userData,thunkAPI)=>{
    try {
        return await speakersService.speakerServices(userData)
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
export const sponserSlice=createSlice({
    name:'sponser',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(sponserHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(sponserHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(sponserHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default sponserSlice.reducer