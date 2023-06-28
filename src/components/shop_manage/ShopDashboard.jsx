import React, { useEffect, useState, useRef } from "react"
import EChart from "../chart/EChart"
import LineChart from "../chart/LineChart"

function ShopDashboard() {

    return (
        <div className="bg-gray-300 p-10 w-4/5 absolute top-0 right-0 h-screen">
            {/* <h1 className="text-center mb-10 text-2xl font-bold">Shop Dashboard</h1> */}

            <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="pt-7 pb-14 px-16 bg-white">

                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold">Shop Dashboard</span>
                                <span className="text-sm">Welcome to your shop dashboard</span>
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex justify-between mt-10">
                        <div className="flex items-center">
                            <EChart />
                        </div>
                        <div className="flex items-center">
                            <LineChart />
                        </div>
                    </div> */}
                    <div className="mt-10">
                        <EChart />
                    </div>
                    <div className="mt-10">
                        <LineChart />
                    </div>

                </div>
            </div>
        </div>
    )

}

export default ShopDashboard