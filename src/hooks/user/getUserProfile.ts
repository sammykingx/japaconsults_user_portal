// jshint esversion:6
import { useLazyGetUserProfileQuery } from "@/app/services/user";

// Export All Admins List to Admin Email
export const useGetUserProfileHook = () => {

    const [trigger, result, lastPromiseInfo] = useLazyGetUserProfileQuery();

    return (

        {
            trigger, result, lastPromiseInfo
        }
    );

}