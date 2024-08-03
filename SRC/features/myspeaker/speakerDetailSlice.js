import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { speakerDetailsService } from "../myspeaker/speakerDetailService";
export const speakerDetailHandler=createAsyncThunk("speaker/detail",async(userData,thunkAPI)=>{
    try {
        return await speakerDetailsService.speakerDetailServices(userData)
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
export const speakerDetailSlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(speakerDetailHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(speakerDetailHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(speakerDetailHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default speakerDetailSlice.reducer