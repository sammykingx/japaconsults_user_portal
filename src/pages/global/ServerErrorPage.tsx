// jshint esversion:6
import { useAppSelector } from "@/hooks/typedHooks";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const ServerErrorPage: React.FC = () => {

    const location = useLocation()

    const { state: error } = location

    const { userProfile, token } = useAppSelector((state) => state.auth);

    const navigate = useNavigate();

    if (!error) {
        return <Navigate to={"/login"} />
    }

    if (!userProfile || !token) {
        return (
            <>
                <div className="w-max my-0 mx-auto mt-[15%]">
                    <h1 className="text-center font-Inter-Light text-[80px]">Whoops!</h1>
                    <h2 className="font-CabinetGrotesk-Bold mt-[40px] text-center text-lg">An error occurred</h2>
                    <p className="font-Inter-Regular text-sm mt-3">We seem to have hit a snag. We can take you <span onClick={() => navigate(-1)} className="text-brandColor font-Inter-Bold">Back</span></p>
                </div >
            </>
        )
    }

    return (
        <>
            <div className="w-[310px] my-0 mx-auto mt-[15%]">
                <h1 className="text-center font-Inter-Light text-[80px]">Whoops!</h1>
                <h2 className="font-CabinetGrotesk-Bold mt-[40px] text-center text-lg">An error occurred</h2>
                <p className="font-Inter-Regular text-sm mt-3">We seem to have hit a snag. We can take you <span onClick={() => navigate(-1)} className="text-brandColor font-Inter-Bold">Back</span></p>
            </div >
        </>
    )
}