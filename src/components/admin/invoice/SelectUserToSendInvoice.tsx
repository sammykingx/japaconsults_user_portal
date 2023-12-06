// jshint esversion:6
import { USERROLES } from "@/data/global/auth"
import { useState, ChangeEvent, useEffect } from "react"
import { useLazyGetAllUsersQuery } from "@/app/services/admin/users"
import { UserType } from "@/data/admin/dashboard/dashboard"
import { getErrorMessage } from "@/utils/global"
import { BeatLoader } from "react-spinners";
import { CSSProperties } from "react"
import { getFormattedDate } from "@/utils/global"
import checkBoxIcon from "@/assets/admin/checkbox.png";
// import { MutationResultType } from "@/data/global"
import { Toast } from "@/components/global"
// import { useNavigate } from "react-router-dom"

type SelectUserToSubmitNoteProp = {
    setUser: (user: UserType) => void
    closeModal: () => void
}

const override: CSSProperties = {
    display: "inline-block",
    margin: "0 auto",
    borderColor: "red",
};

let timeoutID: any;

export const SelectUserToSendInvoice: React.FC<SelectUserToSubmitNoteProp> = ({ setUser, closeModal }) => {

    // Error message
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    // Fetching list of users
    const [getAllUsers, { isLoading: isAllUsersLoading }] = useLazyGetAllUsersQuery()

    // Selected Users
    const [selectedUser, setSelectedUser] = useState<USERROLES | undefined>(USERROLES.USER);

    // Selected User ID
    const [selectedUserId, setSelectedUserId] = useState<UserType | undefined>(undefined);

    // List to hold selected users
    const [usersList, setUsersList] = useState<UserType[]>([]);

    // Fetch users 
    useEffect(() => {


        (async function () {
            switch (selectedUser) {
                // Fetch All Users
                case USERROLES.USER: {
                    try {
                        const data = await getAllUsers().unwrap();
                        setUsersList(data);
                    } catch (error) {
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

    }, [])

    async function SendNoteToUser() {
        if (!selectedUserId) {
            return;
        }

        // Set User
        setUser(selectedUserId);

        // close modal
        closeModal()
    }

    return (
        <div className="p-7 w-[80vw] max-w-[340px] sm:max-w-[400px]">
            <div className="flex justify-between gap-x-5 items-center">
                <h3 className="font-Inter"><span className="text-brandColor font-Inter-Bold">Send</span> invoice to:</h3>
                <select
                    className="p-2 bg-white border-[1px] border-brandColor rounded cursor-pointer"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        setSelectedUser(e.target.value as USERROLES)
                        setUsersList([]);
                    }}
                >
                    {/* <option value={undefined} selected disabled>Select User</option> */}
                    <option value={USERROLES.USER} selected disabled>User</option>
                </select>
            </div>

            {/* List of users */}
            <div className="h-80vh max-h-[400px] overflow-scroll">

                {/* Loader */}
                {(isAllUsersLoading) && (
                    <div className="w-full flex items-center justify-center">
                        <div className="my-[5rem] mx-auto">
                            <BeatLoader
                                color={"#E1AE3C"}
                                loading={isAllUsersLoading}
                                cssOverride={override}
                                size={20}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div>
                    </div>
                )}

                {usersList && usersList.map((user, index: number) => {
                    const { day, monthShort, year } = getFormattedDate(new Date(user.last_login));

                    return (
                        <div key={index} className="cursor-pointer bg-white border-b flex justify-between mt-3 pb-1" onClick={() => setSelectedUserId(user)}>
                            <div className="flex flex-col gap-y-">
                                <p className="text-placeholder text-sm">{`ID: ${user.user_id}`}</p>
                                <p className="text-placeholder text-[13px]">{`Email: ${user.email}`}</p>
                                <p className="font-Inter-Bold text-lg leading-tight">{user.name}</p>
                                <p className="text-placeholder  text-[13px]">{`Last login: ${day} ${monthShort}, ${year}`}</p>
                            </div>
                            <div>
                                {selectedUserId?.user_id == user.user_id && (
                                    <img className="w-[25px] h-[25px]" src={checkBoxIcon} alt="sel" />
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Send User */}
            <div className="flex justify-end mt-5">
                <button
                    onClick={SendNoteToUser}
                    disabled={!selectedUserId}
                    className={`mt-3 px-2 py-2 ${selectedUserId ? "bg-brandColor text-white" : "bg-formDisabledBg"}  font-Manrope-Regular rounded`}>Select User</button>
            </div>

            {errorMessage && (
                <Toast error desc={errorMessage ?? "An error occurred"} action={() => setErrorMessage(undefined)} />
            )}

        </div>
    )
}