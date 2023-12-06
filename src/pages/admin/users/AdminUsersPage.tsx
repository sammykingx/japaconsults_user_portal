// jshint esversion:6
import { useState, useEffect, CSSProperties } from "react"
import { AllAdminsOverviewBox, AllManagersOverviewBox, AllStaffsOverviewBox, AllUsersOverviewBox } from "@/components/global/overviewBox/AdminUsersOverviewBox"
import { useLazyGetAllAdminsQuery, useLazyGetAllManagersQuery, useLazyGetAllStaffsQuery, useLazyGetAllUsersQuery, } from "@/app/services/admin/users"
import { UserType } from "@/data/admin/dashboard/dashboard"
import { USERROLES } from "@/data/global/auth"
import { getErrorMessage } from "@/utils/global"
import { UsersTable, UsersTableMV } from "@/components/admin/users"
import { Toast } from "@/components/global"
import { BeatLoader } from "react-spinners"
import { NoUserSVG } from "@/components/global/svg"
import { useAppSelector } from "@/hooks/typedHooks"
import { UpdateUserRole } from "@/components/admin/users"
import { Modal } from "@/components/global"

let timeoutID: any;

const override: CSSProperties = {
    display: "inline-block",
    margin: "0 auto",
    borderColor: "red",
};

type UpdateRole = {
    email: string,
    currentRole: USERROLES
}

export const AdminUsersPage: React.FC = () => {

    const { userProfile } = useAppSelector((state) => state.auth);

    // Error message
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const [updateRole, setUpdateRole] = useState<UpdateRole | null>(null);

    // // Verification successful
    // const [success, setSuccess] = useState<boolean>(false);

    // Fetching list of users
    const [getAllAdmins, { isFetching: isAllAdminsLoading }] = useLazyGetAllAdminsQuery()
    const [getAllManagers, { isFetching: isAllManagersLoading }] = useLazyGetAllManagersQuery()
    const [getAllStaffs, { isFetching: isAllStaffsLoading }] = useLazyGetAllStaffsQuery()
    const [getAllUsers, { isFetching: isAllUsersLoading }] = useLazyGetAllUsersQuery()

    // Selected Users
    const [selectedUser, setSelectedUser] = useState<USERROLES | undefined>(userProfile?.role);

    // List to hold selected users
    const [usersList, setUsersList] = useState<UserType[]>([]);

    // Fetch users 
    useEffect(() => {
        if (!selectedUser) {
            return;
        }

        (async function () {
            switch (selectedUser) {
                // Fetch All Admins
                case USERROLES.ADMIN: {
                    try {
                        const data = await getAllAdmins().unwrap();
                        setUsersList(data);
                    } catch (error) {
                        setUsersList([]);
                        setErrorMessage(getErrorMessage(error));
                        timeoutID = setTimeout(() => {
                            setErrorMessage(undefined);
                        }, 2000)
                    }
                    break;
                }

                // Fetch All Users
                case USERROLES.USER: {
                    try {
                        const data = await getAllUsers().unwrap();
                        setUsersList(data);
                    } catch (error) {
                        setUsersList([]);
                        timeoutID = setTimeout(() => {
                            setErrorMessage(undefined);
                        }, 2000)
                        setErrorMessage(getErrorMessage(error));
                    }
                    break;
                }

                // Fetch All Managers
                case USERROLES.MANAGER: {
                    try {
                        const data = await getAllManagers().unwrap();
                        setUsersList(data);
                    } catch (error) {
                        setUsersList([]);
                        timeoutID = setTimeout(() => {
                            setErrorMessage(undefined);
                        }, 2000)
                        setErrorMessage(getErrorMessage(error));
                    }
                    break;
                }

                // Fetch All Staffs
                case USERROLES.STAFF: {
                    try {
                        const data = await getAllStaffs().unwrap();
                        setUsersList(data);
                    } catch (error) {
                        setUsersList([]);
                        timeoutID = setTimeout(() => {
                            setErrorMessage(undefined);
                        }, 2000)
                        setErrorMessage(getErrorMessage(error));
                    }
                    break;
                }
                default:
                    break;
            }
        })()

        return () => {
            clearTimeout(timeoutID);
        }

    }, [selectedUser])

    function handleRoleUpdateClick(userData: { email: string, currentRole: USERROLES }) {
        const { email, currentRole } = userData;
        setUpdateRole({ email, currentRole });
    }

    return (
        <div className="py-5">

            {/* Overview boxes */}
            <div className="w-full flex [&>*]:shrink-0 flex-nowrap gap-x-3 overflow-x-auto">

                {/* All Admins */}
                {userProfile?.role == USERROLES.ADMIN && (
                    <div className="cursor-pointer" onClick={() => setSelectedUser(USERROLES.ADMIN)}>
                        <AllAdminsOverviewBox active={selectedUser == USERROLES.ADMIN} />
                    </div>
                )}

                {/* All Managers */}
                {((userProfile?.role == USERROLES.ADMIN) || (userProfile?.role == USERROLES.MANAGER)) &&
                    (
                        <div className="cursor-pointer" onClick={() => setSelectedUser(USERROLES.MANAGER)}>
                            <AllManagersOverviewBox active={selectedUser == USERROLES.MANAGER} />
                        </div>
                    )
                }

                {/* All Staffs */}
                <div className="cursor-pointer" onClick={() => setSelectedUser(USERROLES.STAFF)}>
                    <AllStaffsOverviewBox active={selectedUser == USERROLES.STAFF} />
                </div>
                {/* {(userProfile?.role == USERROLES.ADMIN) || (userProfile?.role == USERROLES.MANAGER) || (userProfile?.role == USERROLES.STAFF) && (
                )} */}

                {/* All Users */}
                <div className="cursor-pointer" onClick={() => setSelectedUser(USERROLES.USER)}>
                    <AllUsersOverviewBox active={selectedUser == USERROLES.USER} />
                </div>
            </div>

            {/* Users Wrapper */}
            {(isAllAdminsLoading || isAllManagersLoading || isAllStaffsLoading || isAllUsersLoading) ? (
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

                <div className="mt-5">
                    {usersList.length == 0 ? (
                        <div className="mt-[5rem] flex flex-col gap-y-3 justify-center items-center">
                            <p className="text-placeholder">
                                <NoUserSVG width={100} height={100} />
                            </p>
                            <p className="text-xl text-placeholder font-Inter-Bold">No User Found</p>
                        </div>
                    ) : (
                        <div>
                            <div className="hidden sm:block">
                                <UsersTable handleRoleUpdateClick={handleRoleUpdateClick} userData={usersList} />
                            </div>
                            <div className="sm:hidden">
                                <UsersTableMV handleRoleUpdateClick={handleRoleUpdateClick} userData={usersList} />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {
                errorMessage && (
                    <Toast error desc={errorMessage ?? "An error occurred"} action={() => setErrorMessage(undefined)} />
                )
            }

            {updateRole?.email && updateRole.currentRole && (
                <Modal info closeModal={() => setUpdateRole(null)}>
                    <UpdateUserRole setNavigation={setSelectedUser} email={updateRole.email} currentUserRole={updateRole.currentRole} closeModal={() => setUpdateRole(null)} />
                    {/* <UpdateUserRole setSuccess={setSuccess} setNavigation={setSelectedUser} email={updateRole.email} currentUserRole={updateRole.currentRole} closeModal={() => setUpdateRole(null)} /> */}
                </Modal>
            )}

            {/* {
                success && (
                    <>
                        <Toast desc={"User role updated!"} action={() => {
                            setSuccess(false);
                        }} />
                    </>
                )
            } */}
        </div >
    )
}