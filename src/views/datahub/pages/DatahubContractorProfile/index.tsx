import React, { FC, useCallback, useState } from 'react';
import ModalCreateProfile from './components/ModalCreateProfile';
import useInfiniteProfile from 'services/hooks/datahub/profile/useInfiniteProfile';
import { useContractorCompany } from 'views/datahub/contexts/Company';
import ModalExtraLarge from 'shareComponents/common/ModalContainer/components/ModalExtraLarge';
import { DatahubProfile } from 'typings/datahub/profile';
// import { ContextMenu } from 'shareComponents/common/ContextMenu';
import { buildDatahubProfilesKey } from 'apis/datahub/profiles';
import { useAuth } from "services/hooks/auth/useAuth";

// Icons
import iconPencil from "assets/images/icons8-pencil.svg";
import { isSupporter } from 'configs';

type Props = {

}

const DatahubContractorProfile: FC<Props> = (props) => {
	const { user } = useAuth();
	const [show, setShow] = useState(false);
	const { data: company } = useContractorCompany();
	const [selected, setSelected] = useState<DatahubProfile>();
	const { data } = useInfiniteProfile(
    buildDatahubProfilesKey({ contractorID: company?.data._id }),
    { contractorID: company?.data._id || "" },
    { enable: Boolean(company?.data._id) }
  );

	const toggle = () => setShow(!show);
  const onClickFolder = useCallback((data: DatahubProfile) => {
    console.log("click folder", data);
  }, []);

	return (
		<>
			<div className='bg-white w-full mx-3.5 pt-4 pb-[50px]'>
				{/* <ContextMenu>
					<div className='bg-white border-0.5 border-cbs-border rounded-cbs-sm shadow-cbs-md'>
						<button onClick={toggle}>
							Sửa {selected?.name}
						</button>
					</div>
				</ContextMenu> */}
				<div className='flex flex-wrap gap-y-3.5'>
					{
						data?.pages.map((page, i) => page.data.listRecords.map(record => (<div key={record._id} className='w-3/12 px-2 min-h-[330px]'>
							<div className='h-full group relative before:h-full border-cbs-border border-[0.5px] rounded-cbs-md pl-3.5 pr-3 pt-4 pb-5' onContextMenu={(e) => {
								e.stopPropagation();
								e.preventDefault();
								// showContextMenu?.({ position: { x: e.clientX, y: e.clientY } })
							}}>
								<div className='flex'>
									<div className='bg-[#EDFCFF] px-[18px] py-6 mr-3.5 cursor-pointer' onClick={()=>onClickFolder(record)}>
										<div className='w-9 h-9'>
											<img src="/images/datahub/icons8-folder-96 5.png" alt="" />
										</div>
									</div>
									<p className='flex-shrink font-bold text-large'>{record.name}</p>
								</div>
								<div className='pt-2.5'>
									{record.files.map(file => (
										<div key={file._id} className='flex border-b-[0.5px] border-cbs-border pb-2 pt-4'>
											<img src='/images/CBS-PDF-Icon-48.svg' alt="" className='w-6 h-6 mr-3' />
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
									))}
								</div>
                <button
                  className='group-hover:block hidden absolute right-2 top-2'
                  onClick={()=>{
    								setSelected(record);
                    setShow(true)
                  }}>
                  <div className='w-10 h-10 rounded-full bg-cbs-gray flex items-center justify-center'>
                    <img src={iconPencil} />
                  </div>
                </button>
							</div>
						</div>
						)))
					}

					{ user && isSupporter(user) ?
						<div className='w-3/12 px-2 min-h-[330px]'>
							<div className='h-full flex justify-center items-center border-cbs-border border-[0.5px] rounded-cbs-md cursor-pointer' onClick={() => { toggle(); setSelected(undefined) }}>
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
						: <></>
					}
				</div>
			</div>
			<ModalExtraLarge show={show}>
				<ModalCreateProfile profile={selected} company={company?.data} toggle={toggle} />
			</ModalExtraLarge>
		</>
	)
}

export default DatahubContractorProfile