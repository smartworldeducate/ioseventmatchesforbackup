import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { bookServices } from "../bookuserstatus/bookService";
export const bookUserHandler=createAsyncThunk("book/status",async(userData,thunkAPI)=>{
    try {
        return await bookServices.bookService(userData)
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
export const bookUserSlice=createSlice({
    name:'cratetag',
    initialState:initialState,
    reducers:{
        resetState: (state) => initialState 
    },
    extraReducers:(builder)=>{
        builder.addCase(bookUserHandler.pending,(state)=>{
            state.isLoading=true
        }).addCase(bookUserHandler.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.user=action.payload
        }).addCase(bookUserHandler.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.isSuccess=false,
            state.message=action.error
        })
    }
})


export default bookUserSlice.reducer