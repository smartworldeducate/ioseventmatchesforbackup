import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { pastEventsService } from "../pastevents/pastEventService";
export const pastEventHandler=createAsyncThunk("past/event",async(userData,thunkAPI)=>{
    try {
        return await pastEventsService.pastEentServices(userData)
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
export const pastEventSlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(pastEventHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(pastEventHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(pastEventHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default pastEventSlice.reducer