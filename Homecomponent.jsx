import React from "react";
import { v4 as uuid } from "uuid";
import { useState, useEffect } from "react";
import Profilesection from "./Profilesection"

const HomeComponent = ({ userDetails }) => {
    const [requestId, setRequestId] = useState(uuid())
    const [isEditing, setIsEditing] = useState(false);
    const [isAboutEditing, setIsAboutEditing] = useState(true);
    const [profileValues, setprofileValues] = useState("")
    const [experience, setExperience] = useState("");
    const [projects, setProjects] = useState("");
    const [edittext, setEditText] = useState();
    const [refresh, setRefresh] = useState(false)

    const handleEditClick = () => {
        setIsEditing(true);
        setIsAboutEditing(false)
    };

    const handleSaveClick = async () => {
        setIsEditing(false);
        setIsAboutEditing(tru)

        const response = await fetch("/api/account/updateProfile", {
            method: "POST",
            body: JSON.stringify({
                getCorrelationId: requestId,
                uuid: userDetails.company_uuid,
                experience: experience,
                projects: projects,
                about: edittext,
                userDetails: userDetails,
            }),
        })
            .then((res) => res.json())
            .then((resVal) => {
                if (resVal.result.status.code === "200") {
                    setRefresh(!refresh)
                }
            });
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setIsAboutEditing(true)
    };

    const handleInputChangeExperience = (e) => {
        const numberRegex = /^\d*$/;
        const newValue = e.target.value;
        if (numberRegex.test(newValue)) {
            setExperience(newValue);
        }
    }

    const handleInputChangeProjects = (e) => {
        const numberRegex = /^\d*$/;
        const newValue = e.target.value;
        if (numberRegex.test(newValue)) {
            setProjects(newValue);
        }
    }

    const handleTextChange = (event) => {
        const inputValue = event.target.value;
        setEditText(inputValue);
        if (inputValue.length > 1000) {
            setWarning("Warning: Maximum character limit exceeded.");
        } else {
            setWarning("");
        }
    };

    useEffect(() => {
        fetch("/api/account/getProfileDetails", {
            method: "POST",
            body: JSON.stringify({
                accountUuid: userDetails.account_uuid,
                companyUuid: userDetails.company_uuid,
                getCorrelationId: requestId,
                userDetails: userDetails
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log("RESPONSEDATA", responseData)
                const value = responseData.result.data.profileDetails.companyDetails;
                setprofileValues(value);
                setExperience(value.experience)
                setProjects(value.projects)
                setEditText(value.about)
            })
            .catch((error) => {
                console.error("Error while fetching", error);
            });
    }, [refresh]);

    return (
        <div className="bg-stone-200 overflow-scroll overflow-y-auto h-[100%]">
            <Profilesection userDetails={userDetails}
                profileValues={profileValues}
                experience={experience}
                projects={projects}
                edittext={edittext}
                isEditing={isEditing}
                isAboutEditing={isAboutEditing}
                handleInputChangeExperience={handleInputChangeExperience}
                handleInputChangeProjects={handleInputChangeProjects}
                handleTextChange={handleTextChange}
                handleEditClick={handleEditClick}
                handleSaveClick={handleSaveClick}
                handleCancelClick={handleCancelClick}
            />
        </div>
    )
}

export default HomeComponent;