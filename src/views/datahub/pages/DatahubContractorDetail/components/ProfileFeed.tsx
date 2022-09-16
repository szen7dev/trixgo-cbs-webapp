import React, { FC, HTMLAttributes } from 'react';
import useScrollSticky from 'services/hooks/datahub/useScrollSticky';
import { useContractorCompany } from 'views/datahub/contexts/Company';
import Card from '../../../sharedComponents/common/Card';
import ContactInfo from '../../../sharedComponents/common/ContactInfo';

type Props = {
}

const ProfileFeed: FC<Props & HTMLAttributes<HTMLDivElement>> = (props, ref) => {
	const { data } = useContractorCompany();
	const { innerRef, sticky } = useScrollSticky('#datahub-contractor-detail', { offsetTop: 70.5, offsetBottom: 10 })

	return (
		<div {...props}>
			<div ref={innerRef}></div>
			<div className='sticky' ref={sticky}>
				<Card to='/' title='Giới thiệu' className='bg-white pt-4 rounded-cbs-md  border-[0.5px] border-cbs-border'>
					<div className='p-4'>
						<div className='border-b-[0.5px] border-cbs-border pb-5'>
							<p className='line-clamp-3 text-justify'>
								{data?.data.description}
								{/* Không có field into 222 */}
								{/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore aut laboriosam dolorum beatae officia animi voluptatem incidunt veniam suscipit qui repudiandae a, obcaecati perferendis minima doloribus tempore corrupti sit consequatur? */}
							</p>
						</div>
						<div className='space-y-3 pt-3 pb-2'>
							<ContactInfo value={'Tên: ' + data?.data.name || ''} />
							<ContactInfo value={'Mã số thuế: ' + data?.data.taxid || ''} />
							<ContactInfo value={'Địa chỉ: ' + data?.data.address || ''} />
							<ContactInfo value={'Điện thoại: ' + data?.data.phone || ''} link='/' />
							<ContactInfo value={'Email: ' + data?.data.email || ''} link='/' />
							<ContactInfo value={'Website: ' + data?.data.website || ''} link='/' />
						</div>
					</div>
				</Card>

				{/* ======= LIST IMAGE ======= */}
				{/* <Card to='/' title='Giới thiệu' className='bg-white pt-4 rounded-cbs-md  border-[0.5px] border-cbs-border mt-2'>
					<div className='flex flex-wrap p-4 -mr-1'>
						{Array.from({ length: 9 }).map((_, i) => <div key={i} className='w-4/12'>
							<div className='pr-1 pb-1'>
								<div className='relative pb-[100%]'>
									<div className='absolute inset-0'>
										<img className='w-full h-full object-cover' src='https://dntdurzwr12tp.cloudfront.net/files/db/users/3222c61c-d206-44c2-aa5d-bd315407344f.jpg' alt="" />
									</div>
								</div>
							</div>
						</div>)}
					</div>
				</Card> */}
			</div>
		</div>
	)
}

export default ProfileFeed