// jshint esversion:6
import { UserType } from "@/data/admin/dashboard/dashboard"
import { getFormattedDate } from "@/utils/global";
import { useNavigate } from "react-router-dom";
import { EditSVG } from "@/components/global/svg/invoice";
import { USERROLES } from "@/data/global/auth";
import { useAppSelector } from "@/hooks/typedHooks";

type UsersTableProp = {
    userData: UserType[]
    handleRoleUpdateClick: (userData: {
        email: string;
        currentRole: USERROLES;
    }) => void
}

export const UsersTableMV: React.FC<UsersTableProp> = ({ userData, handleRoleUpdateClick }) => {

    const navigate = useNavigate();

    const { userProfile } = useAppSelector((state) => state.auth)

    return (
        <>
            <div className="flex flex-col gap-y-2">
                {
                    userData.map((user: UserType, index: number) => {
                        const { day, monthShort, year } = getFormattedDate(new Date(user.last_login))

                        return (
                            <div
                                key={index}
                                className="bg-white p-4 px-5 rounded flex justify-between cursor-pointer"
                                onClick={() => navigate(`user/${user.user_id}`, { state: user })}
                            >
                                <div className="flex flex-col gap-y-1">
                                    {/* <p className="text-placeholder text-sm">{user.user_id}</p> */}
                                    <p className="text-placeholder text-sm">{user.email}</p>
                                    <p className="font-Inter-Bold text-lg">{user.name}</p>
                                    <p className="text-placeholder text-sm">{`Last login: ${day} ${monthShort}, ${year}`}</p>
                                </div>
                                <div className="flex flex-col gap-y-1 items-end">
                                    {/* User role */}
                                    <div className="flex gap-x-2 items-center">
                                        <p className="uppercase">
                                            {user.role}
                                        </p>
                                        {userProfile?.user_id != user.user_id && (userProfile?.role == USERROLES.ADMIN || userProfile?.role == USERROLES.MANAGER) &&
                                            <div onClick={(e) => {
                                                e.stopPropagation();
                                                handleRoleUpdateClick({ email: user.email, currentRole: user.role })
                                            }}>
                                                <EditSVG />
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}