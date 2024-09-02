import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import Cookies from "js-cookie"


const initialState={
  data:{},
  error:null,
  pending:null

}

const baseurl=`https://cyparta-backend-gf7qm.ondigitalocean.app/api/`


export const LoginAction =createAsyncThunk("login" ,async(formdata)=>{
  
    try{
        const response = await axios.post(`${baseurl}login/`,formdata)
        const res = response.data;
        Cookies.set('token',res.access)
        return res;
        
    }
    catch(err){
        console.error(err.response?.data)
        return err.response?.data;
    }

})



export const AuthSlice =createSlice({
    name: "Auth",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder
        .addCase(LoginAction.pending,(state)=>{

            state.pending = true;
            state.error = false;
        })
        .addCase(LoginAction.fulfilled,(state,action)=>{

            state.data = action.payload;
            state.error = false;
            state.pending = false;
        })
        .addCase(LoginAction.rejected,(state)=>{

            state.pending = false;
            state.error = true;
        })
    }

})

export default AuthSlice.reducer;