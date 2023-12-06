// jshint esversion:6
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState, useEffect, CSSProperties } from "react";
import { useLocation } from "react-router-dom";
import { UserType } from "@/data/admin/dashboard/dashboard";
import { useGetUserFileQuery } from "@/app/services/admin/files";
import { AdminUserFolder } from "@/components/admin/users";
import { FOLDER_NAME } from "@/data/users/files";
import { FileResponseType } from "@/data/users/files/file";
import { BeatLoader } from "react-spinners";
import { UserFiles } from "@/components/admin/users";
import { UserFilesMV } from "@/components/admin/users";

const override: CSSProperties = {
    display: "inline-block",
    margin: "0 auto",
    borderColor: "red",
};

export const AdminUserPage: React.FC = () => {
    // Get the ID
    const { userId } = useParams();

    const location = useLocation()

    const { state: userData } = location

    if (!userId || !userData) {
        return <Navigate to="/admin/users" />
    }

    // Get files hook
    const { data: academicFolder, isLoading: isAcademicFolderLoading } = useGetUserFileQuery({ user_id: Number(userId), folderName: "academics" })
    const { data: generalFolder, isLoading: isGeneralFolderLoading } = useGetUserFileQuery({ user_id: Number(userId), folderName: "general" })
    const { data: billingFolder, isLoading: isBillingFolderLoading } = useGetUserFileQuery({ user_id: Number(userId), folderName: "billing" })
    const { data: visaFolder, isLoading: isVisaFolderLoading } = useGetUserFileQuery({ user_id: Number(userId), folderName: "visa" })
    const { data: contractFolder, isLoading: isContractFolderLaoding } = useGetUserFileQuery({ user_id: Number(userId), folderName: "contracts" })

    // selected folder
    const [selectedFolder, setSelectedFolder] = useState<FOLDER_NAME>(FOLDER_NAME.GENERAL)

    // Selected File
    const [fileList, setFileList] = useState<FileResponseType[]>(generalFolder ?? []);

    // Fetch users 
    useEffect(() => {
        if (!selectedFolder) {
            return;
        }

        (async function () {
            switch (selectedFolder) {

                // Fetch All files in General
                case FOLDER_NAME.GENERAL: {
                    setFileList(generalFolder ?? []);
                    break;
                }
                case FOLDER_NAME.ACADMEMICS: {
                    setFileList(academicFolder ?? []);
                    break;
                }
                case FOLDER_NAME.BILLING: {
                    setFileList(billingFolder ?? []);
                    break;
                }
                case FOLDER_NAME.CONTRACT: {
                    setFileList(contractFolder ?? []);
                    break;
                }
                case FOLDER_NAME.VISA: {
                    setFileList(visaFolder ?? []);
                    break;
                }

                default:
                    break;
            }
        })()

    }, [selectedFolder, generalFolder, academicFolder, billingFolder, visaFolder, contractFolder])

    return (
        <div className="py-5">
            {/* Short description */}
            <div className="font-Inter-Regular text-xl">Viewing files for <span className="font-Inter-Bold">{(userData as UserType).name}</span></div>

            {/* Folders */}
            {/* Folder container */}
            <div className="flex flex-wrap gap-5 mt-5">

                {/* Genral */}
                <div onClick={() => setSelectedFolder(FOLDER_NAME.GENERAL)}>
                    <AdminUserFolder name="General" numberOfItems={generalFolder?.length ?? 0} active={selectedFolder == FOLDER_NAME.GENERAL} />
                </div>

                {/* Academics */}
                <div onClick={() => setSelectedFolder(FOLDER_NAME.ACADMEMICS)}>
                    <AdminUserFolder name="Academics" numberOfItems={academicFolder?.length ?? 0} active={selectedFolder == FOLDER_NAME.ACADMEMICS} />
                </div>

                {/* Billing */}
                <div onClick={() => setSelectedFolder(FOLDER_NAME.BILLING)}>
                    <AdminUserFolder name="Billing" numberOfItems={billingFolder?.length ?? 0} active={selectedFolder == FOLDER_NAME.BILLING} />
                </div>

                {/* Visa */}
                <div onClick={() => setSelectedFolder(FOLDER_NAME.VISA)}>
                    <AdminUserFolder name="Visa" numberOfItems={visaFolder?.length ?? 0} active={selectedFolder == FOLDER_NAME.VISA} />
                </div>

                {/* Contract */}
                <div onClick={() => setSelectedFolder(FOLDER_NAME.CONTRACT)}>
                    <AdminUserFolder name="Contract" numberOfItems={contractFolder?.length ?? 0} active={selectedFolder == FOLDER_NAME.CONTRACT} />
                </div>
            </div>

            {/* User Files Table */}
            {(isAcademicFolderLoading || isGeneralFolderLoading || isBillingFolderLoading || isVisaFolderLoading || isContractFolderLaoding) ? (
                <div className="w-full flex items-center justify-center">
                    <div className="my-[5rem] mx-auto">
                        <BeatLoader
                            color={"#E1AE3C"}
                            loading={true}
                            cssOverride={override}
                            size={20}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                </div>
            ) : (
                < div className="mt-5">
                    {fileList.length == 0 ? (
                        <div className="h-[30vh] flex flex-col justify-center items-center gap-y-5">

                            {/* No file found Icon */}
                            <div className="text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-file-earmark-excel" viewBox="0 0 16 16">
                                    <path d="M5.884 6.68a.5.5 0 1 0-.768.64L7.349 10l-2.233 2.68a.5.5 0 0 0 .768.64L8 10.781l2.116 2.54a.5.5 0 0 0 .768-.641L8.651 10l2.233-2.68a.5.5 0 0 0-.768-.64L8 9.219l-2.116-2.54z" />
                                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                                </svg>
                            </div>

                            {/* No files found */}
                            <p className="flex items-center justify-center gap-x-2">No Files Uploaded in this folder: <span className="text-placeholder capitalize">{selectedFolder}</span></p>
                        </div>
                    ) : (
                        <div>
                            <h1 className="font-Inter-Regular">Files in folder: <span className="font-Inter-Bold capitalize">{selectedFolder}</span></h1>
                            <div className="mt-2">
                                <div className="hidden sm:block">
                                    <UserFiles data={fileList} />
                                </div>
                                <div className="sm:hidden">
                                    <UserFilesMV data={fileList} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}