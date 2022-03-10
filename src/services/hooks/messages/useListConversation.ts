import ListConversationRepository from "apis/messages";
import {
    AddConversationToFolderPayload,
    AddFolderPayload,
    ConvversationInformationPayload,
    CreateConversationPayload,
    CreateConversationResponseBodyData,
    DataListConversation,
    DeleteFolderPayload,
    FolderConversationItem,
    GeneralGroupByMemberPayload, HideConversationPayload,
    ItemListConversation,
    ListConversationPayload,
    ListFoldersConversationPayload,
    ListMembersOfConversationPayload,
    MediasOfConversationPayload, PinConversationPayload,
    UpdateConversationData,
    UpdateConversationPayload,
    UpdateFolderPayload,
    UpdateMuteConversationPayload
} from "typings/apis/messages/listConversation";
import {useDispatch} from "react-redux";
import {setListConversation, setLoading} from "redux/reducer/messages/ListConversation";
import {setListMembers, setListMedias} from "redux/reducer/messages/ListMessage";
import {setListFolders} from "redux/reducer/messages/ListFolders"
import {useInfiniteQuery} from "react-query";

type UseListConversationType = {
    getListConversation: (params: ListConversationPayload, saveToRedux?: boolean) => Promise<DataListConversation>;
    getListMembersOfConversation: (params: ListMembersOfConversationPayload) => Promise<void>;
    createConversation: (params: CreateConversationPayload) => Promise<CreateConversationResponseBodyData>;
    getListMediasOfConversation: (params: MediasOfConversationPayload) => Promise<void>;
    getListGeneralGroupByMember: (params: GeneralGroupByMemberPayload) => Promise<ItemListConversation[]>;
    getConverationInformation: (payload: ConvversationInformationPayload) => Promise<ItemListConversation>;
    getListFoldersConversation: (payload: ListFoldersConversationPayload) => void;
    isLoadingListConversations: boolean,
    refetchListConversations: () => void,
    listConversations: Array<ItemListConversation>,
    nextPageListConversations: () => void,
    prevPageListConversations: () => void,
    hasListConversationNextPage: boolean | undefined,
    totalRecordRequest: number | undefined,
    addFolder: (payload: AddFolderPayload) => Promise<FolderConversationItem>,
    updateFolder: (payload: UpdateFolderPayload) => Promise<FolderConversationItem>,
    deleteFolder: (payload: DeleteFolderPayload) => Promise<FolderConversationItem>,
    addConversationToFolder: (payload: AddConversationToFolderPayload) => Promise<ItemListConversation>,
    updateMuteConversation: (payload: UpdateMuteConversationPayload) => Promise<ItemListConversation>,
    updateConversation: (payload: UpdateConversationPayload) => Promise<UpdateConversationData>,
    pinConversation: (payload: PinConversationPayload) => Promise<any>,
    hideConversation: (payload: HideConversationPayload) => Promise<ItemListConversation>,
};

export const UseListConversation = (params?: any, enableQuery?: boolean) : UseListConversationType => {
    const dispatch = useDispatch();

    const getListConversation = async (params: ListConversationPayload, saveToRedux = true) => {
        saveToRedux&&dispatch(setLoading(true));
        const {data} = await ListConversationRepository.getListConversation(params);
        saveToRedux&&dispatch(setListConversation(data));
        saveToRedux&&dispatch(setLoading(false));

        return data
    }

    const getListMembersOfConversation = async (params: ListMembersOfConversationPayload) => {
        const { data } = await ListConversationRepository.getListMembersOfConversation(params);
        dispatch(setListMembers({conversationId: params.conversationID, data: data.listRecords}))
    }

    const createConversation = async (params: CreateConversationPayload) => {
        const {data} = await ListConversationRepository.createConversation(params);
        return data;
    }

    const getListMediasOfConversation = async (params: MediasOfConversationPayload) => {
        const {data} = await ListConversationRepository.getListImagesOfConversation(params);
        dispatch(setListMedias({conversationId: params.conversationID, data: data.listRecords, type: params.typeMessage}))
    }

    const getConverationInformation = async (params: ConvversationInformationPayload) => {
        const {data} = await ListConversationRepository.getConverationInformation(params);

        return data;
    }

    const getListGeneralGroupByMember = async (params: GeneralGroupByMemberPayload) => {
        const {data} = await ListConversationRepository.getListGeneralGroupByMember(params);
        return data;
    }

    const getListFoldersConversation = async  (params: ListFoldersConversationPayload) => {
        const {data} = await ListConversationRepository.getListFoldersConversation(params);
        dispatch(setListFolders(data));
        return data;
    }

    const addFolder = async (params: AddFolderPayload) => {
        const {data} = await ListConversationRepository.addFolder(params);
        return new Promise<FolderConversationItem>((resolve, reject) => {
            resolve(data);
        });
    }

    const updateFolder = async (params: UpdateFolderPayload) => {
        const {data} = await ListConversationRepository.updateFolder(params);
        return new Promise<FolderConversationItem>((resolve, reject) => {
            resolve(data);
        });
    }

    const deleteFolder = async (params: DeleteFolderPayload) => {
        const {data} = await ListConversationRepository.deleteFolder(params);
        return new Promise<FolderConversationItem>((resolve, reject) => {
            resolve(data);
        });
    }

    const addConversationToFolder = async (params: AddConversationToFolderPayload) => {
        const {data} = await ListConversationRepository.addConversationToFolder(params);
        return new Promise<ItemListConversation>((resolve, reject) => {
            resolve(data);
        });
    }

    const updateMuteConversation = async (params: UpdateMuteConversationPayload) => {
        const {data} = await ListConversationRepository.updateMuteConversation(params);
        return new Promise<ItemListConversation>((resolve, reject) => {
            resolve(data);
        });
    }

    const updateConversation = async (params: UpdateConversationPayload) => {
        const {data} = await ListConversationRepository.updateConversation(params);
        return new Promise<UpdateConversationData>((resolve, reject) => {
            resolve(data);
        });
    }

    const pinConversation = async (params: PinConversationPayload) => {
        const {data} = await ListConversationRepository.pinConversation(params);
        return new Promise<any>((resolve, reject) => {
            resolve(data);
        });
    }

    const hideConversation = async (params: HideConversationPayload) => {
        const {data} = await ListConversationRepository.hideConversation(params);
        return new Promise<ItemListConversation>((resolve, reject) => {
            resolve(data);
        });
    }

    const {
        isLoading: isLoadingListConversations,
        refetch: refetchListConversations,
        data: listConversationsFromAPI, // dataListContracts
        fetchNextPage: nextPageListConversations,
        fetchPreviousPage: prevPageListConversations,
        hasNextPage: hasListConversationNextPage
    } =
        useInfiniteQuery( // https://react-query.tanstack.com/reference/useInfiniteQuery
            [`list_conversations`, params?.keyword], // Key để phân biệt vùng tác động bởi data thay đổi
            async ({pageParam} : any) =>
                ListConversationRepository.getListConversation({
                    lastestID: pageParam||"",
                    ...params
                }),
            {
                getNextPageParam: ({data} : any) => {
                    return data?.nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: !!enableQuery, // https://react-query.tanstack.com/guides/disabling-queries
            }
        );
    const listConversations = [].concat(...(listConversationsFromAPI?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecordRequest = listConversationsFromAPI?.pages[0]?.data?.totalRecord;

    return {
        getListConversation,
        getListMembersOfConversation,
        createConversation,
        getListMediasOfConversation,
        isLoadingListConversations,
        refetchListConversations,
        listConversations,
        nextPageListConversations,
        prevPageListConversations,
        hasListConversationNextPage,
        totalRecordRequest,
        getListGeneralGroupByMember,
        getConverationInformation,
        getListFoldersConversation,
        addFolder,
        updateFolder,
        deleteFolder,
        addConversationToFolder,
        updateMuteConversation,
        updateConversation,
        pinConversation,
        hideConversation
    }
};