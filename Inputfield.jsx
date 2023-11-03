import React from "react";

const Inputfield = ({ value, onChange }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Enter Maximum 40 Characters"
                className="border border-gray-300 rounded py-1 px-2 text-sm"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default Inputfield;
