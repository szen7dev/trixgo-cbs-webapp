// MỤC ĐÍCH: TƯƠNG TÁC VỚI DB
import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import packageRepository  from 'apis/document/Package';

export const useDocumentPackage = (params: any, isFetchList?: boolean, isFetchInfo?: boolean ): any => {
    
    // Tạo package
    const { mutateAsync: createDocumentPackageMutateAsync, isLoading: isLoadingCreateDocumentPackage } =
        useMutation((payload: any) => packageRepository.insertPackage(payload)
    );

    // Sửa package
    const { mutateAsync: updateDocumentPackageMutateAsync, isLoading: isLoadingUpdateDocumentPackage } =
        useMutation((payload: any) =>packageRepository.updatePackage(payload)
    );

    // Xoá package
    const { mutateAsync: removeManyDocumentPackage, isLoading: isLoadingRemoveManyDocumentPackage } =
        useMutation((payload: any) => packageRepository.removeManyPackage(payload)
    );

    // info package 
    const { data: infoPackage, refetch: refetchInfoPackage } = 
    useQuery(`document_package_info.${params}`, () => packageRepository.infoPackage(params), {
        enabled: isFetchInfo ?? false,
        refetchOnWindowFocus: false,
    });
    
    // Danh sách package
    const { isLoading, refetch, data, fetchNextPage, hasNextPage } =
        useInfiniteQuery(
            [`list_document_package`, params],
            async ({ pageParam }: any) => {
                return packageRepository.listPackage({
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

    const listDocumentPackage = [].concat(...(data?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord;
    const totalPage = data?.pages[0]?.data?.totalPage;
    
    return {
        // get List
        isLoading,
        refetch,
        data: listDocumentPackage,
        fetchNextPage,
        hasNextPage,
        totalRecord,
        totalPage,
        // create update remove
        createDocumentPackageMutateAsync,
        updateDocumentPackageMutateAsync,
        removeManyDocumentPackage,
        // get Info
        infoPackage,
        refetchInfoPackage
    };
};