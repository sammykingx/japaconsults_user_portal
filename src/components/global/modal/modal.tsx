// jshint esversion:6
import { ReactNode, useEffect } from "react";
import closeIconImg from "@/assets/global/close.png";

type ModalProps = {
    closeModal: () => void;
    children: ReactNode;
    info?: boolean
    bare?: boolean
};

export function Modal({ closeModal, children, bare, info }: ModalProps) {
    // Prevent background scroll
    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    return (
        <div
            className="fixed inset-0 bg-black/30 flex justify-center items-center transition-colors z-[999]"
            onClick={closeModal}
        >
            <div className={`relative bg-white ${!bare && "px-5 py-10 sm:p-10 "} rounded`}>
                {/* This  */}
                {(!bare && !info) && (
                    <img
                        className="absolute top-9 right-6 w-[30px] h-[30px] z-[10] cursor-pointer"
                        src={closeIconImg}
                        alt="close icon"
                        onClick={closeModal}
                    />
                )}

                {/* Stop propagation to prevent closing modal */}
                <div
                    className="h-max"
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
