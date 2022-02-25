import { FC, Fragment, useEffect, useState } from "react";
import moment from "moment";
import { useHistory } from "react-router";
import { ButtonCreate, ButtonMore, GroupActions } from "shareComponents/common";
import './styles/styles.css'

const ProjectInspectionDetailPage: FC = () => {
	const history = useHistory();
	useEffect(() => {
		document.title = "CHG.THT-Nghiệm thu chất lượng"
	}, []);

	return (
		<div className="flex flex-col overflow-hidden bg-cbs-gray h-full">
			<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1 shadow-cbs-md">
				<button
					type="button"
					className="p-2 rounded-3xl mr-5"
					onClick={() => history.goBack()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
				</button>
				<div className="border-0.5 h-4 border-cbs-border"></div>
				{/* <DropdownFilterButton /> */}
				<GroupActions className="flex items-center flex-1" />
			</div>
			<div className="flex-1 overflow-y-auto pb-2">
				<div className="max-w-[791px] mx-auto py-4">
					<div id="printarea" className="bg-white h-[970px] shadow-cbs-md">
						<section className="text-large text-center px-6 pt-4">
							<h3 className="font-bold">BIÊN BẢN KIỂM TRA</h3>
							<p className="mt-2 text-cbs-primary">Kiểm tra san nền khu vực Z01-trường tiểu học</p>
						</section>
						<section className="text-medium px-6 mt-2.5">
							<table className="inspection-table w-full">
								<tbody>
									<tr>
										<td className="border-cbs-border border-0.5 p-2" colSpan={4}>
											<span>Công trình:</span>
											<span className="text-cbs-primary"> Xây dựng cụm trường Tiểu học và THCS Tây Hồ Tây</span>
										</td>
									</tr>
									<tr>
										<td className="border-cbs-border border-0.5 p-2" colSpan={4}>
											<span>Địa điểm:</span>
											<span className="text-cbs-primary">phường Xuân Tảo, quận Bắc Từ Liêm, thành phố Hà Nội</span>
										</td>
									</tr>
									<tr>
										<td className="border-cbs-border border-0.5 border-r-0 p-2" colSpan={2}>
											<span>Gói thầu: </span>
											<span className="text-cbs-primary">Thi công san lấp mặt bằng</span>
										</td>
										<td className="border-cbs-border border-0.5 border-l-0 p-2" colSpan={2}>
											<span>Hạng mục: </span>
											<span className="text-cbs-primary">Sơn bả</span>
										</td>
									</tr>
									<tr className="text-left">
										<th className="border-cbs-border border-0.5 p-2">Khu vực</th>
										<th className="border-cbs-border border-0.5 p-2">Vị trí</th>
										<th className="border-cbs-border border-0.5 p-2">Số biên bản</th>
										<th className="border-cbs-border border-0.5 p-2">Ngày</th>
									</tr>
									<tr className="border-cbs-border border-0.5 text-cbs-primary">
										<td className="border-cbs-border border-0.5 p-2">Cấu kiện 1; Cấu kiện 2; Căn hộ C1</td>
										<td className="border-cbs-border border-0.5 p-2">Trục X5-Y12, tầng 32</td>
										<td className="border-cbs-border border-0.5 p-2">01/05/BBKT/CHG.THT.PT</td>
										<td className="border-cbs-border border-0.5 p-2">15/2/2021</td>
									</tr>
								</tbody>
							</table>
						</section>
						<section className="text-large px-6 mt-1">
							<p className="font-bold py-2.5">
								KẾT QUẢ KIỂM TRA (3/5)
							</p>
							<table className="w-full">
								<thead>
									<tr>
										<th className="border-cbs-border border-0.5 p-2 min-w-min w-1">TT</th>
										<th className="border-cbs-border border-0.5 p-2">Nội dung kiểm tra</th>
										<th className="border-cbs-border border-0.5 p-2 min-w-min w-1">Đạt</th>
										<th className="border-cbs-border border-0.5 p-2 min-w-min w-1">Không</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="border-cbs-border border-0.5 p-2">1</td>
										<td className="border-cbs-border border-0.5 p-2">Checklist 1 (click here to show detail)</td>
										<td className="border-cbs-border border-0.5 p-2 text-center"><input type="radio" name="check1" value={1} className="cbs-checkbox-radio w-6 h-6" /></td>
										<td className="border-cbs-border border-0.5 p-2 text-center"><input type="radio" name="check1" value={2} className="cbs-checkbox-radio w-6 h-6" /></td>
									</tr>
									<tr>
										<td className="border-cbs-border border-0.5 p-2">2</td>
										<td className="border-cbs-border border-0.5 p-2">Checklist 2 (click here to show detail)</td>
										<td className="border-cbs-border border-0.5 p-2 text-center"><input type="radio" name="check2" value={1} className="cbs-checkbox-radio w-6 h-6" /></td>
										<td className="border-cbs-border border-0.5 p-2 text-center"><input type="radio" name="check2" value={2} className="cbs-checkbox-radio w-6 h-6" /></td>
									</tr>
									<tr>
										<td className="border-cbs-border border-0.5 p-2">3</td>
										<td className="border-cbs-border border-0.5 p-2">Checklist 3 (click here to show detail)</td>
										<td className="border-cbs-border border-0.5 p-2 text-center"><input type="radio" name="check3" value={1} className="cbs-checkbox-radio w-6 h-6" /></td>
										<td className="border-cbs-border border-0.5 p-2 text-center"><input type="radio" name="check3" value={2} className="cbs-checkbox-radio w-6 h-6" /></td>
									</tr>
									<tr>
										<td className="border-cbs-border border-0.5 p-2">4</td>
										<td className="border-cbs-border border-0.5 p-2">Checklist 4 (click here to show detail)</td>
										<td className="border-cbs-border border-0.5 p-2 text-center"><input type="radio" name="check4" value={1} className="cbs-checkbox-radio w-6 h-6" /></td>
										<td className="border-cbs-border border-0.5 p-2 text-center"><input type="radio" name="check4" value={2} className="cbs-checkbox-radio w-6 h-6" /></td>
									</tr>
									<tr>
										<td className="border-cbs-border border-0.5 p-2">5</td>
										<td className="border-cbs-border border-0.5 p-2">Checklist 5 (click here to show detail)</td>
										<td className="border-cbs-border border-0.5 p-2 text-center"><input type="radio" name="check5" value={1} className="cbs-checkbox-radio w-6 h-6" /></td>
										<td className="border-cbs-border border-0.5 p-2 text-center"><input type="radio" name="check5" value={2} className="cbs-checkbox-radio w-6 h-6" /></td>
									</tr>
								</tbody>
							</table>
						</section>
						<section className="text-large font-bold px-6 mt-2">
							<p className="py-2.5">
								KẾT LUẬN
							</p>
							<div className="flex pt-1 pb-2 px-3">
								<label className="mr-6 flex items-center">
									<input type="radio" name="check6" value={1} className="cbs-checkbox-radio w-6 h-6 mr-3" />
									<span className="">Đạt yêu cầu, cho chuyển bước tiếp theo</span>
								</label>
								<label className="flex items-center">
									<input type="radio" name="check6" value={2} className="cbs-checkbox-radio w-6 h-6 mr-3" />
									<span className="">Không đạt yêu cầu</span>
								</label>
							</div>
							<p className="py-3.5">Ý kiến thảo luận (12)</p>
							<textarea name="content" rows={6} className="resize-none focus:outline-none py-2 px-3.5 text-medium w-full border-cbs-border border-0.5" placeholder="Nội dung bình luận cuối cùng">

							</textarea>
							<div className="flex justify-between items-end py-2.5">
								<span>Thành phần tham gia</span>
								<button className="border-current border-0.5 text-cbs-primary py-2 px-4 rounded-cbs">Xác nhận</button>
							</div>
							<div className="grid grid-cols-auto-3">
								<div className="border-cbs-border border-0.5 px-3.5 pt-4 pb-1.5">Nhà thầu thi công</div>
								<div className="border-cbs-border border-0.5 px-3.5 pt-4 pb-1.5">
									<p>Hoàng Trần Tiến Mạnh</p>
									<p>15:30 12/8/2021</p>
								</div>
								<div className="border-cbs-border border-0.5 px-3.5 py-2.5"></div>
								<div className="border-cbs-border border-0.5 px-3.5 pt-4 pb-1.5">Nhà thầu giám sát</div>
								<div className="border-cbs-border border-0.5 px-3.5 pt-4 pb-1.5">
									<p>Hoàng Trần Tiến Mạnh</p>
									<p>15:30 12/8/2021</p>
								</div>
								<div className="border-cbs-border border-0.5 px-3.5 py-2.5"></div>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProjectInspectionDetailPage;