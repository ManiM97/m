import React from "react";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";
import { useState } from "react";

const Status = ({ userDetails }) => {
    const [requestId, setRequestId] = useState(uuid())
    const [statusData, setStatusData] = useState([]);
    const [data, setData] = useState([

        {
            item: {
                name: "Leads",
                count: "0",
            },
            status: {
                status1: "Generated",
                status2: "Granted",
                count1: 0,
                count2: 0,
            },
            style:
                "flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 text-blue-500",
            svg: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="green"
                    className="w-8 h-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                </svg>
            ),
        },
        {
            item: {
                name: "Requests",
                count: "39",
            },
            status: {
                status1: "Gain",
                status2: "Granted",
                count1: 0,
                count2: 39,
            },
            style:
                "flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-orange-100 text-blue-500",
            svg: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="orange"
                    className="w-8 h-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                </svg>
            ),
        },
    ]);

    useEffect(() => {
        fetch("/api/stockAccess/stockProfileDetails", {
            method: "POST",
            body: JSON.stringify({
                accountUuid: userDetails.account_uuid,
                companyUuid: userDetails.company_uuid,
                getCorrelationId: requestId,
                userDetails: userDetails
            }),
        })
            .then((response) => response.json())
            .then((resVal) => {
                // console.log("RESPONSEDATA", responseData)
                let result = resVal.result.data.stockDetails.stockGainGrantCount;
                setStatusData(result);
            });
    }, []);

    return (

        <div class="w-full ">
            <div class="bg-white flex items-center justify-center text-medium font-semibold py-2">
                Status
            </div>
            <div class="border-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-2 gap-4 bg-white pb-10 my-1">

                    <div className="bg-gray-100 rounded-md h-44 lg:h-full w-84 mx-10 shadow-md mt-5 hover:shadow-xl border flex">
                        <div className="grid grid-cols-6 lg:grid-cols-6 h-10">
                            <div
                                className={`my-7 mx-4 ml-8 col-span-2 lg:col-span-2 flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="blue"
                                    className="w-8 h-8"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                                    />
                                </svg>
                            </div>
                            <div className="lg:flex gap-10 my-5">
                                <div className="col-span-2 flex flex-col sm:ml-4 lg:my-2">
                                    <p className="text-sm text-gray-500">
                                        Stocks
                                    </p>
                                    <p className="font-bold">{statusData.totalCounts}</p>
                                </div>
                                <div className="col-span-2 font-bold text-lg ">
                                    <div className="flex gap-4 py-2">
                                        <p className="text-sm text-gray-500">
                                            Owned
                                        </p>
                                        <span className="font-normal text-sm">
                                            {statusData.grantedCounts}
                                        </span>
                                    </div>
                                    <div className="flex gap-4 py-2">
                                        <p className="text-sm text-gray-500">
                                            Accessed
                                        </p>
                                        <span className="font-normal text-sm">
                                            {statusData.gainedCounts}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {data &&
                        data.map((list) => {
                            return (
                                <div className="bg-gray-100 rounded-md h-full w-84 mx-10 shadow-md mt-5 hover:shadow-xl border flex">
                                    <div className="grid grid-cols-6 lg:grid-cols-6">
                                        <div className={`my-7 mx-4 col-span-2 lg:col-span-2  ${list.style}`}>
                                            {list.svg}
                                        </div>
                                        <div className="lg:flex gap-10 mt-5">
                                            <div className="col-span-2 flex flex-col sm:ml-4 lg:my-2">
                                                <p className="text-sm text-gray-500">
                                                    {list.item.name}
                                                </p>
                                                <p className="font-bold">{list.item.count}</p>
                                            </div>
                                            <div className="col-span-2 font-bold text-lg ">
                                                <div className="flex gap-4 py-2">
                                                    <p className="text-sm text-gray-500">
                                                        {list.status.status1}
                                                    </p>
                                                    <span className="font-normal text-sm">
                                                        {list.status.count1}
                                                    </span>
                                                </div>
                                                <div className="flex gap-4 py-2">
                                                    <p className="text-sm text-gray-500">
                                                        {list.status.status2}
                                                    </p>
                                                    <span className="font-normal text-sm">
                                                        {list.status.count2}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>

    );
};

export default Status;
