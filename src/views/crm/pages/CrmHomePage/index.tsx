import React, { FC, useState, useEffect } from "react";

// ========== Utils ========== //
// ========== Hooks ========== //

export const CrmHomePage: FC = () => {

    return (
        <div className="flex flex-1 flex-col overflow-hidden h-full">
            <p>CrmHomePage</p>
            <p>Hành trình khách hàng</p>
            <p>1. Theo dịch vụ</p>
            <p>2. Theo dự án</p>
            <p>3. Hành trình tương ứng</p>
            <p>4. Lịch hẹn với khách: Tư vấn, Điều trị</p>

            <div>
                <button className="py-1 px-4 mr-1 rounded-md border border-primary-border text-white bg-cbs-secondary border-none">Hành trình 1</button>
                <button className="py-1 px-4 mr-1 rounded-md border border-primary-border">Hành trình 2</button>
                <button className="py-1 px-4 mr-1 rounded-md border border-primary-border">Hành trình 3</button>
            </div>
        </div>
    )
}