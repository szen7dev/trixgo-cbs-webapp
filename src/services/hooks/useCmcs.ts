// useInfiniteQuery-List mẩu tin
// useMutation-Thêm sửa xóa mẩu tin
// FetchNextPageOptions-Kiểu dữ liệu
import { FetchNextPageOptions, useInfiniteQuery, useMutation } from "react-query";

// Khai báo đối tượng để hứng giá trị từ API
import ContractRepository from "apis/item/contract";

// Định nghĩa kiểu dữ liệu
import { ContractProps, ListContractsPayload } from "typings/cmcs";

// Định nghĩa cấu trúc dữ liệu trả về
type UseCmcs = {
    listContracts: Array<ContractProps>,
    isLoadingListContracts: boolean, // Là 1 biến để kiểm soát trạng thái loading data
    refetchListContracts: () => void, // Làm mới lại danh sách dữ liệu
    nextPageListContracts: () => void, // Dữ liệu trang tiếp theo
    prevPageListContracts: () => void, // Dữ liệu trang trước
    totalRecord: number, // Tổng số mẩu tin (theo phân trang con trỏ)
    totalPages: number | undefined, // Tổng số trang (sau không dùng)
    hasNextPage: boolean | undefined // Kiểm tra còn trang tiếp theo hay không
};

// Export ra để sử dụng
export const useCmcs = (params?: ListContractsPayload) : UseCmcs => {

    // Get danh sách
    const {
        isLoading: isLoadingListContracts,
        refetch: refetchListContracts,
        data: dataReturnFromAPI, // dataListContracts
        fetchNextPage: nextPageListContracts,
        fetchPreviousPage: prevPageListContracts,
        hasNextPage: hasNextPage
    } =
        useInfiniteQuery(
            ["list_contacts", params?.keyword], 
            async ({ pageParams }: any) => 
            ContractRepository.getListContract({ 
                lastestID: pageParams ? pageParams : "",
                filter: JSON.stringify({ 
                    _id: 1,
                    name: 1,
                    sign: 1,
                    company: 1,
                }),
                populates: JSON.stringify({
                    path: "project",
                    select: "company name sign",
                }),
                ...params
            }),
            {
                getNextPageParam: ({ nextCursor }: any) => {
                    return nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
            }
        );

    const listContracts = [].concat(...(dataReturnFromAPI?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecord = dataReturnFromAPI?.pages[0]?.data?.totalRecord || 0;
    const totalPages = dataReturnFromAPI?.pages[0]?.data?.totalPages;

    return {
        listContracts,
        isLoadingListContracts,
        refetchListContracts,
        nextPageListContracts,
        prevPageListContracts,
        totalRecord,
        totalPages,
        hasNextPage
    };
};