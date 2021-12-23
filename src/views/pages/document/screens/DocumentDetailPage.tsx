import { FC } from 'react'

import ButtonCreate from "views/pages/document/components/common/ButtonCreate";
import ButtonMore from "views/pages/document/components/common/ButtonMore";
import DropdownFilterButton from "views/pages/document/components/DocumentFilterButton";
import GroupActions from "views/pages/document/components/projects/GroupActions";
import { useHistory } from 'react-router-dom';

import 'views/pages/document/document.css'
import TableGeneralInformation from 'views/pages/document/components/details/TableGeneralInformation';
import TableJobs from 'views/pages/document/components/details/TableJobs';
import TableFileAttach from 'views/pages/document/components/details/TableFileAttach';
import TableSubtextProfile from 'views/pages/document/components/details/TableSubtextProfile';
import ButtonIcon from 'views/pages/document/components/common/ButtonIcon';

import iconMove from 'assets/images/icons8-move-stock-96.svg';
import iconShareFolder from 'assets/images/icons8-shared-folder-100_1.svg';
import iconUpload from 'assets/images/icons8-upload-file-100 1.png';
import iconAdd from 'assets/images/icon-add.svg';

interface Props {
	test?: unknown,
}

const DocumentDetailPage: FC<Props> = () => {
	const history = useHistory();
	return (
		<div className="flex flex-col overflow-hidden bg-cbs-gray h-full">
			<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
				<button type="button" className="p-2 rounded-3xl mr-5" onClick={() => history.goBack()}>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
					</svg>
				</button>
				<DropdownFilterButton />
				<GroupActions className="flex items-center flex-1" />

				<ButtonCreate />
				<ButtonMore />
			</div>
			<div className='text-cbs-subtext flex-1 overflow-y-auto pb-2'>
				<div className='bg-white'>
					<div className='pl-5 pr-4 py-3.5 border-b border-cbs-border'>
						<h2 className='text-black' style={{ fontSize: '27px', lineHeight: '31px' }}>Hồ sơ thanh toán đợt 05 gói thầu Tư vấn thiết kế 112 - Dự án Xây dựng cụm trường tiểu học và trung học cơ sở Tây Hồ Tây (bản gốc)</h2>
						<div className='mt-3'>
							<img src={iconShareFolder} className='h-6 w-6 inline mr-2.5' alt='' />
							<span className='mr-2.5'>
								CHG.THT {">"} Tư vấn thiết kế 112 {">"} Hồ sơ thanh toán
							</span>
							<img src={iconMove} className='h-6 w-6 inline' alt='' />
						</div>
						<div className='flex justify-between flex-wrap mt-4'>
							<div>
								Khởi tạo: <span className='text-black'>Phan Văn Trường-PGI 15/9/2021 15:38</span>
							</div>
							<div>
								Cập nhật: <span className='text-black'>Phùng Thị Thu-TRX 15/9/2021 15:38</span>
							</div>
						</div>
					</div>
					{/* General Information */}
					<div className='px-3.5 pb-3 pt-5'>
						<h3 className='text-cbs-subtext text-x-large font-bold flex-1'>1-THÔNG TIN CHUNG</h3>
						<TableGeneralInformation />
					</div>
				</div>
				{/* File attached */}
				<div className='bg-white mt-2.5 pb-3 pt-5 px-3.5'>
					<div className='flex flex-wrap'>
						<h3 className='text-cbs-subtext text-x-large font-bold flex-1'>2-TÀI LIỆU ĐÍNH KÈM</h3>
						<ButtonIcon
							title="Thêm"
							icon={() => <img src={iconUpload} alt='' className='mr-2.5 h-6 w-6' />}
						/>
					</div>
					<TableFileAttach />
				</div>

				{/* Job */}
				<div className='bg-white mt-2.5 pb-3 pt-5 px-3.5'>
					<div className='flex flex-wrap'>
						<h3 className='text-cbs-subtext text-x-large font-bold flex-1'>3-CÔNG VIỆC</h3>
						<ButtonMore className='mr-6' />
						<ButtonIcon
							title="Thêm"
							icon={() => <img src={iconAdd} alt='' className='mr-2.5 h-6 w-6' />}
						/>
					</div>
					<TableJobs />
				</div>
				{/* Subtext Profile */}
				<div className='bg-white mt-2.5 pb-3 pt-5 px-3.5'>
					<div className='flex flex-wrap'>
						<h3 className='text-cbs-subtext text-x-large font-bold flex-1'>4-HỒ SƠ VĂN BẢN CON</h3>
						<ButtonMore className='mr-6' />
						<ButtonIcon
							title="Thêm"
							icon={() => <img src={iconAdd} alt='' className='mr-2.5 h-6 w-6' />}
						/>
					</div>
					<TableSubtextProfile />
				</div>
				{/* Discussion */}
				<div className='bg-white mt-2.5 pb-3 pt-5 px-3.5'>
					<div className='flex flex-wrap'>
						<h3 className='text-cbs-subtext text-x-large font-bold'>5-THẢO LUẬN</h3>
					</div>
					<div className='py-4'></div>
				</div>
			</div>
		</div >
	)
}

export default DocumentDetailPage
