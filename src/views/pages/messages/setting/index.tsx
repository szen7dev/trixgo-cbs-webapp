import React, {FC} from "react";
import Close from "assets/icons/Close";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import BellIcon from "assets/images/icons8-bell-100.svg";
import AddUserToGroup from "assets/images/icons8-add-user-group-man-man-96.svg";
import SettingMessageDetailTab from "./components/SettingMessageDetailTab";
const SettingMessageDetail:FC = () => {
    return (
        <div className={"messages-right-bar w-[480px] border-l transition duration-150 relative group"}>
            <div className={"h-full group bg-gray-100 overflow-auto"}>
                <div className={"h-[56px] bg-white flex justify-between p-[17px] sticky top-0 z-5"}>
                    <button>
                        <Close/>
                    </button>
                    <button>
                        <img src={PencilIcon} alt={'--'}/>
                    </button>
                </div>
                <div className={"w-full min-h-[480px] text-white flex flex-col"} style={{background:"#FCC4A2"}}>
                    <div className={"text-center flex items-center justify-center flex-1"} style={{fontSize: "230px"}}>
                        T
                    </div>
                    <div className={"flex flex-col justify-start px-[25px] pb-[15px] w-full"}>
                        <div className={"text-xl"}>
                            CBS | WEB CLIENT
                        </div>
                        <div>
                            6 members
                        </div>
                    </div>
                </div>
                <div className={"flex justify-between items-center p-[17px] bg-white"}>
                    <img src={BellIcon} alt={"...."}/>
                    <div className={"flex-1 text-left ml-4"}>Notifications</div>
                    <input className="form-switch form-check-input" type="checkbox" id="flexSwitchCheckChecked"/>
                </div>
                <SettingMessageDetailTab/>
            </div>
            <button className={"w-[56px] h-[56px] group-hover:opacity-100 opacity-0 rounded-full absolute bottom-20px right-20px z-5 bg-primary flex items-center justify-center "}>
                <img src={AddUserToGroup} alt={"Pencil icon"}/>
            </button>
        </div>
    )
}

export default SettingMessageDetail;
