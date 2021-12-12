import React,{FC} from "react";

const CreateNewTicket:FC = () => {
    return (
        <div className={"bg-white inline-block w-full overflow-hidden align-top transition-all transform bg-primary-light shadow-xl rounded mt-28"}>
            <hr/>
            <button
                className="btn btn-primary"
            >
                Xác nhận
            </button>
        </div>
    )
}

export default CreateNewTicket;
