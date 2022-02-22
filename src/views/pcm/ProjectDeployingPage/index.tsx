import { FC, useContext, useEffect, useMemo, useState } from "react";

import { ModalContext, ModalProvider } from '../../contexts/modal'

import SearchInput from "components/common/SearchInput";
import ModalExample from "../../sharedComponents/common/ModalExample";

import ButtonCreate from "../../sharedComponents/common/ButtonCreate";
import ButtonMore from "../../sharedComponents/common/ButtonMore";

// import DropdownFilterButton from "views/pages/document/components/DocumentFilterButton";
import MarketRowGroup from "./components/MarketRowGroup";

import "./style.css";

const ProjectDeploying: FC = () => {
	const [show, setShow] = useState<boolean>(true)
	const { toggleModal } = useContext(ModalContext);

	const data = useMemo(() => Array.from({ length: 3 }).map((_, index) => ({
		_id: index,
		project: { sign: 'test' },
		name: 'asd',
		expiredTime: Date.now(),
		description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, rem?",
		data: Array.from({ length: Math.ceil(Math.random() * 10) }).map((_d, i) => ({ _id: i }))
	})), []);
	// const data = useMemo(() => Array.from({length:10}), []);

	useEffect(() => {
		document.title = "PPT - Dự án đang phát triển"
	}, []);

	return (
		<>
			<div className="text-cbs-subtext flex flex-col overflow-hidden h-full">
				<div className="flex flex-wrap items-center w-full px-4 gap-x-2 text-black py-1">
					<span className="text-x-large mr-7">Danh sách</span>
					<SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu mr-2" onChange={() => 1} />
					{/* <DropdownFilterButton className="mr-auto" /> */}
					{/* <GroupActions className="flex items-center flex-1" /> */}

					<ButtonCreate onClick={toggleModal} />
					<ButtonMore />
				</div>
				<div className="custom-scroll flex-1 overflow-y-auto px-2">
					<table className='table w-full border-separate text-center text-small mt-2'>
						<thead className="text-black">
							<tr>
								<th className="align-middle px-1 z-10">
									<button className="inline-block text-white rounded bg-gray-600 w-5 h-5" onClick={() => setShow(!show)}>{show ? '+' : '-'}</button>
								</th>
								<th>TT</th>
								<th style={{ minWidth: "240px" }}>Nội dung</th>
								<th style={{ minWidth: "120px" }}>Tổng mức đầu tư</th>
								<th style={{ minWidth: "264px" }}>Tình trạng hiện tại</th>
								<th style={{ minWidth: "100px" }}>Ngày liên hệ gần nhất</th>
								<th style={{ minWidth: "74px" }}>Đầu mối kết nối</th>
								<th style={{ minWidth: "92px" }}>Khả năng thành công</th>
								<th style={{ minWidth: "400px" }}>Ghi chú tiến trình</th>
								<th style={{ minWidth: "90px" }}>Số ngày cách đây</th>
							</tr>
						</thead>
						{
							data.map((_item, index) => <MarketRowGroup row={_item} key={index} show={show} />)
						}
					</table>
				</div>
			</div>
			<ModalExample />
		</>
	);
};

/**
 * ? Export rules:
 * ? export default must be capital syntax
 * ? export const must be camel case syntax
 */
const ProjectDeployingPage: FC = () => {
	return <ModalProvider>
		<ProjectDeploying />
	</ModalProvider>
}

export default ProjectDeployingPage;
