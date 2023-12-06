// jshint esversion:6
import { FileResponseType } from "@/data/users/files/file"
import { getFormattedDate } from "@/utils/global"
import { TrashSVG } from "@/components/global/svg/trash"
import { useState } from "react"
import { useAdminDeleteUserFileHook } from "@/hooks/admin/file"
import { DeleteConfirmation } from "@/components/admin/users"
import { useEffect } from "react"
import { Toast } from "@/components/global"
import { Modal } from "@/components/global"
import { USERROLES } from "@/data/global/auth"
import { useAppSelector } from "@/hooks/typedHooks"
import { Link } from "react-router-dom"

type RecentFileUploadProp = {
    data: FileResponseType[]
}

type ActionConsent = {
    status: boolean,
    data: FileResponseType | undefined
}

let timeoutID: any;

export const UserFiles: React.FC<RecentFileUploadProp> = ({ data }) => {

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
        <>
            {/* Table */}
            <div className="w-full h-full relative">
                <table className="w-full border-spacing-1 table-fixed rounded-t-[20px]">

                    {/* Table header */}
                    <thead>
                        <tr className="font-Inter-Bold [&>*]:p-2 [&>*]:py-4 pointer-events-none">
                            <th className="text-sm font-medium text-left w-[12%]">
                                <span>Name</span>
                            </th>
                            <th className="text-sm font-medium text-left w-[8%]">
                                <span>Folder</span>
                            </th>
                            <th className="hidden sm:table-cell text-sm font-medium text-left w-[8%]">
                                <span>File Size</span>
                            </th>
                            <th className="text-sm font-medium text-left w-[8%]">
                                <span>Date</span>
                            </th>

                            {userProfile?.role !== USERROLES.USER && (
                                <th className="text-sm font-medium text-left w-[4%]">
                                    <span>Action</span>
                                </th>
                            )}
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="divide-y-[1px] font-Manrope-Regular">
                        {data.map((fileData: FileResponseType, index: number) => {

                            const date = new Date(fileData.date_uploaded || new Date())

                            const { day, monthShort, year } = getFormattedDate(date);

                            return (
                                // Trade Item Data
                                <tr
                                    key={index}
                                    className="font-Manrope-Regular text-[15px] [&>*]:p-2 [&>*]:py-3"
                                // onClick={() => handleTxnClick(TxnData)}
                                >
                                    <td className={`w-full truncate capitalize cursor-pointer`}>
                                        <Link to={fileData.file_url} target="_blank">
                                            <span>{fileData.name}</span>
                                        </Link>
                                    </td>
                                    <td className="w-full truncate capitalize">
                                        <span>{fileData.folder}</span>
                                    </td>
                                    <td className="hidden sm:table-cell w-full truncate text-[#AFAFAF]">
                                        <span>{fileData.size}</span>
                                    </td>
                                    <td className="w-full truncate text-[#AFAFAF]">
                                        <span>{`${day} ${monthShort}, ${year}`}</span>
                                    </td>

                                    {/* Delete user file */}
                                    {userProfile?.role !== USERROLES.USER && (
                                        <td onClick={() => setActionConsent({ status: true, data: fileData })} className="w-full truncate text-[#AFAFAF] cursor-pointer">
                                            <TrashSVG />
                                        </td>
                                    )}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div >

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
        </>
    )
}