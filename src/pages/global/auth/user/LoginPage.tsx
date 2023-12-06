// jshint esversion:6
import openEye from "@/assets/auth/eye.svg";
import slashEye from "@/assets/auth/eye-slash.svg"
import AuthImg from "@/assets/auth/auth_img.png";
import BrandLogo from "@/assets/auth/LogoMakr-6zrJ19.png.png"
import jwt_decode from "jwt-decode";
import { Modal, Notification } from "@/components/global";
import { Toast } from "@/components/global";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

// import { useAuthLoginHook } from "../../../../hooks/global/auth/authLoginHook";
import { useAuthLoginHook } from "@/hooks/global/auth";
import { AuthLoginResponse } from "@/data/global/auth";
import { LoginTokenDecodeType, USERROLES } from "@/data/global/auth/auth";
import { useAuthSendEmailTokenHook } from "@/hooks/global/auth";
import { EMAIL_VERIFICATION_TYPE } from "@/data/global/auth/apiTypes";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { persistor } from "@/app/store";

// Create user Schema for form data
const schema = z.object({
    email: z.string().nonempty({ message: "Email is required" }).email({ message: "Invalid email address" }),
    password: z.string().nonempty({ message: "Password is required" }),
});

// Extract inferred type from schema
type FormData = z.infer<typeof schema>;

let timeoutId: any;

export const LoginPage: React.FC = () => {

    // Get Navigator
    const navigate = useNavigate();

    // Verification Modal
    const [verificationModalOpen, setVerificationModalOpen] = useState<boolean>(false);

    // Hide or View password
    const [passwordShown, setPasswordShown] = useState<boolean>(true);

    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    // Send Verification Link
    const { authSendEmailToken, isLoading: isSendEmailTokenLoading } = useAuthSendEmailTokenHook();

    // Invalid token error
    const [tokenError, setTokenError] = useState<boolean>(false);

    /***************************** FORM VALIDATION ******************************/
    const { register, handleSubmit, formState: { errors, isValid: formValid } } = useForm<FormData>({ resolver: zodResolver(schema) });

    const { authLogin, isError, isLoading: signInloading, } = useAuthLoginHook()

    // Clear timeout upon component unmount
    useEffect(() => {
        return () => {
            clearTimeout(timeoutId);
        }
    }, [])

    async function UserEmailVerification(userData: FormData) {
        // Send verification link to user email
        const response = await authSendEmailToken(userData.email, EMAIL_VERIFICATION_TYPE.NEW_USER);

        return response;
    }

    const onSubmit = async (data: FormData) => {

        // Clear all errors
        setTokenError(false);

        // User Login Token type
        let userInfo: LoginTokenDecodeType;

        // Login user
        const response = await authLogin(data.email, data.password);

        // Error logging in user
        if (!response.success) {
            setErrorMessage(response.message ?? "Could not login!")
            return;
        }

        // Get the access token
        const accessToken = (response.data as AuthLoginResponse)?.access_token

        // Decode the Access token
        try {
            userInfo = jwt_decode(accessToken ?? "");

        } catch (error) {
            setTokenError(true);
            setErrorMessage("An error occurred while retreiving your details!");
            return;
        }

        // Inform user if not verified
        if (!userInfo.is_verified) {
            const verificationResponse = await UserEmailVerification(data);
            if (verificationResponse.success) {
                setVerificationModalOpen(true);
            }
            else {
                setErrorMessage(verificationResponse.message)
                timeoutId = setTimeout(() => {
                    setErrorMessage(undefined);
                }, 2500);
            }
            return;
        }

        // Purge local storage
        persistor.purge();

        // Get USER Roles
        if (userInfo.role == USERROLES.USER) {
            // Direct User to Dashboard
            navigate("/")
        }

        // Get USER Roles
        if (userInfo.role == USERROLES.ADMIN || userInfo.role == USERROLES.MANAGER || userInfo.role == USERROLES.STAFF) {
            // Direct User to Dashboard
            navigate("/admin")
        }
    };

    return (
        <>
            <section className="flex items-center bg-gray-50">
                <section className="flex-1 h-full max-h-full max-w-full mx-auto bg-white rounded-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center">

                        {/*Image Slider  */}
                        <section className="w-full hidden lg:block relative max-h-screen overflow-hidden bg-brandColor">
                            <img className="w-full h-screen min-h-[670px] max-w-full" src={AuthImg} alt="img" />
                        </section>

                        <div className="p-9 pt-12 w-full max-w-[550px] h-[645px] relative">
                            {/* Image Container */}
                            <div className="flex justify-end">
                                <img src={BrandLogo} alt="brand" />
                            </div>

                            <h1 className="mb-1 text-left lg:text-[40px] text-3xl font-Sora-Bold">
                                Sign In
                            </h1>

                            {/* Welcome back */}
                            <p className="mb-1 text-[14px] lg:text-base text-left text-placeholder font-Inter-Regular">
                                Welcome back
                            </p>
                            <form className="w-full mt-7" onSubmit={handleSubmit(onSubmit)}>

                                {/* Form Container */}
                                <div className="flex flex-col gap-y-5">

                                    {/* Email Form Input */}
                                    <div className="flex flex-col gap-y-3">
                                        <div className="flex justify-between gap-x-2 items-center text-base font-CabinetGrotesk-Medium">
                                            <label className="block">Email</label>
                                            {isError || tokenError ? (
                                                <p className="text-error">{errorMessage}</p>
                                            ) : (
                                                errors?.email && (
                                                    <p className="text-sm text-red-700"> {errors?.email?.message}</p>
                                                )
                                            )}
                                        </div>
                                        <div className="h-[56px] lg:h-[60px]">
                                            <input
                                                {...register("email")}
                                                className="w-full h-full px-4 pr-6 bg-inputFieldBg font-Inter-Regular text-base rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 "
                                                placeholder="Email address"
                                                type="email"
                                            />
                                        </div>
                                    </div>

                                    {/* Password Input */}
                                    <div className="flex flex-col gap-y-3">
                                        <div className="flex justify-between items-center">
                                            <label className="block text-base font-CabinetGrotesk-Medium">Password</label>
                                            {errors?.password && (
                                                <p className="text-sm text-red-700"> {errors?.password?.message}</p>
                                            )}
                                        </div>
                                        <div className="h-[56px] lg:h-[60px] relative">
                                            <input
                                                {...register("password")}
                                                className="w-full h-full px-4 pr-6 py-1 bg-inputFieldBg rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-base font-Inter-Regular"
                                                placeholder="Enter Password"
                                                type={passwordShown ? "text" : "password"}
                                            />
                                            <div className="absolute top-1/2 translate-y-[-50%] right-4 cursor-pointer" onClick={() => setPasswordShown(!passwordShown)}>
                                                {passwordShown ? <img src={openEye} alt="password visible" /> : <img src={slashEye} alt="password visible" />}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Forgot Password */}
                                <Link to={"/password-reset"} className="text-brandColor mt-2 flex flex-row-reverse text-base font-Inter-Regular">
                                    Forgot password?
                                </Link>

                                {/* Submit Button*/}
                                <button
                                    disabled={!formValid}
                                    className={`${formValid ? "bg-brandColor hover:bg-brandColor/90 text-white" : "bg-formDisabledBg"} mt-5 block w-full px-12 py-4 font-Inter-Regular text-base text-center transition-colors duration-150  border border-transparent rounded-lg  focus:outline-none focus:shadow-outline-blue`}
                                >
                                    {signInloading ? "Signing in..." : isSendEmailTokenLoading ? "Verifying..." : "Sign In"}
                                </button>

                                {/* No account found! */}
                                <div className="mt-3 flex justify-center text-[14px]">
                                    <p className="font-Inter-Light">
                                        Have an account?
                                        <Link to="/register" className="text-brandColor hover:underline font-Inter-SemiBold"> Create account</Link>
                                    </p>
                                </div>

                            </form>
                        </div>
                    </div>
                </section >
            </section >

            {errorMessage && (
                <Toast error desc={errorMessage ?? "An error occurred"} action={() => setErrorMessage(undefined)} />
            )}


            {verificationModalOpen && (
                <Modal closeModal={() => {
                    setVerificationModalOpen(false);
                }}>
                    <Notification title="Verify your account"
                        desc={<p>Seems your account hasn't been verified, not to worry we've sent a verification link to your mail to help you get verified. Check mail inbox or spam box, see you soon.</p>}
                        action={() => {
                            setVerificationModalOpen(false);
                        }} buttonTitle="Close" />
                </Modal>
            )}
        </>
    )
}