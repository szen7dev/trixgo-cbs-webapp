import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import DatahubContactRepository from 'apis/datahub/contact';

export const useDatahubContact = (params: any, isFetchList?: boolean, isFetchInfo?: boolean ): any => {
    // Tạo
    const { mutateAsync: createDatahubContactMutateAsync, isLoading: isLoadingCreateDatahubContact } =
        useMutation((payload: any) => DatahubContactRepository.insert(payload)
    );
        
    // Sửa
    const { mutateAsync: updateDatahubContactMutateAsync, isLoading: isLoadingUpdateDatahubContact } =
        useMutation((payload: any) =>DatahubContactRepository.update(payload)
    );
    
    // Xoá
    const { mutateAsync: removeManyDatahubContactMutateAsync, isLoading: isManyAppRole } =
        useMutation((payload: any) => DatahubContactRepository.remove(payload)
    );
    
    // info 
    const {
        data: infoDatahubContact, 
        refetch: refetchInfo 
    } = useQuery(`datahub_contact_info.${params}`, () => DatahubContactRepository.getInfoAndGetList(params), {
        enabled: isFetchInfo ?? false,
        refetchOnWindowFocus: false,
    });
    
    // Danh sách 
    const {
        isLoading,
        refetch: refetchList,
        data,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery(
        [`list_datahub_contact`, params],
        async ({ pageParam }: any) => {
            return DatahubContactRepository.getInfoAndGetList({
                lastestID: pageParam ? pageParam : "",
                ...params
            })  
        },
        {
            getNextPageParam: ({ data }) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: isFetchList ?? false,
        }
    );

    const listDatahubContact = [].concat(...(data?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord;
    const totalPage = data?.pages[0]?.data?.totalPage;
    
    return {
        // get List
        isLoading,
        refetchList,
        data: listDatahubContact,
        fetchNextPage,
        hasNextPage,
        totalRecord,
        totalPage,
        // create update remove
        createDatahubContactMutateAsync,
        updateDatahubContactMutateAsync,
        removeManyDatahubContactMutateAsync,
        // get Info
        infoDatahubContact,
        refetchInfo
    };
};