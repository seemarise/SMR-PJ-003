"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
const NavbarBottom = dynamic(() => import("./NavbarBottom"), {
    loading: () => <div className="h-15 w-full bg-gray-100 animate-pulse"></div>,
    ssr: false,
});
const NavbarTop = dynamic(() => import("./NavbarTop"), {
    loading: () => <div className="h-15 w-full bg-gray-100 animate-pulse"></div>,
    ssr: false,
});

import { useState } from "react";

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();
    const [sharedTitle, setSharedTitle] = useState("");

    // Hide navbar on these exact paths
    const hideNavbarExactPaths = ["/login", "/profile"];
    const shouldHideNavbar =
        hideNavbarExactPaths.includes(pathname) ||
        (pathname.startsWith("/classroom") && pathname !== "/classroom");

    return (
        <div className="h-full w-full flex flex-col relative">
            {!shouldHideNavbar && (
                <div className="h-15 sticky top-0 z-10">
                    <NavbarTop sharedTitle={sharedTitle} />
                </div>
            )}

            <div className={`flex-1 overflow-y-auto ${!shouldHideNavbar ? "pb-24" : ""}`}>
                {children}
            </div>

            {!shouldHideNavbar && (
                <div className="fixed bottom-0 w-full h-15 bg-white shadow-md z-50">
                    <NavbarBottom setSharedTitle={setSharedTitle} />
                </div>
            )}
        </div>
    );
}
