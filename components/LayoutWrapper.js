"use client";

import { usePathname } from "next/navigation";
import NavbarBottom from "./NavbarBottom";
import NavbarTop from "./NavbarTop";
import { useState } from "react";


export default function LayoutWrapper({ children }) {
    const pathname = usePathname();
    const [sharedTitle, setSharedTitle] = useState("")
    const showNavbar = !pathname.startsWith("/login");

    return (
        <div className="h-full w-full flex flex-col relative">
            <div className="h-15">
                {/* Top Navbar */}
                <NavbarTop sharedTitle={sharedTitle} />
            </div>

            <div className="flex-1 overflow-y-auto pb-24">
                {/* Main content */}
                {children}
            </div>

            {showNavbar && (
                <div className="fixed bottom-0 w-full h-15 bg-white shadow-md z-50">
                    <NavbarBottom setSharedTitle={setSharedTitle} />
                </div>
            )}
        </div>

    );
}
