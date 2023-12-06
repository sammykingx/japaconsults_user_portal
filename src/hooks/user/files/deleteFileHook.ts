// jshint esversion:6
import { useDeleteFileMutation } from "@/app/services/user/files"
import { MutationResultType } from "../../../data/global"
import { getErrorMessage } from "../../../utils/global"

type FileData = {
    fileId: string
}

export const useDeleteFileHook = () => {

    // Login mutation for both users and admin
    const [deleteUserFile, { isLoading, isError, isSuccess, reset }] = useDeleteFileMutation()

    async function deleteFile(fileData: FileData): Promise<MutationResultType> {

        // Clear all errors and messages
        let message = ""
        let success = false;
        let data;

        // make request
        try {
            const response = await deleteUserFile(fileData).unwrap();
            data = response;
            success = true;
        } catch (error) {
            message = getErrorMessage(error);
        }

        return { success, message, data };
    }

    return { deleteFile, isLoading, isError, isSuccess, reset };
}