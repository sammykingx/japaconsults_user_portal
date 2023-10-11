// jshint esversion:6
import { configureStore } from "@reduxjs/toolkit";
import { emptySplitApi } from "./services/api";
import { unauthenticatedMiddleware } from "./middleware";
import { AuthSliceReducer } from "@/features/global/authSlice";

// Export reducers here
export const store = configureStore({
    reducer: {
        // Reducer for Auth Features
        auth: AuthSliceReducer,

        // Add the generated reducer as a specific top-level slice
        [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    },

    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([unauthenticatedMiddleware, emptySplitApi.middleware,]),
})

// Infer the `RootState` and `AppDispatch` types from the store itself          
export type RootState = ReturnType<typeof store.getState>

// AppDispatch type
export type AppDispatch = typeof store.dispatch                 