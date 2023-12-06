// jshint esversion:6
import { useGetUserRecentFileUploadsQuery } from "@/app/services/user/files/fileAPI"
import { BeatLoader } from "react-spinners";
import { CSSProperties } from "react";
import { RecentFileUpload } from "./RecentFileUpload";
import { RecentFileUploadMV } from "./RecentFileUploadMV";

type RecentFileUploadProp = {
    folderName?: string
}

const override: CSSProperties = {
    display: "inline-block",
    margin: "0 auto",
    borderColor: "red",
};

export const RecentFileUploadWrapper: React.FC<RecentFileUploadProp> = ({ folderName }) => {

    const { data, isLoading, isFetching: isRecentFileUploadsFetching } = useGetUserRecentFileUploadsQuery({ folderName })

    if (isLoading) {
        return (
            <div className="w-full flex items-center justify-center">
                <div className="mt-[5rem] mx-auto">
                    <BeatLoader
                        color={"#E1AE3C"}
                        loading={isRecentFileUploadsFetching}
                        cssOverride={override}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            </div>
        )
    }

    if (!data || data.length == 0) {
        return (
            <div className="w-full flex items-center justify-center">
                <div className="mt-[5rem] mx-auto">
                    <p>No Recent File Uploaded</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <h1 className="font-Inter-Bold text-xl">Recent Files</h1>

            <div className="mt-2">
                <div className="hidden sm:block">
                    <RecentFileUpload data={data} />
                </div>
                <div className="sm:hidden">
                    <RecentFileUploadMV data={data} />
                </div>
            </div>
        </>
    )
}