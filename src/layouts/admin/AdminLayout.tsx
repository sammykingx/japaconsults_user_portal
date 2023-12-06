/* Please do not modify this file. This will affect the layout of the application */
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { AdminAsideNavigation } from "@/components/user/global";
// import { AsideNavigation } from "@/components/user";
// import { useAppSelector } from "@/hooks/typedHooks";
// import ProfileImage from "@/assets/global/defaultAvatar.png";
// import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserProfileMenu } from "@/components/user/global";


export function AdminLayout() {

    // Get Location
    const location = useLocation();
    const currentLocationPathname = location.pathname;

    // profile image selector from the state
    // const { userProfile } = useAppSelector((state) => state.auth);

    // const navigateTo = useNavigate();

    // Handle the state of the aside navigation on mobile
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <div className="grid grid-rows-1 h-screen">

            {/******************** DESKTOP VIEW NAVIGATION *********************/}
            <header className="hidden sm:flex fixed top-0 inset-x-0 lg:left-[14rem] items-center pl-6 h-[60px] shadow-sm border-b-[1px] border-[#dcdcdc] bg-white z-[90]">

                {/* Hamburger menu */}
                <div className="hover:cursor-pointer lg:hidden"
                    onClick={() => setIsNavOpen(true)}
                >
                    <HiBars3BottomLeft size={35} />
                </div>

                {/* Navigation title */}
                <div className="font-bold text-[24px] font-CabinetGrotesk-Bold ml-9 lg:ml-0">
                    {currentLocationPathname == "/admin" && "Home"}
                    {/* {currentLocationPathname == "/messages" && "Messages"} */}
                    {currentLocationPathname == "/admin/files" && "Files"}
                    {currentLocationPathname.substring(0, 11) == '/files/file' && (
                        <div className="flex gap-x-3">
                            <Link to="/files">File</Link>
                            <span>&gt;</span>
                            <span className="capitalize">{currentLocationPathname.substring(12).toLowerCase()}</span>
                        </div>
                    )}
                    {currentLocationPathname == "/admin/notes" && "Notes"}
                    {currentLocationPathname == "/admin/notes/create" && "Notes"}
                    {currentLocationPathname == "/admin/invoice" && "Invoice"}
                    {currentLocationPathname == "/admin/wallets" && "Wallet"}
                    {currentLocationPathname == "/admin/rate" && "Calculate Rate"}
                    {currentLocationPathname == "/admin/account" && "Accounts"}
                    {currentLocationPathname == "/admin/wallets/transactions" && "Wallet Transactions"}
                    {currentLocationPathname == "/admin/account/report" && "Report an Issue"}
                    {currentLocationPathname == "/admin/invoice" && "Invoice"}
                    {currentLocationPathname == "/admin/payments" && "Payments"}
                </div>

                {/* Navigation */}
                <nav className="w-full flex items-center flex-wrap text-base justify-end bg-red-00 h-full gap-[1.5rem] pr-[7%] lg:pr-[5%] ">
                    <UserProfileMenu />
                </nav>
            </header>

            {/******************** MOBILE VIEW NAVIGATION *********************/}
            <header className="sm:hidden h-[60px] fixed top-0 inset-x-0 lg:left-[14rem] flex items-center justify-between px-6 shadow-sm bg-white z-[90]">

                {/* Hamburger menu */}
                <div className="cursor-pointer" onClick={() => setIsNavOpen(true)}>
                    <HiBars3BottomLeft size={35} />
                </div>

                {/* Navigation title */}
                <div className="font-bold text-[24px] font-CabinetGrotesk-Bold absolute left-[50%] translate-x-[-50%]">
                    {currentLocationPathname == "/admin" && "Home"}
                    {/* {currentLocationPathname == "/messages" && "Messages"} */}
                    {currentLocationPathname == "/admin/files" && "Files"}
                    {currentLocationPathname == "/admin/files/file" && "Files"}
                    {currentLocationPathname.substring(0, 11) == '/files/file' && (
                        <div className="flex gap-x-3">
                            <Link to="/files">File</Link>
                            <span>&gt;</span>
                            <span className="capitalize">{currentLocationPathname.substring(12).toLowerCase()}</span>
                        </div>
                    )}
                    {currentLocationPathname == "/admin/notes" && "Notes"}
                    {currentLocationPathname == "/admin/notes/create" && "Notes"}
                    {currentLocationPathname == "/admin/invoice" && "Invoice"}
                    {currentLocationPathname == "/admin/rate" && "Calculate Rate"}
                    {currentLocationPathname == "/admin/account" && "Accounts"}
                    {currentLocationPathname == "/admin/wallets/transactions" && "Wallet Transactions"}
                    {currentLocationPathname == "/admin/account/report" && "Report an Issue"}
                    {currentLocationPathname == "/admin/invoice" && "Invoice"}
                    {currentLocationPathname == "/admin/payments" && "Payments"}
                </div>

                {/* Navigation */}
                {/* Display those icons only on dashboard page */}
                {currentLocationPathname == "/admin" && (
                    <nav className="w-ful flex items-center flex-wrap text-base justify-end bg-red-00 h-full gap-[1.5rem] pr-[7%] lg:pr-[5%] ">
                        <UserProfileMenu />
                    </nav>
                )}
            </header >

            {/* Side Navigation */}
            <div className={`fixed inset-y-0 lg:w-[14rem] w-[271px] ${!isNavOpen && "-left-full"} lg:left-0 z-[100]`}>
                <AdminAsideNavigation closeNav={() => setIsNavOpen(false)} />
            </div >

            {/* Render Outlet, Each page */}
            <div className="px-7 lg:ml-[14rem] mt-[60px] overflow-scroll bg-[#F6F6F6]" onClick={() => setIsNavOpen(false)} >
                <Outlet />
            </div >
        </div>
    );
}
