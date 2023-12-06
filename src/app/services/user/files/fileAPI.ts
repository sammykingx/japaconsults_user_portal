// jshint esversion:6
import { emptySplitApi } from "../../api";
import {
    UploadUserFileRequest, UploadUserFileResponse,
    GetFilesRequest, GetFilesResponse,
    GetRecentFilesUploadedRequest, GetRecentFilesUploadedResponse, DeleteUserFileRequest, DeleteUserFileResponse
} from "@/data/users/files";

export const fileAPI = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({

        // Get user profile
        uploadFile: builder.mutation<UploadUserFileResponse, UploadUserFileRequest>({
            query: (credentials) => ({
                url: `documents/upload`,
                method: 'POST',
                params: credentials.params,
                body: credentials.body,
            }),
            invalidatesTags: ['GET_FILES']

        }),

        // Get USER FILE
        getFile: builder.query<GetFilesResponse, GetFilesRequest>({
            query: (params) => ({
                url: `documents/myfiles`,
                params,
            }),
            providesTags: ['GET_FILES']
        }),

        // Get Recent File Uploads
        getUserRecentFileUploads: builder.query<GetRecentFilesUploadedResponse, GetRecentFilesUploadedRequest>({
            query: (params) => ({
                url: `documents/recentFiles`,
                params,
            }),
            providesTags: ['GET_FILES']
        }),

        // delete user file
        deleteFile: builder.mutation<DeleteUserFileResponse, DeleteUserFileRequest>({
            query: (params) => ({
                url: `documents/removeMyFile`,
                method: "DELETE",
                params
            }),
            invalidatesTags: ['GET_FILES']
        }),
    })
})

export const { useUploadFileMutation, useGetFileQuery, useGetUserRecentFileUploadsQuery, useDeleteFileMutation, useLazyGetFileQuery} = fileAPI