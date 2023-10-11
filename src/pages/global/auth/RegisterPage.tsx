// jshint esversion:6
import openEye from "@/assets/auth/eye.svg";
import slashEye from "@/assets/auth/eye-slash.svg"
import RegisterAuthImg from "@/assets/auth/auth_register.svg"
import { useAuthRegisterHook } from "@/hooks/global/auth";
import BrandLogo from "@/assets/auth/LogoMakr-6zrJ19.png.png"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { USERROLES } from "@/data/global/auth";

// Create user Schema for form data
const schema = z.object({
    firstname: z.string().nonempty({ message: "First name is required" }),
    lastname: z.string().nonempty({ message: "Last Name is required" }),
    phone: z.string().length(14).nonempty({ message: "Phone is required" }),
    email: z.string().nonempty({ message: "Email is required" }).email({ message: "Invalid email address" }),
    password: z.string().nonempty({ message: "Password is required" }),
});

// Extract inferred type from schema
type FormData = z.infer<typeof schema>;


export const RegisterPage: React.FC = () => {

    // Hide or View password
    const [passwordShown, setPasswordShown] = useState<boolean>(true);

    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    /***************************** FORM VALIDATION ******************************/
    const { register, handleSubmit, formState: { errors, isValid: formValid } } = useForm<FormData>({ resolver: zodResolver(schema) });

    const { authRegister, isError, isLoading: signUploading, } = useAuthRegisterHook()

    const onSubmit = async (data: FormData) => {
        console.log(data);

        // Register user
        const response = await authRegister({ firstname: data.firstname, lastname: data.lastname, phone: data.phone, email: data.email, password: data.password, role: USERROLES.USER });

        if (!response.success) {
            setErrorMessage(response.message ?? "Could not login!")
        }
    };

    return (
        <>
            <section className="flex items-center bg-gray-50">
                <section className="flex-1 h-full max-h-full max-w-full mx-auto bg-white rounded-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center">

                        {/*Image Slider  */}
                        <section className="w-full hidden lg:block relative max-h-screen overflow-hidden bg-brandColor">
                            <img className="w-full h-screen min-h-[670px] max-w-full" src={RegisterAuthImg} alt="img" />
                        </section>

                        <div className="p-9 pt-5 w-full max-w-[550px] h-[645px] relative">
                            {/* Image Container */}
                            <div className="flex justify-end">
                                <img src={BrandLogo} alt="brand" />
                            </div>

                            <h1 className="mb-1 text-left lg:text-[40px] text-3xl font-Sora-Bold">
                                Sign Up
                            </h1>

                            <div className="flex flex-wrap gap-2 justify-between items-center">
                                <p className="mb-1 mt-2 text-[14px] lg:text-base text-left text-placeholder font-Inter-Regular">
                                    Create an account in seconds
                                </p>

                                {isError && (
                                    <p className="text-error">{errorMessage}</p>
                                )}
                            </div>
                            <form className="w-full mt-3" onSubmit={handleSubmit(onSubmit)}>

                                {/* Form Container */}
                                <div className="flex flex-col gap-y-3">

                                    <div className="grid grid-cols-2 gap-x-3">
                                        {/* First Input */}
                                        <div className="flex flex-col gap-y-3">
                                            <div className="flex justify-between items-center text-base font-CabinetGrotesk-Medium">
                                                {errors?.firstname && (
                                                    <p className="text-sm text-red-700"> {errors?.firstname?.message}</p>

                                                )}
                                            </div>
                                            <div className="h-[56px]">
                                                <input
                                                    {...register("firstname")}
                                                    className="w-full h-full px-4 pr-6 bg-inputFieldBg font-Inter-Regular text-base rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 "
                                                    placeholder="First name"
                                                    type="text"
                                                />
                                            </div>
                                        </div>

                                        {/* Email Form Input */}
                                        <div className="flex flex-col gap-y-3">
                                            <div className="flex justify-between items-center text-base font-CabinetGrotesk-Medium">
                                                {errors?.lastname && (
                                                    <p className="text-sm text-red-700"> {errors?.lastname?.message}</p>
                                                )}
                                            </div>
                                            <div className="h-[56px]">
                                                <input
                                                    {...register("lastname")}
                                                    className="w-full h-full px-4 pr-6 bg-inputFieldBg font-Inter-Regular text-base rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 "
                                                    placeholder="Last name"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Phone Input */}
                                    <div className="flex flex-col gap-y-3">
                                        <div className="flex justify-between items-center text-base font-CabinetGrotesk-Medium">
                                            {errors?.phone && (
                                                <p className="text-sm text-red-700"> Enter a valid phone number i.e. +234...</p>
                                            )}
                                        </div>
                                        <div className="h-[56px]">
                                            <input
                                                {...register("phone")}
                                                className="w-full h-full px-4 pr-6 bg-inputFieldBg font-Inter-Regular text-base rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 "
                                                placeholder="Phone number +234..."
                                                type="tel"
                                                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    e.target.value = e.target.value.replace(/[^0-9+]/g, '').replace(/(\..*)\./g, '$1')
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Email Form Input */}
                                    <div className="flex flex-col gap-y-3">
                                        <div className="flex justify-between items-center text-base font-CabinetGrotesk-Medium">
                                            {errors?.email && (
                                                <p className="text-sm text-red-700"> {errors?.email?.message}</p>
                                            )}
                                        </div>
                                        <div className="h-[56px]">
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
                                            {errors?.password && (
                                                <p className="text-sm text-red-700"> {errors?.password?.message}</p>
                                            )}
                                        </div>
                                        <div className="h-[56px] relative">
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

                                {/* Submit Button*/}
                                <button
                                    className={`${formValid ? "bg-brandColor hover:bg-brandColor/90 text-white" : "bg-formDisabledBg"} mt-5 block w-full px-12 py-4 font-Inter-Regular text-base text-center transition-colors duration-150  border border-transparent rounded-lg  focus:outline-none focus:shadow-outline-blue`}
                                >
                                    {signUploading ? "Loading..." : "Create Account"}
                                </button>
                                
                                {/* Sign in */}
                                <div className="mt-3 flex justify-start text-[14px]">
                                    <p className="font-Inter-Light">
                                        Already a member?
                                        <Link to="/" className="text-brandColor hover:underline font-Inter-Bold"> Sign In</Link>
                                    </p>
                                </div>

                            </form>
                        </div>
                    </div>
                </section >
            </section >
        </>
    )
}