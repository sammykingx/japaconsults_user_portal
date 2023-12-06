// jshint esversion:6
import { useAdminDeleteUserFileMutation } from "@/app/services/admin/files"
import { MutationResultType } from "../../../data/global"
import { getErrorMessage } from "../../../utils/global"

type FileData = {
    fileId: string
}

export const useAdminDeleteUserFileHook = () => {

    // Login mutation for both users and admin
    const [deleteFile, { isLoading, isError, isSuccess, reset }] = useAdminDeleteUserFileMutation()

    async function adminDeleteUserFile(fileData: FileData): Promise<MutationResultType> {

        // Clear all errors and messages
        let message = ""
        let success = false;
        let data;

        // make request
        try {
            const response = await deleteFile(fileData).unwrap();
            data = response;
            success = true;
        } catch (error) {
            message = getErrorMessage(error);
        }

        return { success, message, data };
    }

    return { adminDeleteUserFile, isLoading, isError, isSuccess, reset };
}