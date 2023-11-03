import React from "react";
import Profile from "./Profile";
import About from "./About";
import Payout from "./Payout"
import Status from "./Status"
import Overview from "./Overview";

const Profilesection = ({ userDetails, profileValues, experience, projects, edittext, handleInputChangeExperience, handleInputChangeProjects, handleEditClick, handleSaveClick, handleCancelClick, handleTextChange, isEditing, isAboutEditing }) => {

    return (
        <div className="mx-5 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 ">
                <div className="lg:col-span-9 bg-white lg:h-80 rounded-md border shadow-md">
                    <Profile userDetails={userDetails}
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
                <div className="col-span-1 lg:col-span-3 ">
                    <Payout userDetails={userDetails} />
                </div>
            </div>

            <div className="mt-4">
                <Status userDetails={userDetails} />
            </div>
            <div className="">
                <Overview userDetails={userDetails} />
            </div>
        </div>
    )
}

export default Profilesection;