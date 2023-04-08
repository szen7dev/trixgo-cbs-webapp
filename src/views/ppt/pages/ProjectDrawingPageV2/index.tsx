import { FC, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import moment from "moment";

// import nextIcon from "assets/images/icons-arrow-next.svg";
// import downloadIcon from "assets/images/icons8-download-64.svg";
// import userAvatar from "assets/images/task-user.svg";
// import PDFIcon from "assets/images/CBS-PDF-Icon-48.svg";
import drawingIcon from "assets/images/icons8-google-drawing-100.svg";
// import drawingIconPdf from "assets/images/icons8-google-pdf-100.svg";
import taskUserAvt from "assets/images/task-user.svg";

//HOOK
// import { usePcmProject } from "services/hooks/pcm/usePcmProject";
import {
	useQueryListDocument,
  } from "services/hooks/ppt/useDocument";
// import { APP_ID } from 'apis/localdb';
// import { useHistoryTraffics } from "services/hooks/auth/useAuth";
// import { useQueryListDocumentFile } from "services/hooks/document/useDocumentFile";
import { useProject } from 'services/hooks/items/useProject';

const ProjectDrawingPageV2:FC = () => {
	const [keyword] = useState("");
	// ID của dự án
	const { id: projectID } = useParams<{ id: string, documentID: string }>();
	// Call hook lấy thông tin project
	// const { infoDepartment } = usePcmProject({ departmentID: projectID });

    const { info: projectInfo } = useProject({
		params: {
			departmentID: projectID,
			select: "name sign",
			populates: ""
		},
		isFetchInfo: true
	})

	useEffect(() => {
		document.title = `${projectInfo.sign} | Bản vẽ`
	}, [projectInfo.sign]);

	const {
        data: listDocumentParent,
        refetch
    }   = useQueryListDocument(projectID, { type:"9", limit: 30 }, "");

	// const { data: listDocumentChild,
	// 		totalRecord: totalRecordChild,
	// 		totalPages: totalPagesChild,
	// 		loading: loadingChild,
	// 		nextCursor: nextCursorChild,
	// 		fetchNextPage: fetchNextPageDocumentChild,
	// 		refetch: refetchChild } = useQueryListDocument(projectID, { type:"9", parentID: documentID, keyword }, "");

	useEffect(() => {
		// refetchChild();
		refetch()
	}, [keyword]);

    // console.log(listDocumentParent)

    return (
        <div className={"project-drawing"}>
            {/* <div className={"nav-drawing flex items-center text-lg p-4 text-primary-gray"}>
                <span>Bản vẽ công trình</span>
                <img src={nextIcon} alt={"-----"} className={"mx-4 h-[12px] w-[12px]"}/>
                <span>Bản vẽ phần ngầm</span>
                <button className={"ml-6"}>
                    <img src={downloadIcon} alt={"-----"} className={"h-[24px] w-[24px]"}/>
                </button>
            </div> */}

            <div className={"project-drawing-table"}>
                <table className={"w-full table-fixed tasks border-collapse"}>
                    <thead className={"sticky bg-white top-0 z-10"}>
                        <tr>
                            <th className={"w-5/12 px-4 py-2 text-left font-normal text-primary-gray border-b-0.5 border-primary-border"}>
                                Tên
                            </th>
                            <th className={"w-3/12 px-4 py-2 text-left font-normal text-primary-gray border-b-0.5 border-primary-border"}>
                                Người tạo
                            </th>
                            <th className={"w-2/12 px-4 py-2 text-left font-normal text-primary-gray border-b-0.5 border-primary-border"}>
                                Cập nhật lần cuối
                            </th>
                            <th className={"w-2/12 px-4 py-2 text-left font-normal text-primary-gray border-b-0.5 border-primary-border"}>
                                Dung lượng
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Hồ sơ con của hồ sơ */}
                        {
                            listDocumentParent.map((document, index) => (

                                <tr key={index}>
                                    <td className={"px-4 py-2 text-left border-b-0.5 border-primary-border align-middle"}>
                                        <div className={"flex items-center"}>
                                            <img src={drawingIcon} alt={"----"} className={"w-[24px] h-[24px]"}/>
                                            {/* <Link key={index} to={`/pm/project/${projectID}/drawing/${document._id}`}>
                                                <p className={"ml-4"}>{document.name}</p>
                                            </Link> */}
                                            <Link key={index} to={`/pm/project/${projectID}/document/${document._id}`}>
                                                <p className={"ml-4"}>{document.name}</p>
                                            </Link>
                                        </div>
                                    </td>
                                    <td className={"px-4 py-2 text-left border-b-0.5 border-primary-border align-middle"}>
                                        <div className={"flex items-center"}>
                                            <img src={document.author?.image ? `${process.env.REACT_APP_URL_S3_USER}/${document.author?.image}` : taskUserAvt} alt="Ava usr"
                                            className={"w-[24px] h-[24px] min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px] rounded-full overflow-hidden"}/>
                                            <p className={"ml-4"}>{document.author?.fullname}</p>
                                        </div>
                                    </td>
                                    <td className={"px-4 py-2 text-left border-b-0.5 border-primary-border text-primary-gray align-middle"}>
                                        {moment(document.createAt).format('DD/M/YYYY HH:mm')} ({moment(document.createAt).fromNow()})
                                    </td>
                                    <td className={"px-4 py-2 text-left border-b-0.5 border-primary-border text-primary-gray align-middle"}>
                                        -
                                    </td>
                                </tr>
                            ))
                        }

                        {/* File đính kèm của hồ sơ */}
                        {/* <tr>
                            <td className={"px-4 py-2 text-left border-b-0.5 border-primary-border align-middle"}>
                                <div className={"flex items-center"}>
                                    <img src={drawingIconPdf} alt={"----"} className={"w-[24px] h-[24px]"}/>
                                    <p className={"ml-4"}>KC001 - Mặt bằng kết cấu tầng hầm 1</p>
                                </div>
                            </td>
                            <td className={"px-4 py-2 text-left border-b-0.5 border-primary-border align-middle"}>
                                <div className={"flex items-center"}>
                                    <img src={userAvatar} alt={"----"} className={"w-[24px] h-[24px] min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px] rounded-full overflow-hidden"}/>
                                    <p className={"ml-4"}>Nguyễn Phan Thanh Hương-CPMI</p>
                                </div>
                            </td>
                            <td className={"px-4 py-2 text-left border-b-0.5 border-primary-border text-primary-gray align-middle"}>
                                15:30 22/12/2012 (2 day ago)
                            </td>
                            <td className={"px-4 py-2 text-left border-b-0.5 border-primary-border text-primary-gray align-middle"}>
                                11,6 MB
                            </td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProjectDrawingPageV2;