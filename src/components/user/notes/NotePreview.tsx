// jshint esversion:6
import { UserNoteResponse } from "@/data/users/notes/apiTypes";
import ReactHtmlParser from 'react-html-parser';
import DotsOutline from "@/assets/global/DotsVerticalOutline.svg";
import { getFormattedDate } from "@/utils/global";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "@/components/global";
import { NOTE_NAVIGATION } from "@/data/global";
import { NotePreviewInfo } from ".";

type NotePreviewProp = {
    data: UserNoteResponse
}

let timeoutID: any;

export const NotePreview: React.FC<NotePreviewProp> = ({ data }) => {

    // Get Time Info
    const { year, monthShort, day, } = getFormattedDate(new Date(data.last_updated ?? new Date()));

    // Show more note info
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        return () => {
            clearTimeout(timeoutID);
        }
    }, [])


    return (
        <>
            <div className="w-[140px]">
                <Link to={"create"} state={{
                    draft_id: data.draft_id,
                    title: data.title,
                    content: data.content,
                    noteType: NOTE_NAVIGATION.RECENT
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
                    <NotePreviewInfo data={data} closeModal={() => setModalOpen(false)} />
                </Modal>
            )}
        </>
    )
}