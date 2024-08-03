import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { speakersService } from "../speaker/speakerService";
export const speakerHandler=createAsyncThunk("speaker/list",async(userData,thunkAPI)=>{
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
export const speakerSlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(speakerHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(speakerHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(speakerHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default speakerSlice.reducer