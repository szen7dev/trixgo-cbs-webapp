import { useQuery } from "react-query";
import { DepartmentsRepository } from "apis/ppt";

type NewType = {
  loading: boolean;
  data: DepartmentsAnalysisData | undefined;
  refetch: () => void;
};
type InputProps = {
  onSuccess?: ((data: DepartmentResponse<DepartmentsAnalysisData>) => void) | undefined;
};

export function useQueryDepartmentsAnalysis(props: InputProps = {}): NewType {
  const { isLoading, data, refetch } = useQuery(
    ["document.analysis"],
    DepartmentsRepository.getDepartmentsAnalysis,
    {
      refetchOnWindowFocus: false,
      enabled: true,
      onSuccess: props.onSuccess,
    }
  );

  return {
    loading: isLoading,
    data: data?.data,
    refetch,
    // hasNextPage,
    // fetchNextPage,
    // fetchPreviousPage,
  };
}
