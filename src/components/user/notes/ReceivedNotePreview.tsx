// jshint esversion:6
// import { UserNoteResponse } from "@/data/users/notes/apiTypes";
import ReactHtmlParser from 'react-html-parser';
import DotsOutline from "@/assets/global/DotsVerticalOutline.svg";
import { getFormattedDate, getFileDate } from "@/utils/global";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "@/components/global";
// import { useDeleteUserNoteHook } from "@/hooks/user/notes";
import { ReceivedNoteResponse } from "@/data/users/notes/apiTypes";
import { NOTE_NAVIGATION } from '@/data/global';

type NotePreviewProp = {
    data: ReceivedNoteResponse
}

let timeoutID: any;

export const ReceivedNotePreview: React.FC<NotePreviewProp> = ({ data }) => {
    // Error uploading files
    // const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    // Get Time Info
    const { year, monthShort, day, } = getFormattedDate(new Date(data.sent_time ?? new Date()));

    // Show more note info
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        return () => {
            clearTimeout(timeoutID);
        }
    }, [])


    // async function handleDeleteNoteClick() {
    //     const response = await deleteUserNote({ d_id: data.draft_id })

    //     if (!response.success) {
    //         setErrorMessage("Cannot delete note")
    //         timeoutID = setTimeout(() => {
    //             setErrorMessage(undefined);
    //         }, 3000)
    //         return;
    //     }

    //     // Close modal
    //     setModalOpen(false);
    // }

    return (
        <>
            <div className="w-[140px]">
                <Link to={"create"} state={{
                    // draft_id: data.draft_id,
                    title: data.title,
                    content: data.content,
                    noteType: NOTE_NAVIGATION.RECEIVED
                }}>
                    {/* Note Preview */}
                    <div className="w-[140px] h-[170px] p-3 bg-white overflow-hidden text-[7px] rounded border border-gray-200">
                        <div> {ReactHtmlParser(`<div>${data.content}</div>`)} </div>
                    </div>
                </Link>

                {/* Note details */}
                <div className="pl-1 cursor-pointer" onClick={(e) => {
                    e.stopPropagation();
                    setModalOpen(true);
                }}>
                    {/* Note title */}
                    <p className="font-Inter-Medium text-xs mt-1 truncate">{data.title}</p>

                    <div className="flex justify-between items-center mt-">

                        <p className="text-placeholder font-Inter-Regular text-xs">{`${monthShort} ${day}, ${year}`}</p>

                        {/* outline */}
                        <img src={DotsOutline} alt="dot" />
                    </div>
                </div>
            </div>

            {/* Modal for previewing notes! */}
            {modalOpen && (
                <Modal bare closeModal={() => setModalOpen(false)}>
                    <div className="rounded overflow-hidden">
                        <div className="p-4 font-Inter-Regular flex flex-col gap-y-2">
                            <div className="flex gap-x-2">
                                <p className="text-placeholder">Title:</p>
                                <p className="text-black">{data.title}</p>
                            </div>
                            <div className="flex gap-x-2">
                                <p className="text-placeholder">Date received:</p>
                                <p className="text-black text-sm">{getFileDate(data.sent_time ?? new Date())}</p>
                            </div>
                            <div className="flex gap-x-2">
                                <p className="text-placeholder">Sent by:</p>
                                <p className="text-black">{data.sent_by}</p>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}