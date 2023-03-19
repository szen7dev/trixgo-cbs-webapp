import { FC, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useTask } from 'services/hooks/useTask';

/**
 * Components
 */

/**
 * Assets
 */
// import ThreeDotVerticalIcon from "assets/images/icon-3dots-vertical-gray.svg";

/**
 * Hooks
 */
import { useContact } from "services/hooks/items/useContact";

const FnbPage: FC = () => {
    const { id: taskId } = useParams<{ id: string }>();
    console.log(taskId)

    // const { info: taskInfo, isLoadingInfo, refetchInfo, updateStatusMultipleAsync } = useTask({
    //     params: {
    //         taskID: taskId
    //     },
    //     isFetchInfo: true
    // });

    // console.log(taskInfo)

    return (
        <div>Xin chao</div>
    )
}

export default FnbPage