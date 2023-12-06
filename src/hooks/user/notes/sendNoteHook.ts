// jshint esversion:6
import { useSendNoteMutation } from "@/app/services/user/notes"
import { MutationResultType } from "../../../data/global"
import { getErrorMessage } from "../../../utils/global"

type sendNoteProp = {
    "draftId": number,
    "toId": number
}

export const useSendNoteHook = () => {

    // Login mutation for both users and admin
    const [sendNote, { isLoading, isError, isSuccess, reset }] = useSendNoteMutation()

    async function sendNoteToUser(noteData: sendNoteProp): Promise<MutationResultType> {

        // Clear all errors and messages
        let message = ""
        let success = false;
        let data;

        // make request
        try {
            const response = await sendNote(noteData).unwrap();
            data = response;
            success = true;
        } catch (error) {
            message = getErrorMessage(error);
        }

        return { success, message, data };
    }

    return { sendNoteToUser, isLoading, isError, isSuccess, reset };
}