import ListConversationRepository from "apis/messages";
import {ListConversationPayload} from "typings/apis/messages/listConversation";
import {useDispatch} from "react-redux";
import {setNextCursor, setListConversationPined, setListConversationUnpin, setTotalRecord, setLoading} from "redux/reducer/messages/ListConversation";

type UseListConversation = {
    getListConversation: (params: ListConversationPayload) => void;
};

export const UseListConversation = () : UseListConversation => {
    const dispatch = useDispatch();

    const getListConversation = async (params: ListConversationPayload) => {
        dispatch(setLoading(true));
        const {data} = await ListConversationRepository.getListConversation(params);
        dispatch(setTotalRecord(data.totalRecord));
        dispatch(setNextCursor(data.nextCursor));
        dispatch(setListConversationPined(data.listConversationPin));
        dispatch(setListConversationUnpin(data.listRecords));
        dispatch(setLoading(false));
    }

    return {
        getListConversation
    }
};