import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { feedBackService } from "../feedback/feedBackService";
export const feedBackHandler=createAsyncThunk("feed/back",async(userData,thunkAPI)=>{
    try {
        return await feedBackService.feedBackServices(userData)
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
export const feedBackSlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(feedBackHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(feedBackHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(feedBackHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default feedBackSlice.reducer