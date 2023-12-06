// jshint esversion:6
import { useUploadFileMutation } from "@/app/services/user/files"
import { MutationResultType } from "../../../data/global"
import { getErrorMessage } from "../../../utils/global"

type uploadUserFileType = {
    folder_name: string,
    files: File[]
}

export const useUploadFileHook = () => {

    // Login mutation for both users and admin
    const [uploadFiles, { isLoading, isError, isSuccess, reset }] = useUploadFileMutation()

    async function uploadUserFile(fileData: uploadUserFileType): Promise<MutationResultType> {
        // Clear all errors and messages
        let message = ""
        let success = false;
        let data;

        // Build Form
        const formData = new FormData()

        fileData.files.forEach((file: File) => {
            formData.append("file", file);
        })

        // make request
        try {
            const uploadResponse = await uploadFiles({ body: formData, params: { folder_name: fileData.folder_name } }).unwrap();
            data = uploadResponse;
            success = true;
        } catch (error) {
            
            message = getErrorMessage(error);
        }

        return { success, message, data };
    }

    return { uploadUserFile, isLoading, isError, isSuccess, reset };
}