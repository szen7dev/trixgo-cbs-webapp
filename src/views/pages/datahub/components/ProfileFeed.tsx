import React, { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import ContactInfo from './ContactInfo';

type Props = {
	innerref: React.RefObject<HTMLDivElement>
}

const ProfileFeed = React.forwardRef<HTMLDivElement, Props & HTMLAttributes<HTMLDivElement>>((props, ref) => {
	const { innerref } = props;
	return (
		<div {...props}>
			<div ref={innerref}></div>
			<div className='sticky' ref={ref}>
				<div className='bg-white pt-4 rounded-cbs-md  border-[0.5px] border-cbs-border'>
					<div className='mx-3 pb-4 border-b-[0.5px] border-cbs-border'>
						<div className='flex justify-between items-center'>
							<span className='font-bold text-2x-large'>Giới thiệu</span>
							<Link to="/" className='text-cbs-primary'>
								Xem tất cả
							</Link>
						</div>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore aut laboriosam dolorum beatae officia animi voluptatem incidunt veniam suscipit qui repudiandae a, obcaecati perferendis minima doloribus tempore corrupti sit consequatur?
						</p>
					</div>
					<div className='space-y-3 px-3 pt-3 pb-2'>
						<ContactInfo value='Tên: Công ty Cổ phần CONINCO Quản lý dự án và Đầu tư' />
						<ContactInfo value='Mã số thuế: 123456789' />
						<ContactInfo value='Địa chỉ: <Địa chỉ công ty>' />
						<ContactInfo value='0955112777' link='/' />
						<ContactInfo value='contact@conincopmi.com' link='contact@conincopmi.com' />
						<ContactInfo value='https://conincopmi.vn' link='https://conincopmi.vn' />
					</div>
				</div>

				{/* <div className='bg-white pt-4 rounded-cbs-md  border-[0.5px] border-cbs-border mt-3'>
					<div className='mx-3 pb-4 border-b-[0.5px] border-cbs-border'>
						<div className='flex justify-between items-center'>
							<span className='font-bold text-2x-large'>Giới thiệu</span>
							<Link to="/" className='text-cbs-primary'>
								Xem tất cả
							</Link>
						</div>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore aut laboriosam dolorum beatae officia animi voluptatem incidunt veniam suscipit qui repudiandae a, obcaecati perferendis minima doloribus tempore corrupti sit consequatur?
						</p>
					</div>
					<div className='space-y-3 px-3 pt-3 pb-2'>
						<ContactInfo value='Tên: Công ty Cổ phần CONINCO Quản lý dự án và Đầu tư' />
						<ContactInfo value='Mã số thuế: 123456789' />
						<ContactInfo value='Địa chỉ: <Địa chỉ công ty>' />
						<ContactInfo value='0955112777' link='/' />
						<ContactInfo value='contact@conincopmi.com' link='contact@conincopmi.com' />
						<ContactInfo value='https://conincopmi.vn' link='https://conincopmi.vn' />
					</div>
				</div> */}
			</div>
		</div>
	)
})
ProfileFeed.displayName = 'ProfileFeed';

export default ProfileFeed