import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { scanerPostService } from "../scanerpostdata/scanerPostService";
export const scanerPostHandler=createAsyncThunk("scaner/post",async(userData,thunkAPI)=>{
    try {
        return await scanerPostService.scanerPostServices(userData)
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
export const scanerPostSlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(scanerPostHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(scanerPostHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(scanerPostHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default scanerPostSlice.reducer