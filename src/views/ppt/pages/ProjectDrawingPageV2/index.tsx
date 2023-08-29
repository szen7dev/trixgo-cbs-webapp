import { FC, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import moment from "moment";

import drawingIcon from "assets/images/icons8-google-drawing-100.svg";
import taskUserAvt from "assets/images/task-user.svg";

//HOOK
import {
	useQueryListDocument,
  } from "services/hooks/ppt/useDocument";
import { useProject } from 'services/hooks/items/useProject';

const ProjectDrawingPageV2:FC = () => {
	const [keyword] = useState("");
	const { id: projectID } = useParams<{ id: string, documentID: string }>();

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
    }   = useQueryListDocument(projectID, { type:"9", limit: 30, isParent: "1" }, "");

	useEffect(() => {
		refetch()
	}, [keyword]);

    return (
        <div className={"project-drawing"}>
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
                        {
                            listDocumentParent.map((document, index) => (

                                <tr key={index}>
                                    <td className={"px-4 py-2 text-left border-b-0.5 border-primary-border align-middle"}>
                                        <div className={"flex items-center"}>
                                            <img src={drawingIcon} alt={"----"} className={"w-[24px] h-[24px]"}/>
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
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProjectDrawingPageV2;