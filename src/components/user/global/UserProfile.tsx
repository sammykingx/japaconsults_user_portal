// jshint esversion:6
import { useState, useRef, useEffect, ChangeEvent } from "react";
import GravatarImg from "@/assets/payments/gravatarImage.png";
import { useAppSelector } from "@/hooks/typedHooks";
import { useUpdateUserPictureHook } from "@/hooks/user";
import { Toast } from "@/components/global";
import { useAppDispatch } from "@/hooks/typedHooks";
import { AuthSliceActions } from "@/features/global/authSlice";
import { useNavigate } from "react-router-dom";
import { useAuthLogoutHook } from "@/hooks/global/auth";

// Timeout to clear interval
let timeout: any;

// Define accepted images format
const imageMimeType = /image\/(png|jpg|jpeg)|text\/plain|^application\/(csv|pdf|msword|(vnd\.(ms-|openxmlformats-).*))/i;

export const UserProfileMenu: React.FC = () => {

    // Error message
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    // GET a navigator
    const navigate = useNavigate();

    // Ref for input element
    const inputRef = useRef<HTMLInputElement | null>(null);

    // state to upload image file
    const [imgFile, setImgFile] = useState<File | null>(null)

    // Get User Profile Details
    const { userProfile } = useAppSelector((state) => state.auth);

    const { updateUserProfilePicture } = useUpdateUserPictureHook();

    const dispatch = useAppDispatch()


    // Logout hook to invalidate token
    const { authLogout } = useAuthLogoutHook();

    // Change Handler
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const imageFileInput = e.target.files[0];

        if (!imageFileInput.type.match(imageMimeType)) {
            logError("Invalid image");
            return;
        }

        // File size
        if (imageFileInput.size > 3000000) {
            logError("File size too big!")
            return;
        }

        // Update image
        setImgFile(imageFileInput);
    }


    // Watch for image changes to upload file
    useEffect(() => {
        // No image found, return!
        if (!imgFile) {
            return;
        }

        (async function () {
            // Upload image file
            const response = await updateUserProfilePicture({ file: imgFile });

            // Error updating
            if (!(response).success) {
                setErrorMessage(response.message);

                // Clear error messsage
                timeout = setTimeout(() => {
                    setErrorMessage(undefined);
                }, 3000)
            }
        })()

        return () => {
            clearTimeout(timeout);
        }
    }, [imgFile])

    // Profile Menu
    const [isProfileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);


    // Image Picker
    function selectImage() {
        if (inputRef) {
            inputRef.current?.click();
        }
        return;
    }

    // Log error function
    function logError(message: string) {
        setErrorMessage(message);

        timeout = setTimeout(() => {
            setErrorMessage(undefined);
        }, 3000)
    }

    async function logout() {
        // Clear all tokens in state
        dispatch(AuthSliceActions.logout());

        // Invalidate token
        await authLogout();

        // Reload doc
        window.location.reload();

        // Navigate to login page
        navigate("/login");
    }


    return (
        <div className="relative">
            {/* Input ref to upload file */}
            <input ref={inputRef} className="hidden" id="inputImage" type="file" onChange={changeHandler} />

            {/* Profile Avatar */}
            <div
                onMouseEnter={() => setProfileMenuOpen(true)}
                onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
                className="w-[35px] h-[35px] rounded-full overflow-hidden"
            >
                <img
                    src={GravatarImg}
                    alt="profile pix"
                    className="w-full h-full hover:cursor-pointer rounded-full"
                />
            </div>

            {/* Menu */}
            {isProfileMenuOpen && (
                <div
                    id="profile-menu"
                    onMouseLeave={() => setProfileMenuOpen(false)}
                    className="w-[200px] border absolute left-[-380%] bottom-[-540%] rounded-lg shadow-md">

                    {/* Image container */}
                    <div className="flex flex-col items-center py-3 gap-y-2 bg-brandColor/95">

                        {/* User role */}
                        <p className="w-full text-right px-5 uppercase -mb-1 text-sm" font-Inter-Regular>{userProfile?.role}</p>

                        <img onClick={selectImage} className="w-[70px] h-[70px] rounded-full cursor-pointer" src={GravatarImg} alt="avatar" />

                        {/* Name */}
                        <p className="text-sm">{userProfile?.name}</p>
                    </div>

                    {/* Profile Options */}
                    <div className="w-full bg-white text-sm flex flex-col divide-y divide-gray-600 [&>*]:py-2 rounded-b-lg ">
                        {/* <button onClick={selectImage}>{isUpdateImgLoading ? 'Updating...' : 'Change Picture'}</button> */}
                        <button onClick={logout}>Log out</button>
                    </div>
                </div>
            )}

            {/* Log error to user */}
            {
                errorMessage && (
                    <Toast desc={errorMessage} action={() => setErrorMessage(undefined)} />
                )}
        </div>
    )
}