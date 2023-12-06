import { useState } from "react";
import "./lineLoader.css";

export const LineLoader = () => {

    // Make modal non blocking
    const [closeLoader, setCloseLoader] = useState<boolean>(false);

    if (closeLoader) {
        return null;
    }

    return (
        <div onClick={() => setCloseLoader(true)} className="z-[1000]">
            <div className="loader-line"></div>
        </div>
    );
};
