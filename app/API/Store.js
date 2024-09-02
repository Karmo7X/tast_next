// import { AuthSlice } from "./Slices/AuhtSlice";
import authReducer from "./Slices/AuhtSlice";
import ProfileReducer from "./Slices/Profile";
const { configureStore } = require("@reduxjs/toolkit");



 const Store=configureStore({
  reducer:{
    auth: authReducer, 
    profile:ProfileReducer
  }


})


export default Store



