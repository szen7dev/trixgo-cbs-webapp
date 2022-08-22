import React, {FC} from "react"
import iconBack from "../../../../assets/images/icon-back-gray.svg";
import {Link} from "react-router-dom";
import searchIcon from "assets/images/icons8-search-120.png";
import folderIcon from "../../../../assets/images/icons8-folder-48-gray.svg";

const DocumentProjectPublishOrgByProfileType:FC = () => {
    return (
        <div className={"flex flex-1 flex-col overflow-hidden"}>
            <div className={"sticky top-0 bg-white"}>
                <div className={"flex items-center border-b-0.5 border-primary-border py-2"}>
                    <button className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mr-3"}>
                        <img src={iconBack} alt={"----"} className={"w-[18px]"}/>
                    </button>
                    <p className={"text-lg text-primary-gray ml-2"}>Quyết định</p>
                    <div className={"flex items-center ml-6"}>
                        <img src={searchIcon} alt={"search icon"} className={"w-[24px] h-[24px]"}/>
                        <input className={"py-2 border-b border-black ml-2 w-[370px] focus:outline-none focus:ring-none"} placeholder={"Tìm kiếm"}/>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <table className={"table-fixed border-collapse w-full"}>
                    <tbody>
                    {
                        [...Array(10)].map((e,i) => (
                            <tr key={i}>
                                <td className={"border-b-0.5 border-primary-border py-3"}>
                                    {/*<Link to={`/pm/project/${departmentID}/document-v2/1/cate/1`}>*/}
                                        <div className={"flex items-center"}>
                                            <img src={folderIcon} alt={"-----"} className={"w-[24px] h-[24px]"}/>
                                            <span className={"ml-3"}>Ủy ban nhân dân thành phố Hà Nội</span>
                                        </div>
                                    {/*</Link>*/}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DocumentProjectPublishOrgByProfileType;