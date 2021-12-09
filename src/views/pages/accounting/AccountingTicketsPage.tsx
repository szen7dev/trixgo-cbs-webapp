import React, {FC} from "react";
import DropdownSearchable from "../../../components/common/DropdownSearch";

const AccountingTicketsPage:FC = () => {
    return (
        <div>
            <div className="flex flex-wrap w-full">
                <DropdownSearchable
                id="ticket-creator" placeholder="Người tạo phiếu"
                searchUrl={"/user/get-list"}
                searchParam={"search"}
                />
            </div>
        </div>
    )
};

export default AccountingTicketsPage;
