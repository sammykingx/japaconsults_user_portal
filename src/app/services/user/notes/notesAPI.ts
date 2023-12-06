// jshint esversion:6
import { emptySplitApi } from "../../api";
import {
    GetUserNotesResponse, SaveUserNotesRequest,
    SaveUserNotesResponse, UpdateUserNoteRequest, UpdateUserNoteResponse,
    DeleteUserNoteRequest, DeleteUserNoteResponse, GetReceivedNotesResponse,
    SendNoteRequest, SendNoteResponse
} from "@/data/users/notes";

export const noteAPI = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get user profile
        getUserNotes: builder.query<GetUserNotesResponse, void>({
            query: () => ({
                url: `notes/`,
            }),
            providesTags: ['GET_NOTES']
        }),

        // Save User Note
        saveUserNote: builder.mutation<SaveUserNotesResponse, SaveUserNotesRequest>({
            query: (credentials) => ({
                url: `notes/save`,
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ['GET_NOTES']
        }),

        // Save User Note
        updateUserNote: builder.mutation<UpdateUserNoteResponse, UpdateUserNoteRequest>({
            query: (credentials) => ({
                url: `notes/update`,
                method: "PUT",
                body: credentials,
            }),
            invalidatesTags: ['GET_NOTES']
        }),

        // Save User Note
        deleteUserNote: builder.mutation<DeleteUserNoteResponse, DeleteUserNoteRequest>({
            query: (params) => ({
                url: `notes/delete`,
                method: "DELETE",
                params
            }),
            invalidatesTags: ['GET_NOTES']
        }),

        // Get user profile
        getReceivedNotes: builder.query<GetReceivedNotesResponse, void>({
            query: () => ({
                url: `notes/receivedNotes`,
            }),
        }),

        // Send notes
        sendNote: builder.mutation<SendNoteResponse, SendNoteRequest>({
            query: (credentials) => ({
                url: `notes/sendNotes`,
                method: "POST",
                body: credentials
            }),
            invalidatesTags: ['GET_NOTES']
        }),

    })
})

export const {
    useGetUserNotesQuery, useSaveUserNoteMutation,
    useUpdateUserNoteMutation, useDeleteUserNoteMutation,
    useGetReceivedNotesQuery, useSendNoteMutation
} = noteAPI