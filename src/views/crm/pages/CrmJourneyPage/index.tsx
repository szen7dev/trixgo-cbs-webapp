import React, { FC, useState, useEffect } from "react";

// ========== Utils ========== //

// ========== Hooks ========== //
// import { useFnbOrder } from 'services/hooks/fnb/useFnbOrder';
import { useFnbCustomerCare, useCustomerCareByProperty } from "services/hooks/fnb/useFnbCustomerCare";

import API from "apis/repository";
const APP_FNB_CUSTOMER_CARE = "/api/fnb/customer_cares";

const BACKGROUND = [
	{ value: 1, color: "bg-red-400", color2: "F11F20" },
	{ value: 2, color: "bg-yellow-300", color2: "fa6b07" },
	{ value: 3, color: "bg-green-400", color2: "C55B11" },
	{ value: 4, color: "bg-blue-400", color2: "00AF50" },
	{ value: 5, color: "bg-purple-400", color2: "169150" },
	{ value: 6, color: "bg-pink-600", color2: "1F4E78" },
	{ value: 7, color: "bg-gray-600", color2: "262626" },
	{ value: 8, color: "bg-teal-400", color2: "262626" },
]

export const CrmJourneyPage: FC = () => {

    const { listCustomerCareByProperty } = useCustomerCareByProperty({
        params: {
            option: 5,
            // fromDate: inputFilter.fromDate,
            // toDate: inputFilter.toDate,
        },
        isFetchList: true
      })

    return (
        <div className="flex flex-1 flex-col overflow-hidden h-full">
            <div className={"text-lg"}>Hành trình khách hàng</div>
            <div className="flex flex-wrap mt-3 mb-2">
                { 
                    listCustomerCareByProperty?.map((item: any, index: any) => {
                        const color = `cursor-pointer max-w-sm rounded overflow-hidden shadow-lg m-4 mr-3 mb-2`
                        const color2 = `#${BACKGROUND[index].color2}`

                        return (
                            <div key={index} className={color} style={{background: color2}}>
                                {/* <img className="w-full" src="/path/to/your/image" alt="Step 1"/> */}
                                <div className="px-3 py-2">
                                    <div className="font-bold text-xl mb-2 text-white">{item._id.journey.name} ({item.quantity})</div>
                                    <p className="text-white text-base">
                                    {item._id.journey.name}
                                    </p>
                                </div>
                            </div>
                        ) 
                    })
                }
                {/* <button className="py-1 px-4 mr-1 rounded-md border border-primary-border text-white bg-cbs-secondary border-none">Hành trình 1</button>
                <button className="py-1 px-4 mr-1 rounded-md border border-primary-border">Hành trình 2</button>
                <button className="py-1 px-4 mr-1 rounded-md border border-primary-border">Hành trình 3</button> */}
            </div>
        </div>
    )
}