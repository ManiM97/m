import React from "react";

const Addbutton = ({ handleAddButtonClick, name }) => {
    return (
        <div>
            <button
                className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-1 bg-sky-600 text-white"
                type="button"
                onClick={handleAddButtonClick}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                {name}
            </button>
        </div>
    );
};

export default Addbutton;
