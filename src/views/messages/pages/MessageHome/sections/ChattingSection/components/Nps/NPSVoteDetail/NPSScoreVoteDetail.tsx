import React, {FC, useEffect, useState} from "react";
import {
    GetNPSPleasantDetailItem,
    GetNPSScoreDetailData,
    ItemMessage
} from "typings/apis/messages/listMessage";
import {map as _map} from "lodash";
import {UseConversation} from "services/hooks/messages/useConversation";

type Props = {
    message: ItemMessage;
    isOpenMessageNPSVoteDetail: boolean
}
export const NPSScoreVoteDetail:FC<Props> = ({message, isOpenMessageNPSVoteDetail}) => {
    const [scores, setScores] = useState<GetNPSScoreDetailData>({
        dataStatistics: [],
        dataAverage: {
            scoreAverage: 0,
            avgs: []
        }
    });
    const [selectTab, setSelectTab] = useState(0);

    const {getScoreStatisticsNps} = UseConversation();

    useEffect(() => {
        if (isOpenMessageNPSVoteDetail) {
            getScoreStatisticsNps({
                conversationID: message.conversation,
                messageID: message._id
            }).then(data => {
                setScores(data)
            })
        }
    },[isOpenMessageNPSVoteDetail, message.nps.usersVote])

    const renderListUserVote = () => {
        if (selectTab === 0) {
            return _map(scores.dataAverage.avgs, user => (
                <div>a</div>
            ))
        }
    }

    return <>
        <p className={"px-[22px] mb-5"}>Điểm về sự hài lòng <b>“{message.nps.service.name}”</b></p>
        <div className={"flex overflow-auto px-[22px] border-b border-gray-200"}>
            <div
                onClick={() => setSelectTab(0)}
                className={"mx-2 py-2 " + (selectTab === 0 ? "text-primary border-b-2 border-primary ": "text-gray-400")}>
                Trung bình ({scores.dataAverage.scoreAverage})
            </div>
            {
                _map(scores.dataStatistics, score => (
                    <div
                        onClick={() => setSelectTab(score._id.score)}
                        key={score._id.score} className={"mx-2 py-2 " + (selectTab === score._id.score ? "text-primary border-b-2 border-primary ": "text-gray-400")}>
                        {score._id.score} ({score.avg})
                    </div>
                ))
            }
        </div>
        {renderListUserVote()}
        </>
}