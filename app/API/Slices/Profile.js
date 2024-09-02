import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import Cookies from "js-cookie"

const initialState={
    user_data:{},
    error:null,
    pending:null
  
}

const baseurl=`https://cyparta-backend-gf7qm.ondigitalocean.app/api/`

const token =Cookies.get('token')
console.log(token)
export const GetUserData =createAsyncThunk("get/userdata",async()=>{
  
    try{
      const response = await axios.get(`${baseurl}profile/`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
      })
      const res =response.data;
      
      if(response.status ===200){
        return res

      }
      

    }
    catch(err){
        console.error(err.response.data)
    return err.response.data
    }
    

})

export const UpdateUserData =createAsyncThunk("get/userdata",async(data)=>{
  
    try{
      const response = await axios.patch(`${baseurl}profile/`,data,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
      })
      const res =response.data
      if(response.status ===200){
        return res

      }

    }
    catch(err){
        console.error(err.response.data)
    return err.response.data
    }
    

})

export const ProfileSlice =createSlice({
    name: "Profile",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder
        .addCase(GetUserData.pending,(state)=>{

            state.pending = true;
            state.error = false;
        })
        .addCase(GetUserData.fulfilled,(state,action)=>{

            state.data = action.payload;
            state.error = false;
            state.pending = false;
        })
        .addCase(GetUserData.rejected,(state)=>{

            state.pending = false;
            state.error = true;
        })
    }

})

export default ProfileSlice.reducer;