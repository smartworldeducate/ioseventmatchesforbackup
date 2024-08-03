import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getAppVersionService } from "../getappversion/getAppVersionService";
export const getAppVersionHandler=createAsyncThunk("app/version",async(userData,thunkAPI)=>{
    try {
        return await getAppVersionService.getAppVersionServices(userData)
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
export const getAppVersionSlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAppVersionHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(getAppVersionHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(getAppVersionHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default getAppVersionSlice.reducer