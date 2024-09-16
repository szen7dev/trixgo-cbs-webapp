import { FC, memo } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import parse from "html-react-parser";
import { Executor } from "views/pcm/shareComponents/common";
import { SearchListRecord } from "typings/main-search";
import { PCM_STATUS_TASK } from "apis/localdb/index";
import { NavLink } from 'react-router-dom';

type Props = {
    tasks: Array<SearchListRecord>;
    totalRecord: number | undefined;
    onClickMore: () => void;
};

export const ListTasksReport: FC<Props> = memo(({
    tasks,
    totalRecord,
    onClickMore,
}) => {

    const history = useHistory();

    const handleClickTask = (id: string) => {
        history.push(`/pcm/detail/${id}`);
    };

    const renderSeeMoreButton = () : JSX.Element => {
        const isShowSeeMore = totalRecord && totalRecord - tasks.length > 0;

        if(!isShowSeeMore) return <></>

        return (
            <button
                className="text-primary text-[13px] mt-5"
                onClick={onClickMore}
            >
                {`Xem thêm (${Number(totalRecord) - tasks.length})`}
            </button>
        )
    };

    const subContentHtml = (html?: string) => {
        const removeHtmlTag = parse(
        (html || "").replace(/<[^>]*>?/gm, " ")
        ).toString();

        const result =
        removeHtmlTag.length > 100
            ? `${removeHtmlTag.slice(0, 100)}...`
            : removeHtmlTag;
        return result;
    };

    return (
        <>
            <table className="relative">
                <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                        <th className="px-2 py-2 text-[13px] font-normal border w-[41px]">
                            TT
                        </th>
                        <th className="px-2 py-2 text-[13px] font-normal border text-left">
                            Nội dung công việc
                        </th>
                        <th className="px-2 py-2 text-[13px] font-normal border text-left">
                            Thời hạn
                        </th>
                        <th className="px-2 py-2 text-[13px] font-normal border text-left">
                            Thực hiện
                        </th>
                        <th className="px-2 py-2 text-[13px]  font-normal border text-left">
                            Trạng thái
                        </th>
                        <th className="px-2 py-2 text-[13px] font-normal border text-left">
                            Cập nhật gần nhất
                        </th>
                        <th className="px-2 py-2 text-[13px] font-normal border text-left w-2/6">
                            Mô tả
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {(tasks && tasks.length) ?
                        tasks.map((item, index) => (
                            <tr key={item._id}>
                                <td className="p-2 border">{index + 1}</td>
                                <td
                                    className="p-2 border cursor-pointer"
                                    onClick={() => handleClickTask(item._id)}
                                >
                                    {`${item.project.sign}.${item.name}`}
                                    {/* <NavLink  to={`/pcm/detail/${item?._id}`}>
                                        {`${item.project.sign}.${item.name}`}
									</NavLink> */}
                                    {item?.parent ?
                                        <div className="my-1 text-primary-gray text-xs truncate max-w-4xl text-cbs-highlight-color">
                                            Việc cha: {item?.parent?.name}
                                        </div> : <></>
                                    }
                                    <p className="text-primary-gray"><i>Tạo: {item?.author?.fullname} | {moment(item.createAt).format("DD/MM/YYYY HH:mm")} | {moment(item.createAt).fromNow()}</i></p>
                                </td>
                                <td className="p-2 border">
                                    {moment(item.actualFinishTime).format("DD/MM/YYYY HH:mm")}
                                </td>
                                <td className="p-2 border">
                                    <Executor color="" assignee={item.assignee} />
                                </td>
                                <td className="p-2 border" style={{color: `#${PCM_STATUS_TASK[item.status - 1].backgroud}`}}>
                                    {PCM_STATUS_TASK[item.status - 1].text}
                                </td>
                                <td className="p-2 border">
                                    <p className="text-primary-gray"><i>{item?.userUpdate?.fullname} | {moment(item?.modifyAt).format("DD/MM/YYYY HH:mm")} | {moment(item?.modifyAt).fromNow()}</i></p>
                                </td>
                                <td className="p-2 border w-2/6">
                                    {subContentHtml(item.description)}
                                </td>
                            </tr>
                        )) : <></>}
                </tbody>
            </table>
            {renderSeeMoreButton()}
        </>
    );
});

ListTasksReport.displayName = 'ListTasksReport';