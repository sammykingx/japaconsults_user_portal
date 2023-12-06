// jshint esversion:6
import { UserNoteResponse } from "@/data/users/notes/apiTypes"
import { getFileDate } from "@/utils/global";
import { useDeleteUserNoteHook, useSendNoteHook } from "@/hooks/user/notes";
import { useState, useEffect } from "react";
import { MutationResultType } from "@/data/global";
import { Modal } from "@/components/global";
import { SelectUserToSubmitNote } from "@/components/global/notes";
import { useAppSelector } from "@/hooks/typedHooks";

type NotePreviewInfoProp = {
    data: UserNoteResponse
    closeModal: () => void
}

let timeoutID: any;

export const NotePreviewInfo: React.FC<NotePreviewInfoProp> = ({ data, closeModal }) => {

    const { userProfile } = useAppSelector((state) => state.auth)

    // Error uploading files
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    // Delete note
    const { deleteUserNote, isLoading } = useDeleteUserNoteHook();


    // Submit note feature
    const { sendNoteToUser, isLoading: isSendNoteLoading } = useSendNoteHook()

    const [submitNoteModalOpen, setSubmitNoteModalOpen] = useState<boolean>(false);

    useEffect(() => {
        return () => {
            clearTimeout(timeoutID);
        }
    }, [])

    async function handleDeleteNoteClick() {
        const response = await deleteUserNote({ d_id: data.draft_id })

        if (!response.success) {
            setErrorMessage("Cannot delete note")
            timeoutID = setTimeout(() => {
                setErrorMessage(undefined);
            }, 3000)
            return;
        }

        // Close modal
        closeModal();
    }


    async function submitNote(toId: number): Promise<MutationResultType> {
        // Submit Note
        return await sendNoteToUser({ draftId: data.draft_id, toId });
    }

    return (
        <>
            <div className="rounded overflow-hidden">
                <div className="p-4 font-Inter-Regular flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-2">
                        <p className="text-placeholder">ID:</p>
                        <p className="text-black text-sm">{data.draft_id}</p>
                    </div>
                    <div className="flex gap-x-2">
                        <p className="text-placeholder">Title:</p>
                        <p className="text-black">{data.title}</p>
                    </div>
                    <div className="flex gap-x-2">
                        <p className="text-placeholder">Date created:</p>
                        <p className="text-black text-sm">{getFileDate(data.date_created ?? new Date())}</p>
                    </div>
                    <div className="flex gap-x-2">
                        <p className="text-placeholder">Date modified:</p>
                        <p className="text-black text-sm">{getFileDate(data.last_updated ?? new Date())}</p>
                    </div>
                </div>

                {errorMessage && (<p className="text-error text-sm text-center">{errorMessage ?? "An error occurred"}</p>)}

                {/* CTA Buttons */}
                <div className="flex justify-end">

                    {/* Delete note */}
                    <div className="p-2 py-4">
                        <button onClick={handleDeleteNoteClick} className="py-2 px-3 w-max bg-error text-white rounded-sm">{isLoading ? "Deleting..." : "Delete note"}</button>
                    </div>

                    {/* Delete note */}
                    <div className="p-2 py-4">
                        <button onClick={() => setSubmitNoteModalOpen(true)} className="py-2 px-3 w-max bg-brandColor text-white rounded-sm">{"Send note"}</button>
                    </div>

                </div>
            </div>

            {submitNoteModalOpen && userProfile && (
                <Modal bare closeModal={() => setSubmitNoteModalOpen(false)}>
                    <SelectUserToSubmitNote noteId={data.draft_id} closeModal={closeModal} role={userProfile?.role} submitNote={submitNote} isSendNoteLoading={isSendNoteLoading} />
                </Modal>
            )}
        </>
    )
}