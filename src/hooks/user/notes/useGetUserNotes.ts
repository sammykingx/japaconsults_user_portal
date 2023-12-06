// jshint esversion:6
import { useGetUserNotesQuery } from "@/app/services/user/notes"

export const useGetUserNotesHook = () => {

    // Get All User Notes
    const { data, isLoading, isFetching, isError, error } = useGetUserNotesQuery(undefined, { refetchOnMountOrArgChange: true })

    return (
        { data, isLoading, isFetching, isError, error }
    )
}