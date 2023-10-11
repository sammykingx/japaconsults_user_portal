import { createSlice } from "@reduxjs/toolkit"
import { userAPI } from "@/app/services/user/userAPI"

// Define the type for the AuthState
type AuthStateType = {
    token?: string | null
    admin: {} | null
    user: {} | null
}

// Define the initial state
const initialState: AuthStateType = {
    token: null,
    admin: null,
    user: null
}

// Create the Auth Slice
const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Set user / admin state to null, all protected routes will redirect to login pages
        logout: (state) => {
            state.user = null
            state.admin = null
            state.token = null
        }
    },
    extraReducers: (builder) => { 
        // LOAD USER AUTH STATE
        builder.addMatcher(userAPI.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.token = payload.access_token
        })

        // LOAD USER AUTH STATE
        builder.addMatcher(userAPI.endpoints.signup.matchFulfilled, (state, { payload }) => {
            state.token = payload.token
        })
    }
})

// Export Slice Reducer
export const AuthSliceReducer = AuthSlice.reducer;

// Export Auth Slice Actions
export const AuthSliceActions = AuthSlice.actions;