import React, { FC, useState } from 'react';
import PDFSvg from 'assets/images/CBS-PDF-Icon-48.svg';
import FolderImage from 'assets/images/datahub/icons8-folder-96 5.png';
import ModalCreateProfile from './components/ModalCreateProfile';

type Props = {

}

const DatahubContractorProfile: FC<Props> = (props) => {
	const [show, setShow] = useState(false);
	return (
		<>
			<div className='bg-white w-full mx-3.5 pt-4 pb-[50px]'>
				<div className='flex flex-wrap gap-y-3.5'>
					<div className='w-3/12 px-2 min-h-[330px]'>
						<div className='h-full border-cbs-border border-[0.5px] rounded-cbs-md pl-3.5 pr-3 pt-4 pb-5'>
							<div className='flex'>
								<div className='bg-[#EDFCFF] px-[18px] py-6 mr-3.5'>
									<div className='w-9 h-9'>
										<img src={FolderImage} alt="" />
									</div>
								</div>
								<p className='flex-shrink font-bold text-large'>Hồ sơ năng lực công ty CONINCO-PMI năm 2022</p>
							</div>
							<div className='pt-2.5'>
								<div className='flex border-b-[0.5px] border-cbs-border pb-2 pt-4'>
									<img src={PDFSvg} alt="" className='w-6 h-6 mr-3' />
									<div>
										<p className='text-small'>2022.CPMI-HSNL-V1.pdf</p>
										<p className='text-x-small text-cbs-subtext mt-2'>
											<span>1.2Mb</span>
											-
											<span>15/2/2022</span>
											<span>15:30</span>
										</p>
									</div>
								</div>
								<div className='flex border-b-[0.5px] border-cbs-border pb-2 pt-4'>
									<img src={PDFSvg} alt="" className='w-6 h-6 mr-3' />
									<div>
										<p className='text-small'>2022.CPMI-HSNL-V1.pdf</p>
										<p className='text-x-small text-cbs-subtext mt-2'>
											<span>1.2Mb</span>
											-
											<span>15/2/2022</span>
											<span>15:30</span>
										</p>
									</div>
								</div>
								<div className='flex border-b-[0.5px] border-cbs-border pb-2 pt-4'>
									<img src={PDFSvg} alt="" className='w-6 h-6 mr-3' />
									<div>
										<p className='text-small'>2022.CPMI-HSNL-V1.pdf</p>
										<p className='text-x-small text-cbs-subtext mt-2'>
											<span>1.2Mb</span>
											-
											<span>15/2/2022</span>
											<span>15:30</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='w-3/12 px-2 min-h-[330px]'>
						<div className='h-full flex justify-center items-center border-cbs-border border-[0.5px] rounded-cbs-md cursor-pointer' onClick={() => setShow(!show)}>
							<div>
								<div className='mx-auto text-cbs-subtext border-cbs-subtext border-[3px] rounded-full w-[50px] h-[50px] flex items-center justify-center'>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
									</svg>
								</div>
								<p className='text-center text-large mt-5'>
									Tạo hồ sơ
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ModalCreateProfile type='create' show={show} toggle={() => setShow(!show)} buttonOnly />
		</>
	)
}

export default DatahubContractorProfile