import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { favroitStarService } from "../favroitmeeting/favroitMeetingService";
export const favroitStarHandler=createAsyncThunk("fav/star",async(userData,thunkAPI)=>{
    try {
        return await favroitStarService.favroitStarServices(userData)
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
export const favroitStarSlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(favroitStarHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(favroitStarHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(favroitStarHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default favroitStarSlice.reducer