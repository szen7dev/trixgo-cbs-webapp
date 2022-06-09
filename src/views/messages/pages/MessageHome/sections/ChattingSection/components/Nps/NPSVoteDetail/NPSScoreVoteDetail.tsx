import React, {FC, useCallback, useEffect, useState} from "react";
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
    const [scores, setScores] = useState<{[key: string]: {displayPoint: number; users: {_id: string; bizfullname:string; image:string, score: number}[]}}>({
        0: {
            displayPoint: 0,
            users: []
        }
    });
    const [selectTab, setSelectTab] = useState<number|null>(null);

    const {getScoreStatisticsNps} = UseConversation();

    useEffect(() => {
        if (isOpenMessageNPSVoteDetail) {
            getScoreStatisticsNps({
                conversationID: message.conversation,
                messageID: message._id
            }).then(data => {
                const formatData : {[key: string]: {displayPoint: number; users: {_id: string; bizfullname:string; image:string; score: number}[]}} = {
                    0: {
                        displayPoint: 0,
                        users: []
                    }
                };
                formatData[0].displayPoint = data.dataAverage.scoreAverage;
                data.dataStatistics.forEach(data => {
                    const users = data.users.map(user => {
                        return {
                            ...user,
                            score: data._id.score
                        }
                    })
                    formatData[data._id.score] = {
                        displayPoint: data.total,
                        users
                    }
                    formatData[0].users = formatData[0].users.concat(users);
                })
                setScores(formatData)
                setSelectTab(0)
            })
        }
    },[isOpenMessageNPSVoteDetail, message.nps.usersVote])

    const renderListUserVote = useCallback(() => {
        if (selectTab === null) return null;
        return _map(scores[selectTab].users, user => (
            <div key={user._id} className={"flex py-4 px-[22px] items-center"}>
                <img alt={user.bizfullname} src={`${process.env.REACT_APP_URL_S3_USER}/${user.image}`} className={"w-[44px] h-[44px] rounded-full overflow-hidden object-cover"}/>
                <div className={"flex-1 ml-3"}>{user.bizfullname}</div>
                <div>{user.score}</div>
            </div>
        ))
    }, [selectTab])

    return <>
        <p className={"px-[22px] mb-5"}>Điểm về sự hài lòng <b>“{message.nps.service.name}”</b></p>
        <div className={"flex overflow-auto px-[22px] border-b border-gray-200"}>
            {
                _map(Object.keys(scores), score => (
                    <div
                        key={score}
                        onClick={() => setSelectTab(parseInt(score))}
                        className={"mx-2 py-2 cursor-pointer " + (selectTab === parseInt(score) ? "text-primary border-b-2 border-primary ": "text-gray-400")}>
                        {(parseInt(score) === 0) ? "Trung bình" : score} ({scores[score].displayPoint})
                    </div>
                ))
            }
        </div>
        {renderListUserVote()}
        </>
}