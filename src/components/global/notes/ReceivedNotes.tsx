// jshint esversion:6
import { CSSProperties } from "react";
import { BeatLoader } from "react-spinners";
import { LineLoader } from "@/components/global/loader";
import { getErrorMessage } from "@/utils/global";
import { ReceivedNotePreview } from "@/components/user/notes";
import { ReceivedNoteResponse } from "@/data/users/notes/apiTypes";
import { useGetReceivedNotesQuery } from "@/app/services/user/notes";


const override: CSSProperties = {
    display: "inline-block",
    margin: "0 auto",
    borderColor: "red",
};


export const RecievedNote: React.FC = () => {
    // Note API
    const { data: receivedNotesData, isLoading: isReceivedNotesFetching, isError: isReceivedNoteError, error: receivedNoteError } = useGetReceivedNotesQuery();

    return (
        <>
            {/* Recent Notes */}
            <div className="flex gap-5 flex-wrap pt-3">
                {/* Loader */}
                {isReceivedNotesFetching && (
                    <div className="w-full flex items-center justify-center">
                        <div className="mt-[5rem] mx-auto">
                            <BeatLoader
                                color={"#E1AE3C"}
                                loading={isReceivedNotesFetching}
                                cssOverride={override}
                                size={20}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div>
                    </div>
                )}
                {isReceivedNoteError ? (receivedNoteError as any)?.status == 404 ? (
                    <div className="w-full flex flex-col gap-y-5 justify-center items-center mt-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-journal-check" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                        </svg>
                        <p className="text-lg font-Inter-Regular text-gray-500">No notes received</p>
                    </div>
                ) : (

                    <p className="text-placeholder mt-9 text-sm">{getErrorMessage(receivedNoteError)}</p>
                )
                    : (
                        (receivedNotesData && receivedNotesData?.length < 1) ? (
                            <div className="w-full flex flex-col gap-y-5 justify-center items-center mt-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-journal-check" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                                </svg>
                                <p className="text-lg font-Inter-Regular text-gray-500">No notes received</p>
                            </div>
                        ) : (

                            receivedNotesData?.map((note: ReceivedNoteResponse, index: number) => {
                                return (
                                    <ReceivedNotePreview key={index} data={note} />
                                )
                            })
                        )
                    )}
            </div >

            {/* Line Loader */}
            {
                isReceivedNotesFetching && (
                    <LineLoader />
                )
            }
        </>
    )
}