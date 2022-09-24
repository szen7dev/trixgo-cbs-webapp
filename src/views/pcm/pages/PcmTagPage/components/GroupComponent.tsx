import { FC, useCallback } from "react";
import { Link } from "react-router-dom";
import FakeUser from "assets/images/fake-user.png";

type Props = {
    tab: string,
    listDataProject: any,
    listDataProject2: any,
    listDataProjectCompanyAuthor: any,
    listDataProjectCompany: any,
}

const GroupComponent: FC<Props> = ({
    tab,
    listDataProject,
    listDataProject2,
    listDataProjectCompanyAuthor,
    listDataProjectCompany
}) => {

    const getListDataProjectCompany = useCallback((id: string) => {
        const data = listDataProjectCompanyAuthor.filter((item: any) => item._id?.project === id);
        return data;
    }, [listDataProject, listDataProjectCompanyAuthor]);

    const getListDataProjectCompany2 = useCallback((id: string) => {
        const data = listDataProjectCompany.filter((item: any) => item._id?.project === id);
        return data;
    }, [listDataProject, listDataProjectCompany]);

    return (
        <div className="h-full overflow-auto">
            {(!tab || tab === "1" || tab === "2" ? listDataProject : listDataProject2).map((item: any, index: number) => {
                const listDataProjectCompany = !tab || tab === "1" || tab === "2" ? getListDataProjectCompany(item?._id?.project?._id) : getListDataProjectCompany2(item?._id?.project?._id);
                return (
                    <div className="gap-7" key={index}>
                        <div className="px-4 mb-4">
                            {(!tab || tab === "1" || tab === "2") ?
                                <Link to={`/pcm/tags/project/${item._id?.project?._id}`} key={index}>
                                    <p className="text-lg text-primary-gray mb-2">
                                        {item._id?.project?.sign}.{item._id?.project?.name} ({item?.amount})
                                    </p>
                                </Link> :
                                <p className="text-lg text-primary-gray mb-2">
                                    {item._id?.project?.sign}.{item._id?.project?.name} ({item?.amount})
                                </p>
                            }
                            {tab !== "4" ?
                                <div className="gap-3">
                                    {(listDataProjectCompany || []).map((item2: any, index: number) => (
                                        <Link to={(!tab || tab === "1" || tab === "2") ? `/pcm/tags/project/${item._id?.project?._id}/company/${item2._id?.companyOfAuthor?._id}` : `/pcm/tags/3/${item._id?.project?._id}/${item2._id?.companyOfAuthor?._id}`} key={index}>
                                            <div className="flex rounded-lg py-1">
                                                <img
                                                    src={
                                                        item2._id?.companyOfAuthor?.image ? `${process.env.REACT_APP_URL_S3_COMPANY}/${item2._id?.companyOfAuthor?.image}` : FakeUser}
                                                    alt="User"
                                                    className="w-[48px] h-[48px] rounded-full mr-2"
                                                />
                                                <div className="ml-2">
                                                    <p className="text-[15px]">{item2._id?.companyOfAuthor?.sign}.{item2._id?.companyOfAuthor?.name}</p>
                                                    <p className="text-primary-gray">{item2.amount || 0} {!tab || tab === "1" || tab === "2" ? "thông báo" : "công việc"}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                    }
                                </div> :
                                <div className="gap-3">
                                    {(listDataProjectCompany || []).map((item2: any, index: number) => (
                                        <Link to={`/pcm/tags/4/${item._id?.project?._id}/${item2._id?.companyOfAssignee?._id}`} key={index}>
                                            <div className="flex rounded-lg py-1">
                                                <img
                                                    src={
                                                        item2._id?.companyOfAssignee?.image ? `${process.env.REACT_APP_URL_S3_COMPANY}/${item2._id?.companyOfAssignee?.image}` : FakeUser}
                                                    alt="User"
                                                    className="w-[48px] h-[48px] rounded-full mr-2"
                                                />
                                                <div className="ml-2">
                                                    <p className="text-[15px]">{item2._id?.companyOfAssignee?.sign}.{item2._id?.companyOfAssignee?.name}</p>
                                                    <p className="text-primary-gray">{item2.amount || 0} công việc</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                    }
                                </div>
                            }
                        </div>
                    </div>
                )
            })
            }
        </div>
    );
};

export default GroupComponent;