import AuthImg from "@/assets/auth/auth_img.png";
import { useState, useEffect } from "react";
import openEye from "@/assets/auth/eye.svg";
import slashEye from "@/assets/auth/eye-slash.svg"
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "@/utils/global";
import { Modal } from "@/components/global";
import { Notification } from "@/components/global";
import BrandLogo from "@/assets/auth/LogoMakr-6zrJ19.png.png"
import { useSearchParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Signup Validation imports
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthChangePasswordHook } from "@/hooks/global/auth/authChangePasswordHook";

// Create user Schema for form data
const schema = z.object({
    password: z
        .string()
        .min(8, { message: "Password must be 8 or more characters long" })
        .refine((value) => /[A-Z]/.test(value), 'String must contain at least one uppercase letter')
        .refine((value) => /[a-z]/.test(value), 'String must contain at least one lower letter')
        .refine((value) => /[0-9]/.test(value), 'String must contain at least a digit')
    // .refine((value) => /[!@#$&*.]/.test(value), 'String must contain a special character')
    ,
    confirmPassword: z
        .string().nonempty({ message: "Field cannot be empty" })
})
    .refine((data) => {
        return data.password === data.confirmPassword
    }, { message: "Passwords do not match", path: ["confirmPassword"] });


// Extract inferred type from schema
type FormData = z.infer<typeof schema>;

// Timeout ID
let timeoutId: any;

export const PasswordResetPage = () => {

    // GET navigator
    const navigate = useNavigate();

    // Hide or View password
    const [passwordShown, setPasswordShown] = useState<boolean>(true);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState<boolean>(true);

    // Get query parameters
    const [queryParameters] = useSearchParams();

    // Define Error message
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    // Modal to display any error gotten from the User
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    /***************************** FORM VALIDATION ******************************/
    const { register, handleSubmit, formState: { errors, isValid: formValid } } = useForm<FormData>({ resolver: zodResolver(schema) });

    // Reset password page
    const { authChangePassword, isLoading: isResetPasswordLoading } = useAuthChangePasswordHook();

    // Clear timeout upon component unmount
    useEffect(() => {
        return () => {
            clearTimeout(timeoutId);
        }
    }, [])

    // Get token
    const userToken = queryParameters.get("token");

    // If no user token is found, navigate to login page
    if (!userToken) {
        return <Navigate to={"/login"} />
    }

    // Submit from details to server and verify OTP
    async function resetPassowrd(userData: FormData) {
        // No token, return
        if (userToken == null)
            return;

        try {
            // Send OTP to user email
            const response = await authChangePassword({ token: userToken, new_pwd: userData.password });

            if (!response.success) {
                throw new Error(response.message);
            }

            // Inform user of successful email verification link
            setModalOpen(true);

        } catch (error) {
            const errorData = getErrorMessage(error);
            setErrorMessage(errorData)
            timeoutId = setTimeout(() => {
                setErrorMessage(undefined);
            }, 2000)
        }
    }


    // Submit Form Details
    const onSubmit = (data: FormData) => {
        // Submit details to backend
        resetPassowrd(data);
    };

    return (
        <>
            <section className="flex items-center bg-gray-50">
                <section className="flex-1 h-full max-h-full max-w-full mx-auto bg-white rounded-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center" >

                        {/*Image Slider  */}
                        <section className="w-full hidden lg:block relative max-h-screen overflow-hidden bg-brandColor">
                            <img className="w-full h-screen min-h-[670px] max-w-full" src={AuthImg} alt="img" />
                        </section>

                        <div className="p-9 pt-12 w-full max-w-[550px] h-[645px] flex flex-col justify-center">
                            {/* Image Container */}
                            <div className="fixed top-5 right-5">
                                <img src={BrandLogo} alt="brand" />
                            </div>

                            <h1 className="text-center lg:text-[40px] text-3xl font-CabinetGrotesk-Bold">
                                Reset Password
                            </h1>

                            <p className="mt-4 text-[14px] lg:text-base text-center text-placeholder font-Manrope-Regular">
                                Please enter a new password!
                            </p>

                            <form className="w-full mt-12" onSubmit={handleSubmit(onSubmit)}>

                                {/* Form Container */}
                                <div className="flex flex-col gap-y-5">

                                    {/* Password Input */}
                                    <div className="flex flex-col gap-y-3">
                                        <div className="flex justify-between items-center text-base font-CabinetGrotesk-Medium">
                                            <label className="block">Password</label>
                                            {errors?.password && (
                                                <p className="text-sm text-red-700"> {errors?.password?.message}</p>
                                            )}
                                            {
                                                errorMessage && <span className="text-sm text-error">{errorMessage}</span>
                                            }
                                        </div>
                                        <div className="h-[56px] lg:h-[60px] relative">
                                            <input
                                                {...register("password")}
                                                className="w-full h-full px-4 pr-6 bg-inputFieldBg font-Manrope-Regular text-base rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 "
                                                placeholder="Enter Password"
                                                type={passwordShown ? "text" : "password"}
                                            />
                                            <div className="absolute top-1/2 translate-y-[-50%] right-4 cursor-pointer" onClick={() => setPasswordShown(!passwordShown)}>
                                                {passwordShown ? <img src={openEye} alt="password visible" /> : <img src={slashEye} alt="password visible" />}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Confirm Password Input */}
                                    <div className="flex flex-col gap-y-3">
                                        <div className="flex justify-between items-center text-base font-CabinetGrotesk-Medium">
                                            <label className="block">Confirm Password</label>
                                            {errors?.confirmPassword && (
                                                <p className="text-sm text-red-700"> {errors?.confirmPassword?.message}</p>
                                            )}
                                        </div>
                                        <div className="h-[56px] lg:h-[60px] relative">
                                            <input
                                                {...register("confirmPassword")}
                                                className="w-full h-full px-4 pr-6 bg-inputFieldBg font-Manrope-Regular text-base rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 "
                                                placeholder="Enter Password"
                                                type={confirmPasswordShown ? "text" : "password"}
                                            />
                                            <div className="absolute top-1/2 translate-y-[-50%] right-4 cursor-pointer" onClick={() => setConfirmPasswordShown(!confirmPasswordShown)}>
                                                {confirmPasswordShown ? <img src={openEye} alt="password visible" /> : <img src={slashEye} alt="password visible" />}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button*/}
                                <button
                                    className={`${formValid ? "bg-brandColor hover:bg-brandColor/90 text-white" : "bg-formDisabledBg"} mt-14 block w-full px-12 py-4 font-Manrope-Regular text-base text-center transition-colors duration-150  border border-transparent rounded-lg  focus:outline-none focus:shadow-outline-blue`}
                                >
                                    {isResetPasswordLoading ? "Loading..." : "Continue"}
                                </button>
                            </form>
                        </div>
                    </div>
                </section >
            </section >

            {/* SEND EMAIL OTP ERROR */}
            {
                modalOpen && (
                    <Modal closeModal={() => {
                        setModalOpen(false);
                        navigate("/login")
                    }}>
                        <Notification title="Info"
                            desc={<p>Your password has been reset successfully!</p>}
                            action={() => {
                                setModalOpen(false)
                                navigate("/login");
                            }} buttonTitle="Okay" />
                    </Modal>
                )
            }
        </>
    );
};