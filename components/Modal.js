"use client";
import React, { useEffect } from "react";

export default function Modal({ title, children, onClose, open }) {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-lg w-[90%] h-[80vh] overflow-y-auto max-w-lg relative"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                {/* Title Centered */}
                {title && (
                    <h2 className="text-xl bg-white py-2 font-semibold text-center text-gray-800 mb-4 sticky top-0">
                        {title}
                    </h2>
                )}

                {/* Modal Body */}
                <div className="text-gray-700">{children}</div>
            </div>
        </div>
    );
}
