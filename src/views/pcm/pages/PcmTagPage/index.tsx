import { FC, useCallback, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import moment from "moment";
import { Loader } from "shareComponents/common";
import FakeUser from "assets/images/fake-user.png";
import { usePcmCommentGetListByProperty, usePcmPlanTaskGetListByProperty } from "services/hooks/pcm/usePcmDashboardV2";

const PcmTagPage: FC = () => {
	const { tab } = useParams<{ tab: string }>();

	const { isLoading, listDataProject, listDataProjectCompanyAuthor } = usePcmCommentGetListByProperty({
		option: 1,
		enabled: !tab || tab === "2",
		fromDate: tab === "2" ? "00:00" : "",
		toDate: tab === "2" ? "23:59" : "",
	});

	const { isLoading: isLoading2, listDataProject: listDataProject2, listDataProjectCompany } = usePcmPlanTaskGetListByProperty({
		option: tab === "3" ? 1 : 2,
		enabled: tab === "3" || tab === "4",
	});

	const getListDataProjectCompany = useCallback((id: string) => {
		const data = listDataProjectCompanyAuthor.filter((item: any) => item._id?.project === id);
		return data;
	}, [listDataProject, listDataProjectCompanyAuthor]);

	const getListDataProjectCompany2 = useCallback((id: string) => {
		const data = listDataProjectCompany.filter((item: any) => item._id?.project === id);
		return data;
	}, [listDataProject, listDataProjectCompany]);

	return (
		<main className="h-full overflow-auto">
			{(isLoading || isLoading2) && <Loader className="border-primary" />}
			<div className={"filter-bar flex flex-wrap px-4 py-2 header-table flex px-4 w-full top-0 bg-white pb-4"}>
				<Link to={"/pcm/tags"}>
					<button
						className={
							"py-1 px-6 mr-2 rounded-full border border-primary-border " +
							(!tab
								? "text-white bg-cbs-secondary border-none"
								: "text-primary-gray bg-white")
						}
					>
						Tất cả hoạt động
					</button>
				</Link>
				<Link to={"/pcm/tags/2"}>
					<button
						className={
							"py-1 px-6 mr-2 rounded-full border border-primary-border " +
							(tab === "2"
								? "text-white bg-cbs-secondary border-none"
								: "text-primary-gray bg-white")
						}
					>
						Hoạt động ngày nay
					</button>
				</Link>
				<Link to={"/pcm/tags/3"}>
					<button
						className={
							"py-1 px-6 mr-2 rounded-full border border-primary-border " +
							(tab === "3"
								? "text-white bg-cbs-secondary border-none"
								: "text-primary-gray bg-white")
						}
					>
						Đơn vị tạo việc
					</button>
				</Link>
				<Link to={"/pcm/tags/4"}>
					<button
						className={
							"py-1 px-6 mr-2 rounded-full border border-primary-border " +
							(tab === "4"
								? "text-white bg-cbs-secondary border-none"
								: "text-primary-gray bg-white")
						}
					>
						Đơn vị thực hiện
					</button>
				</Link>
			</div>

			{(!tab || tab === "2" ? listDataProject : listDataProject2).map((item: any, index: number) => {
				const listDataProjectCompany = !tab || tab === "2" ? getListDataProjectCompany(item?._id?.project?._id) : getListDataProjectCompany2(item?._id?.project?._id);
				return (
					<div className="gap-7" key={index}>
						<div className="px-4 mb-4">
							<p className="text-lg text-primary-gray mb-2">
								{item._id?.project?.sign}.{item._id?.project?.name} ({item?.amount})
							</p>
							<div className="gap-3">
								{(listDataProjectCompany || []).map((item: any, index: number) => (
									<div className="flex rounded-lg py-1" key={index}>
										<img
											src={item._id?.companyOfAuthor?.image ? `${process.env.REACT_APP_URL_S3_COMPANY}/${item._id?.companyOfAuthor?.image}` : FakeUser}
											alt="User"
											className="w-[60px] h-[60px] rounded-full mr-2"
										/>
										<div className="ml-2">
											<p className="text-[15px]">{item._id?.companyOfAuthor?.sign}.{item._id?.companyOfAuthor?.name}</p>
											<p className="text-primary-gray">{item.amount || 0} thông báo</p>
										</div>
									</div>
								))
								}
							</div>
						</div>
					</div>
				)
			})
			}
		</main>
	);
};

export default PcmTagPage