// jshint esversion:6
import { FileResponseType } from "@/data/users/files/file"
import { getFormattedDate } from "@/utils/global"
import FileImg from "@/assets/global/file.png";
import { TrashSVG } from "@/components/global/svg/trash"
import { useState } from "react"
import { useAdminDeleteUserFileHook } from "@/hooks/admin/file"
import { DeleteConfirmation } from "@/components/admin/users"
import { useEffect } from "react"
import { Toast } from "@/components/global"
import { Modal } from "@/components/global"
import { USERROLES } from "@/data/global/auth"
import { useAppSelector } from "@/hooks/typedHooks"
import { Link } from "react-router-dom";

type RecentFileUploadMVProp = {
    data: FileResponseType[]
}

type ActionConsent = {
    status: boolean,
    data: FileResponseType | undefined
}

let timeoutID: any;


export const UserFilesMV: React.FC<RecentFileUploadMVProp> = ({ data }) => {

    const { userProfile } = useAppSelector((state) => state.auth)

    // Error message
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    // Consnt to delete file
    const [actionConsent, setActionConsent] = useState<ActionConsent>({ status: false, data: undefined });

    // Hook to delete user file
    const { adminDeleteUserFile, isLoading: isAdminDeleteFileLoading } = useAdminDeleteUserFileHook();

    // Clear timeout
    useEffect(() => {
        return () => {
            clearTimeout(timeoutID);
        }
    }, [])

    // Delete user file
    async function deleteFile(file: FileResponseType | undefined) {
        if (!file) {
            return;
        }

        const response = await adminDeleteUserFile({ fileId: file.file_id });

        if (!response.success) {
            setErrorMessage(response.message);
            timeoutID = setTimeout(() => {
                setErrorMessage(undefined);
            }, 3000)
        }

    }

    return (
        <div className="flex flex-col gap-y-5 mt-5">
            {data.map((file: FileResponseType, index: number) => {

                const date = new Date(file.date_uploaded || new Date())

                const { day, monthShort, year } = getFormattedDate(date);

                return (
                    <div key={index} className="flex gap-x-3 items-start">
                        <Link to={file.file_url} target="_blank">
                            <img className="w-[60px] h-[60px]" src={FileImg} alt="Folder" />
                        </Link>

                        {/* File info */}
                        <div className="font-Inter-Regular">
                            <p>{file.name}</p>
                            <div className="text-sm flex flex-col gap-y-2">
                                <p><span className="text-placeholder">Folder: </span><span className="capitalize">{file.folder}</span></p>
                                <p><span className="text-placeholder">Size: </span>{file.size}</p>
                                <p><span className="text-placeholder">Date: </span>{`${day} ${monthShort}, ${year}`}</p>
                            </div>
                        </div>

                        {/* Delete user file */}
                        {userProfile?.role !== USERROLES.USER && (
                            <div onClick={() => setActionConsent({ status: true, data: file })} className="w-max ml-auto truncate cursor-pointer text-[#AFAFAF]">
                                <TrashSVG />
                            </div>
                        )}
                    </div>
                )
            })}

            {/* Consent modal */}
            {actionConsent.status && (
                <Modal closeModal={() => setActionConsent({ status: false, data: undefined })}>
                    <DeleteConfirmation
                        title="Delete File"
                        desc="Are you sure you want to delete this file?"
                        cancel={() => setActionConsent({ status: false, data: undefined })}
                        next={() => deleteFile(actionConsent.data)}
                        isLoading={isAdminDeleteFileLoading}
                        loadingTitle="Deleting..."
                    />
                </Modal>
            )}

            {/* Error message */}
            {errorMessage && (
                <Toast error desc={errorMessage ?? "An error occurred"} action={() => setErrorMessage(undefined)} />
            )}
        </div>
    )
}