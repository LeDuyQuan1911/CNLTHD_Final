import React, { useEffect, useRef, useState } from "react";

const DropDown = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutDropDown = () => {
            if (showDropdown) {
                console.log("Closing dropdown...");
                setShowDropdown(false);
            }
        };
        // ✅ Hàm này được tạo lại mỗi khi showDropdown thay đổi

        document.addEventListener("click", handleClickOutDropDown);
        return () => {
            document.removeEventListener("click", handleClickOutDropDown);
        };
    }, []); // Chạy lại mỗi khi showDropdown thay đổi

    return (
        <div className="relative w-full max-w-[400px]" ref={dropdownRef}>
            <div
                className="p-5 border border-gray-200 rounded-lg w-full cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                Selected
            </div>
            {showDropdown && (
                <div className="border border-gray-200 rounded-lg absolute top-full left-0 w-full bg-white">
                    <div className="p-5 cursor-pointer">JavaScript</div>
                    <div className="p-5 cursor-pointer">ReactJS</div>
                    <div className="p-5 cursor-pointer">VueJS</div>
                </div>
            )}
        </div>
    );
};

export default DropDown;
