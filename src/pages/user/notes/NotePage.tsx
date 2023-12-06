// jshint esversion:6
import PlusIcon from "@/assets/global/Plus.svg";
import { Link } from "react-router-dom";
import { RecentNote } from "@/components/global/notes";
import { useState, } from "react";
import { NOTE_NAVIGATION } from "@/data/global";
import { RecievedNote } from "@/components/global/notes";


export const NotePage: React.FC = () => {

    const [noteType, setNoteType] = useState<NOTE_NAVIGATION>(NOTE_NAVIGATION.RECENT)

    return (
        <>
            <div className="py-5">

                {/* Create Note */}
                <Link to={"create"} state={{ noteType: NOTE_NAVIGATION.RECENT }}>
                    <div className="w-[140px] h-[140px] bg-white flex items-center justify-center rounded-md border border-gray-200">
                        <img src={PlusIcon} alt="Add note" />
                    </div>
                    <p className="font-Inter-Regular text-sm mt-2">Create new note</p>
                </Link>

                <div className="flex gap-x-5 mt-5">
                    <h3 onClick={() => setNoteType(NOTE_NAVIGATION.RECENT)} className={`cursor-pointer w-max py-1 ${noteType == NOTE_NAVIGATION.RECENT && "border-b-[2px] border-brandColor"}`}>Recent Notes</h3>
                    <h3 onClick={() => setNoteType(NOTE_NAVIGATION.RECEIVED)} className={`cursor-pointer w-max py-1 ${noteType == NOTE_NAVIGATION.RECEIVED && "border-b-[2px] border-brandColor"}`}>Received Notes</h3>
                </div>

                {noteType == NOTE_NAVIGATION.RECENT && (
                    <RecentNote />
                )}

                {noteType == NOTE_NAVIGATION.RECEIVED && (
                    <RecievedNote />
                )}
            </div>


        </>
    )
}