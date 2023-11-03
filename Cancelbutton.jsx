import React from "react";

const CancelButton = ({ handleCancelClick }) => {
    return (
        <div>
            <button
                onClick={handleCancelClick}
                type="button"
                className="px-2 py-1 border border-indigo-600 text-indigo-600 rounded-full font-normal"
            >
                Cancel
            </button>
        </div>
    );
};

export default CancelButton;
