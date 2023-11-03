import React from "react";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";
import { useState } from "react";

const Overview = ({ userDetails }) => {
    const [requestId, setRequestId] = useState(uuid())
    const [overviewData, setOverviewData] = useState("");
    const [unitoverviewData, setUnitOverviewData] = useState(0);
    const [plotoverviewData, setPlotOverviewData] = useState(0);

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
                let result = resVal.result.data.stockDetails;
                setOverviewData(result);
                setUnitOverviewData(
                    result.unitsOverView.completedUnits +
                    result.unitsOverView.onGoingUnits +
                    result.unitsOverView.rentCounts +
                    result.unitsOverView.saleCounts +
                    result.unitsOverView.totalCounts +
                    result.unitsOverView.upComingUnits
                );
                const value =
                    result.plotsOverView.completedPlots +
                    result.plotsOverView.onGoingUnits +
                    result.plotsOverView.rentCounts +
                    result.plotsOverView.saleCounts +
                    result.plotsOverView.totalCounts +
                    result.plotsOverView.upComingUnits

                if (value > 0) {
                    setPlotOverviewData(value)
                }
                else {
                    setPlotOverviewData("0")
                }
            });
    }, []);

    return (
        <div className="bg-blue-200 rounded-md">
            <div class="w-full bg-white shadow-xl">
                <div class=" grid lg:grid-cols-2 mt-1.5 p-2 bg-gray-100 rounded-md">
                    <div class="flex justify-center">
                        <div class="w-full bg-white shadow-xl">
                            <div class="w-11/12 mx-auto shadow-md">
                                <div class="bg-white my-6 border">
                                    <h1 class=" font-bold p-3 flex items-center justify-center">
                                        Units Overview - {unitoverviewData}
                                    </h1>
                                    <table class="text-left w-full border-collapse">
                                        <thead>
                                            <tr>
                                                <th class="py-4 px-6 bg-indigo-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                                                    Status
                                                </th>
                                                <th class="py-4 px-6 text-center bg-indigo-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                                                    Counts
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {overviewData && (
                                                <>
                                                    <tr className="hover:bg-grey-lighter">
                                                        <td className="py-4 px-6 border-b border-grey-light">
                                                            Ready to Move in
                                                        </td>
                                                        <td className="py-4 px-6 text-center border-b border-grey-light">
                                                            {overviewData.unitsOverView.completedUnits}
                                                        </td>
                                                    </tr>
                                                    <tr className="hover:bg-grey-lighter">
                                                        <td className="py-4 px-6 border-b border-grey-light">
                                                            Upcoming
                                                        </td>
                                                        <td className="py-4 px-6 text-center border-b border-grey-light">
                                                            {overviewData.unitsOverView.onGoingUnits}
                                                        </td>
                                                    </tr>
                                                    <tr className="hover:bg-grey-lighter">
                                                        <td className="py-4 px-6 border-b border-grey-light">
                                                            New Launch
                                                        </td>
                                                        <td className="py-4 px-6 text-center border-b border-grey-light">
                                                            {overviewData.unitsOverView.rentCounts}
                                                        </td>
                                                    </tr>
                                                    <tr className="hover:bg-grey-lighter">
                                                        <td className="py-4 px-6 border-b border-grey-light">
                                                            Under Construction
                                                        </td>
                                                        <td className="py-4 px-6 text-center border-b border-grey-light">
                                                            {overviewData.unitsOverView.saleCounts}
                                                        </td>
                                                    </tr>
                                                    <tr className="hover:bg-grey-lighter">
                                                        <td className="py-4 px-6 border-b border-grey-light">
                                                            Rent
                                                        </td>
                                                        <td className="py-4 px-6 text-center border-b border-grey-light">
                                                            {overviewData.unitsOverView.totalCounts}
                                                        </td>
                                                    </tr>
                                                    <tr className="hover:bg-grey-lighter">
                                                        <td className="py-4 px-6 border-b border-grey-light">
                                                            Resale
                                                        </td>
                                                        <td className="py-4 px-6 text-center border-b border-grey-light">
                                                            {overviewData.unitsOverView.upComingUnits}
                                                        </td>
                                                    </tr>
                                                </>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <div class="w-full bg-white shadow-xl">
                            <div class="w-11/12 mx-auto shadow-md">
                                <div class="bg-white my-6 border">
                                    <h1 class=" font-bold p-3 flex items-center justify-center">
                                        Plot Overview - {plotoverviewData}
                                    </h1>
                                    <table class="text-left w-full border-collapse">
                                        <thead>
                                            <tr>
                                                <th class="py-4 px-6 bg-indigo-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                                                    Status
                                                </th>
                                                <th class="py-4 px-6 text-center bg-indigo-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                                                    Counts
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {overviewData && (
                                                <>
                                                    <tr className="hover:bg-grey-lighter">
                                                        <td className="py-4 px-6 border-b border-grey-light">
                                                            Completed
                                                        </td>
                                                        <td className="py-4 px-6 text-center border-b border-grey-light ">
                                                            {overviewData.plotsOverView.completedPlots}
                                                        </td>
                                                    </tr>
                                                    <tr className="hover:bg-grey-lighter">
                                                        <td className="py-4 px-6 border-b border-grey-light">
                                                            Upcoming
                                                        </td>
                                                        <td className="py-4 px-6 text-center border-b border-grey-light">
                                                            {overviewData.plotsOverView.onGoingPlots}
                                                        </td>
                                                    </tr>
                                                    <tr className="hover:bg-grey-lighter">
                                                        <td className="py-4 px-6 border-b border-grey-light">
                                                            New Launch
                                                        </td>
                                                        <td className="py-4 px-6 text-center border-b border-grey-light">
                                                            {overviewData.plotsOverView.saleCounts}
                                                        </td>
                                                    </tr>
                                                    <tr className="hover:bg-grey-lighter">
                                                        <td className="py-4 px-6 border-b border-grey-light">
                                                            Resale
                                                        </td>
                                                        <td className="py-4 px-6 text-center border-b border-grey-light">
                                                            {overviewData.plotsOverView.totalCounts}
                                                        </td>
                                                    </tr>
                                                </>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
