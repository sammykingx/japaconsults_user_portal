// jshint esversion:6
import { NavLink, useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { useAppDispatch } from "@/hooks/typedHooks";
import { AuthSliceActions } from "@/features/global/authSlice";
import React, { useState } from "react";
import { Modal } from "@/components/global";
import { Signout } from "@/components/global/SignOut";
import { useAuthLogoutHook } from "@/hooks/global/auth";
// import { useLocation } from "react-router-dom";

/* Nav links Icons */
import BrandLogo from "@/assets/auth/LogoMakr-6zrJ19.png.png";
import HomeIcon from "@/assets/global/home.svg";
import HomeIconDark from "@/assets/global/homeDark.svg";
// import UsersIcon from "@/assets/global/people.svg";
// import UsersIconDark from "@/assets/global/peopleDark.svg";
// import MessagesIcon from "@/assets/global/messages-3.svg"
// import MessagesIconDark from "@/assets/global/messagesDark.svg"
import NotesIcon from "@/assets/global/edit.svg";
import NotesIconDark from "@/assets/global/editDark.svg";
import FileIcon from "@/assets/global/folderIcon.svg"
import FileIconDark from "@/assets/global/nav-folder-add.svg"
import InvoiceIcon from "@/assets/global/receipt-2.svg";
// import InvoiceIconDark from "@/assets/global/document-textDark.svg";
import LogoutIcon from "@/assets/global/logout.svg";
import Card from "@/assets/payments/card-pos.svg";
import CardDark from "@/assets/payments/card-posDark.svg";
import { persistor } from "@/app/store";

type AsideNavigationProps = {
    closeNav: () => void
}

export function AsideNavigation({ closeNav }: AsideNavigationProps) {

    // Get the location
    // const location = useLocation();

    // GET a navigator
    const navigate = useNavigate();

    // Logout hook to invalidate token
    const { authLogout, isLoading } = useAuthLogoutHook();

    // Logout modal
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch()

    async function logout() {
        // Clear all tokens in state
        dispatch(AuthSliceActions.logout());

        // Purge local storage
        persistor.purge();

        // Invalidate token
        await authLogout();

        // Reload doc
        window.location.reload();

        // Navigate to login page
        navigate("/login");
    }

    return (
        <>
            <aside
                className={`w-full h-full bg-white pt-[30px] relative font-CabinetGrotesk-Bold`}
                aria-label="Sidebar"
            >
                {/* Navigation Logo and Close Icon */}
                <div className="flex justify-between items-center px-[15%]">
                    {/* Navigation logo */}
                    <NavLink to={"/home"}>
                        <div className="flex items-center w-[100px] h-[60px]" onClick={closeNav}>
                            <div>
                                <img src={BrandLogo} alt="logo" className="h-full w-full" />
                            </div>
                        </div>
                    </NavLink>

                    {/* Close icon */}
                    <div className="lg:hidden cursor-pointer" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                        <RxCross1
                            size={20}
                            className="z-20 top-8 lg:hidden"
                            onClick={closeNav}
                        />
                    </div>
                </div>

                {/* Attach third party messaging app */}
                <div id="user-messages"></div>

                {/* NavLinks */}
                <ul className="font-medium transition duration-500 flex flex-col space-y-3 sm:space-y-2 mx-auto pt-5 px-5">

                    {/* Dashboard home page */}
                    <li className={`ease-in-out transition duration-300 border-[1px] border-white hover:border-brandColor rounded-md`}>
                        <NavLink
                            to="/"
                            onClick={closeNav}
                        >
                            {({ isActive }) => (
                                <div className={`flex py-[12px] pl-[14%] sm:justify-start ease-in-out transition duration-100 ${isActive ? "bg-brandColor text-white" : "text-black"} rounded-md`}>
                                    <img src={isActive ? HomeIconDark : HomeIcon} alt="home page" />
                                    <span className="pl-3">Home</span>
                                </div>
                            )}
                        </NavLink>
                    </li>

                    {/* Users page */}
                    {/* <li className={`ease-in-out transition duration-300 border-[1px] border-white hover:border-brandColor rounded-md`}>
                        <NavLink
                            to="/users"
                            onClick={closeNav}
                        >
                            {({ isActive }) => (
                                <div className={`flex py-[12px] pl-[14%] sm:justify-start ease-in-out transition duration-100 ${isActive ? "bg-brandColor text-white" : "text-black"} rounded-md`}>
                                    <img src={isActive ? UsersIcon : UsersIcon} alt="user page" />
                                    <span className="pl-3">Users</span>
                                </div>
                            )}
                        </NavLink>
                    </li> */}

                    {/* Messages */}
                    {/* <li className={`ease-in-out transition duration-300 border-[1px] border-white hover:border-brandColor rounded-md`}>
                        <NavLink
                            to="/messages"
                            onClick={closeNav}
                        >
                            {({ isActive }) => (
                                <div className={`flex py-[12px] pl-[14%] sm:justify-start ease-in-out transition duration-100 ${isActive ? "bg-brandColor text-white" : "text-black"} rounded-md`}>
                                    <img src={isActive ? MessagesIconDark : MessagesIcon} alt="msg page" />
                                    <span className="pl-3">Messages</span>
                                </div>
                            )}
                        </NavLink>
                    </li> */}

                    {/* Notes */}
                    <li className={`ease-in-out transition duration-300 border-[1px] border-white hover:border-brandColor rounded-md`}>
                        <NavLink
                            to="/notes"
                            onClick={closeNav}
                        >
                            {({ isActive }) => (
                                <div className={`flex py-[12px] pl-[14%] sm:justify-start ease-in-out transition duration-100 ${isActive ? "bg-brandColor text-white" : "text-black"} rounded-md`}>
                                    <img src={isActive ? NotesIconDark : NotesIcon} alt="msg page" />
                                    <span className="pl-3">Notes</span>
                                </div>
                            )}
                        </NavLink>
                    </li>

                    {/* Files */}
                    <li className={`ease-in-out transition duration-300 border-[1px] border-white hover:border-brandColor rounded-md`}>
                        <NavLink
                            to="/files"
                            onClick={closeNav}
                        >
                            {({ isActive }) => (
                                <div className={`flex py-[12px] pl-[14%] sm:justify-start ease-in-out transition duration-100 ${isActive ? "bg-brandColor text-white" : "text-black"} rounded-md`}>
                                    <img src={isActive ? FileIcon : FileIconDark} alt="msg page" />
                                    <span className="pl-3">Files</span>
                                </div>
                            )}
                        </NavLink>
                    </li>

                    {/* Invoice */}
                    <li className={`ease-in-out transition duration-300 border-[1px] border-white hover:border-brandColor rounded-md`}>
                        <NavLink
                            to="/invoice"
                            onClick={closeNav}
                        >
                            {({ isActive }) => (
                                <div className={`flex py-[12px] pl-[14%] sm:justify-start ease-in-out transition duration-100 ${isActive ? "bg-brandColor text-white" : "text-black"} rounded-md`}>
                                    <img src={isActive ? InvoiceIcon : InvoiceIcon} alt="msg page" />
                                    <span className="pl-3">Invoice</span>
                                </div>
                            )}
                        </NavLink>
                    </li>


                    {/* Payments */}
                    <li className={`ease-in-out transition duration-300 border-[1px] border-white hover:border-brandColor rounded-md`}>
                        <NavLink
                            to="/payments"
                            onClick={closeNav}
                        >
                            {({ isActive }) => (
                                <div className={`flex py-[12px] pl-[14%] sm:justify-start ease-in-out transition duration-100 ${isActive ? "bg-brandColor text-white" : "text-black"} rounded-md`}>
                                    <img src={isActive ? Card : CardDark} alt="msg page" />
                                    <span className="pl-3">Payments</span>
                                </div>
                            )}
                        </NavLink>
                    </li>

                    {/* Logout */}
                    <li
                        className={`relative top-5 flex py-[18px] pl-[15%] cursor-pointer`}
                        onClick={() => { closeNav(); setIsLogoutModalOpen(true) }}
                    >
                        <img src={LogoutIcon} className="w-[20px] h-[20px]" alt="Log out" />
                        <p className="flex whitespace-nowrap pl-3 text-[#C93636]  font-[600]">Log Out</p>
                    </li>

                </ul>
            </aside>

            {/* Sign out Modal */}
            {
                isLogoutModalOpen && (
                    <Modal closeModal={() => setIsLogoutModalOpen(false)}>
                        <Signout next={logout} cancel={() => setIsLogoutModalOpen(false)} loading={isLoading} />
                    </Modal>
                )
            }
        </>

    );
}