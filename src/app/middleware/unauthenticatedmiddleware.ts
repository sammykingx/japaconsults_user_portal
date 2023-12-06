import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { AuthSliceActions } from "@/features/global/authSlice";
// import { createBrowserRouter } from "react-router-dom";

// Create a middleware intercept unauthenticated response errors and direct users to authenticate requests
export const unauthenticatedMiddleware: Middleware = ({ dispatch }) => (next) => (action) => {
    // let history = createBrowserRouter();

    if (isRejectedWithValue(action) && action.payload.status == 401) {
        dispatch(AuthSliceActions.logout());
    }

    if (isRejectedWithValue(action) && action.payload.status == 500) {
        console.log("500 error gotten");
        window.history.pushState({ error: true }, "", "/error");
    }
    return next(action);
}