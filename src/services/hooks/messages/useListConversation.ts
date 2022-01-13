import ListConversationRepository from "apis/messages";
import {ListConversationPayload} from "typings/apis/messages/listConversation";
import {useDispatch} from "react-redux";
import {setNextCursor, setListConversation, setTotalRecord, setLoading} from "redux/reducer/messages/ListConversation";

type UseListConversationType = {
    getListConversation: (params: ListConversationPayload) => void;
};

export const UseListConversation = () : UseListConversationType => {
    const dispatch = useDispatch();

    const getListConversation = async (params: ListConversationPayload) => {
        dispatch(setLoading(true));
        const {data} = await ListConversationRepository.getListConversation(params);
        dispatch(setTotalRecord(data.totalRecord));
        dispatch(setNextCursor(data.nextCursor));
        dispatch(setListConversation(data.listRecords));
        dispatch(setLoading(false));
    }

    return {
        getListConversation
    }
};