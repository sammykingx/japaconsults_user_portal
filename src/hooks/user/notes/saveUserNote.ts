// jshint esversion:6
import { useSaveUserNoteMutation } from "@/app/services/user/notes"
import { MutationResultType } from "../../../data/global"
import { getErrorMessage } from "../../../utils/global"

type saveUserNoteProp = {
    "title": string,
    "content": string,
    "date_created": Date
}

export const useSaveUserNoteHook = () => {

    // Login mutation for both users and admin
    const [saveNote, { isLoading, isError, isSuccess, reset }] = useSaveUserNoteMutation()

    async function saveUserNote(noteData: saveUserNoteProp): Promise<MutationResultType> {

        // Clear all errors and messages
        let message = ""
        let success = false;
        let data;

        // Destructure props
        const { title, content, date_created } = noteData

        // make request
        try {
            const uploadResponse = await saveNote({ title, content, date_created }).unwrap();
            data = uploadResponse;
            success = true;
        } catch (error) {
            message = getErrorMessage(error);
        }

        return { success, message, data };
    }

    return { saveUserNote, isLoading, isError, isSuccess, reset };
}