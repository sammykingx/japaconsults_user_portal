// jshint esversion:6
import { Link } from "react-router-dom"
import { useAppSelector } from "@/hooks/typedHooks"
import { USERROLES } from "@/data/global/auth";

export const PageNotFound: React.FC = () => {

    const { userProfile, token } = useAppSelector((state) => state.auth);

    if (!userProfile || !token) {
        return (
            <>
                <div className="w-[300px] my-0 mx-auto mt-[15%]">
                    <h1 className="text-center font-Sora-Bold text-[80px]">404</h1>
                    <h2 className="font-CabinetGrotesk-Bold mt-[40px] text-center text-lg">Page Not Found</h2>
                    <p className="font-Inter-Regular text-sm mt-3">The Page you are looking for doesn't exist or an other error occured. Go to <Link className="text-brandColor font-Sora-Bold" to={`/login`}>Login</Link></p>
                </div >
            </>
        )
    }

    return (
        <>
            <div className="w-[300px] my-0 mx-auto mt-[15%]">
                <h1 className="text-center font-Sora-Bold text-[80px]">404</h1>
                <h2 className="font-CabinetGrotesk-Bold mt-[40px] text-center text-lg">Page Not Found</h2>
                <p className="font-Inter-Regular text-sm mt-3">The Page you are looking for doesn't exist or an other error occured. Go to <Link to={`${userProfile.role == USERROLES.USER ? "/" : "/admin"}`}>Home</Link></p>
            </div >
        </>
    )
}