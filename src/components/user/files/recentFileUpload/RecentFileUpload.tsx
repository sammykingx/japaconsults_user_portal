// jshint esversion:6
import { FileResponseType } from "@/data/users/files/file"
import { getFormattedDate } from "@/utils/global"
import { formatBytes } from "@/utils/global/formatBytes"

type RecentFileUploadProp = {
    data: FileResponseType[]
}

export const RecentFileUpload: React.FC<RecentFileUploadProp> = ({ data }) => {

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
                                    className="font-Manrope-Regular text-[15px] [&>*]:p-2 [&>*]:py-3 cursor-pointer"
                                // onClick={() => handleTxnClick(TxnData)}
                                >
                                    <td className={`w-full truncate capitalize`}>
                                        <span>{fileData.name}</span>
                                    </td>
                                    <td className="w-full truncate capitalize">
                                        <span>{fileData.folder}</span>
                                    </td>
                                    <td className="hidden sm:table-cell w-full truncate text-[#AFAFAF]">
                                        <span>{formatBytes(Number(fileData.size?.split(" ")[0]))}</span>
                                    </td>
                                    <td className="w-full truncate text-[#AFAFAF]">
                                        <span>{`${day} ${monthShort}, ${year}`}</span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div >
        </>
    )
}