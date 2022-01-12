import { useInfiniteQuery, useQuery } from "react-query";
import { ContractIncome } from "typings/contractIncome";
import ContractIncomeRepository from 'apis/contractIncome';
import HumanRepository from 'apis/human';

type UseContractIncomeProp = {
    listContractIncome: Array<ContractIncome>;
    isLoading: boolean;
    fetchNextPage: () => void,
    fetchPreviousPage: () => void,
    totalRecord: number | undefined,
    totalPage: number | undefined,
    hasNextPage: boolean | undefined
};

export const UseContractIncomeList = (pageParam = '', limit = 10): any => {
  
    // const {
    //     status,
    //     data,
    //     error,
    //     isFetching,
    //     isFetchingNextPage,
    //     isFetchingPreviousPage,
    //     fetchNextPage,
    //     fetchPreviousPage,
    //     hasNextPage,
    //     hasPreviousPage
    //   } = useInfiniteQuery(
    //     "contractIncomeList",
    //       async ( { pageParam } : any) => {       
    //         return ContractIncomeRepository.fetchList({
    //             limit,
    //             lastestID: pageParam || "",
    //         })
    //     },
    //     {
    //       getPreviousPageParam: (firstPage, allPages) => {
            
    //         const prevPage = allPages.length >= 2 ? allPages[allPages.length-2].data.nextCursor : null;
    //         console.log('🚀 ~ UseContractIncomeList ~ allPages',allPages, prevPage)
    //         return prevPage;
    //       },
    //       getNextPageParam: ({ data }: any ) => {return data?.nextCursor || undefined;     },
    //     }
    //   );
      
    const {
      status,
      data,
      error,
    } = useQuery(
        ["contractIncomeList", {pageParam}],
        async ( pageParams : any) => {
          const [, { pageParam }] = pageParams.queryKey;          
          return ContractIncomeRepository.fetchList({
              limit,
              lastestID: pageParam || "",
          })
      },
      {keepPreviousData: true}
      );

        // const listContractIncome = []       
        // .concat(
        //     ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        // )
        // .filter(Boolean);
    // const dataResponse = data?.pages || [];
    // const listContractIncome = (dataResponse.length>=2 ? dataResponse[dataResponse.length-1] : dataResponse[0])?.data?.listRecords       
    // const totalRecord = data?.pages[0]?.data?.totalRecord;
    // const totalPage = data?.pages[0]?.data?.totalPage;
    // const isLoading = isFetching;
    
    const listContractIncome = data?.data?.listRecords
    const totalRecord = data?.data?.totalRecord
    const totalPage = data?.data?.totalPage
    const nextCursor = data?.data?.nextCursor
    
    return {
      listContractIncome,
      // isLoading,
      totalRecord,
      totalPage,
      nextCursor
      // hasNextPage,
      // fetchNextPage,
      // fetchPreviousPage
  }
};

export const useQueryListDoctype = ({ limit, type, keyword }: any): any => {
  const res = useInfiniteQuery(
      [`list_doctype,${type}.${keyword}`, type, keyword],
      async ({ pageParam }: any) =>
          // mai request BE check lại api này
          HumanRepository.fetchListDoctype({
              limit: limit || 10,
              lastestID: pageParam || "",
              type,
              keyword,
          }),
      {
          getNextPageParam: ({ data }: any) => {
              return data?.nextCursor || undefined;
          },
          refetchOnWindowFocus: false,
          enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
      }
  );
  const {
      isLoading,
      data,
      refetch: refetchListDoctype,
      fetchNextPage: fetchNextPageDoctype,
      hasNextPage
  } = res;

  const listDoctypes = []
      .concat(
          ...(data?.pages || []).map((d: any) => d.data?.listRecords)
      )
      .filter(Boolean);
  const totalRecord = data?.pages[0]?.data?.totalRecord;
  const totalPages = data?.pages[0]?.data?.totalPages;

  return {
      loading: isLoading,
      listDoctypes,
      totalRecord,
      totalPages,
      hasNextPage,
      refetchListDoctype,
      fetchNextPageDoctype
  }
}