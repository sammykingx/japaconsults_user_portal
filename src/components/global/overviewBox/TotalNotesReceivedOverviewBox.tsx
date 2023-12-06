// jshint esversion:6
import teacherIcon from "@/assets/user/teacher.svg";
import { useGetReceivedNotesQuery } from "@/app/services/user/notes";

export const TotalNotesReceivedOverviewBox: React.FC = () => {

    const { data: AllReceivedNotes, isLoading: isReceivedNotesLoading } = useGetReceivedNotesQuery();

    return (
        <>
            <div className="w-[250px] rounded-xl bg-[#8D79F64D] p-4 border">

                {/* Icon */}
                <div className="w-[30px] h-[30px] flex items-center justify-center rounded-lg bg-white">
                    <img src={teacherIcon} alt={"wallet"} />
                </div>

                {/* Title */}
                <h2 className="font-Inter-Regular text-sm mt-3">Notes Recieved</h2>

                {/* Amount */}
                <div className="flex justify-between items-center gap-x-2">
                    <p className="text-lg font-Inter-Bold">{isReceivedNotesLoading ? "..." : AllReceivedNotes?.length.toLocaleString() ?? 0}</p>
                    {/* <p className="text-xs text-green-700 truncate">{`+${((usersJoinedThisMonth / (totalUsers)) * 100)} % this month`}</p> */}
                </div>

            </div>
        </>
    )
}