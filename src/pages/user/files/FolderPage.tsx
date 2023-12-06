// jshint esversion:6
import { UserUploadFile } from "@/components/user/files";
import { useParams } from "react-router-dom";
import { getErrorMessage } from "@/utils/global";
import { UserFile } from "@/components/user/files";
import { FOLDER_NAME, FileResponseType } from "@/data/users/files/file";
import { useState, useEffect } from "react";
import UploadIcon from "@/assets/global/export.svg"
import { Modal } from "@/components/global";
import { Notification } from "@/components/global";
import { useUploadFileHook } from "@/hooks/user";
import { useDeleteFileHook } from "@/hooks/user/files";
import { DeleteConfirmation } from "@/components/admin/users";
import { LineLoader } from "@/components/global/loader";
import { useGetFileQuery } from "@/app/services/user/files";

let timeoutID: any;

type ActionConsent = {
    status: boolean,
    data: FileResponseType | undefined
}

export const FolderPage: React.FC = () => {

    // Get the ID
    const { folderName } = useParams();

    // Get files hook
    const { data, isError: isGetFileError, error: getFileError, isFetching: isGetFileFetching } = useGetFileQuery({ folderName })

    // File Uplaod Modal
    const [fileUploadModal, setFileUploadModal] = useState<boolean>(false);

    // Upload success
    const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

    // Error uploading files
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    // Upload File Hook
    const { uploadUserFile, isLoading: fileUploadLoading } = useUploadFileHook()

    // File to upload
    const [filesUploaded, setFilesUploaded] = useState<File[]>([])

    const { deleteFile, isLoading: isDeleteFileLoading } = useDeleteFileHook();

    // Consnt to delete file
    const [actionConsent, setActionConsent] = useState<ActionConsent>({ status: false, data: undefined });

    useEffect(() => {
        return () => {
            clearTimeout(timeoutID);
        }
    }, [])


    async function submitFiles(folderName: string) {
        if (filesUploaded.length == 0) {
            return;
        }

        const response = await uploadUserFile({ folder_name: folderName, files: filesUploaded });

        if (!response.success) {
            setErrorMessage(response.message);
            return;
        }

        // success
        setUploadSuccess(true);


        // Reset files
        setFilesUploaded([]);
    }


    // Delete user file
    async function deleteUSerFile(file: FileResponseType | undefined) {
        if (!file) {
            return;
        }

        const response = await deleteFile({ fileId: file.file_id });

        if (!response.success) {
            setErrorMessage(response.message);
            timeoutID = setTimeout(() => {
                setErrorMessage(undefined);
            }, 3000)
        }

        // Close consent modal
        setActionConsent({ status: false, data: undefined })
    }


    function handleDeleteUserFile(file: FileResponseType) {
        setActionConsent({ status: true, data: file });
    }

    return (
        <div className="mt-5">

            <div className="flex justify-end my-2">
                {/* Upload Button */}
                <button onClick={() => setFileUploadModal(true)} className="self-end md:self-start flex justify-center w-[150px] h-[40px] items-center text-white bg-brandColor rounded shadow gap-x-3 hover:bg-brandColor/90">
                    <img src={UploadIcon} alt="icon" />
                    <span className="font-Inter-Regular text-sm">Upload File</span>
                </button>
            </div>

            {isGetFileError ? (
                <p className="mt-[5rem] text-center text-error">{getErrorMessage(getFileError)}</p>
            ) : (

                data == undefined || data.length == 0 ? (
                    <div className="h-[70vh] flex flex-col justify-center items-center gap-y-5">

                        {/* No file found Icon */}
                        <div className="text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-file-earmark-excel" viewBox="0 0 16 16">
                                <path d="M5.884 6.68a.5.5 0 1 0-.768.64L7.349 10l-2.233 2.68a.5.5 0 0 0 .768.64L8 10.781l2.116 2.54a.5.5 0 0 0 .768-.641L8.651 10l2.233-2.68a.5.5 0 0 0-.768-.64L8 9.219l-2.116-2.54z" />
                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                            </svg>
                        </div>

                        {/* No files found */}
                        <p className="flex items-center justify-center gap-x-2">No Files Uploaded in this folder: <span className="text-placeholder capitalize">{folderName}</span></p>
                    </div>
                ) :
                    (
                        <>
                            <section className="flex flex-wrap gap-4">
                                {data?.map((file: FileResponseType, index: number) => {
                                    return (
                                        <UserFile handleDeleteUserFile={handleDeleteUserFile} key={index} file={file} />
                                    )
                                })}
                            </section>
                        </>
                    )
            )}

            {/* Consent modal */}
            {actionConsent.status && (
                <Modal closeModal={() => setActionConsent({ status: false, data: undefined })}>
                    <DeleteConfirmation
                        title="Delete File"
                        desc="Are you sure you want to delete this file?"
                        cancel={() => setActionConsent({ status: false, data: undefined })}
                        next={() => deleteUSerFile(actionConsent.data)}
                        isLoading={isDeleteFileLoading}
                        loadingTitle="Deleting..."
                    />
                </Modal>
            )}


            {/* Modals */}
            {fileUploadModal && (
                <Modal closeModal={() => setFileUploadModal(false)}>
                    <UserUploadFile setFolder={folderName as FOLDER_NAME} filesUploaded={filesUploaded} setFilesUploaded={setFilesUploaded} action={submitFiles} loading={fileUploadLoading} />
                </Modal>
            )}

            {/* Upload Error */}
            {errorMessage && (
                <Modal closeModal={() => setErrorMessage(undefined)}>
                    <Notification error title="Error" desc={<p className="text-sm text-error capitalize">{errorMessage}</p>} action={() => setErrorMessage(undefined)} buttonTitle="Close" />
                </Modal>
            )}

            {/* Upload Success */}
            {uploadSuccess && (
                <Modal closeModal={() => {
                    setUploadSuccess(false);
                    setFileUploadModal(false)
                }}>
                    <Notification title="Successs" desc={<p className="text-sm">You have successfuly uploaded your file</p>} action={() => {
                        setUploadSuccess(false)
                        setFileUploadModal(false)
                    }} buttonTitle="Close" />
                </Modal>
            )}

            {isGetFileFetching && (
                <LineLoader />
            )}
        </div>
    )
}