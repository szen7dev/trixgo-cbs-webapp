import { FC, useContext, useEffect, useMemo } from "react";
import cn from "classnames";

import { Provider, Context as ContextModal } from "views/pages/document/contexts/contextModal";

import ModalCreateDocument from 'views/pages/document/components/common/ModalCreateDocument';
import SearchInput from "components/common/SearchInput";
import DropdownFilterButton from "views/pages/document/components/DocumentFilterButton";
import ButtonCreate from "views/pages/document/components/common/ButtonCreate";
import ButtonMore from "views/pages/document/components/common/ButtonMore";

import styles from "./style.module.css";

const ProjectDeploying: FC = () => {
	const { toggleModal } = useContext(ContextModal);

	const data = useMemo(() => [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], []);

	useEffect(() => {
		document.title = "PPT - Dự án đang phát triển"
	}, []);

	return (
		<>
			<div className={cn(styles.content, "flex flex-col overflow-hidden h-full")}>
				<div className="flex flex-wrap items-center w-full px-4 gap-x-2 text-black py-1">
					<span className="text-x-large mr-7">Danh sách</span>
					<SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu mr-2" onChange={() => 1} />
					<DropdownFilterButton className="mr-auto" />
					{/* <GroupActions className="flex items-center flex-1" /> */}

					<ButtonCreate onClick={toggleModal} />
					<ButtonMore />
				</div>
				<div className={cn(styles.scroll, "flex-1 overflow-y-auto px-2")}>
					<table className={cn(styles['table-project'], styles.table, styles['text-normal'], 'mt-2')}>
						<thead className={styles.black}>
							<tr>
								<th>TT</th>
								<th style={{ minWidth: "240px" }}>Nội dung</th>
								<th>Tổng mức đầu tư</th>
								<th style={{ minWidth: "264px" }}>Tình trạng hiện tại</th>
								<th style={{ minWidth: "100px" }}>Ngày liên hệ gần nhất</th>
								<th style={{ minWidth: "74px" }}>Đầu mối kết nối</th>
								<th style={{ minWidth: "92px" }}>Khả năng thành công</th>
								<th style={{ minWidth: "400px" }}>Ghi chú tiến trình</th>
								<th>Số ngày cách đây</th>
							</tr>
						</thead>
						<tbody className={styles.black}>
							{
								data.map((_item, index) => {
									return (
										index % 5 === 0
											? (<tr key={index}>
												<th>A1</th>
												<th colSpan={9} className="text-left">DỰ ÁN VỀ DÂN DỤNG</th>
											</tr>)
											: (<tr key={index}>
												<td className="px-4">{index}</td>
												<td className="text-left">Dự án trường Newton tại Ciputra</td>
												<td>5.000.000.000.000</td>
												<td className="text-left">A Dương đã báo Hiếu NBK kiểm tra, hỏi lại CĐT</td>
												<td>28/09/2021</td>
												<td>Mr. Long CDC</td>
												<td className="text-center">Cao</td>
												<td className="text-left">Đã thuyết trình với Ms. Oanh. Chờ trao đổi với Ban lãnh đạo CĐT. Dịch vụ cung cấp (BIM, Tư vấn giá, nền tảng công nghệ, thầu)</td>
												<td className="align-middle">12</td>
											</tr>)
									)
								})
							}
						</tbody>
					</table>
				</div>
			</div>
			<ModalCreateDocument />
		</>
	);
};

/**
 * ? Export rules:
 * ? export default must be capital syntax
 * ? export const must be camel case syntax
 */
const ProjectDeployingPage: FC = () => {
	return <Provider>
		<ProjectDeploying />
	</Provider>
}

export default ProjectDeployingPage;
