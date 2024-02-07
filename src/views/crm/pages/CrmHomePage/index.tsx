import React, { FC, useState, useEffect } from "react";

// ========== Utils ========== //
// ========== Hooks ========== //

export const CrmHomePage: FC = () => {

    return (
        <div className="flex flex-1 flex-col overflow-hidden h-full">
            <p className="text-lg">Chăm sóc khách hàng</p>
            <p>Hành trình trải nghiệm khách hàng sử dụng Chi tiết chủ đề hoặc Chi tiết hồ sơ khách hàng</p>
            <p>1. Theo dịch vụ</p>
            <p>2. Theo dự án</p>
            <p>3. Hành trình tương ứng</p>
            <p>4. Lịch hẹn với khách: Tư vấn, Triển khai dịch vụ</p>
            <div className="mt-3">
                <button className="py-1 px-4 mr-1 rounded-md border border-primary-border text-white bg-cbs-secondary border-none">Hành trình 1</button>
                <button className="py-1 px-4 mr-1 rounded-md border border-primary-border">Hành trình 2</button>
                <button className="py-1 px-4 mr-1 rounded-md border border-primary-border">Hành trình 3</button>
                <button className="py-1 px-4 mr-1 rounded-md border border-primary-border">Hành trình 4</button>
                <button className="py-1 px-4 mr-1 rounded-md border border-primary-border">Hành trình 5</button>
                <button className="py-1 px-4 mr-1 rounded-md border border-primary-border">Hành trình ...</button>
            </div>
        </div>
    )
}