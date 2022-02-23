import React, { FC, HTMLAttributes } from 'react';
import useScrollSticky from 'views/datahub/hooks/useScrollSticky';
import Card from '../../../sharedComponents/common/Card';
import ContactInfo from '../../../sharedComponents/common/ContactInfo';

type Props = {
}

const ProfileFeed: FC<Props & HTMLAttributes<HTMLDivElement>> = (props, ref) => {
	const { innerRef, sticky } = useScrollSticky('#datahub-contractor-detail')

	return (
		<div {...props}>
			<div ref={innerRef}></div>
			<div className='sticky' ref={sticky}>
				<Card to='/' title='Giới thiệu' className='bg-white pt-4 rounded-cbs-md  border-[0.5px] border-cbs-border'>
					<div className='p-4'>
						<div className='border-b-[0.5px] border-cbs-border pb-5'>
							<p className='line-clamp-3 text-justify'>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore aut laboriosam dolorum beatae officia animi voluptatem incidunt veniam suscipit qui repudiandae a, obcaecati perferendis minima doloribus tempore corrupti sit consequatur?
							</p>
						</div>
						<div className='space-y-3 pt-3 pb-2'>
							<ContactInfo value='Tên: Công ty Cổ phần CONINCO Quản lý dự án và Đầu tư' />
							<ContactInfo value='Mã số thuế: 123456789' />
							<ContactInfo value='Địa chỉ: <Địa chỉ công ty>' />
							<ContactInfo value='0955112777' link='/' />
							<ContactInfo value='contact@conincopmi.com' link='contact@conincopmi.com' />
							<ContactInfo value='https://conincopmi.vn' link='https://conincopmi.vn' />
						</div>
					</div>
				</Card>

				{/* ======= LIST IMAGE ======= */}
				<Card to='/' title='Giới thiệu' className='bg-white pt-4 rounded-cbs-md  border-[0.5px] border-cbs-border mt-2'>
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
				</Card>
			</div>
		</div>
	)
}

export default ProfileFeed