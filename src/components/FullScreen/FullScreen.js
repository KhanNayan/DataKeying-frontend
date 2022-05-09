import React from "react";

export default function FullScreen() {
    const mystyle = {
        position: "absolute",
        zIndex: "9999",
        right: "25px",
        top: "20px",
        border: "2px solid #dc3545",
    };
    const handleExpand = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };
    return (
        <button
            className="btn btn-outline-danger  "
            onClick={handleExpand}
            style={mystyle}
        >
            <i className="fa fa-arrows-alt" aria-hidden="true"></i>
        </button>
    );
}
