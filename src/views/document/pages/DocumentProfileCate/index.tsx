import React, {FC} from "react"
import iconBack from "assets/images/icon-back-gray.svg";
import {Link, useParams} from "react-router-dom";

const DocumentProfileCate:FC = () => {
    const {id: departmentID, cateId} = useParams<{id: string, cateId: string}>();

    return (
        <div className={"flex flex-1 flex-col overflow-hidden"}>
            <div className={"sticky top-0 bg-white"}>
                <div className={"flex items-center border-b-0.5 border-primary-border py-2"}>
                    <button className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mr-3"}>
                        <img src={iconBack} alt={"----"} className={"w-[18px]"}/>
                    </button>
                    <p className={"text-lg text-primary-gray ml-2"}>Ủy ban nhân dân thành phố Hà Nội</p>
                </div>
            </div>
            <div className={"flex justify-between gap-y-3.5 flex-wrap mt-4"}>
                {
                    [...Array(10)].map((e, i) => (
                        <Link key={i} className={"2xl:w-1/5 lg:w-1/3 px-2"} to={`/pm/project/${departmentID}/document-v2/1/cate/${cateId}/detail/1`}>
                            <div
                                className="bg-white border-0.5 border-primary-border rounded-lg h-[150px] px-3.5 py-4 flex flex-col justify-between">
                                <div className="flex justify-between"><h4 className="text-x-large">Chung, khác</h4>
                                    <div>
                                        <div
                                            className="bg-cbs-secondary rounded-md px-2.5 py-0.5 text-x-small text-white">Monthly
                                        </div>
                                    </div>
                                </div>
                                <p className="text-3x-large">175</p>
                                <div><span
                                    className="bg-cbs-up text-cbs-up-text py-0.5 px-1 rounded-sm mr-2.5 text-small">0+</span><span
                                    className="text-medium">Tháng này</span></div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default DocumentProfileCate;