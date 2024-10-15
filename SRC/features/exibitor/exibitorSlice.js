import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { speakersService } from "../exibitor/speakerService";
export const exibitorHandler=createAsyncThunk("exibitor/list",async(userData,thunkAPI)=>{
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
export const exibitorSlice=createSlice({
    name:'exibitor',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(exibitorHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(exibitorHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(exibitorHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default exibitorSlice.reducer