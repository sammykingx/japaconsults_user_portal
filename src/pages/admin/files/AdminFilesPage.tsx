// jshint esversion:6
import { UserFolder, UserUploadFile } from "@/components/user/files";
import UploadIcon from "@/assets/global/export.svg"
import { useState } from "react";
import { Modal } from "@/components/global";
import { useUploadFileHook } from "@/hooks/user";
import { Notification } from "@/components/global";
import { useGetFilesHook } from "@/hooks/user/files";
import { RecentFileUploadWrapper } from "@/components/user/files/recentFileUpload";

export const AdminFilesPage: React.FC = () => {

    // Fetch all folders
    // Get files hook
    const { data: generalFolder, } = useGetFilesHook({ folderName: "general" })
    const { data: billingFolder, } = useGetFilesHook({ folderName: "billing" })
    const { data: visaFolder, } = useGetFilesHook({ folderName: "visa" })
    const { data: contractFolder, } = useGetFilesHook({ folderName: "contract" })

    // Upload success
    const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

    // Error uploading files
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    // File Uplaod Modal
    const [fileUploadModal, setFileUploadModal] = useState<boolean>(false);

    // File to upload
    const [filesUploaded, setFilesUploaded] = useState<File[]>([])

    // Upload File Hook
    const { uploadUserFile, isLoading: fileUploadLoading } = useUploadFileHook()

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
    }

    return (
        <div className="pt-3">

            <div className="flex flex-col-reverse md:flex-row justify-between gap-5 ">
                {/* Folder container */}
                <div className="flex flex-wrap gap-5">
                    <UserFolder name="General" url="file/general" files={generalFolder} />
                    <UserFolder name="Billing" url="file/billing" files={billingFolder} />
                    {/* <UserFolder name="Academics" url="file/:academics" numberOfItems={8} /> */}
                    <UserFolder name="Visa" url="file/visa" files={visaFolder} />
                    <UserFolder name="Contract" url="file/contract" files={contractFolder} />
                </div>

                {/* Upload Button */}
                <button onClick={() => setFileUploadModal(true)} className="self-end md:self-start flex justify-center w-[150px] h-[40px] items-center text-white bg-brandColor rounded shadow gap-x-3 hover:bg-brandColor/90">
                    <img src={UploadIcon} alt="icon" />
                    <span className="font-Inter-Regular text-sm">Upload File</span>
                </button>
            </div>

            {/* Recent file uploads */}
            <div className="mt-7">
                <RecentFileUploadWrapper />
            </div>

            {/* Modals */}
            {fileUploadModal && (
                <Modal closeModal={() => setFileUploadModal(false)}>
                    <UserUploadFile filesUploaded={filesUploaded} setFilesUploaded={setFilesUploaded} action={submitFiles} loading={fileUploadLoading} />
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
        </div>
    )
}