"use client";

import { usePathname } from "next/navigation";
import NavbarBottom from "./NavbarBottom";
import NavbarTop from "./NavbarTop";
import { useState } from "react";

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();
    const [sharedTitle, setSharedTitle] = useState("");

    // Hide navbar on login and classroom subject pages
    const hideNavbarPaths = ["/login", "/classroom"];
    const shouldHideNavbar = hideNavbarPaths.some(path => pathname.startsWith(path));

    return (
        <div className="h-full w-full flex flex-col relative">
            {!shouldHideNavbar && (
                <div className="h-15">
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
