import {createSlice} from '@reduxjs/toolkit'

/** Initial statte that we want to track */
const initialState = {
  status : false,
  userData : null
};

/** Tracking is user Authenticated == true or false */
const authSlice = createSlice({
  name : "auth",
  initialState,
  reducers : {
    login : (state, action) => {
      state.status = true
      state.userData = action.payload
    },
    logout : (state) => {
      state.status = false
      state.userData = null
    },
    
  }
})

export const {login, logout} = authSlice.actions
export default authSlice.reducer