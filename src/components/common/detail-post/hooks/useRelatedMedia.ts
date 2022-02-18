import SocialRepository from "apis/social";
import { useInfiniteQuery } from "react-query";

interface Params {
  mediaID: string;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useRelatedMedia = ({ mediaID }: Params) => {
  return useInfiniteQuery(
    // https://react-query.tanstack.com/reference/useInfiniteQuery
    "list_medias",
    async ({ pageParam }) =>
      SocialRepository.listMedias({
        lastestID: pageParam ? pageParam : "",
        mediaID,
      }),
    {
      getNextPageParam: (params: any) => {
        const nextCursor = params?.data?.nextCursor;
        return nextCursor || undefined;
      },
      refetchOnWindowFocus: false,
      enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
    }
  );
};

export default useRelatedMedia;
