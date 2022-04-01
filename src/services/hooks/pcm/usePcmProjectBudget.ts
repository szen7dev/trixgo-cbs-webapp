// MỤC ĐÍCH: TƯƠNG TÁC VỚI DB
import { useInfiniteQuery, useMutation } from "react-query";
import { ContractRepository } from 'apis/item';

export const usePcmProjectBudget = (params: any): any => {
    // Create
    const { mutateAsync: createContractMutateAsync } =
        useMutation((payload: any) =>
        ContractRepository.insertContract(payload)
    );

    // Update
    const { mutateAsync: updateContracttMutateAsync } =
        useMutation((payload: any) =>
        ContractRepository.updateContract(payload)
        );

    // Get list
    const {
        isLoading,
        refetch,
        data,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery([`project_budget`, params], async (pageParam: any) => {
            return ContractRepository.getListContract({
                lastestID: pageParam?.pageParam ? pageParam?.pageParam : "",
                select: "name sign startTime expiredTime milestones completedMilestones members type budget vatBudget forecastBudget vatForecastBudget contractValue contractVatValue contractPlus contractVatPlus contractAdvancePaymentPaid contractAmountPaid",
                limit: 20,
                ...params
            })
        },
        {
            getNextPageParam: ({ data }) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: true,
        }
    );
    
    const listPcmProjectBudget = [].concat(...(data?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord;
    const totalPage = data?.pages[0]?.data?.totalPage;

    return {
        createContractMutateAsync,
        updateContracttMutateAsync,
        isLoading,
        listPcmProjectBudget,
        totalRecord,
        totalPage,
        fetchNextPage,
        hasNextPage,
        refetch
    };
};