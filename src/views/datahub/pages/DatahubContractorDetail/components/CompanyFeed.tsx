import React, { FC, HTMLAttributes, useContext } from 'react'
import AuthContext from 'services/contexts/Auth'
import ContactInfo from '../../../sharedComponents/common/ContactInfo'

import TButtonMore from 'views/datahub/sharedComponents/common/TForm/TButtonMore'
import TTextInput from 'views/datahub/sharedComponents/common/TForm/TTextInput'

type Props = {

}

const CompanyFeed: FC<Props & HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
	const { state } = useContext(AuthContext)

	return (
		<div {...props}>
			<div className='space-y-4'>
				<div className='flex bg-white border-[0.5px] border-cbs-border rounded-cbs-md px-3 py-4'>
					<div className='pr-3'>
						<div className='w-10 h-10 rounded-full border-[0.5px] border-cbs-border overflow-hidden'>
							<img className='h-full w-full' src={process.env.REACT_APP_URL_S3_USER + '/' + state.user?.image} alt="" />
						</div>
					</div>
					<div className='flex-grow'>
						<div className='border-[0.5px] border-cbs-border rounded-cbs-sm px-3 custom-scroll max-h-60 overflow-auto'>
							<TTextInput
								placeholder='Đăng bài viết của bạn'
								className='break-all relative block outline-none text-[15px] leading-4 cursor-text flex-grow overflow-x-hidden py-3.5 text-black'
							/>
						</div>
						<div className='flex mt-4'>
							<ContactInfo className='w-4/12' value='Hình ảnh'></ContactInfo>
							<ContactInfo className='w-4/12' value='Tệp đính kèm'></ContactInfo>
							<ContactInfo className='w-4/12' value='Tin nhắn chữ'></ContactInfo>
						</div>
					</div>
				</div>
				{
					Array.from({ length: 13 }).map((_, i) => (
						<div key={i} className='bg-white rounded-cbs-md border-[0.5px] border-cbs-border'>
							<div className='p-4 flex'>
								<div className='w-[16.875rem] h-[10.5rem] rounded-cbs overflow-hidden'>
									<img className='w-full h-full object-cover' src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg" alt="" />
								</div>
								<div className='flex-1 text-cbs-subtext text-small pl-4 pr-2'>
									<p>Kinh doanh</p>
									<p className='mt-2 font-bold text-large text-black'>
										Đánh lạc hướng cả thế giới bằng metaverse, Mark Zuckerberg vẫn khó “tẩy trắng” cho Meta: Sau chuỗi ác mộng là giấc mơ vĩ đại, hay thực tại đau thương?
									</p>
									<p className='mt3'>16 phút trước</p>
								</div>
								<div>
									<TButtonMore icon='vertical' className='text-cbs-subtext' />
								</div>
							</div>
						</div>
					))
				}
			</div>
		</div>
	)
}

export default CompanyFeed