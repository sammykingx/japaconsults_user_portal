// jshint esversion:6
import teacherIcon from "@/assets/user/teacher.svg";
import { useGetUserNotesHook } from "@/hooks/user/notes";

export const TotalNotesCreatedOverviewBox: React.FC = () => {

    const { data: AllNotes, isLoading: isNotesLoading } = useGetUserNotesHook();

    return (
        <>
            <div className="w-[250px] rounded-xl bg-[#68EE764D] p-4 border">

                {/* Icon */}
                <div className="w-[30px] h-[30px] flex items-center justify-center rounded-lg bg-white">
                    <img src={teacherIcon} alt={"wallet"} />
                </div>

                {/* Title */}
                <h2 className="font-Inter-Regular text-sm mt-3">Notes Created</h2>

                {/* Amount */}
                <div className="flex justify-between items-center gap-x-2">
                    <p className="text-lg font-Inter-Bold">{isNotesLoading ? "..." : AllNotes?.length.toLocaleString() ?? 0}</p>
                </div>

            </div>
        </>
    )
}