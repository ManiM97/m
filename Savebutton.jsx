import React from "react";

const Savebutton = ({ handleSaveClick }) => {
    return (
        <div>
            <button
                onClick={handleSaveClick}
                type="button"
                className="px-4 py-1 h-9 bg-indigo-500 text-white rounded-full font-normal"
            >
                Save
            </button>
        </div>
    );
};

export default Savebutton;
