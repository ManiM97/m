import React from "react";
import { v4 as uuid } from "uuid";
import { PlusIcon } from "@heroicons/react/solid";
import Savebutton from "./Savebutton";
import CancelButton from "./Cancelbutton";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const Tags = ({ userDetails }) => {
    const [requestId, setRequestId] = useState(uuid())
    const [editTag, setEditTag] = useState(false)
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");
    const [cloneTags, setCloneTags] = useState([]);
    const [refresh, setRefresh] = useState(false)
    const [warning, setWarning] = useState(false)
    const inputRef = useRef(false)

    const backGroundColor = ["bg-indigo-500", "bg-rose-500", "bg-green-500", "bg-red-500"]

    const duplicateTags = tags.map((tag) => {
        return tag;
    });
    const [tagalert, setTagAlert] = useState("");

    const handleTagKeyDown = (event) => {
        if (event.keyCode === 13) {
            handleAddTag();
        }
    };
    const handleNewTagChange = (event) => {
        if (event.target.value != " ") {
            setNewTag(event.target.value.toLowerCase());
        }
    };

    const handleInputClick = () => {
        inputRef.current.focus()
        setWarning(false)
    }

    const handleSaveTag = () => {
        setEditTag(false);
        if (newTag.length === 0) {
            fetch(`/api/account/updateProfile`, {
                method: "POST",
                body: JSON.stringify({
                    getCorrelationId: requestId,
                    uuid: userDetails.company_uuid,
                    tags: tags,
                    userDetails: userDetails,
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    setRefresh(!refresh);
                });
        }
    };
    const handleCancelTag = () => {
        setNewTag("");
        setEditTag(false);
        if (tags && tags.length && tags.length !== cloneTags.length) {
            setTags([...cloneTags]);
            setRefresh(!refresh);
        }
        setRefresh(!refresh);
    };
    const handleAddTag = () => {
        setNewTag("");
        if (newTag != " ") {
            if (newTag.length > 0 && !duplicateTags.includes(newTag)) {
                setTags([...tags, newTag.trim()]);
            }
            else if (duplicateTags.includes(newTag)) {
                setWarning(true)
            }
            else {
                setWarning(false)
            }
        }

    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setTagAlert("");
        }, 1000);

        return () => clearTimeout(timer);
    }, [tagalert]);

    const buttonName = "Add Tag";

    useEffect(() => {
        fetch(`/api/account/getProfileDetails`, {
            method: "POST",
            body: JSON.stringify({
                getCorrelationId: requestId,
                userDetails: userDetails,
            }),
        })
            .then(async (res) => await res.json())
            .then((res) => {
                if (res.result.status.code === "200") {
                    setTags(res.result.data.profileDetails.companyDetails.tags);
                    setCloneTags(res.result.data.profileDetails.companyDetails.tags);
                } else {
                    setTags([]);
                    setCloneTags([]);
                }
            });
    }, [refresh]);

    return (
        <div className="lg:h-[181px] border-t-2 rounded-md bg-white relative">
            <div className="border-y-2">
                <div className="text-medium font-semibold py-2 flex items-center justify-center">
                    Tags
                </div>
            </div>
            <div className="mt-1 ml-4 leading-[2rem] lg:h-[45px] lg:overflow-y-auto pb-4 lg:pb-0 ">
                <ul
                    role="list"
                    className="flex items-center gap-2 flex-wrap"
                >
                    {tags == null ||
                        tags == undefined ||
                        tags.length <= 0 ? (
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
                                            d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                                        />
                                    </svg>
                                </div>
                            </div>{" "}
                        </li>
                    ) : (
                        tags.map((tag, index) => {
                            return (
                                <li className="inline" key={index}>
                                    <div className="relative inline-flex items-center rounded-full border border-gray-300  px-3 py-1 shadow shadow-sm hover:shadow-lg shaodw-black">
                                        <div className="absolute flex flex-shrink-0 items-center justify-center">
                                            <span
                                                className={`h-1.5 w-1.5 rounded-full bg-rose-500 ${backGroundColor[index % backGroundColor.length]}`}
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <div className="ml-3.5 text-sm font-medium text-gray-900 flex gap-1 items-center capitalize">
                                            #{tag}
                                            {editTag && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    className="w-4 h-4 stroke-gray-500"
                                                    onClick={() => {
                                                        tags.splice(index, 1),
                                                            setTags([...tags]);
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
                            );
                        })
                    )}
                    {!editTag && (
                        <li className="inline">
                            <button
                                onClick={() => {
                                    setEditTag(true);
                                }}
                                className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-1 bg-sky-600 text-white"
                            >
                                {" "}
                                <div className="absolute flex flex-shrink-0 items-center justify-center  ">
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
            {editTag && (
                <>
                    <div className="mx-4 pb-4 lg:pb-0 flex flex-col sm:flex-row items-center justify-between">
                        <div className="flex gap-2 items-center ">
                            <div className="flex flex-col">
                                <input
                                    type="text" ref={inputRef}
                                    placeholder="Enter Maximum 40 Characters"
                                    value={newTag}
                                    onChange={handleNewTagChange}
                                    onKeyDown={handleTagKeyDown}
                                    onClick={handleInputClick}
                                    maxLength={40}
                                    className={`borderfocus:ring-black focus:border-black rounded-lg py-1 px-2 text-sm ${warning == true ? "border border-red-500 " : "border border-black"}`}
                                />
                                {warning &&
                                    <span className="text-sm text-red-500 sm:pl-2 sm:pt-1">*Already Exist</span>
                                }
                            </div>
                            <button
                                type="button"
                                onClick={handleAddTag}
                                className="inline-flex rounded-full text-white bg-sky-600 p-2 shadow-sm  focus-visible:outlin-none"
                            >
                                <PlusIcon
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                        <div className="flex lg:justify-end py-2 gap-2 lg:mt-0 sm:mt-4  pb-2 ">
                            <Savebutton handleSaveClick={handleSaveTag} />
                            <CancelButton handleCancelClick={handleCancelTag} />
                        </div>
                    </div>

                </>
            )}
        </div>
    );
};

export default Tags;
