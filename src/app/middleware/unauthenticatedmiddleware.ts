import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { AuthSliceActions } from "@/features/global/authSlice";

// Create a middleware intercept unauthenticated response errors and direct users to authenticate requests
export const unauthenticatedMiddleware: Middleware = ({ dispatch }) => (next) => (action) => {
    if (isRejectedWithValue(action) && action.payload.status == 401) {
        dispatch(AuthSliceActions.logout());
    }

    return next(action);
}