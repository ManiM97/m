import React from "react";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import Editbutton from "./Editbutton";
import Savebutton from "./Savebutton";
import CancelButton from "./Cancelbutton";
import Toggle from "./Toggle"

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Payout = ({ userDetails }) => {
    const [refresh, setRefresh] = useState(false);
    const [requestId, setRequestId] = useState(uuid());

    const [isPayoutEditable, setIsPayoutEditable] = useState(false);
    const [LeadsForBuyers, setLeadsForBuyers] = useState(0);
    const [LeadsForAgents, setLeadsForAgents] = useState(0);

    const [SalesForBuyers, setSalesForBuyers] = useState(0);
    const [SalesForAgents, setSalesForAgents] = useState(0);

    const [ResalesForBuyers, setResalesForBuyers] = useState(0);
    const [ResalesForAgents, setResalesForAgents] = useState(0);

    const [RevisitForBuyers, setRevisitForBuyers] = useState(0);
    const [RevisitForAgents, setRevisitForAgents] = useState(0);

    const [ToggleLead, setToggleLead] = useState(false);
    const [ToggleSale, setToggleSale] = useState(false);
    const [ToggleResale, setToggleResale] = useState(false);
    const [ToggleRevisit, setToggleRevisit] = useState(false);

    const PayoutSaveHandler = () => {
        setIsPayoutEditable(false);
        let updatePayout = {
            companyUuid: userDetails.company_uuid,
            payOutDetails: {
                leads: {
                    brokerage_buyer: Number(LeadsForBuyers),
                    brokerage_subAgent: Number(LeadsForAgents),
                    visibility: ToggleLead == false ? "public" : "private",
                },
                sale: {
                    brokerage_buyer: Number(SalesForBuyers),
                    brokerage_subAgent: Number(SalesForAgents),
                    visibility: ToggleSale == false ? "public" : "private",
                },
                sitevisit: {
                    brokerage_buyer: Number(RevisitForBuyers),
                    brokerage_subAgent: Number(RevisitForAgents),
                    visibility: ToggleRevisit == false ? "public" : "private",
                },
                resale: {
                    brokerage_buyer: Number(ResalesForBuyers),
                    brokerage_subAgent: Number(ResalesForAgents),
                    visibility: ToggleResale == false ? "public" : "private",
                },
            },
        };
        fetch(`/api/account/updatePayout`, {
            method: "POST",
            body: JSON.stringify({
                getCorrelationId: requestId,
                updatePayout: updatePayout,
                userDetails: userDetails,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.result.status.code === "200") {
                    setRefresh(!refresh);
                }
            });
    };

    const PayoutCancelHandler = () => {
        setIsPayoutEditable(false);
        setRefresh(!refresh);
    };

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

                    let payOut = res.result.data.profileDetails.payout;
                    if (payOut && payOut.length > 0) {
                        let resLead = JSON.parse(
                            payOut.filter((item) => item.payOutType == "leads")[0]
                                .payOutDetails
                        );
                        let resSale = JSON.parse(
                            payOut.filter((item) => item.payOutType == "sale")[0]
                                .payOutDetails
                        );
                        let resResale = JSON.parse(
                            payOut.filter((item) => item.payOutType == "resale")[0]
                                .payOutDetails
                        );
                        let resSiteview = JSON.parse(
                            payOut.filter((item) => item.payOutType == "sitevisit")[0]
                                .payOutDetails
                        );

                        console.log("RESLEAD", resLead)

                        if (resLead) {
                            setLeadsForBuyers(
                                resLead.brokerage_buyer &&
                                    Number.isInteger(Number(resLead.brokerage_buyer))
                                    ? Number(resLead.brokerage_buyer).toFixed(1)
                                    : Number(resLead.brokerage_buyer)
                            );
                            setLeadsForAgents(
                                resLead.brokerage_subAgent &&
                                    Number.isInteger(Number(resLead.brokerage_subAgent))
                                    ? Number(resLead.brokerage_subAgent).toFixed(1)
                                    : Number(resLead.brokerage_subAgent)
                            );
                            setToggleLead(resLead.visibility == "public" ? false : true);
                        }
                        if (resSale) {
                            setSalesForBuyers(
                                resSale.brokerage_buyer &&
                                    Number.isInteger(Number(resSale.brokerage_buyer))
                                    ? Number(resSale.brokerage_buyer).toFixed(1)
                                    : Number(resSale.brokerage_buyer)
                            );
                            setSalesForAgents(
                                resSale.brokerage_subAgent &&
                                    Number.isInteger(Number(resSale.brokerage_subAgent))
                                    ? Number(resSale.brokerage_subAgent).toFixed(1)
                                    : Number(resSale.brokerage_subAgent)
                            );
                            setToggleSale(resSale.visibility == "public" ? false : true);
                        }
                        if (resResale) {
                            setResalesForBuyers(
                                resResale.brokerage_buyer &&
                                    Number.isInteger(Number(resResale.brokerage_buyer))
                                    ? Number(resResale.brokerage_buyer).toFixed(1)
                                    : Number(resResale.brokerage_buyer)
                            );
                            setResalesForAgents(
                                resResale.brokerage_subAgent &&
                                    Number.isInteger(Number(resResale.brokerage_subAgent))
                                    ? Number(resResale.brokerage_subAgent).toFixed(1)
                                    : Number(resResale.brokerage_subAgent)
                            );
                            setToggleResale(resResale.visibility == "public" ? false : true);
                        }
                        if (resSiteview) {
                            setRevisitForBuyers(
                                resSiteview.brokerage_buyer &&
                                    Number.isInteger(Number(resSiteview.brokerage_buyer))
                                    ? Number(resSiteview.brokerage_buyer).toFixed(1)
                                    : Number(resSiteview.brokerage_buyer)
                            );
                            setRevisitForAgents(
                                resSiteview.brokerage_subAgent &&
                                    Number.isInteger(Number(resSiteview.brokerage_subAgent))
                                    ? Number(resSiteview.brokerage_subAgent).toFixed(1)
                                    : Number(resSiteview.brokerage_subAgent)
                            );
                            setToggleRevisit(
                                resSiteview.visibility == "public" ? false : true
                            );
                        }
                    }
                } else {
                    setLeadsForBuyers(0);
                    setLeadsForAgents(0);
                    setToggleLead(false);
                    setSalesForBuyers(0);
                    setSalesForAgents(0);
                    setToggleSale(false);
                    setResalesForBuyers(0);
                    setResalesForAgents(0);
                    setToggleResale(false);
                    setRevisitForBuyers(0);
                    setRevisitForAgents(0);
                    setToggleRevisit(false);
                }
            });
    }, [refresh]);

    return (
        <div>
            <div className=" lg:col-span-3 mt-1 rounded-md lg:pl-1.5 gap-2">
                <div className="bg-gray-100 rounded-lg lg:h-[705px]">
                    <div
                        className={`lg:h-16 flex item-center justify-between items-center p-4 rounded bg-white`}
                    >
                        <h6 className="text-base font-bold text-gray-900 flex  items-center lg:justify-center mt-1 ">
                            Payout
                        </h6>
                        {/* <div
                            className="flex mt-1 ml-5"
                            onClick={() => setIsPayoutEditable(true)}
                        >
                            {isPayoutEditable ? (
                                <></>
                            ) : (
                                <Editbutton />
                            )}
                        </div>
                        {isPayoutEditable && (
                            <div className="flex gap-2">
                                <Savebutton handleSaveClick={PayoutSaveHandler} />
                                <CancelButton handleCancelClick={PayoutCancelHandler} />
                            </div>
                        )} */}
                    </div>
                    <div className="grid  lg:grid-cols-1 gap-1 md:grid-cols-2 p-2">
                        {/* leads */}
                        <div
                            className={`lg:h-28 flex  border flex-row rounded ${ToggleLead ? "bg-slate-100" : "bg-white"
                                } p-4 hover:shadow-lg shadow-black`}
                        >
                            <div className="ml-1 flex flex-grow flex-col gap-1">
                                <div className=" flex items-center justify-between">
                                    <span className="text-center w-20 border border-green-200 bg-green-100 rounded-full px-4 text-sm text-green-700 py-0.5">
                                        Leads
                                    </span>
                                    {isPayoutEditable ? (
                                        <Switch
                                            checked={ToggleLead}
                                            onChange={() => setToggleLead(!ToggleLead)}
                                            className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full "
                                        >
                                            <span className="sr-only"></span>
                                            <span
                                                aria-hidden="true"
                                                className="pointer-events-none absolute h-full w-full rounded-md"
                                            />
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    ToggleLead ? "bg-indigo-600" : "bg-gray-200",
                                                    "pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out"
                                                )}
                                            />
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    ToggleLead
                                                        ? "translate-x-5"
                                                        : "translate-x-0",
                                                    "pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"
                                                )}
                                            />
                                        </Switch>
                                    ) : (
                                        <></>
                                    )}
                                </div>

                                <div className="text-sm text-gray-500 flex justify-between">
                                    Brokerage for Buyers
                                    {isPayoutEditable ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={LeadsForBuyers}
                                                id="input-lead-buyer"
                                                className=" ml-2  w-10 border border-solid border-gray-200 focus:outline-none text-center"
                                                onKeyDown={(event) => {
                                                    if (
                                                        !/^[0-9.]$/.test(event.key) &&
                                                        event.key == 8
                                                    ) {
                                                        event.preventDefault();
                                                    } else if (
                                                        event.key === "." &&
                                                        event.target.value.indexOf(".") > -1
                                                    ) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                onChange={(event) => {
                                                    const value = event.target.value;
                                                    const intValue = parseInt(value);

                                                    if (
                                                        value === "" ||
                                                        (intValue >= 0 &&
                                                            intValue <= 100 &&
                                                            /^(\d+(\.\d{0,2})?)?$/.test(value))
                                                    ) {
                                                        setLeadsForBuyers(event.target.value);
                                                    }
                                                }}
                                            />{" "}
                                            %
                                        </div>
                                    ) : (
                                        <span className="ml-2 text-md font-medium text-black">
                                            {LeadsForBuyers} %
                                        </span>
                                    )}
                                </div>
                                <div className="text-sm text-gray-500 flex justify-between">
                                    Brokerage for Sub Agent
                                    {isPayoutEditable ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={LeadsForAgents}
                                                id="input-lead-agent"
                                                className=" ml-2  w-10 border border-solid border-gray-200 focus:outline-none text-center"
                                                onKeyDown={(event) => {
                                                    if (
                                                        !/^[0-9.]$/.test(event.key) &&
                                                        event.key == 8
                                                    ) {
                                                        event.preventDefault();
                                                    } else if (
                                                        event.key === "." &&
                                                        event.target.value.indexOf(".") > -1
                                                    ) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                onChange={(event) => {
                                                    const value = event.target.value;
                                                    const intValue = parseInt(value);

                                                    if (
                                                        value === "" ||
                                                        (intValue >= 0 &&
                                                            intValue <= 100 &&
                                                            /^(\d+(\.\d{0,2})?)?$/.test(value))
                                                    ) {
                                                        setLeadsForAgents(event.target.value);
                                                    }
                                                }}
                                            />{" "}
                                            %
                                        </div>
                                    ) : (
                                        <span className="ml-2 text-md font-medium text-black">
                                            {LeadsForAgents} %
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* sales */}

                        <div
                            className={`lg:h-28 flex  border flex-row rounded ${ToggleSale ? "bg-slate-100" : "bg-white"
                                } p-4 hover:shadow-lg shadow-black`}
                        >
                            <div className="ml-1 flex flex-grow flex-col gap-1">
                                <div className=" flex items-center justify-between">
                                    <span className="text-center w-20 border border-indigo-200 bg-indigo-100 rounded-full px-4 text-sm text-indigo-700 py-0.5">
                                        Sale
                                    </span>
                                    {isPayoutEditable ? (
                                        <Switch
                                            checked={ToggleSale}
                                            onChange={() => setToggleSale(!ToggleSale)}
                                            className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full "
                                        >
                                            <span className="sr-only">Use setting</span>
                                            <span
                                                aria-hidden="true"
                                                className="pointer-events-none absolute h-full w-full rounded-md"
                                            />
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    ToggleSale ? "bg-indigo-600" : "bg-gray-200",
                                                    "pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out"
                                                )}
                                            />
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    ToggleSale
                                                        ? "translate-x-5"
                                                        : "translate-x-0",
                                                    "pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"
                                                )}
                                            />
                                        </Switch>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div className="text-sm text-gray-500 flex justify-between">
                                    Brokerage for Buyers
                                    {isPayoutEditable ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={SalesForBuyers}
                                                id="input-sales-buyer"
                                                className=" ml-2  w-10 border border-solid border-gray-200 focus:outline-none  text-center"
                                                onKeyDown={(event) => {
                                                    if (
                                                        !/^[0-9.]$/.test(event.key) &&
                                                        event.key == 8
                                                    ) {
                                                        event.preventDefault();
                                                    } else if (
                                                        event.key === "." &&
                                                        event.target.value.indexOf(".") > -1
                                                    ) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                onChange={(event) => {
                                                    const value = event.target.value;
                                                    const intValue = parseInt(value);

                                                    if (
                                                        value === "" ||
                                                        (intValue >= 0 &&
                                                            intValue <= 100 &&
                                                            /^(\d+(\.\d{0,2})?)?$/.test(value))
                                                    ) {
                                                        setSalesForBuyers(event.target.value);
                                                    }
                                                }}
                                            />{" "}
                                            %
                                        </div>
                                    ) : (
                                        <span className="ml-2 text-md font-medium text-black">
                                            {SalesForBuyers} %
                                        </span>
                                    )}
                                </div>
                                <div className="text-sm text-gray-500 flex justify-between">
                                    Brokerage for Sub Agent
                                    {isPayoutEditable ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={SalesForAgents}
                                                id="input-sales-agent"
                                                className=" ml-2  w-10 border border-solid border-gray-200 focus:outline-none text-center"
                                                onKeyDown={(event) => {
                                                    if (
                                                        !/^[0-9.]$/.test(event.key) &&
                                                        event.key == 8
                                                    ) {
                                                        event.preventDefault();
                                                    } else if (
                                                        event.key === "." &&
                                                        event.target.value.indexOf(".") > -1
                                                    ) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                onChange={(event) => {
                                                    const value = event.target.value;
                                                    const intValue = parseInt(value);

                                                    if (
                                                        value === "" ||
                                                        (intValue >= 0 &&
                                                            intValue <= 100 &&
                                                            /^(\d+(\.\d{0,2})?)?$/.test(value))
                                                    ) {
                                                        setSalesForAgents(event.target.value);
                                                    }
                                                }}
                                            />{" "}
                                            %
                                        </div>
                                    ) : (
                                        <span className="ml-2 text-md font-medium text-black">
                                            {SalesForAgents} %
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/*Resale*/}

                        <div
                            className={`lg:h-28 flex  border flex-row rounded ${ToggleResale ? "bg-slate-100" : "bg-white"
                                } p-4 hover:shadow-lg shadow-black`}
                        >
                            <div className="ml-1 flex flex-grow flex-col gap-1">
                                <div className=" flex items-center justify-between">
                                    <span className="text-center w-20 border  bg-orange-100 border-orange-200 rounded-full px-4 text-sm text-orange-700 py-0.5">
                                        Resale
                                    </span>
                                    {isPayoutEditable ? (
                                        <Switch
                                            checked={ToggleResale}
                                            onChange={() => setToggleResale(!ToggleResale)}
                                            className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full "
                                        >
                                            <span className="sr-only"></span>
                                            <span
                                                aria-hidden="true"
                                                className="pointer-events-none absolute h-full w-full rounded-md"
                                            />
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    ToggleResale
                                                        ? "bg-indigo-600"
                                                        : "bg-gray-200",
                                                    "pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out"
                                                )}
                                            />
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    ToggleResale
                                                        ? "translate-x-5"
                                                        : "translate-x-0",
                                                    "pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"
                                                )}
                                            />
                                        </Switch>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div className="text-sm text-gray-500 flex justify-between">
                                    Brokerage for Buyers
                                    {isPayoutEditable ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={ResalesForBuyers}
                                                id="input-resales-buyer"
                                                className=" ml-2  w-10 border border-solid border-gray-200 focus:outline-none text-center"
                                                onKeyDown={(event) => {
                                                    if (
                                                        !/^[0-9.]$/.test(event.key) &&
                                                        event.key == 8
                                                    ) {
                                                        event.preventDefault();
                                                    } else if (
                                                        event.key === "." &&
                                                        event.target.value.indexOf(".") > -1
                                                    ) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                onChange={(event) => {
                                                    const value = event.target.value;
                                                    const intValue = parseInt(value);

                                                    if (
                                                        value === "" ||
                                                        (intValue >= 0 &&
                                                            intValue <= 100 &&
                                                            /^(\d+(\.\d{0,2})?)?$/.test(value))
                                                    ) {
                                                        setResalesForBuyers(event.target.value);
                                                    }
                                                }}
                                            />{" "}
                                            %
                                        </div>
                                    ) : (
                                        <span className="ml-2 text-md font-medium text-black">
                                            {ResalesForBuyers} %
                                        </span>
                                    )}
                                </div>
                                <div className="text-sm text-gray-500 flex justify-between">
                                    Brokerage for Sub Agent
                                    {isPayoutEditable ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={ResalesForAgents}
                                                id="input-resales-agent"
                                                className=" ml-2  w-10 border border-solid border-gray-200 focus:outline-none text-center"
                                                onKeyDown={(event) => {
                                                    if (
                                                        !/^[0-9.]$/.test(event.key) &&
                                                        event.key == 8
                                                    ) {
                                                        event.preventDefault();
                                                    } else if (
                                                        event.key === "." &&
                                                        event.target.value.indexOf(".") > -1
                                                    ) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                onChange={(event) => {
                                                    const value = event.target.value;
                                                    const intValue = parseInt(value);

                                                    if (
                                                        value === "" ||
                                                        (intValue >= 0 &&
                                                            intValue <= 100 &&
                                                            /^(\d+(\.\d{0,2})?)?$/.test(value))
                                                    ) {
                                                        setResalesForAgents(event.target.value);
                                                    }
                                                }}
                                            />{" "}
                                            %
                                        </div>
                                    ) : (
                                        <span className="ml-2 text-md font-medium text-black">
                                            {ResalesForAgents} %
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Site Vist */}

                        <div
                            className={`lg:h-28 flex  border flex-row rounded ${ToggleRevisit ? "bg-slate-100" : "bg-white"
                                } p-4 hover:shadow-lg shadow-black`}
                        >
                            <div className="ml-1 flex flex-grow flex-col gap-1">
                                <div className=" flex items-center justify-between">
                                    <span className="text-center w-24 border border-red-200  bg-red-100 rounded-full px-4 text-sm text-red-700 py-0.5">
                                        Site visit
                                    </span>
                                    {isPayoutEditable ? (
                                        <Switch
                                            checked={ToggleRevisit}
                                            onChange={() => setToggleRevisit(!ToggleRevisit)}
                                            className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full "
                                        >
                                            <span className="sr-only"></span>
                                            <span
                                                aria-hidden="true"
                                                className="pointer-events-none absolute h-full w-full rounded-md"
                                            />
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    ToggleRevisit
                                                        ? "bg-indigo-600"
                                                        : "bg-gray-200",
                                                    "pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out"
                                                )}
                                            />
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    ToggleRevisit
                                                        ? "translate-x-5"
                                                        : "translate-x-0",
                                                    "pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"
                                                )}
                                            />
                                        </Switch>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div className="text-sm text-gray-500 flex justify-between">
                                    Brokerage for Buyers
                                    {isPayoutEditable ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={RevisitForBuyers}
                                                id="input-revisit-buyer"
                                                className=" ml-2  w-10 border border-solid border-gray-200 focus:outline-none text-center"
                                                onKeyDown={(event) => {
                                                    if (
                                                        !/^[0-9.]$/.test(event.key) &&
                                                        event.key == 8
                                                    ) {
                                                        event.preventDefault();
                                                    } else if (
                                                        event.key === "." &&
                                                        event.target.value.indexOf(".") > -1
                                                    ) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                onChange={(event) => {
                                                    const value = event.target.value;
                                                    const intValue = parseInt(value);

                                                    if (
                                                        value === "" ||
                                                        (intValue >= 0 &&
                                                            intValue <= 100 &&
                                                            /^(\d+(\.\d{0,2})?)?$/.test(value))
                                                    ) {
                                                        setRevisitForBuyers(event.target.value);
                                                    }
                                                }}
                                            />{" "}
                                            %
                                        </div>
                                    ) : (
                                        <span className="ml-2 text-md font-medium text-black">
                                            {RevisitForBuyers} %
                                        </span>
                                    )}
                                </div>
                                <div className="text-sm text-gray-500 flex justify-between">
                                    Brokerage for Sub Agent
                                    {isPayoutEditable ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={RevisitForAgents}
                                                id="input-revisit-agent"
                                                className=" ml-2  w-10 border border-solid border-gray-200 focus:outline-none text-center"
                                                onKeyDown={(event) => {
                                                    if (
                                                        !/^[0-9.]$/.test(event.key) &&
                                                        event.key == 8
                                                    ) {
                                                        event.preventDefault();
                                                    } else if (
                                                        event.key === "." &&
                                                        event.target.value.indexOf(".") > -1
                                                    ) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                onChange={(event) => {
                                                    const value = event.target.value;
                                                    const intValue = parseInt(value);

                                                    if (
                                                        value === "" ||
                                                        (intValue >= 0 &&
                                                            intValue <= 100 &&
                                                            /^(\d+(\.\d{0,2})?)?$/.test(value))
                                                    ) {
                                                        setRevisitForAgents(event.target.value);
                                                    }
                                                }}
                                            />{" "}
                                            %
                                        </div>
                                    ) : (
                                        <span className="ml-2 text-md font-medium text-black">
                                            {RevisitForAgents} %
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div
                            className={`lg:h-28 flex  border flex-row rounded ${ToggleRevisit ? "bg-slate-100" : "bg-white"
                                } p-4`}
                        >
                            <div className="ml-1 flex flex-grow flex-col gap-1 bg-gray-100">
                                <div className=" flex items-center justify-between">
                                    {/* <span className="text-center w-24 border border-red-200  bg-red-100 rounded-full px-4 text-sm text-red-700 py-0.5">
                                        Site visit
                                    </span> */}
                                    {/* {isPayoutEditable ? (
                                        <Switch
                                            checked={ToggleRevisit}
                                            onChange={() => setToggleRevisit(!ToggleRevisit)}
                                            className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full "
                                        >
                                            <span className="sr-only"></span>
                                            <span
                                                aria-hidden="true"
                                                className="pointer-events-none absolute h-full w-full rounded-md"
                                            />
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    ToggleRevisit
                                                        ? "bg-indigo-600"
                                                        : "bg-gray-200",
                                                    "pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out"
                                                )}
                                            />
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    ToggleRevisit
                                                        ? "translate-x-5"
                                                        : "translate-x-0",
                                                    "pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"
                                                )}
                                            />
                                        </Switch>
                                    ) : (
                                        <></>
                                    )} */}
                                </div>
                                {/* <div className="text-sm text-gray-500 flex justify-between">
                                    Brokerage for Buyers
                                    {isPayoutEditable ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={RevisitForBuyers}
                                                id="input-revisit-buyer"
                                                className=" ml-2  w-10 border border-solid border-gray-200 focus:outline-none text-center"
                                                onKeyDown={(event) => {
                                                    if (
                                                        !/^[0-9.]$/.test(event.key) &&
                                                        event.key == 8
                                                    ) {
                                                        event.preventDefault();
                                                    } else if (
                                                        event.key === "." &&
                                                        event.target.value.indexOf(".") > -1
                                                    ) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                onChange={(event) => {
                                                    const value = event.target.value;
                                                    const intValue = parseInt(value);

                                                    if (
                                                        value === "" ||
                                                        (intValue >= 0 &&
                                                            intValue <= 100 &&
                                                            /^(\d+(\.\d{0,2})?)?$/.test(value))
                                                    ) {
                                                        setRevisitForBuyers(event.target.value);
                                                    }
                                                }}
                                            />{" "}
                                            %
                                        </div>
                                    ) : (
                                        <span className="ml-2 text-md font-medium text-black">
                                            {RevisitForBuyers} %
                                        </span>
                                    )}
                                </div> */}
                                {/* <div className="text-sm text-gray-500 flex justify-between">
                                    Brokerage for Sub Agent
                                    {isPayoutEditable ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={RevisitForAgents}
                                                id="input-revisit-agent"
                                                className=" ml-2  w-10 border border-solid border-gray-200 focus:outline-none text-center"
                                                onKeyDown={(event) => {
                                                    if (
                                                        !/^[0-9.]$/.test(event.key) &&
                                                        event.key == 8
                                                    ) {
                                                        event.preventDefault();
                                                    } else if (
                                                        event.key === "." &&
                                                        event.target.value.indexOf(".") > -1
                                                    ) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                onChange={(event) => {
                                                    const value = event.target.value;
                                                    const intValue = parseInt(value);

                                                    if (
                                                        value === "" ||
                                                        (intValue >= 0 &&
                                                            intValue <= 100 &&
                                                            /^(\d+(\.\d{0,2})?)?$/.test(value))
                                                    ) {
                                                        setRevisitForAgents(event.target.value);
                                                    }
                                                }}
                                            />{" "}
                                            %
                                        </div>
                                    ) : (
                                        <span className="ml-2 text-md font-medium text-black">
                                            {RevisitForAgents} %
                                        </span>
                                    )}
                                </div> */}
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Payout;