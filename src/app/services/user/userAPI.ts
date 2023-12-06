// jshint esversion:6
import { emptySplitApi } from "../api";
import { GetUserProfileResponse } from "@/data/users";
import { UpdateProfilePictureResponse } from "@/data/users/global";

export const userAPI = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get user profile
        getUserProfile: builder.query<GetUserProfileResponse, void>({
            query: () => ({ url: "user/profile" }),
            providesTags: ['GET_PROFILE']
        }),

        updateProfilePicture: builder.mutation<UpdateProfilePictureResponse, FormData>({
            query: (credentials) => ({
                url: "user/profilePic",
                method: "POST",
                body: credentials
            }),
            invalidatesTags: ['GET_PROFILE']
        })
    })
})

export const { useLazyGetUserProfileQuery, useUpdateProfilePictureMutation } = userAPI