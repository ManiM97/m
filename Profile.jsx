import React from "react";
import About from "./About";
import Location from "./Location";
import Tags from "./Tags";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import { useEffect } from "react";
import IncompleteProfile from "./IncompleteProfile";
import { useRouter } from "next/router";
import Editbutton from "./Editbutton";
import Savebutton from "./Savebutton";
import CancelButton from "./Cancelbutton";

const Profile = ({ userDetails, profileValues, experience, projects, edittext, isEditing, isAboutEditing, handleInputChangeExperience, handleInputChangeProjects, handleEditClick, handleSaveClick, handleCancelClick, handleTextChange }) => {

    console.log("PROFILEVALUES", profileValues)

    const [requestId, setRequestId] = useState(uuid())
    const [refresh, setRefresh] = useState(false)
    const [profileRender, setProfileRender] = useState(false)
    const [bannerRender, setBannerRender] = useState(false)
    const [profile, setProfile] = useState('')
    const [banner, setBanner] = useState('')
    const [uuidBanner, setUuidBanner] = useState(null)
    const [uuidProfile, setUuidProfile] = useState(null)
    const router = useRouter()

    const handleImageChange = (event, resourceType) => {
        const uuid = resourceType === "BANNER" ? uuidBanner : uuidProfile

        fetch("api/stock/removedimage", {
            method: "POST",
            body: JSON.stringify({
                getCorrelationId: requestId,
                userDetails: userDetails,
                isProfile: false,
                uuid: uuid
            })
        })
            .then((res) => res.json())
            .then((resval) => {
                // console.log("IMAGEDELETE", resval)
            })


        const fileData = event.target.files[0];
        const floor = new FormData();
        floor.append("file", fileData);
        floor.append("resourceType", resourceType);
        floor.append("type", "COMPANY");
        floor.append("typeUuid", userDetails.company_uuid);
        floor.append("isProfile", true);
        fetch(`/api/stock/cdnurl`, {
            method: "POST",
            body: floor,
        })
            .then((res) => res.json())
            .then((resVal) => {
                if (resVal.status.code === "200") {
                    console.log("RESVALLL", resVal)
                    if (resVal.data.resource.resourceType === "LOGO") {
                        setProfileRender(!profileRender)
                        setUuidProfile(resVal.data.resource.uuid)
                    }
                    else if (resVal.data.resource.resourceType === "BANNER") {
                        setBannerRender(!bannerRender)
                        setUuidBanner(resVal.data.resource.uuid)
                    }
                }
            });
    }

    useEffect(() => {
        fetch("/api/stockAccess/getresource", {
            method: "POST",
            body: JSON.stringify({
                getCorrelationId: requestId,
                userDetails: userDetails,
                uuid: userDetails.company_uuid,
                typeUuid: userDetails.uuid,
                groupByResourceType: true
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                // console.log("IMAGERESPONSE", responseData)
                const data = responseData.result.data.resourceList
                setBanner(data.BANNER[0].cdnUrl)
                setProfile(data.LOGO[0].cdnUrl)

            })
    }, [profileRender, bannerRender])

    console.log(refresh)
    return (
        <div className="">
            <div className="sm:h-75 lg:h-full relative rounded-lg bg-white">
                <div className="hidden lg:block">
                    {userDetails &&
                        userDetails.isOnboardingCompleted === "false" && (
                            <IncompleteProfile userDetails={userDetails} />
                        )}
                </div>
                {/* Cover Image Container */}
                <div className="absolute right-5 mt-4 rounded">
                    <div
                        onChangeCapture={(e) => handleImageChange(e, "BANNER")}
                        className=" w-8 h-8 cursor-pointer hover:bg-stone-600 bg-stone-500 rounded-full flex items-center justify-center absolute top-2 z-10 right-0"
                    >
                        <button>
                            <label htmlFor="input-banner">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    id="actual-btn"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="white"
                                    className="w-5 h-5 label"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                    ></path>
                                </svg>
                            </label>
                        </button>
                        <input
                            id="input-banner"
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            style={{ display: "none" }}
                        />
                    </div>
                </div>
                <div className="w-full h-[91px] md:h-[160px] ">
                    {banner ? (
                        <img
                            className="w-full h-full rounded-tl-lg rounded-tr-lg border border-zinc-300 object-cover"
                            src={banner}
                        />
                    ) : (<img
                        className="w-full h-full rounded-tl-lg rounded-tr-lg border border-zinc-300 object-cover"
                        src="https://realitiindia.sgp1.cdn.digitaloceanspaces.com/STOCK/COMPANY/One_Roof_Group-1bca328.jpg"
                    />)}
                </div>
                {/* Profile Details Container */}
                <div className="-mt-12 mx-auto items-center md:items-end lg:-mt-20 flex flex-col md:flex-row gap-3 justify-center md:justify-start relative md:ml-10 lg:ml-0">
                    <div className="lg:ml-20">
                        <div className="block w-28 h-28 sm:w-36 sm:h-36 relative bg-gray-100 rounded-full border-2 border-white mx-auto">
                            <div className="block h-28 sm:h-full relative bg-gray-100 rounded-full border-2 border-white mx-auto overflow-hidden">
                                {profile == undefined || profile == "" || profile == null ? (
                                    <svg
                                        className="h-full w-full text-gray-300"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ) : (
                                    <img src={profile} className="w-full h-full  rounded-tl-lg rounded-tr-lg border border-zinc-300 object-cover" />)}
                            </div>
                            <div
                                className=" w-8 h-8 cursor-pointer hover:bg-stone-600 bg-stone-500 rounded-full flex items-center justify-center absolute top-2 z-10 right-0"
                            >
                                <button >
                                    <label htmlFor="input-profile">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            id="actual-btn"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="white"
                                            className="w-5 h-5 label"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                            ></path>
                                        </svg>
                                    </label>
                                </button>
                                <input
                                    id="input-profile"
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    style={{ display: "none" }}
                                    onChangeCapture={(e) => handleImageChange(e, "LOGO")}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center pb-3 -mb-4">
                        <div className="text-lg lg:text-2xl font-semibold ml-4 flex items-center justify-center gap-2">
                            {profileValues ? profileValues.name : ""}
                            <div className="rounded-full flex items-center ">
                                {userDetails &&
                                    userDetails.isOnboardingCompleted === "false" ? (
                                    <a href="/gettingstart">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="white"
                                            className="mt-1 w-6 h-6 fill-red-400"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                            />
                                        </svg>
                                    </a>
                                ) : userDetails.isOnboardingCompleted === "true" &&
                                    userDetails.isKycVerified === "false" ? (
                                    <a href="/gettingstart" className="tooltip">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="white"
                                            className="mt-1 w-6 h-6 fill-yellow-400 "
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                            />
                                        </svg>
                                        <span className="tooltiptext text-xs font-normal">
                                            Your kyc verification is under progress
                                        </span>
                                    </a>
                                ) : userDetails.isOnboardingCompleted === "true" &&
                                    (userDetails.isKycVerified === "true" ||
                                        userDetails.isKycVerified === "NA") ? (
                                    <a href="/gettingstart">
                                        <img
                                            src="/success.svg"
                                            className="mt-1 mr-1 h-4 w-4"
                                        />
                                    </a>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        <div className=" text-xs inline-flex items-center font-semibold leading-sm px-3 rounded-full bg-white text-green-600 border border-green-600 gap-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                ></path>
                            </svg>
                            <p className="text-xs lg:text-sm text-gray-500">{profileValues.type}</p>
                        </div>
                    </div>
                    <div className="pb-3 -mb-3 flex gap-4 ml-10">
                        <div className="text-center">
                            <p className="text-md font-semibold text-gray-900">{profileValues.totalConnections < 10 ? 0 + "" + profileValues.totalConnections : profileValues.totalConnections}</p>
                            <p className="text-gray-400 text-sm ">Connections</p>
                        </div>
                        <div className="text-center">
                            {isEditing ? (
                                <input
                                    className="text-md font-semibold text-gray-900 h-6 w-12 border border-gray-400 text-center focus:outline-none"
                                    value={experience}
                                    maxLength={4}
                                    onChange={handleInputChangeExperience}
                                />
                            ) : (
                                <p className="text-md font-semibold text-gray-900">
                                    {profileValues.experience ? profileValues.experience < 10 ? 0 + "" + profileValues.experience : profileValues.experience : 0} years
                                </p>
                            )}

                            <p className="text-gray-400 text-sm">Experience</p>
                        </div>
                        <div className="text-center">
                            {isEditing ? (
                                <input
                                    className="text-md font-semibold text-gray-900 h-6 w-12 border border-gray-400 text-center focus:outline-none"
                                    value={projects}
                                    maxLength={4}
                                    onChange={handleInputChangeProjects}
                                />
                            ) : (
                                <p className="text-md font-semibold text-gray-900">
                                    {profileValues.projects ? profileValues.projects < 10 ? 0 + "" + profileValues.projects : profileValues.projects : 0}
                                </p>
                            )}
                            <p className="text-gray-400 text-sm">Projects</p>
                        </div>
                    </div>
                    <div>
                        {!isEditing ? (
                            <div className="md:translate-x-20 md:translate-y-[-16px] lg:translate-x-64 lg:translate-y-[-16px]">
                                <Editbutton handleEditClick={handleEditClick} />
                            </div>
                        ) : (
                            <div className="flex gap-4 lg:pl-14 lg:pb-17">
                                <Savebutton handleSaveClick={handleSaveClick} />
                                <CancelButton handleCancelClick={handleCancelClick} />
                            </div>
                        )}
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 ">
                    <div className="lg:mt-5 flex items-center justify-center lg:justify-end text-sm gap-4 text-gray-500 my-2 pb-2 lg:translate-x-80">
                        <button onClick={() => router.push('/mynetwork/myconnections')} className="flex items-center justify-center bg-blue-900 text-gray-100 px-5 w-20 md:w-24 py-1 rounded text-sm space-x-2 transition duration-100">
                            <span>Gain</span>
                        </button>
                        <button onClick={() => router.push('/stocks/units')} className="flex items-center justify-center bg-blue-900 text-gray-100 px-5 w-20 lg:w-24 py-1 rounded text-sm space-x-2 transition duration-100">
                            <span>Grant</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid lg:grid-cols-9">
                <div className="lg:col-span-3">
                    <About userDetails={userDetails}
                        edittext={edittext}
                        isAboutEditing={isAboutEditing}
                        handleEditClick={handleEditClick}
                        handleSaveClick={handleSaveClick}
                        handleCancelClick={handleCancelClick}
                        handleTextChange={handleTextChange}
                    />
                </div>
                <div className="lg:col-span-6 mt-8">
                    <Location userDetails={userDetails} />
                    <div className="pb-4">
                        <Tags userDetails={userDetails} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;
