import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Editbutton from "./Editbutton";
import Savebutton from "./Savebutton";
import CancelButton from "./Cancelbutton";

const About = ({ isAboutEditing, edittext, handleTextChange, handleSaveClick, handleCancelClick, handleEditClick }) => {
    const [requestId, setRequestId] = useState(uuid())
    // const [isAboutEditing, setIsAboutEditing] = useState(true);
    // const [edittext, setEditText] = useState();
    const [warning, setWarning] = useState("");

    // const handleEditClick = () => {
    //     setIsAboutEditing(false);
    // };

    // const handleSaveClick = () => {
    //     setIsAboutEditing(true);

    //     fetch("/api/account/updateProfile", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             getCorrelationId: requestId,
    //             uuid: userDetails.company_uuid,
    //             about: edittext,
    //             userDetails: userDetails
    //         }),
    //     })
    // };

    // const handleCancelClick = () => {
    //     setIsAboutEditing(true);
    // };

    // const handleTextChange = (event) => {
    //     const inputValue = event.target.value;
    //     setEditText(inputValue);
    //     if (inputValue.length > 1000) {
    //         setWarning("Warning: Maximum character limit exceeded.");
    //     } else {
    //         setWarning("");
    //     }
    // };

    // useEffect(() => {
    //     fetch("/api/account/getProfileDetails", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             accountUuid: userDetails.account_uuid,
    //             companyUuid: userDetails.company_uuid,
    //             getCorrelationId: requestId,
    //             userDetails: userDetails
    //         }),
    //     })
    //         .then((response) => response.json())
    //         .then((responseData) => {
    //             const value = responseData.result.data.profileDetails.companyDetails.about;
    //             setEditText(value)
    //         })
    //         .catch((error) => {
    //             console.error("Error while fetching", error);
    //         });
    // }, []);

    return (
        <div className="my-9 rounded-md">
            <div className="flex justify-between px-3 pt-2 h-10 bg-white mr-1">
                <h1 className="text-base font-semibold">About</h1>
                {isAboutEditing && (
                    <div>
                        <Editbutton handleEditClick={handleEditClick} />
                    </div>
                )}
            </div>
            <div className="mt-1">
                <div className="bg-white mr-1 sm:h-full lg:h-[340px] px-5">
                    {isAboutEditing ? (
                        edittext ? <textarea
                            value={edittext} style={{ resize: "none" }}
                            readOnly
                            className="px-4 py-3 h-60 text-justify text-gray-700 overflow-hidden overflow-y-auto w-full focus:outline-none" /> :
                            <p className="px-2 text-sm text-justify flex justify-center text-gray-400 p-5">
                                "Tell us about yourself"
                            </p>
                    ) : (
                        <div>
                            <textarea maxLength={1000} placeholder="Enter Maximum 1200 Characters" style={{ resize: "none" }}
                                value={edittext}
                                // placeholder="The purpose of an About Us is to establish credibility and trust with visitors by giving them a better understanding of the company's background and goals. It can also be an opportunity to showcase the company's unique selling points, accomplishments, and expertise. Additionally, an About Us page can help visitors connect with the people behind the company, which can help build stronger relationships and brand loyalty."
                                className="h-56 w-full mt-5 border shadow rounded-md overflow-y-auto focus:ring-2 focus:ring-black border border-gray-300 rounded-lg"
                                onChange={handleTextChange}
                            />
                            {warning && (
                                <p className="text-red-500">{warning}</p>
                            )}
                        </div>
                    )}
                    {isAboutEditing && (
                        <div className="flex justify-end gap-3 mt-3">
                            <Savebutton handleSaveClick={handleSaveClick} />
                            <CancelButton handleCancelClick={handleCancelClick} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default About;
