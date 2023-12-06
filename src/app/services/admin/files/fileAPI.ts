// jshint esversion:6
import { emptySplitApi } from "../../api";
import {
    GetAllFilesUploadedResponse, GetUserFilesRequest,
    GetUserFilesResponse, DeleteUserFileRequest, DeleteUserFileResponse
} from "@/data/admin/files";

export const fileAPI = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllFilesUploaded: builder.query<GetAllFilesUploadedResponse, void>({
            query: () => ({
                url: `documents/allFiles`,
            }),
            providesTags: ['GET_ALL_FILES']
        }),

        // Get USER FILE
        getUserFile: builder.query<GetUserFilesResponse, GetUserFilesRequest>({
            query: (params) => ({
                url: `documents/userfiles`,
                params,
            }),
            providesTags: ['GET_USER_FILES']
        }),

        // delete user file
        adminDeleteUserFile: builder.mutation<DeleteUserFileResponse, DeleteUserFileRequest>({
            query: (params) => ({
                url: `documents/removeUserFile`,
                method: "DELETE",
                params
            }),
            invalidatesTags: ['GET_USER_FILES']
        }),
    })
})

export const {
    useGetAllFilesUploadedQuery, useGetUserFileQuery,
    useLazyGetUserFileQuery, useAdminDeleteUserFileMutation
} = fileAPI