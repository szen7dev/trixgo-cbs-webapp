# QUY CHUẨN CÁCH CALL API THEO REACT-QUERY 
https://react-query.tanstack.com/

## useQuery
useQuery dùng trong trường hợp cần call API dạng object trong quá trình mounting. 
Ví dụ lấy thông tin của user, cấu hình dữ liệu của dự án v.v...

Example: useAuth

```shell
 const { data, isLoading, isError, status, error, refetch } =
    useQuery("user_info", () => AuthenticationRepository.usersInfo());
```
## useInfiniteQuery - https://react-query.tanstack.com/reference/useInfiniteQuery
useInfiniteQuery dùng trong trường hợp cần call API dạng danh sách trong quá trình mounting. 
Ví dụ lấy danh sách bạn bè, danh sách dự án, công việc v.v...

Example: useSocial

```shell
  const {isLoading, refetch, data, fetchNextPage, fetchPreviousPage } =
        useInfiniteQuery(                                                   
            "list_medias",
            async ({ pageParams }: any) => SocialRepository.listMedias({ lastestID: pageParams ? pageParams: "" }),
            {
                getNextPageParam: ({ nextCursor }: any) => {
                    return nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: true,
            }
        );
```
## useMutation
useMutation dùng trong trường hợp cần call API trong quá trình updating
Ví dụ call API trong trường hợp cần người dùng bấm nút đăng nhập, hoặc tạo form v.v...

Example: useAuth
```shell
 const { mutateAsync, isLoading, reset, isSuccess, status } =
    useMutation((payload: SignInPayload) =>
      AuthenticationRepository.signIn(payload)
    );
```
