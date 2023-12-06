// jshint esversion:6
import { MutationResultType } from "../../../data/global"
import { getErrorMessage } from "../../../utils/global"
import { useUpdateProfilePictureMutation } from "@/app/services/user"

type updateProfileProp = {
    file: File
}

export const useUpdateUserPictureHook = () => {

    // Login mutation for both users and admin
    const [updatePicture, { isLoading, isError, isSuccess, reset }] = useUpdateProfilePictureMutation()

    async function updateUserProfilePicture(fileData: updateProfileProp): Promise<MutationResultType> {

        // Clear all errors and messages
        let message = ""
        let success = false;
        let data;

        // Build Form
        const formData = new FormData()

        formData.append("file", fileData.file);

        // make request
        try {
            const uploadResponse = await updatePicture(formData).unwrap();
            data = uploadResponse;
            success = true;
        } catch (error) {

            message = getErrorMessage(error);
        }

        return { success, message, data };
    }

    return { updateUserProfilePicture, isLoading, isError, isSuccess, reset };
}