import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// import { Action } from "@remix-run/router"
import authService from "./authService"


// Get user from local storage
const user = JSON.parse(localStorage.getItem('user'))
// Get data from local storage
// const data = JSON.parse(localStorage.getItem('data'))
// console.log(data)

const initialState = {
  user: user ? user : null,
  // data: data ? data : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Register new user
export const register = createAsyncThunk(
    'auth/register',
    async(user, thunkAPI) => {
        try {
            return await authService.register(user)
        } catch (error) {
          debugger;
            const message = error.response.data
            return thunkAPI.rejectWithValue(message)
        }
})

//Login user
export const login = createAsyncThunk(
    'auth/login',
    async(user, thunkAPI) => {
        try {
            return await authService.login(user)
        } catch (error) {
          const message = error.response.data   
          return thunkAPI.rejectWithValue(message)
        }
})

//Logout user
export const logout = createAsyncThunk(
  'auth/logout', 
  async() =>{
    await authService.logout()
})

//Place order
export const placeOrder = createAsyncThunk(
  'auth/placeOrder',
  async(orderdata, thunkAPI) => {
      try {
          return await authService.placeOrder(orderdata)
      } catch (error) {
        const message = error.response.data   
        return thunkAPI.rejectWithValue(message)
      }
})

//Add data by admin
export const additems = createAsyncThunk(
  'auth/additems',
  async(detail, thunkAPI) => {
      try {
          return await authService.additems(detail)
      } catch (error) {
          const message = error.response.data;
          return thunkAPI.rejectWithValue(message)
      }
})

//GetData from all
// export const getdata = createAsyncThunk('auth/getdata',
//   async(thunkAPI) => {
//       try {
//           return await authService.getdata()
//       } catch (error) {
//           const message = error.response.data
//           return thunkAPI.rejectWithValue(message)
//       }
// })

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset: (state) => {
            state.isLoading =false
            state.isError =false
            state.isSuccess =false
            state.message =''
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(register.pending, (state) =>{
            state.isLoading = true
          })
          .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            // state.user = action.payload
          })
          .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
          })



          .addCase(login.pending, (state) =>{
            state.isLoading = true
          })
          .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
          })
          .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
          })


          .addCase(logout.fulfilled, (state) => {
            state.user = null
            state.data = null
          })


          .addCase(additems.pending, (state) =>{
            state.isLoading = true
          })
          .addCase(additems.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            // state.user = action.payload
          })
          .addCase(additems.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            // state.user = null
          })


          // .addCase(getdata.pending, (state) =>{
          //   state.isLoading = true
          // })
          // .addCase(getdata.fulfilled, (state, action) => {
          //   state.isLoading = false
          //   state.isSuccess = true
          //   state.data = action.payload
          // })
          // .addCase(getdata.rejected, (state, action) => {
          //   state.isLoading = false
          //   state.isError = true
          //   state.message = action.payload
          //   state.data = null
          // })
    },
})

export const {reset} = authSlice.actions
export default authSlice.reducer