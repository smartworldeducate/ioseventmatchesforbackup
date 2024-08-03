import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { userScheduleService } from "../userschedule/userScheduleService";
export const userScheduleHandler=createAsyncThunk("user/userSchedul",async(userData,thunkAPI)=>{
    try {
        return await userScheduleService.userScheduleServices(userData)
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
export const userScheduleSlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(userScheduleHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(userScheduleHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(userScheduleHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default userScheduleSlice.reducer