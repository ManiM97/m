import React from "react";
import { v4 as uuid } from "uuid";
import { PlusIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useEffect } from "react";
import Savebutton from "./Savebutton";
import CancelButton from "./Cancelbutton";
import { useRef } from "react";

const Location = ({ userDetails }) => {
    const [requestId, setRequestId] = useState(uuid())
    const [editLocation, setEditLocation] = useState(false)
    const [locations, setLocations] = useState([]);
    const [newLocation, setNewLocation] = useState("");
    const [cloneLocations, setCloneLocations] = useState([]);
    const [refresh, setRefresh] = useState(false)
    const [alert, setAlert] = useState("");
    const [warning, setWarning] = useState(false)
    const inputRef = useRef(false)

    const duplicateLocations = locations.map((location) => {
        return location;
    });

    const handleLocationKeyDown = (event) => {
        if (event.keyCode === 13) {
            handleAddLocation();
        }
    };
    const handleNewLocationChange = (event) => {
        if (event.target.value != " ") {
            setNewLocation(event.target.value.toLowerCase());
        }
    };

    const handleSaveLocation = () => {
        setEditLocation(false);
        if (newLocation.length === 0) {
            fetch(`/api/account/updateProfile`, {
                method: "POST",
                body: JSON.stringify({
                    getCorrelationId: requestId,
                    uuid: userDetails.company_uuid,
                    locations: locations,
                    userDetails: userDetails,
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    setRefresh(!refresh);
                });
        }
    };

    const handleInputClick = () => {
        inputRef.current.focus()
        setWarning(false)
    }

    const handleCancelLocation = () => {
        setNewLocation("");
        setEditLocation(false);
        if (
            locations &&
            locations.length &&
            locations.length !== cloneLocations.length
        ) {
            setLocations([cloneLocations]);
            setRefresh(!refresh);
        }
        setRefresh(!refresh);
    };

    const handleAddLocation = () => {
        setNewLocation("");
        if (newLocation !== " ") {
            if (newLocation.length > 0 && !duplicateLocations.includes(newLocation)) {
                setLocations([...locations, newLocation.trim()]);
            }
            else if (duplicateLocations.includes(newLocation)) {
                setWarning(true)
            }
            else {
                setWarning(false)
            }
        }

    };

    // it handle the render time of alert

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert("");
        }, 1000);

        return () => clearTimeout(timer);
    }, [alert]);

    const buttonName = "Add Location";

    // useEffect(() => {
    //     fetch(`/api/account/getProfileDetails`, {
    //         method: "POST",
    //         body: JSON.stringify({
    //             getCorrelationId: requestId,
    //             userDetails: userDetails,
    //         }),
    //     })
    //         .then(async (res) => await res.json())
    //         .then((res) => {
    //             if (res.result.status.code === "200") {
    //                 setLocations(res.result.data.profileDetails.companyDetails.locations);
    //                 setCloneLocations(res.result.data.profileDetails.companyDetails.locations);
    //             } else {
    //                 setLocations([]);
    //                 setCloneLocations([]);
    //             }
    //         });
    // }, [refresh]);

    return (
        <div>
            <div className="col-span-5 lg:grid-cols-1 rounded-md ">

                <div className="lg:h-52 border-b-2 rounded-md bg-white relative">
                    <div className=" border-y-2">
                        <div className=" flex items-center justify-center text-medium font-semibold ml-4 py-2">
                            Locations
                        </div>
                    </div>
                    <div className="pl-2 leading-[2rem] w-72 lg:w-full lg:h-[90px] lg:overflow-y-auto lg:pb-0">
                        <ul
                            role="list"
                            className="flex items-center gap-2 flex-wrap"
                        >
                            {locations == null ||
                                locations == undefined ||
                                locations.length <= 0 ? (
                                <li className="">
                                    <div className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-0.5 bg-gray-300">
                                        <div className="flex flex-shrink-0 items-center justify-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={3}
                                                stroke="white"
                                                className="w-6 h-6 p-1"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                                />
                                            </svg>
                                        </div>
                                    </div>{" "}
                                </li>
                            ) : (
                                locations.map((location, index) => (
                                    <li key={index} className="inline" id={index}>
                                        <div className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 shadow shadow-sm hover:shadow-lg shaodw-black">
                                            <div className="absolute flex flex-shrink-0 items-center justify-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-3.5 h-3.5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="ml-3.5 text-sm font-medium text-gray-900 flex gap-1 items-center capitalize">
                                                {location}
                                                {editLocation && (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        className="w-4 h-4 stroke-gray-500"
                                                        onClick={() => {
                                                            locations.splice(index, 1),
                                                                setLocations([...locations]);
                                                        }}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>{" "}
                                    </li>
                                ))
                            )}
                            {!editLocation && (
                                <li className="inline">
                                    <button
                                        onClick={() => {
                                            setEditLocation(true);
                                        }}
                                        className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-1 bg-sky-600 text-white"
                                    >
                                        <div className="absolute flex flex-shrink-0 items-center justify-center">
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
                                        </div>
                                        <div className="ml-6 text-sm font-medium">
                                            {buttonName}
                                        </div>
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>

                    {editLocation && (
                        <>
                            <div className="mx-4 pt-3 pb-4 lg:pt-0 lg:pb-0 flex flex-col sm:flex-row items-center justify-between">
                                <div className="flex gap-2 items-center">
                                    <div className="flex flex-col">
                                        <input
                                            type="text"
                                            ref={inputRef}
                                            placeholder="Enter Maximum 40 Characters"
                                            value={newLocation}
                                            onChange={handleNewLocationChange}
                                            onKeyDown={handleLocationKeyDown}
                                            onClick={handleInputClick}
                                            maxLength={40}
                                            className={`border focus:ring-black focus:border-black rounded py-1 px-2 text-sm ${warning == true ? "border border-red-500 " : "border border-black"}`}
                                        />
                                        {warning &&
                                            <span className="text-sm text-red-500 sm:pl-2 sm:pt-1">*Already Exist</span>
                                        }
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleAddLocation}
                                        className="inline-flex rounded-full text-white bg-sky-600 p-2 shadow-sm  focus-visible:outlin-none"
                                    >
                                        <PlusIcon
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                                <div className="flex  lg:justify-end py-2 gap-2 lg:mt-0 sm:mt-4 pb-2">
                                    <Savebutton handleSaveClick={handleSaveLocation} />
                                    <CancelButton handleCancelClick={handleCancelLocation} />
                                </div>
                            </div>

                        </>
                    )}

                </div>

            </div>
        </div>
    )
};

export default Location;