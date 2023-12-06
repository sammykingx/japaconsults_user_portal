// jshint esversion:6
import { useDeleteUserNoteMutation } from "@/app/services/user/notes"
import { MutationResultType } from "../../../data/global"
import { getErrorMessage } from "../../../utils/global"

type deleteUserNoteProp = {
    d_id: number
}

export const useDeleteUserNoteHook = () => {

    // Login mutation for both users and admin
    const [deleteNote, { isLoading, isError, isSuccess, reset }] = useDeleteUserNoteMutation()

    async function deleteUserNote(noteData: deleteUserNoteProp): Promise<MutationResultType> {

        // Clear all errors and messages
        let message = ""
        let success = false;
        let data;

        const { d_id } = noteData;

        // make request
        try {
            const response = await deleteNote({ d_id }).unwrap();
            data = response;
            success = true;
        } catch (error) {
            message = getErrorMessage(error);
        }

        return { success, message, data };
    }

    return { deleteUserNote, isLoading, isError, isSuccess, reset };
}