import React, {FC, useEffect, useState} from "react";
import FileColorIcon from "assets/icons/FileColor";
import StarIcon from "assets/images/star.svg";
import fakeThumbnail from "assets/images/thumbnail1.jpg";
import {map as _map} from "lodash"
import FinancialPlanningDetailMainRow from "./components/FinancialPlanningDetailMainRow";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {RootState} from "../../../../redux/reducer";
import {setMainRowCollapsed} from "../../../../redux/reducer/FinancialPlanningDetailSlice";

const FinancialPlanningDetailPage:FC = () => {
    const [valueHeading, setValueHeading] = useState("Kế hoạch dòng tiền T12.21");
    const [headingWidthInput, setHeadingWidthInput] = useState(0);

    const params = useParams<{ id: string }>();
    const id = params['id'];
    const mapData = useSelector((state: RootState) => state.financialPlanningDetails.data[id]??[])

    const dispatch = useDispatch()

    useEffect(() => {
        setHeadingWidthInput((valueHeading.length + 4) * 8);
    },[valueHeading])

    return (
        <div className={"financial-planning-detail"}>
            <div className={"financial-planning-header flex p-2"}>
                <FileColorIcon/>
                <div className="w-auto">
                    <div className={"flex"}>
                        <input
                            style={{width: headingWidthInput}}
                            onChange={(event) => setValueHeading(event.target.value)}
                            value={valueHeading} className={"text-lg w-auto mr-2"}/>
                        <img alt={"star-icon"} src={StarIcon}/>
                    </div>
                    <p className={"text-gray-400"}>Chỉnh sửa lần cuối cách đây 2 giờ bởi Nguyễn Hữu Hiệp</p>
                </div>
                <div className={"flex-1 flex items-center justify-end"}>
                    <p className={"text-gray-400 mr-2"}>Đang truy cập</p>
                    <div className={"flex items-center"}>
                        <img src={fakeThumbnail} alt="Thumbnail" className="w-8 h-8 rounded-full border-2 border-pink-600 mr-1" />
                        <img src={fakeThumbnail} alt="Thumbnail" className="w-8 h-8 rounded-full border-2 border-pink-600 mr-1" />
                        <img src={fakeThumbnail} alt="Thumbnail" className="w-8 h-8 rounded-full border-2 border-pink-600 mr-1" />
                        <img src={fakeThumbnail} alt="Thumbnail" className="w-8 h-8 rounded-full border-2 border-pink-600 mr-1" />
                        <div className={"rounded-full h-8 w-8 bg-gray-400 text-white text-lg text-center items-center justify-center flex font-thin"}>
                            <span>9+</span>
                        </div>
                        <button className={"bg-blue-500 text-white px-5 py-2 ml-3"}>
                            Share
                        </button>
                    </div>
                </div>
            </div>
            <div className={"financial-planning-table"}>
                <div className={"relative table border-collapse w-full"}>
                    <div className={"header flex table-row"}>
                        <div className={"financial-planning-table-action-sidebar w-6 bg-gray-300 text-white table-cell align-middle"}>
                            <div className={"flex flex-col items-center justify-center"}>
                                <button className={"rounded bg-gray-600 mb-1 block w-5 h-5"}
                                    onClick={() => dispatch(setMainRowCollapsed({_id: id, collapsed: true}))}
                                >
                                    1
                                </button>
                                <button className={"rounded bg-gray-600 mb-1 block w-5 h-5"}
                                    onClick={() => dispatch(setMainRowCollapsed({_id: id, collapsed: false}))}
                                >
                                    2
                                </button>
                            </div>
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-gray-100"}>
                            TT
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-gray-100"}>
                            Nội dung
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-gray-100"}>
                            Ngày dự kiến
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-gray-100"}>
                            Dự kiến thu
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-gray-100"}>
                            Thực tế thu
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-gray-100"}>
                            Dự kiến chi
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-gray-100"}>
                            Thực tế chi
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-gray-100"}>
                            Ngày thực tế
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-gray-100"}>
                            Hợp đồng
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-gray-100 w-3/12"}>
                            Mô tả/ghi chú
                        </div>
                    </div>
                    {
                        _map(mapData, (row, index) => (
                            <FinancialPlanningDetailMainRow key={row._id} idDetail={id} rowData={row} index={index}/>
                        ))
                    }
                    <div className={"row flex table-row font-semibold total-row"}>
                        <div className={"financial-planning-table-action-sidebar w-6 bg-gray-300 text-white table-cell align-middle border border-gray-300 transition duration-300 ease-in-out"}>

                        </div>
                        <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-yellow-100 w-3"}>

                        </div>
                        <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-yellow-100"}>
                            TỔNG
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-yellow-100"}>
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-yellow-100"}>
                            900.000.000.000
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-yellow-100"}>
                            900.000.000.000
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-yellow-100"}>
                            900.000.000.000
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-yellow-100"}>
                            900.000.000.000
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-yellow-100"}>

                        </div>
                        <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-yellow-100"}>

                        </div>
                        <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-yellow-100 w-3/12"}>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FinancialPlanningDetailPage;
