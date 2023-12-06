// jshint esversion:6
import { useState, ChangeEvent, useEffect } from "react"
import { useUpdateUserRoleHook } from "@/hooks/admin/users"
import { USERROLES } from "@/data/global/auth"
import { Toast } from "@/components/global"

type UpdateUserRole = {
    email: string,
    currentUserRole: USERROLES
    closeModal: () => void
    setNavigation: React.Dispatch<React.SetStateAction<USERROLES | undefined>>
}

let timeoutID: any;

export const UpdateUserRole: React.FC<UpdateUserRole> = ({ email: user_email, currentUserRole, setNavigation, closeModal }) => {

    // Error message
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    // Verification successful
    const [success, setSuccess] = useState<boolean>(false);

    // User roles
    const { updateUserRole, isLoading } = useUpdateUserRoleHook();

    // Set the invoice status
    const [newRole, setNewRole] = useState<USERROLES | undefined>(undefined);


    // Clear timeout
    useEffect(() => {
        return () => {
            clearTimeout(timeoutID);
        }
    }, [])

    async function update() {
        if (!newRole) {
            return;
        }

        const response = await updateUserRole({ user_email, role: newRole });

        // Navigate to the tab
        setNavigation(newRole);

        if (!response.success) {
            setErrorMessage(response.message);
            timeoutID = setTimeout(() => {
                setErrorMessage(undefined);
            }, 3000)
            return;
        }

        // Success changing the role
        setSuccess(true);

        // timeout
        timeoutID = setTimeout(() => {
            setSuccess(false);
            closeModal();
        }, 2000)
    }

    return (
        <>
            <div className="p-5 py-1 px-5 bg-white rounded-lg flex flex-col gap-y-5">
                {/* Error message */}
                {/* {errorMessage && <p className="text-error text-sm text-center py-3">{errorMessage}</p>} */}

                {/* Update Invoice Status */}
                <div className="flex gap-x-2 items-center">
                    <p>Update Role to: </p>

                    <select
                        name="folder"
                        value={newRole}
                        className="p-2 bg-white border border-brandColor rounded cursor-pointer"
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            setNewRole(e.target.value as USERROLES)
                        }}
                    >
                        <option disabled selected>Select Role</option>
                        <option disabled={USERROLES.USER == currentUserRole} value={USERROLES.USER}>User</option>
                        <option disabled={USERROLES.STAFF == currentUserRole} value={USERROLES.STAFF}>Staff</option>
                        <option disabled={USERROLES.MANAGER == currentUserRole} value={USERROLES.MANAGER}>Manager</option>
                        <option disabled={USERROLES.ADMIN == currentUserRole} value={USERROLES.ADMIN}>Admin</option>
                    </select>

                </div>

                {/* CTA Button*/}
                <button
                    type="button"
                    onClick={update}
                    disabled={!newRole}
                    className={`h-[40px] px-12 mt-5 ${errorMessage ? "bg-error" : "bg-brandColor hover:bg-brandColor/90"}  text-white block w-full  font-Inter-Regular text-base text-center transition-colors duration-150  border border-transparent rounded  focus:outline-none focus:shadow-outline-blue`}
                >
                    {isLoading ? "Updating" : "Update"}
                </button>

                {/* Toast message to inform user */}
                {
                    errorMessage && (
                        <Toast error desc={errorMessage ?? "An error occurred"} action={() => setErrorMessage(undefined)} />
                    )
                }

                {
                    success && (
                        <>
                            <Toast desc={"User role updated!"} action={() => {
                                setSuccess(false);
                                closeModal();
                            }} />
                        </>
                    )
                }
            </div>
        </>
    )
}