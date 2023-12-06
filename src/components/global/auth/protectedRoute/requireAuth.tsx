// ProtectedRoute.js
import { useAppSelector } from '@/hooks/typedHooks'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import { useGetUserProfileHook } from '@/hooks/user'
import { useLocation } from 'react-router-dom'
import { LineLoader } from '../../loader'
import { Modal } from '../..'
import { Notification } from '../..'
import { useEffect } from 'react'
import { USERROLES } from '@/data/global/auth'

export const RequireAuth: React.FC = () => {
    const navigate = useNavigate();

    // Get User previous location history
    const location = useLocation();

    // Check the store for any existing user? Return children routes : Direct them to login page
    const { token } = useAppSelector((state) => state.auth)

    // Get user profile
    const { trigger: getUserProfile, result: getUserProfileResult } = useGetUserProfileHook()

    useEffect(() => {

        if (!token) {
            return;
        }

        (async function () {
            // Fetch User Profile
            const response = await getUserProfile();

            if (response.data?.role != USERROLES.USER) {
                navigate("/login");
            }
        })()

    }, [token])

    // Check if any token exists
    if (token == null) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    // Display loader
    if (getUserProfileResult.isFetching) {
        return (
            <LineLoader />
        )
    }

    if (getUserProfileResult.isError) {
        return (
            <Modal closeModal={() => {
                getUserProfile();
            }}>
                <Notification error title="Error"
                    desc={<p>Could not fetch profile. Please try again</p>}
                    action={() => {
                        getUserProfile();
                    }} buttonTitle="Okay" />
            </Modal>
        )
    }

    return (
        // Render the protected routes
        <>
            <Outlet />
        </>
    )
}
