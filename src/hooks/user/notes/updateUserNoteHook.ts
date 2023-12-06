// jshint esversion:6
import { useUpdateUserNoteMutation } from "@/app/services/user/notes"
import { MutationResultType } from "../../../data/global"
import { getErrorMessage } from "../../../utils/global"

type saveUserNoteProp = {
    "draft_id": number,
    "title": string,
    "content": string,
    "date_created": Date
}

export const useUpdateUserNoteHook = () => {

    // Login mutation for both users and admin
    const [updateNote, { isLoading, isError, isSuccess, reset }] = useUpdateUserNoteMutation()

    async function updateUserNote(noteData: saveUserNoteProp): Promise<MutationResultType> {

        // Clear all errors and messages
        let message = ""
        let success = false;
        let data;

        // Destructure props
        const { title, content, date_created, draft_id } = noteData

        // make request
        try {
            const uploadResponse = await updateNote({ draft_id, title, content, last_updated: date_created }).unwrap();
            data = uploadResponse;
            success = true;
        } catch (error) {
            message = getErrorMessage(error);
        }

        return { success, message, data };
    }

    return { updateUserNote, isLoading, isError, isSuccess, reset };
}