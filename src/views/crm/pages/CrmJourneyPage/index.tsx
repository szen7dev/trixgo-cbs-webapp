import React, { FC, useState, useEffect } from "react";

// ========== Utils ========== //

// ========== Hooks ========== //
// import { useFnbOrder } from 'services/hooks/fnb/useFnbOrder';
import { useFnbCustomerCare, useCustomerCareByProperty } from "services/hooks/fnb/useFnbCustomerCare";

import API from "apis/repository";
const APP_FNB_CUSTOMER_CARE = "/api/fnb/customer_cares";

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
            <div>
            { 
                listCustomerCareByProperty?.map((item: any, index: any) => (
                   
                    <div key={index} >
                        <button className="py-1 px-4 mr-1 rounded-md border border-primary-border text-white bg-cbs-secondary border-none">
                            {item._id.journey.name} ({item.quantity})
                        </button>
                    </div>
                ))
            }
                <button className="py-1 px-4 mr-1 rounded-md border border-primary-border text-white bg-cbs-secondary border-none">Hành trình 1</button>
                <button className="py-1 px-4 mr-1 rounded-md border border-primary-border">Hành trình 2</button>
                <button className="py-1 px-4 mr-1 rounded-md border border-primary-border">Hành trình 3</button>
            </div>
        </div>
    )
}