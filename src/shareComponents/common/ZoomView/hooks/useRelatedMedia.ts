import MediaRepository from "apis/media";
import { useInfiniteQuery } from "react-query";

interface Params {
  mediaID: string;
}
const useRelatedMedia = ({ mediaID }: Params) => {
  return useInfiniteQuery(
    "list_medias",
    async ({ pageParam }) =>
      MediaRepository.listMedias({
        lastestID: pageParam ? pageParam : "",
        mediaID,
      }),
    {
      getNextPageParam: (params: any) => {
        const nextCursor = params?.data?.nextCursor;
        return nextCursor || undefined;
      },
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );
};

export default useRelatedMedia;
