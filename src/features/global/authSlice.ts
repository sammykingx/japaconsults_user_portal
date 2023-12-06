import { createSlice } from "@reduxjs/toolkit"
import { authAPI } from "@/app/services/auth"
import { USERROLES } from "@/data/global/auth"
import { userAPI } from "@/app/services/user/userAPI"

// Define the type for the AuthState
type AuthStateType = {
    token?: string | null
    admin: {} | null
    user: {
        sub: number,
        name: string,
        email: string,
        role: USERROLES,
        img: string | null,
        is_verified: boolean,
        iat: number,
        exp: number
    } | null
    userProfile: {
        user_id: number
        name: string
        email: string
        phone_num: string
        role: USERROLES
        is_verified: boolean
        profile_pic: null | string
    } | null
}

// Define the initial state
const initialState: AuthStateType = {
    token: null,
    admin: null,
    user: null,
    userProfile: null
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
        // Clear persisted state
        // builder.addCase(PURGE, (state) => {
        //     customEntityAdapter.removeAll(state);
        // });

        // LOAD USER AUTH STATE
        builder.addMatcher(authAPI.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.token = payload.access_token
        })

        // LOAD USER PROFILE
        builder.addMatcher(userAPI.endpoints.getUserProfile.matchFulfilled, (state, { payload }) => {
            state.userProfile = payload
        })

        // LOAD USER AUTH STATE
        builder.addMatcher(authAPI.endpoints.signup.matchFulfilled, (state, { payload }) => {
            state.token = payload.token
        })
    }
})

// Export Slice Reducer
export const AuthSliceReducer = AuthSlice.reducer;

// Export Auth Slice Actions
export const AuthSliceActions = AuthSlice.actions;