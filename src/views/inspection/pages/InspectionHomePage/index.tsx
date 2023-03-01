/*=====1.LIBRARY=====*/
import React, { FC, Fragment, useEffect, useState, UIEvent } from "react";
import moment from "moment";
import SwiperCore, { Pagination } from 'swiper';
import cn from "classnames";
import { useAppSelector } from "redux/reducer";
import parse from "html-react-parser";

/*=====2.CSS=====*/
import styles from "views/human/styles/style.module.css";
import 'swiper/swiper-bundle.min.css';
import { generatePath, Link, useRouteMatch } from "react-router-dom";
import { FilterNav } from "./filterNav";

/*=====3.ICONS=====*/
import userIcon from "assets/images/icon-user-avatar.svg";
import taskUserAvt from "assets/images/task-user.svg";
import iconChat from "assets/images/icons8-chat-96 1.svg";
import iconTrash from "assets/images/icons8-delete-96 1.svg";
/*=====4.PAGES/COMPONENTS=====*/

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import {
	useListCheckList,
	// useListResponseFromSearch,
	// usePcmPlanTaskNotification,
} from "services/hooks/inspection/useInspection";
import { useQueryListDepartmentsIsMember } from "services/hooks/items/useDepartment";
import { Popover } from "@mui/material";

/*=====7.OTHER=====*/
SwiperCore.use([Pagination]);

export const InspectionHomePage: FC = () => {
	const {
		isLoading,
		listData,
		listDataForWithPager,
		totalRecord,
		totalPage,
		fetchNextPage,
		hasNextPage,
		refetch,
		isFetching,
	} = useListCheckList({});
	console.log("listDataForWithPager", listDataForWithPager);
	const [pageIndex, setPageIndex] = useState(0);
	useEffect(() => {
		document.title = "Note"
	}, []);
	// const match = useRouteMatch<{ id: string }>();

	// trạng thái
	// const getStateTime = () => {
	//     const now = new Date().getTime();
	//     const expiredTime = new Date(listDataForWithPager.item.expiredTime).getTime();
	//     if (expiredTime - now <= 604800000 && expiredTime - now > 0) {
	//         return {
	//             label: "Tuần tới",
	//             background: "bg-cbs-schedule-nextweek"
	//         }
	//     }
	//     if (expiredTime - now <= 0) {
	//         return {
	//             label: "Quá hạn",
	//             background: "bg-cbs-schedule-expired"
	//         }
	//     }
	//     return {
	//         label: ">7 ngày tiếp theo",
	//         background: "bg-cbs-schedule-after-7days"
	//     }
	// };
	// const timeState = getStateTime();

	// popover
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handlePopoverClose = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);

	return (
		<FilterNav>
			<div className={cn(styles.content)}>
				<div className="overflow-auto px-4 pb-4 h-screen">
					{(listDataForWithPager[pageIndex] ?? []).map(
						(item: any, index: number) => {
							return (
								<div key={index} className="w-full border-b-0.5 border-cbs-border pb-3">
									<div className="pt-2 pb-3">
										<Link to={"/inspection/home/" + item._id} className="hover:text-cbs-primary font-bold">
											{item.project.sign}.{item.name}
										</Link>
										<p className="text-cbs-subtext">
											<i>Khởi tạo: {item.author.fullname} {moment(item.createAt).format("HH:mm DD/MM/YYYY")}</i>
										</p>
									</div>
									<div className="flex justify-between items-start">
										<div className="flex w-[350px]">
											{/* trạng thái */}
											{/* <div className={"px-3 py-1 text-white" + timeState.background}>
												Quá hạn
												{timeState.label}
											</div> */}
											{/* {(item.area.name ?? []).map(
												(item: any, index: number) => {
													return ( */}
											<div key={index} className="ml-3">
												<svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-4 h-4 rotate-90 text-cbs-schedule-after-7days" viewBox="0 0 448 512" fill="currentColor" stroke="currentColor">
													<path d="M48 32H197.5C214.5 32 230.7 38.74 242.7 50.75L418.7 226.7C443.7 251.7 443.7 292.3 418.7 317.3L285.3 450.7C260.3 475.7 219.7 475.7 194.7 450.7L18.75 274.7C6.743 262.7 0 246.5 0 229.5V80C0 53.49 21.49 32 48 32L48 32zM112 176C129.7 176 144 161.7 144 144C144 126.3 129.7 112 112 112C94.33 112 80 126.3 80 144C80 161.7 94.33 176 112 176z" />
												</svg>
												<span className="ml-1 text-cbs-subtext"><i>{item.area.name}</i></span>
											</div>
											{/* )
												}
											)} */}
										</div>
										<div className="">
											<div className="flex gap-1 text-primary-gray">Thực hiện:
												<img
													src={`${process.env.REACT_APP_URL_S3_USER}/${item.assignee.image}`}
													alt="avatar"
													className="w-5 h-5 rounded-full"
													aria-owns={open ? "mouse-over-popover" : undefined}
													aria-haspopup="true"
													onMouseEnter={handlePopoverOpen}
													onMouseLeave={handlePopoverClose}
												/>
												<span className="text-black">{item.assignee.fullname}</span>
											</div>
										</div>
										<div className="">
											<span className="text-primart-gray">
												Thời hạn:
												<span className="text-black">
													{moment(item.expiredTime).format("DD/MM/YYYY")}
												</span>
											</span>

										</div>
										<div className=" text-primary">
											Đang triển khai
										</div>
									</div>
									{/* comment */}
									{item?.lastComment?._id ?
										<div className="flex justify-between ">
											<div>
												<div>
													<img src={item.lastComment.author.image} alt="avatar"
														aria-owns={open ? "mouse-over-popover" : undefined}
														aria-haspopup="true"
														onMouseEnter={handlePopoverOpen}
														onMouseLeave={handlePopoverClose}
													/>
													<span className=" font-bold text-black">
														{item.lastComment.author.fullname}
													</span>
												</div>
												<div className="truncate w-[300p]">
													{item.lastComment.author.content}
												</div>
											</div>
											{/* <div className="pt-2 pb-3">CHG.THT.001</div> */}
											<div>
												<span className="font-bold">{item.lastComment.createAt}</span>
											</div>
										</div> : <></>
									}
								</div>
							);
						}
					)}
				</div>
			</div>
			{/* popover */}
			<Popover
				id="mouse-over-popover"
				sx={{
					pointerEvents: "none"
				}}
				open={open}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right"
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left"
				}}
				PaperProps={{ onMouseEnter: handlePopoverOpen, onMouseLeave: handlePopoverClose }}
			>
				<div className="w-350">
					<div>
						<div className="border-b-0.5 border-cbs-border	 flex gap-5 p-3 ">
							<div>
								<img alt={"----"} src={taskUserAvt} className={" rounded-full overflow-hidden h-[60px] w-[60px] min-h-[36px] min-w-[36px] max-h-[60px] max-w-[60px] mx-1"}
								/>
							</div>
							<div>
								<div className="text-lg	">Nguyễn Văn Quang-TRX</div>
								<div className="text-primary-gray">quangnv@trx.com</div>
								<div className="text-primary-gray">0988226333</div>
							</div>
						</div>
						<div className="flex py-2 px-3 items-center	justify-between	">
							<div className="text-cbs-primary bg-cbs-sub-primary rounded p-3">Giám đốc Ban QLDA</div>
							<div className="flex gap-2 items-center	">
								<a href=""><img src={iconChat} alt="" /></a>
								<a href=""><img src={iconTrash} alt="" /></a>
							</div>
						</div>
					</div>
				</div>
			</Popover>
		</FilterNav>
	);
};
export const showTime = (time: any) => {
	const toDay = new Date();
	const timeDay = new Date(time);
	if (
		toDay.getDate() === timeDay.getDate() &&
		toDay.getMonth() === timeDay.getMonth()
	) {
		return moment(time).format("HH:mm");
	} else {
		return moment(time).format("DD/MM/YYYY");
	}
};
export const subContentHtml = (html?: string) => {
	const removeHtmlTag = parse(
		(html || "").replace(/<[^>]*>?/gm, " ")
	).toString();

	const result =
		removeHtmlTag.length > 150
			? `${removeHtmlTag.slice(0, 150)}...`
			: removeHtmlTag;
	return result;
};
