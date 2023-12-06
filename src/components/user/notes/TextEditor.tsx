// jshint esversion:6
import React, { ChangeEvent, useState } from "react";
import 'quill/dist/quill.snow.css';
import "./style.css";
import ReactQuill from 'react-quill'
import { NoteDataType } from "@/pages/user/notes/CreateNotePage";
import { Modal } from "@/components/global";
import { SelectUserToSubmitNote } from "@/components/global/notes"
import { useAppSelector } from "@/hooks/typedHooks";
import { MutationResultType } from "@/data/global";
import { NOTE_NAVIGATION } from "@/data/global";
import { delayTimeout } from "@/utils/global";

// Build the Customized module:
let modules = {
    toolbar: [
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link",],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] }
        ],
        [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
    ],
};

// Build the customized formats:
let formats = [
    "header", "height", "bold", "italic",
    "underline", "strike", "blockquote",
    "list", "color", "bullet", "indent",
    "link", "align", "size",
];

type TextEditorProp = {
    noteData: NoteDataType,
    setNoteData: React.Dispatch<React.SetStateAction<NoteDataType>>
    NoteAPIProps: {
        isNoteSaveLoading: boolean;
        isNoteSaveError: boolean;
        submitNote: (toId: number, noteId?: number) => Promise<MutationResultType>
        isSendNoteLoading: boolean
    },
    saveNote(data?: { preserve?: boolean; }): Promise<number | undefined>
    noteType: NOTE_NAVIGATION
}

export const TextEditor: React.FC<TextEditorProp> = ({ noteData, setNoteData, NoteAPIProps, saveNote, noteType }) => {

    const { userProfile } = useAppSelector((state) => state.auth)

    const { isNoteSaveLoading, submitNote, isSendNoteLoading } = NoteAPIProps

    const [submitNoteModalOpen, setSubmitNoteModalOpen] = useState<number | undefined>(undefined);

    const handleProcedureContentChange = (content: string) => {
        setNoteData((prev) => ({ ...prev, content }))
    };

    const handleTitleChange = (title: string) => {
        setNoteData((prev) => ({ ...prev, title }));
    }

    return (
        <>
            {noteType == NOTE_NAVIGATION.RECENT && (
                <div className="flex justify-end gap-x-3 my-[0.6rem]">
                    {/* Save Document */}
                    <button onClick={() => saveNote()} className="border-[1px] border-brandColor text-sm px-4 py-2 rounded">{isNoteSaveLoading ? "Saving..." : "Save"}</button>

                    {/* Submit document */}
                    <button className="bg-brandColor text-white text-sm px-4 py-2 rounded" onClick={() => {
                        // Save note first
                        (async () => {
                            const noteId = await saveNote({ preserve: true });

                            // 2s delay
                            await delayTimeout(2000);

                            // Send note
                            setSubmitNoteModalOpen(noteId)
                        })()

                    }}>Send</button>
                </div>
            )}

            {/* Note Editor */}
            <div className="h-full bg-white rounded">

                {/* Note title */}
                <input disabled={noteType == NOTE_NAVIGATION.RECEIVED} className="font-Inter-Bold w-full py-3 px-4 text-lg focus:border focus:border-brandColor outline-none" type="text" value={noteData.title} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleTitleChange(e.target.value);
                }} />

                {/* Note Content */}
                <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    placeholder="write your content ...."
                    onChange={handleProcedureContentChange}
                    value={noteData.content}
                    bounds={'#root'}
                    readOnly={noteType == NOTE_NAVIGATION.RECEIVED}
                    style={{ height: "81%", width: "100%", backgroundColor: "white" }}
                />

            </div>


            {submitNoteModalOpen && userProfile && (
                <Modal bare closeModal={() => setSubmitNoteModalOpen(undefined)}>
                    <SelectUserToSubmitNote role={userProfile?.role} noteId={submitNoteModalOpen} submitNote={submitNote} isSendNoteLoading={isSendNoteLoading} />
                </Modal>
            )}
        </>
    )
}