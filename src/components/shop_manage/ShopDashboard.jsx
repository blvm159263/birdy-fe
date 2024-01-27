import React from "react"
import EChart from "../chart/EChart"
import LineChart from "../chart/LineChart"
import ShopIncomeSection from "./ShopIncomeSection";

function ShopDashboard() {

    return (
        <div className="bg-gray-200 p-4 col-span-9 min-h-screen">
            {/* <h1 className="text-center mb-10 text-2xl font-bold">Shop Dashboard</h1> */}

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="pt-7 pb-14 px-16 bg-white">

                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold">Shop Dashboard</span>
                                <span className="text-sm">Welcome to your shop dashboard</span>
                            </div>
                        </div>
                    </div>


                    <div className="mt-10">
                        <EChart />
                    </div>
                    <div className="mt-10">
                        <LineChart />
                    </div>
                    <ShopIncomeSection/>
                </div>
            </div>
        </div>
    )

}

export default ShopDashboard