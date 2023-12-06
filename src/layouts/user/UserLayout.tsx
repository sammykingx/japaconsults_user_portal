/* Please do not modify this file. This will affect the layout of the application */
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { AsideNavigation } from "@/components/user";
// import { useAppSelector } from "@/hooks/typedHooks";
// import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserProfileMenu } from "@/components/user/global";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/typedHooks";


export function UserLayout() {

    const { userProfile } = useAppSelector((state) => state.auth)

    // Get Location
    const location = useLocation();

    const currentLocationPathname = location.pathname;

    // profile image selector from the state
    // const { userProfile } = useAppSelector((state) => state.auth);

    // Handle the state of the aside navigation on mobile
    const [isNavOpen, setIsNavOpen] = useState(false);

    useEffect(() => {
        var Tawk_API: any = Tawk_API || {};

        Tawk_API.visitor = {
            name: userProfile?.name,
            email: userProfile?.email
        };

        (function () {
            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/6558d8cfd600b968d314908d/1hfhgtrjb';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode?.insertBefore(s1, s0);
        })();

        Tawk_API.onLoad = function () {
            Tawk_API.showWidget();
        };

        return () => {
            Tawk_API.onLoad = function () {
                Tawk_API.hideWidget();
            };
        }
    }, [])


    return (
        <div className="grid grid-rows-1 h-screen">

            {/******************** DESKTOP VIEW NAVIGATION *********************/}
            <header className="hidden sm:flex justify-between fixed top-0 inset-x-0 lg:left-[14rem] items-center pl-6 h-[60px] shadow-sm border-b-[1px] border-[#dcdcdc] bg-white z-[90]">

                {/* Hamburger menu */}
                <div className="hover:cursor-pointer lg:hidden"
                    onClick={() => setIsNavOpen(true)}
                >
                    <HiBars3BottomLeft size={35} />
                </div>

                {/* Navigation title */}
                <div className="font-bold text-[24px] font-CabinetGrotesk-Bold ml-9 lg:ml-0">
                    {currentLocationPathname == "/" && "Home"}
                    {currentLocationPathname == "/messages" && "Messages"}
                    {currentLocationPathname == "/files" && "Files"}
                    {currentLocationPathname.substring(0, 11) == '/files/file' && (
                        <div className="flex gap-x-3">
                            <Link to="/files">File</Link>
                            <span>&gt;</span>
                            <span className="capitalize">{currentLocationPathname.substring(12).toLowerCase()}</span>
                        </div>
                    )}
                    {currentLocationPathname == "/notes" && "Notes"}
                    {currentLocationPathname == "/notes/create" && "Notes"}
                    {currentLocationPathname == "/invoice" && "Invoice"}
                    {currentLocationPathname == "/invoice/pay" && "Payment Option"}
                    {currentLocationPathname == "/invoice/pay/bank" && "Bank Transfer"}
                    {currentLocationPathname == "/wallets" && "Wallet"}
                    {currentLocationPathname == "/rate" && "Calculate Rate"}
                    {currentLocationPathname == "/account" && "Accounts"}
                    {currentLocationPathname == "/wallets/transactions" && "Wallet Transactions"}
                    {currentLocationPathname == "/account/report" && "Report an Issue"}
                    {currentLocationPathname == "/payments" && "Payments"}
                </div>

                {/* Navigation */}
                <nav className="w-ful flex items-center flex-wrap text-base justify-end bg-red-00 h-full gap-[1.5rem] pr-[7%] lg:pr-[5%] ">
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
                    {currentLocationPathname == "/" && "Home"}
                    {currentLocationPathname == "/messages" && "Messages"}
                    {currentLocationPathname == "/files" && "Files"}
                    {currentLocationPathname == "/files/file" && "Files"}
                    {currentLocationPathname.substring(0, 11) == '/files/file' && (
                        <div className="flex gap-x-3">
                            <Link to="/files">File</Link>
                            <span>&gt;</span>
                            <span className="capitalize">{currentLocationPathname.substring(12).toLowerCase()}</span>
                        </div>
                    )}
                    {currentLocationPathname == "/notes" && "Notes"}
                    {currentLocationPathname == "/notes/create" && "Notes"}
                    {currentLocationPathname == "/invoice" && "Invoice"}
                    {currentLocationPathname == "/invoice/pay" && "Select Payment"}
                    {currentLocationPathname == "/invoice/pay/bank" && "Bank Transfer"}
                    {currentLocationPathname == "/rate" && "Calculate Rate"}
                    {currentLocationPathname == "/account" && "Accounts"}
                    {currentLocationPathname == "/wallets/transactions" && "Wallet Transactions"}
                    {currentLocationPathname == "/account/report" && "Report an Issue"}
                    {currentLocationPathname == "/payments" && "Payments"}
                </div>

                {/* Navigation */}
                {/* Display those icons only on dashboard page */}
                {currentLocationPathname == "/" && (
                    <nav className="w-ful flex items-center flex-wrap text-base justify-end bg-red-00 h-full gap-[1.5rem] pr-[7%] lg:pr-[5%] ">
                        <UserProfileMenu />
                    </nav>
                )}
            </header >

            {/* Side Navigation */}
            <div className={`fixed inset-y-0 lg:w-[14rem] w-[271px] ${!isNavOpen && "-left-full"} lg:left-0 z-[100]`}>
                <AsideNavigation closeNav={() => setIsNavOpen(false)} />
            </div >

            {/* Render Outlet, Each page */}
            <div className="px-7 lg:ml-[14rem] mt-[60px] overflow-scroll bg-[#F6F6F6]" onClick={() => setIsNavOpen(false)} >
                <Outlet />
            </div >
        </div>
    );
}
