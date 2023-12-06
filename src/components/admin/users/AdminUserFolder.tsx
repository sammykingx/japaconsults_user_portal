// jshint esversion:6
import FolderImg from "@/assets/global/Folder.svg";

type UserFolderProp = {
    name: string,
    numberOfItems: number
    active: boolean
}

export const AdminUserFolder: React.FC<UserFolderProp> = ({ name, numberOfItems, active }) => {
    return (
        <div className={`w-[140px] h-[150px] bg-white border ${active ? "border-brandColor" : "border-gray-200" }  hover:border-brandColor p-3 rounded-md shadow-sm`}>
            {/* Folder Image Container */}
            <div className="mt-[25px] flex justify-center">
                <img src={FolderImg} alt="Folder" />
            </div>

            {/* Description */}
            <p className="font-Inter-Bold text-sm mt-[15px]">{name}</p>
            <p className="text-xs">{`${numberOfItems} items`}</p>
        </div>
    )
}