import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getDeclineService } from "../decline/confirmDeclineService";
export const getDeclineHandler=createAsyncThunk("decline/confirm",async(userData,thunkAPI)=>{
    try {
        return await getDeclineService.getDeclineServices(userData)
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
export const getDeclineSlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getDeclineHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(getDeclineHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(getDeclineHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default getDeclineSlice.reducer