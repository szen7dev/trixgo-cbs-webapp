import React, {FC} from "react";
import DropdownSearchable from "../../../components/common/DropdownSearch";

const AccountingTicketsPage:FC = () => {
    return (
        <div>
            <div className="flex flex-wrap w-full">
                <DropdownSearchable id="ticket-creator" placeholder="Người tạo phiếu"
                                    onchangeValue={(item => {
                                        console.log(item)
                                    })}
                                    className={"ml-10"}
                data={[
                    {
                        id: 1,
                        text: "hello"
                    },
                    {
                        id: 1,
                        text: "hello"
                    },
                    {
                        id: 1,
                        text: "hello"
                    },
                    {
                        id: 1,
                        text: "hello"
                    }
                ]}/>
            </div>
        </div>
    )
};

export default AccountingTicketsPage;
