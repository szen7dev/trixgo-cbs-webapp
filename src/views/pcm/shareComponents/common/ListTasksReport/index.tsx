import { FC, memo } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import parse from "html-react-parser";
import cn from "classnames";

import styles from "views/pcm/styles/pcm_task.module.css";
import { ListProgress, Executor } from "views/pcm/shareComponents/common";
import { SearchListRecord } from "typings/main-search";

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
                        <th className="px-2 py-2 text-[13px] font-normal border w-4/12 text-left">
                            Nội dung công việc
                        </th>
                        <th className="px-2 py-2 text-[13px] font-normal border w-1/12 text-left">
                            Thời hạn
                        </th>
                        <th className="px-2 py-2 text-[13px] font-normal border w-2/12 text-left">
                            Thực hiện
                        </th>
                        <th className="px-2 py-2 text-[13px]  font-normal border w-1/12 text-left">
                            Tiến trình
                        </th>
                        <th className="px-2 py-2 text-[13px] font-normal border text-left">
                            Mô tả
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {(tasks && tasks.length) ?
                        tasks.map((taskOutDate, index) => (
                            <tr key={taskOutDate._id}>
                            <td className="p-2 border">{index + 1}</td>
                            <td
                                className="p-2 border cursor-pointer"
                                onClick={() => handleClickTask(taskOutDate._id)}
                            >
                                {`${taskOutDate.project.sign}.${taskOutDate.name}`}
                            </td>
                            <td className="p-2 border">
                                {moment(taskOutDate.actualFinishTime).format("DD/MM/YYYY")}
                            </td>
                            <td className="p-2 border">
                                <Executor color="bg-red-500" assignee={taskOutDate.assignee} />
                            </td>
                            <td className="p-2 border">
                                <ListProgress
                                color="bg-red-500"
                                checklist={taskOutDate.checklist}
                                percentage={taskOutDate.percentage}
                                />
                            </td>
                            <td className={cn(styles["dont-break-out"], "p-2 border")}>
                                {subContentHtml(taskOutDate.description)}
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