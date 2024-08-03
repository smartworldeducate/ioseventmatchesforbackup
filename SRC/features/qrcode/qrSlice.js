import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { qrcodesService } from "../qrcode/qrService";
export const qrcodeHandler=createAsyncThunk("qr/code",async(userData,thunkAPI)=>{
    try {
        return await qrcodesService.qrcodeServices(userData)
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
export const qrcodeSlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(qrcodeHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(qrcodeHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(qrcodeHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})

export default qrcodeSlice.reducer