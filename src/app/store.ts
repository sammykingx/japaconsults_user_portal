// jshint esversion:6
import { configureStore } from "@reduxjs/toolkit";
import { emptySplitApi } from "./services/api";
import { unauthenticatedMiddleware } from "./middleware";
import { AuthSliceReducer } from "@/features/global/authSlice";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "@reduxjs/toolkit";
// import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

// Combine all reducers here
const rootReducer = combineReducers({
    // Reducer for Auth Features
    auth: AuthSliceReducer,

    // Add the generated reducer as a specific top-level slice
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
})

// Persist Configuration
const persistConfig = {
    key: 'japaRoot',
    storage,
    // stateReconciler: autoMergeLevel2,
    timeout: 2000
}

// Create Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)


// Export reducers here
export const store = configureStore({
    // Persisted reducer here
    reducer: persistedReducer,

    devTools: process.env.NODE_ENV !== 'production',

    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({

        // Ignore action types dipatched by redux persist to prevent serializable issues
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat([unauthenticatedMiddleware, emptySplitApi.middleware,]),
})

// Export Persistor
export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself          
export type RootState = ReturnType<typeof store.getState>

// AppDispatch type
export type AppDispatch = typeof store.dispatch                 