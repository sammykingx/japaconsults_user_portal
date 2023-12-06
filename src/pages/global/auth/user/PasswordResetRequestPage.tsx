import AuthImg from "@/assets/auth/auth_img.png";
import BrandLogo from "@/assets/auth/LogoMakr-6zrJ19.png.png"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "@/utils/global";
import { Modal } from "@/components/global";
import { useAuthSendEmailTokenHook } from "@/hooks/global/auth";
import { Notification } from "@/components/global";
import { EMAIL_VERIFICATION_TYPE } from "@/data/global/auth/apiTypes";

// Signup Validation imports
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Create user Schema for form data
const schema = z.object({
    email: z.string().nonempty({ message: "Email is required" }).email({ message: "Invalid email address" }),
});

// Extract inferred type from schema
type FormData = z.infer<typeof schema>;

// Timeout ID
let timeoutId: any;

export const PasswordResetRequestPage = () => {

    // GET navigator
    const navigate = useNavigate();

    // Define Error message
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    // Modal to display any error gotten from the User
    const [modalOpen, setModalOpen] = useState<boolean>(true);

    /***************************** FORM VALIDATION ******************************/
    const { register, handleSubmit, formState: { errors, isValid: formValid } } = useForm<FormData>({ resolver: zodResolver(schema) });

    // Send Verification Link
    const { authSendEmailToken, isLoading: isSendEmailTokenLoading, isSuccess: isSendEmailTokenSuccess } = useAuthSendEmailTokenHook();

    // Clear timeout upon component unmount
    useEffect(() => {
        return () => {
            clearTimeout(timeoutId);
        }
    }, [])

    // Submit from details to server and verify OTP
    async function RequestPasswordReset(userData: FormData) {
        try {

            // Send verification link to user email
            const response = await authSendEmailToken(userData.email, EMAIL_VERIFICATION_TYPE.PASSWORD_CHANGE);

            if (!response.success) {
                throw new Error(response.message);
            }

            // Inform user of successful password verification link
            setModalOpen(true);

        } catch (error) {
            const errorData = getErrorMessage(error);
            setErrorMessage(errorData);
            timeoutId = setTimeout(() => {
                setErrorMessage(undefined);
            }, 5000)
        }
    }

    // Submit Form Details
    const onSubmit = (data: FormData) => {
        // Submit details to backend
        RequestPasswordReset(data);
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

                            {/*Brand Image Container */}
                            <div className="fixed top-5 right-5">
                                <img src={BrandLogo} alt="brand" />
                            </div>

                            <h1 className="text-center lg:text-[40px] text-3xl font-CabinetGrotesk-Bold">
                                Reset Password
                            </h1>

                            <p className="mt-4 text-[14px] lg:text-base text-center text-placeholder font-Manrope-Regular">
                                Please provide your email address
                            </p>

                            <form className="w-full mt-12" onSubmit={handleSubmit(onSubmit)}>

                                {/* Form Container */}
                                <div className="flex flex-col gap-y-5">

                                    {/* Email Form Input */}
                                    <div className="flex flex-col gap-y-3">
                                        <div className="flex justify-between items-center text-base font-CabinetGrotesk-Medium">
                                            <label className="block">Email</label>
                                            {errors?.email && (
                                                <p className="text-sm text-red-700"> {errors?.email?.message}</p>
                                            )}
                                            {
                                                errorMessage && <span className="text-sm text-error">{errorMessage}</span>
                                            }
                                        </div>
                                        <div className="h-[56px] lg:h-[60px]">
                                            <input
                                                {...register("email")}
                                                className="w-full h-full px-4 pr-6 bg-inputFieldBg font-Manrope-Regular text-base rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 "
                                                placeholder="Enter Email"
                                                type="email"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button*/}
                                <button
                                    disabled={!formValid}
                                    className={`${formValid ? "bg-brandColor hover:bg-brandColor/90 text-white" : "bg-formDisabledBg"} mt-14 block w-full px-12 py-4 font-Manrope-Regular text-base text-center transition-colors duration-150  border border-transparent rounded-lg  focus:outline-none focus:shadow-outline-blue`}
                                >
                                    {isSendEmailTokenLoading ? "Loading..." : "Continue"}
                                </button>
                            </form>
                        </div>
                    </div>
                </section >
            </section >

            {/* SEND EMAIL OTP ERROR */}
            {
                // Network Error Fetching details
                isSendEmailTokenSuccess && modalOpen && (
                    <Modal closeModal={() => {
                        setModalOpen(false)
                        navigate("/login")
                    }}>
                        <Notification title="Export"
                            desc={<p>A password reset verification link has been sent to your email address. Click on the link to reset your password</p>}
                            action={() => {
                                setModalOpen(false);
                                navigate("/login")
                            }
                            } buttonTitle="Okay" />
                    </Modal>
                )
            }
        </>
    );
};