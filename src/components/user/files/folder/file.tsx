// jshint esversion:6
import FileImg from "@/assets/global/file.png";
// import DownloadIcon from "@/assets/global/logout.svg";
import { TrashSVG } from "@/components/global/svg/trash"
import { useEffect } from "react";
// import { useState, useEffect } from "react";
import { FileResponseType } from "@/data/users/files/file";
// import { useDeleteFileHook } from "@/hooks/user/files";
// import { Toast } from "@/components/global";
// import { DeleteConfirmation } from "@/components/admin/users";
// import { Modal } from "@/components/global";
// import { useNavigate } from "react-router-dom";

type UserFolderProp = {
    file: FileResponseType
    handleDeleteUserFile: (file: FileResponseType) => void
}

let timeoutID: any;

export const UserFile: React.FC<UserFolderProp> = ({ file, handleDeleteUserFile }) => {

    const onButtonClick = () => {
        const fileLink = file.file_url;
        const link = document.createElement("a");
        link.href = fileLink;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    // Clear error state
    useEffect(() => {
        return () => {
            clearTimeout(timeoutID);
        }
    }, [])

    return (
        <>
            <div className="block relative">

                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteUserFile(file);
                    }}
                    className="w-max ml-auto absolute top-3 right-3 z-[300] truncate cursor-pointer text-[#AFAFAF]">
                    <TrashSVG width={23} height={23} />
                </div>

                <div className="w-[140px] h-[150px] bg-white border-[1px] border-gray-200 hover:border-brandColor p-3 rounded-md shadow-sm relative">

                    {/* Folder Image Container */}
                    <div className="mt-[25px] flex justify-center ">
                        <img className="w-[60px] h-[60px] cursor-pointer" onClick={onButtonClick} src={FileImg} alt="Folder" />
                    </div>

                    {/* Description */}
                    <p className="font-Inter-Bold text-sm mt-[15px] text-center truncate">{file.name}</p>
                </div>
            </div>
        </>
    )
}