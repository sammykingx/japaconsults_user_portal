// jshint esversion:6
import { FileResponseType } from "@/data/users/files/file"
import { getFormattedDate } from "@/utils/global"
import FileImg from "@/assets/global/file.png";
import { formatBytes } from "@/utils/global/formatBytes"

type RecentFileUploadMVProp = {
    data: FileResponseType[]
}

export const RecentFileUploadMV: React.FC<RecentFileUploadMVProp> = ({ data }) => {
    return (
        <div className="flex flex-col gap-y-5 mt-5">
            {data.map((file: FileResponseType, index: number) => {

                const date = new Date(file.date_uploaded || new Date())

                const { day, monthShort, year } = getFormattedDate(date);

                return (
                    <div key={index} className="flex gap-x-3 items-start">
                        <img className="w-[60px] h-[60px]" src={FileImg} alt="Folder" />

                        {/* File info */}
                        <div className="font-Inter-Regular">
                            <p>{file.name}</p>
                            <div className="text-sm flex flex-col gap-y-1">
                                <p><span className="text-placeholder">Folder: </span>{file.folder}</p>
                                <p><span className="text-placeholder">Size: </span>{formatBytes(Number(file.size?.split(" ")[0]))}</p>
                                <p><span className="text-placeholder">Date: </span>{`${day} ${monthShort}, ${year}`}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}