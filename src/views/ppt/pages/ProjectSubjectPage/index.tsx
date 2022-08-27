import React, { FC, useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';

// Hook
import useCheckedList from 'services/hooks/ppt/useCheckedList';
import { useQueryListCompanyOfAssigneeAndAmountTask } from "services/hooks/pcm/useStatistical";

import {SearchInput, GroupActions, ButtonMore, DropdownSearchableV2} from "shareComponents/common";
import TimeRangeDropdown from "shareComponents/common/TimeRangeDropdown";
// import DropdownFilterButton from "views/pages/document/components/DocumentFilterButton";
import ModalInformation from "./components/ModalInformation";
import CaretDownIcon from "assets/images/icon-caret-down.png";
import debounce from "lodash/debounce";
import userIcon from "assets/images/icon-user-avatar.svg";
import maleUserIcon from "assets/images/icons8-male-user-64.svg";
import TriangleDown from "assets/icons/TriangleDown";
import timelineIcon from "assets/images/icons8-timeline-week-48.svg";
import projectIcon from "assets/images/icons8-project-50.svg";
import timeTableIcon from "assets/images/icons8-timetable-48.svg";
import categoryIcon from "assets/images/icons8-category-48.svg";
import downloadIcon from "assets/images/icons8-download-96.svg";
import sendMailIcon from "assets/images/icons8-send-email-96.svg";
import nextIcon from "assets/images/icons-arrow-next.svg";

const ProjectSubjectPage: FC = () => {
	const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
	const [data, setData] = useState<{ id: number, [key: string]: any }[]>([])
	const [dataCompany, setDataCompany] = useState([]);
	const [companyPopup, setCompanyPopup] = useState();
	const [typeStatusPopup, setTypeStatusPopup] = useState();
	const [totalTaskOverdueWork, setTotalTaskOverdueWork] = useState();
	const [totalTaskNextWeekWork, setTotalTaskNextWeekWork] = useState();
	const [totalTaskMoreThan7Days, setTotalTaskMoreThan7Days] = useState();
	const [totalTaskFinish, setRotalTaskFinish] = useState();
	const { assigned, handleChangeCheckbox, handleCheckAll, checkboxRef } = useCheckedList(data)
	const { id: projectID } = useParams<{ id: string }>();
	const [keyword, setKeyword] = useState("");

	const { 
		listCompany,
        listCompanyAndTaskOverdueWork,
        listCompanyAndTaskNextWeekWork,
        listCompanyAndTaskMoreThan7Days,
		listCompanyAndTaskFinish,
        isLoading,
	} = useQueryListCompanyOfAssigneeAndAmountTask({
		projectID, keyword
	});
	
	useEffect(() => {
		// if(listCompany?.length && listCompanyAndTaskOverdueWork?.length && listCompanyAndTaskNextWeekWork?.length && listCompanyAndTaskMoreThan7Days?.length){
		if(listCompany?.length){
			let totalOverdueWorkAll: any = 0
			let totalNextWeekWorkAll: any = 0
			let totalMoreThan7DaysAll: any = 0
			let totalFinishAll: any = 0
			const data: any = listCompany.map((item: any)=> {
				const totalOverdueWork: any = listCompanyAndTaskOverdueWork.find((item1: any) => item1._id == item._id)
				const totalNextWeekWork: any = listCompanyAndTaskNextWeekWork.find((item1: any) => item1._id == item._id)
				const totalMoreThan7Days: any = listCompanyAndTaskMoreThan7Days.find((item1: any) => item1._id == item._id)
				const totalFinish: any = listCompanyAndTaskFinish.find((item1: any) => item1._id == item._id)
				// Tính tổng số lượng task
				totalOverdueWorkAll +=totalOverdueWork?.count || 0;
				totalNextWeekWorkAll+=totalNextWeekWork?.count || 0;
				totalMoreThan7DaysAll+=totalMoreThan7Days?.count || 0;
				totalFinishAll+=totalFinish?.count || 0;

				// Tính số phần trăm các việc của công ty
				const percent = totalOverdueWork?.count || 0 + totalNextWeekWork?.count || 0 + totalMoreThan7Days?.count || 0;
				const overdueWorkPercent = (totalOverdueWork?.count || 0/percent)*100 || 0;
				const nextWeekWorkPercent = (totalNextWeekWork?.count || 0/percent)*100 || 0;
				const moreThan7DaysPercent = (totalMoreThan7Days?.count || 0/percent)*100 || 0;
				return {
					...item,
					totalOverdueWork: totalOverdueWork?.count || 0,
					totalNextWeekWork: totalNextWeekWork?.count || 0,
					totalMoreThan7Days: totalMoreThan7Days?.count || 0,
					totalFinish: totalFinish?.count || 0,
					overdueWorkPercent,
					nextWeekWorkPercent,
					moreThan7DaysPercent
				}
			})
			setDataCompany(data);
			setTotalTaskOverdueWork(totalOverdueWorkAll)
			setTotalTaskNextWeekWork(totalNextWeekWorkAll)
			setTotalTaskMoreThan7Days(totalMoreThan7DaysAll)
			setRotalTaskFinish(totalFinishAll)
		}
	}, [listCompany, listCompanyAndTaskOverdueWork, listCompanyAndTaskNextWeekWork, listCompanyAndTaskMoreThan7Days]);

	useEffect(() => {
		document.title = "CHG.THT-Hồ sơ thanh toán"
		// setData(() => listCompany.map((company, index) => ({
		// 	id: index,
		// 	project: index % 2 ? "Thi công rà phá bom mìn, vật nổ" : 'Thi công ép cọc thí nghiệm, thí nghiệm cọc thí nghiệm và thi công ép cọc đại trà',
		// 	joined: 8,
		// 	worked: 15,
		// 	created_at: "15:30 22/12/2021",
		// 	updated_at: "15:30 22/12/2021",
		// 	status: index,
		// })));
	}, []);
	const toggleVisible = ({ company, typeStatus }: any) => {
		setVisibleDrawer(!visibleDrawer)
		setCompanyPopup(company)
		setTypeStatusPopup(typeStatus)
	};

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className={"sticky top-0 bg-white z-10"}>
				<div className={"filter-bar flex flex-wrap px-4 py-2"}>
					<DropdownSearchableV2
						className={"mr-4 border border-primary-border rounded-lg mb-2"}
						placeholder={"Người thực hiện"}
						showTriangle={true}
						isMultiple={true}
						renderSelectedItem={(item: any) => (
							<div
								className="flex items-center"
							>
								<img alt="Tag" src={userIcon} className="mr-1" />
								<p
									style={{
										textOverflow: "ellipsis",
										maxWidth: "100%",
										minWidth: 0,
										whiteSpace: "nowrap",
										overflow: "hidden",
										flex: "1 1 auto",
									}}
								>
									{item.text}
								</p>
							</div>
						)}
						data={[
							{"_id":"627205a5d9d18a0677e5d5b4","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"tutran01676378375van@gmail.com","fullname":"Trần Văn Tú-CDC","company":{"_id":"6046ade4b55525368b1091ac","name":"Công ty Cổ phần xây dựng CDC","sign":"CDC"},"bizfullname":"Trần Văn Tú-CDC","department":{"_id":"6046ade4b55525368b1091c8","name":"CÔNG TY","sign":"C177.CTY"},"position":{"_id":"61972dcfbc3b2e745ae3e382","name":"Cán bộ kỹ thuật"}},{"_id":"6272058ed9d18a0677e5d5b3","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":"2022-05-04T04:53:42.239Z","email":"lehuuthuan161098@gmail.com","fullname":"Lê Hữu Thuần-CDC","company":{"_id":"6046ade4b55525368b1091ac","name":"Công ty Cổ phần xây dựng CDC","sign":"CDC"},"bizfullname":"Lê Hữu Thuần-CDC","department":{"_id":"6046ade4b55525368b1091c8","name":"CÔNG TY","sign":"C177.CTY"},"position":{"_id":"6046ade5b55525368b10922c","name":"Cán bộ kỹ thuật"}},{"_id":"62720577d9d18a0677e5d5b2","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"themvv.econs@gmail.com","fullname":"Vũ Văn Thêm-CDC","company":{"_id":"6046ade4b55525368b1091ac","name":"Công ty Cổ phần xây dựng CDC","sign":"CDC"},"bizfullname":"Vũ Văn Thêm-CDC","department":{"_id":"6046ade4b55525368b1091c8","name":"CÔNG TY","sign":"C177.CTY"},"position":{"_id":"6046ade5b55525368b10922c","name":"Cán bộ kỹ thuật"}},{"_id":"6271f9ead9d18a0677e5d4dc","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"thanhnt.kythuat@gmail.com","fullname":"Nguyễn Tiến Thành-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Nguyễn Tiến Thành-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb6dd9d18a0677e5d51b","name":"Trạm biến áp"}},{"_id":"6271f9d8d9d18a0677e5d4db","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"nguyenbach.cdbk@gmail.com","fullname":"Nguyễn Văn Bách-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Nguyễn Văn Bách-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb69d9d18a0677e5d51a","name":"Thiết kế điều hòa"}},{"_id":"6271f9c7d9d18a0677e5d4da","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"hailv.plme@gmail.com","fullname":"Lê Văn Hải-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Lê Văn Hải-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb65d9d18a0677e5d519","name":"Thiết kế PCCC"}},{"_id":"6271f9b8d9d18a0677e5d4d9","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"anhpn0892@gmail.com","fullname":"Phạm Ngọc Anh-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Phạm Ngọc Anh-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb52d9d18a0677e5d515","name":"Thiết kế kiến trúc"}},{"_id":"6271f9a4d9d18a0677e5d4d8","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"hoatigon161@gmail.com","fullname":"Ngô Đức Tiến-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Ngô Đức Tiến-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb5dd9d18a0677e5d518","name":"Thiết điện, điện nhẹ"}},{"_id":"6271f991d9d18a0677e5d4d7","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"tranhong2647@gmail.com","fullname":"Trần Thị Hồng-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Trần Thị Hồng-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb5ad9d18a0677e5d517","name":"Thiết kế nước"}},{"_id":"6271f981d9d18a0677e5d4d6","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"nguyenthihang.11696@gmail.com","fullname":"Nguyễn Thị Hằng-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Nguyễn Thị Hằng-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb56d9d18a0677e5d516","name":"Dự toán"}}
						]}
						formatItem={{
							id: "_id",
							text: "fullname"
						}}
						renderItem={(item => (
							<div className={"flex"}>
								<div className={"w-[44px] h-[44px] flex items-center justify-center rounded-full bg-accent text-white text-2xl font-bold"}>
									{item.fullname.charAt(0)}
								</div>
								<div className={"flex-1 ml-2"}>
									<p className={"truncate"}>{item.fullname}</p>
									<p className={"text-primary-gray truncate"}>{item.email}</p>
								</div>
							</div>
						))}
						prefixIcon={<img className={"mr-2"} src={maleUserIcon} alt={"icon"}/>}
					/>
					<TimeRangeDropdown
						className={"mr-4 border border-primary-border rounded-lg mb-2 p-1 pl-2 "}
						placeholder={"Thời hạn"}
						iconBack={<TriangleDown/>}
						iconFront={<img src={timelineIcon} alt={"----"}/>}
						onValueChange={val => console.log(val)}
						options={[
							{
								text: "Tất cả",
								fromDate: "00/00/0000",
								toDate: "31/12/2999"
							},
							{
								text: "1 tuần tới",
								fromDate: "12/08/2022",
								toDate: "17/08/2022"
							},
							{
								text: "> 7 ngày tiếp theo",
								fromDate: "17/08/2022",
								toDate: "31/12/2999"
							}
						]}
					/>
					<DropdownSearchableV2
						className={"mr-4 border border-primary-border rounded-lg mb-2"}
						placeholder={"Người tạo"}
						showTriangle={true}
						isMultiple={true}
						renderSelectedItem={(item: any) => (
							<div
								className="flex items-center"
							>
								<img alt="Tag" src={userIcon} className="mr-1" />
								<p
									style={{
										textOverflow: "ellipsis",
										maxWidth: "100%",
										minWidth: 0,
										whiteSpace: "nowrap",
										overflow: "hidden",
										flex: "1 1 auto",
									}}
								>
									{item.text}
								</p>
							</div>
						)}
						data={[
							{"_id":"627205a5d9d18a0677e5d5b4","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"tutran01676378375van@gmail.com","fullname":"Trần Văn Tú-CDC","company":{"_id":"6046ade4b55525368b1091ac","name":"Công ty Cổ phần xây dựng CDC","sign":"CDC"},"bizfullname":"Trần Văn Tú-CDC","department":{"_id":"6046ade4b55525368b1091c8","name":"CÔNG TY","sign":"C177.CTY"},"position":{"_id":"61972dcfbc3b2e745ae3e382","name":"Cán bộ kỹ thuật"}},{"_id":"6272058ed9d18a0677e5d5b3","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":"2022-05-04T04:53:42.239Z","email":"lehuuthuan161098@gmail.com","fullname":"Lê Hữu Thuần-CDC","company":{"_id":"6046ade4b55525368b1091ac","name":"Công ty Cổ phần xây dựng CDC","sign":"CDC"},"bizfullname":"Lê Hữu Thuần-CDC","department":{"_id":"6046ade4b55525368b1091c8","name":"CÔNG TY","sign":"C177.CTY"},"position":{"_id":"6046ade5b55525368b10922c","name":"Cán bộ kỹ thuật"}},{"_id":"62720577d9d18a0677e5d5b2","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"themvv.econs@gmail.com","fullname":"Vũ Văn Thêm-CDC","company":{"_id":"6046ade4b55525368b1091ac","name":"Công ty Cổ phần xây dựng CDC","sign":"CDC"},"bizfullname":"Vũ Văn Thêm-CDC","department":{"_id":"6046ade4b55525368b1091c8","name":"CÔNG TY","sign":"C177.CTY"},"position":{"_id":"6046ade5b55525368b10922c","name":"Cán bộ kỹ thuật"}},{"_id":"6271f9ead9d18a0677e5d4dc","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"thanhnt.kythuat@gmail.com","fullname":"Nguyễn Tiến Thành-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Nguyễn Tiến Thành-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb6dd9d18a0677e5d51b","name":"Trạm biến áp"}},{"_id":"6271f9d8d9d18a0677e5d4db","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"nguyenbach.cdbk@gmail.com","fullname":"Nguyễn Văn Bách-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Nguyễn Văn Bách-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb69d9d18a0677e5d51a","name":"Thiết kế điều hòa"}},{"_id":"6271f9c7d9d18a0677e5d4da","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"hailv.plme@gmail.com","fullname":"Lê Văn Hải-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Lê Văn Hải-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb65d9d18a0677e5d519","name":"Thiết kế PCCC"}},{"_id":"6271f9b8d9d18a0677e5d4d9","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"anhpn0892@gmail.com","fullname":"Phạm Ngọc Anh-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Phạm Ngọc Anh-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb52d9d18a0677e5d515","name":"Thiết kế kiến trúc"}},{"_id":"6271f9a4d9d18a0677e5d4d8","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"hoatigon161@gmail.com","fullname":"Ngô Đức Tiến-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Ngô Đức Tiến-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb5dd9d18a0677e5d518","name":"Thiết điện, điện nhẹ"}},{"_id":"6271f991d9d18a0677e5d4d7","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"tranhong2647@gmail.com","fullname":"Trần Thị Hồng-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Trần Thị Hồng-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb5ad9d18a0677e5d517","name":"Thiết kế nước"}},{"_id":"6271f981d9d18a0677e5d4d6","image":"user_default.png","status":1,"level":1,"numLog":0,"lastLog":null,"email":"nguyenthihang.11696@gmail.com","fullname":"Nguyễn Thị Hằng-CTECH","company":{"_id":"6046b087b55525368b110142","name":"Công ty Cổ phần Tư vấn và Đầu tư Hà Nội","sign":"CTECH"},"bizfullname":"Nguyễn Thị Hằng-CTECH","department":{"_id":"6046b087b55525368b110151","name":"CÔNG TY","sign":"C386.CTY"},"position":{"_id":"6271fb56d9d18a0677e5d516","name":"Dự toán"}}
						]}
						formatItem={{
							id: "_id",
							text: "fullname"
						}}
						renderItem={(item => (
							<div className={"flex"}>
								<div className={"w-[44px] h-[44px] flex items-center justify-center rounded-full bg-accent text-white text-2xl font-bold"}>
									{item.fullname.charAt(0)}
								</div>
								<div className={"flex-1 ml-2"}>
									<p className={"truncate"}>{item.fullname}</p>
									<p className={"text-primary-gray truncate"}>{item.email}</p>
								</div>
							</div>
						))}
						prefixIcon={<img className={"mr-2"} src={maleUserIcon} alt={"icon"}/>}
					/>
					<DropdownSearchableV2
						className={"mr-4 border border-primary-border rounded-lg mb-2"}
						placeholder={"Dự án"}
						prefixIcon={<img className={"mr-2"} src={projectIcon} alt={"icon"}/>}
						isMultiple={true}
						data={[
							{
								id: 1,
								text: "CHG.THT.Trường tiểu học và trung học cơ sở Tây hồ tây"
							},
							{
								id: 2,
								text: "CHG.THT.Trường tiểu học và trung học cơ sở Tây hồ tây"
							},
							{
								id: 3,
								text: "CHG.THT.Trường tiểu học và trung học cơ sở Tây hồ tây"
							},
							{
								id: 4,
								text: "CHG.THT.Trường tiểu học và trung học cơ sở Tây hồ tây"
							},
							{
								id: 5,
								text: "CHG.THT.Trường tiểu học và trung học cơ sở Tây hồ tây"
							},
							{
								id: 6,
								text: "CHG.THT.Trường tiểu học và trung học cơ sở Tây hồ tây"
							},
						]}
					/>
					<DropdownSearchableV2
						className={"mr-4 border border-primary-border rounded-lg mb-2"}
						placeholder={"Quá hạn"}
						prefixIcon={<img className={"mr-2"} src={timeTableIcon} alt={"icon"}/>}
						disableSearch={true}
						data={[
							{
								id: 1,
								text: "Tất cả"
							},
							{
								id: 2,
								text: "Đã quá hạn"
							},
							{
								id: 3,
								text: "Chưa quá hạn"
							},
						]}
					/>
					<DropdownSearchableV2
						className={"mr-4 border border-primary-border rounded-lg mb-2"}
						placeholder={"Trạng thái"}
						prefixIcon={<img className={"mr-2"} src={categoryIcon} alt={"icon"}/>}
						isMultiple={true}
						disableSearch={true}
						data={[
							{
								id: 1,
								text: "Khởi tạo, sắp triển khai"
							},
							{
								id: 2,
								text: "Đang triển khai"
							},
							{
								id: 3,
								text: "Hoàn thành"
							},
							{
								id: 4,
								text: "Treo lại"
							},
							{
								id: 5,
								text: "Chờ người khác giải quyết"
							},
							{
								id: 6,
								text: "Tiếp tục theo dõi"
							},
						]}
					/>
					<DropdownSearchableV2
						className={"mr-4 border border-primary-border rounded-lg mb-2"}
						placeholder={"Phân loại"}
						prefixIcon={<img className={"mr-2"} src={categoryIcon} alt={"icon"}/>}
						isMultiple={true}
						disableSearch={true}
						data={[
							{
								id: 1,
								text: "Việc thông thường"
							},
							{
								id: 2,
								text: "Yêu cầu thông tin"
							},
							{
								id: 3,
								text: "Yêu cầu phê duyệt"
							},
							{
								id: 4,
								text: "Thanh toán"
							},
							{
								id: 5,
								text: "Lựa chọn nhà thầu"
							},
						]}
					/>
				</div>
				<div className={"header-table flex px-4 w-full top-0 bg-white pb-4"}>
					<button
						className={"py-1 border-b-2 border-primary text-primary "}>
						Theo đơn vị thực hiện
					</button>
					<button
						className={"py-1 mx-4 mr-6 text-primary-gray "}>
						Theo tính chất công việc
					</button>
					<button className={"flex items-center justify-center mx-3"}>
						<img src={downloadIcon} alt={"-----"}/>
					</button>
					<button className={"flex items-center justify-center mx-3"}>
						<img src={sendMailIcon} alt={"-----"}/>
					</button>
				</div>
			</div>
			<div className="flex-1 overflow-y-auto">
				<table className="text-black text-medium border-collapse space-x-0 space-y-0 w-full" style={{ borderSpacing: 0 }}>
					<thead className="">
						<tr className="text-primary-gray whitespace-nowrap align-middle text-left">
							<th className="px-3 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border w-1">
								TT
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
								Đơn vị thực hiện
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
								Mã hiệu
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
								<div className="flex justify-between">
									<span>
										Đang triển khai
									</span>
									<div className="flex space-x-5 px-2">
										<div className="flex items-center">
											<div className="w-3 h-3 bg-cbs-schedule-expired" />
											<span className="ml-1 text-primary-gray font-normal">
												Quá hạn
											</span>
										</div>
										<div className="flex items-center">
											<div className="w-3 h-3 bg-cbs-schedule-nextweek" />
											<span className="ml-1 text-primary-gray font-normal">
												Tuần tới
											</span>
										</div>
										<div className="flex items-center">
											<div className="w-3 h-3 bg-cbs-schedule-after-7days" />
											<span className="ml-1 text-primary-gray font-normal">
												{" "}
												{">7 ngày"}
											</span>
										</div>
									</div>
								</div>
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
								Hoàn thành
							</th>
						</tr>
					</thead>
					<tbody className="">
						{
							dataCompany?.map((company: any, index) => {
								return (
									<tr key={company._id} className="text-left hover:bg-cbs-table-header cursor-pointer">
										<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border text-center" onClick={e => e.stopPropagation()}>
											{index+1}
										</td>
										<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
											<Link to={`/pm/project/${projectID}/subject/company/${company._id}`}>
												{company.name}
											</Link>
										</td>
										<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">{company.sign}</td>
										<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border text-right cursor-auto" style={{ minWidth: "155px", fontSize: '10px' }} onClick={e => e.stopPropagation()}>
											<div className="flex w-full h-3 mt-2">
												<button
													className="flex items-center justify-center bg-red-500"
													style={{ width: `${company?.overdueWorkPercent}%` }}
													onClick={() => toggleVisible({ company: company._id, typeStatus: "1"}) }>
													<span className="text-white">
														{company?.totalOverdueWork ||""}
													</span>
												</button>
												<button
													className="flex items-center justify-center bg-yellow-500"
													style={{ width: `${company?.nextWeekWorkPercent}%` }}
													onClick={() => toggleVisible({ company: company._id, typeStatus: "2"}) }>
													<span className="text-white">
														{company?.totalNextWeekWork ||""}
													</span>
												</button>
												<button
													className="flex items-center justify-center bg-green-500"
													style={{ width: `${company?.moreThan7DaysPercent}%` }}
													onClick={() => toggleVisible({ company: company._id, typeStatus: "3"}) }>

													<span className="text-white">
														{company?.totalMoreThan7Days ||""}
													</span>
												</button>
											</div>
										</td>
										<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border text-right text-white cursor-auto" style={{ fontSize: '10px' }} onClick={e => e.stopPropagation()}>
											{company?.totalFinish ? 
												<div className="h-3 w-full bg-cbs-primary text-center min-w-[164px] mt-2" >{company?.totalFinish}</div> : 
												<></>
											}
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
				<ModalInformation open={visibleDrawer} onClose={toggleVisible} dataPopup={{ companyPopup, typeStatusPopup, projectID }}/>
			</div>
		</div >
	);
};

export default ProjectSubjectPage;