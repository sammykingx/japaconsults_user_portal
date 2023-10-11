// jshint esversion:6
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

// Define your tags here for user section
const userTags: string[] = []

// Define your tags here for admin section
const adminTags: string[] = []

// Define your base query function
const baseQuery = fetchBaseQuery({

    // Target URL
    baseUrl: "https://japaconsults.sammykingx.tech/",

    // Prepare headers for all requests sent to the server
    prepareHeaders(headers, api) {

        // By default, if we have a token in the store, let's use that for authenticated requests
        const token = (api.getState() as RootState).auth.token;

        // If we have the token set in state, we set it in the request header for every request we send
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        // Return the new modified headers object
        return headers;
    },

    // Indicate whether credentials will be sent with the request always
    // credentials: "include",

    // A number in milliseconds that represents that maximum time a request can take before timing out.
    timeout: 20000,
})

// Export appSlice to make reducer and middleware available
export const emptySplitApi = createApi({

    // Unique key to mount service to the store
    reducerPath: "api",

    // Add the baseQuery function
    baseQuery,

    // Tags for invalidation of cache
    tagTypes: [...userTags, ...adminTags],

    // Refetch when network connection
    refetchOnReconnect: true,

    // Make use of query injections
    // Don't add your endpoints here, make use of injections i.e. code splitting
    // So as to reduce the initial bundle size of the code
    endpoints: () => ({})
})