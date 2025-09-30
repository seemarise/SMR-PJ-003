"use client";

import { usePathname } from "next/navigation";
import NavbarBottom from "./NavbarBottom";

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();

    const showNavbar = !pathname.startsWith("/login");

    return (
        <>
            <div className="flex-1">{children}</div>
            {showNavbar && (
                <div className="sticky bottom-0 w-full">
                    <NavbarBottom />
                </div>
            )}
        </>
    );
}
