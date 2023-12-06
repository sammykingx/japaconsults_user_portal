// jshint esversion:6
import { emptySplitApi } from "../../api";
import {
    GetAllUsersResponse, GetAllAdminsResponse,
    GetAllManagersResponse, GetAllStaffsResponse, UpdateUserRoleRequest, UpdateUserRoleResponse
} from "@/data/admin/users";

export const usersAPI = emptySplitApi.injectEndpoints({

    endpoints: (builder) => ({
        // Get all users
        getAllUsers: builder.query<GetAllUsersResponse, void>({
            query: () => ({
                url: `/user/allUsers`,
            }),
            providesTags: ['GET_ALL_USERS']
        }),

        // Get all admins
        getAllAdmins: builder.query<GetAllAdminsResponse, void>({
            query: () => ({
                url: `/user/allAdmin`,
            }),
            providesTags: ['GET_ALL_ADMINS']
        }),

        // Get all managers
        getAllManagers: builder.query<GetAllManagersResponse, void>({
            query: () => ({
                url: `/user/managers`,
            }),
            providesTags: ['GET_ALL_MANAGERS']
        }),

        // Get all staffs
        getAllStaffs: builder.query<GetAllStaffsResponse, void>({
            query: () => ({
                url: `/user/staffs`,
            }),
            providesTags: ['GET_ALL_STAFFS']
        }),

        // delete user file
        updateUserRole: builder.mutation<UpdateUserRoleResponse, UpdateUserRoleRequest>({
            query: (credentials) => ({
                url: `user/changeRole`,
                method: "PATCH",
                body: credentials
            }),
        }),
    })
})

export const {
    useGetAllUsersQuery, useGetAllAdminsQuery, useUpdateUserRoleMutation,
    useGetAllManagersQuery, useGetAllStaffsQuery, useLazyGetAllAdminsQuery, useLazyGetAllManagersQuery, useLazyGetAllStaffsQuery, useLazyGetAllUsersQuery, } = usersAPI