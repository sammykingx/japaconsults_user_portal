// jshint esversion:6
import FolderImg from "@/assets/global/Folder.svg";
import { useNavigate } from "react-router-dom";
import { FileResponseType } from "@/data/users/files/file";

type UserFolderProp = {
    name: string,
    url: string,
    files?: FileResponseType[]
}

export const UserFolder: React.FC<UserFolderProp> = ({ name, url, files }) => {
    const navigate = useNavigate();

    return (
        <div
            className="cursor-pointer"
            onClick={() => {
                navigate(url);
            }}>
            <div className="w-[140px] h-[150px] bg-white border-[1px] border-gray-200 hover:border-brandColor p-3 rounded-md shadow-sm">
                {/* Folder Image Container */}
                <div className="mt-[25px] flex justify-center">
                    <img src={FolderImg} alt="Folder" />
                </div>

                {/* Description */}
                <p className="font-Inter-Bold text-sm mt-[15px]">{name}</p>
                <p className="text-xs">{`${files?.length ?? 0} items`}</p>
            </div>
        </div >
    )
}