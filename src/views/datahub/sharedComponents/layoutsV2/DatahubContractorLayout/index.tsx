import { FC } from 'react'
import Skeleton from 'react-loading-skeleton';
import Wallethub from '../../common/Wallethub';
import iconVideoPlaylist from 'assets/images/icons8-video-playlist-90 1.png'
import { NavLink, useParams, generatePath } from 'react-router-dom';

import SearchIcon from 'assets/icons/SearchIcon';
import DotsHorizontalIcon from 'assets/icons/DotsHorizontalIcon';
import iconChat from 'assets/images/icons8-chat-room-100 1.png'
import iconRss from 'assets/images/icons8-rss-100 (1) 1.png'
import { ContractorProvider, useContractorCompany } from 'views/datahub/contexts/Company';

interface Props {
  navLinks: { url: string; title: string }[];
}
const DatahubContractorLayoutDetail: FC<Props> = ({ children, navLinks }) => {
	const { data, isLoading } = useContractorCompany();

	const params = useParams<{ id: string }>();
	return (
		<div id="datahub-contractor-detail" className='h-full w-full overflow-scroll bg-white'>
			<div className='w-full max-w-[1185px] mx-auto space-y-10'>
				{/* ======= FIRST BLOCK ======= */}
				<div className='bg-white border-cbs-border border-[0.5px] border-b-0 mx-3.5'>
					{/* ======= BACKGROUND ======= */}
					<div className='h-[365px]'>
						<img className='w-full h-full object-cover' src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg" alt="" />
					</div>
					{/* ======= GENERAL INFO ======= */}
					<div className='flex border-cbs-border border-b-[0.5px]'>
						<div className='w-4/12'>
							<div className='flex w-full justify-around items-center h-full'>
								<Wallethub title="125" description='Dịch vụ' />
								<Wallethub title="125" description='Dự án' />
								<Wallethub title="125" description='Hợp đồng' />
							</div>
						</div>
						<div className='w-4/12 pb-4'>
							<div className='mt-0 h-0 flex items-center'>
								<div className='flex w-full'>
									<div className='w-4/12'></div>
									<div className='w-4/12 bg-white rounded-full p-1 aspect-ratio-1'>
										{
											isLoading
												? <Skeleton className='h-full w-full border-cbs-border border-[0.5px] rounded-full bg-gray-600' />
												: <img className='w-full h-full object-cover border-cbs-border border-[0.5px] rounded-full' src={process.env.REACT_APP_URL_S3_COMPANY + '/' + data?.data.image} alt="" />
										}
									</div>
									<div className='whitespace-nowrap w-4/12 self-end pb-2.5 px-2.5'>
										<p>Quản lý dự án, Tư vấn giám sát</p>
										<p><span className='inline-block mr-2 mt-1 bg-cbs-schedule-oneweek rounded-full w-2 h-2'></span>Thành lập 2010 - 12 năm</p>
									</div>
								</div>
							</div>
							<div className='pt-16 max-w-xs mx-auto text-2x-large'>
								<p className='pt-4 line-clamp-2 text-center'>
									{
										data
											? data.data.sign + "." + data.data.name
											: ''
									}
								</p>
							</div>
						</div>
						<div className='w-4/12 flex items-center'>
							<div className='flex items-end justify-around w-full'>
								<div>
									<button className='bg-cbs-primary text-white px-5 py-2 rounded-cbs'>
										<img className='inline-block w-6 h-6' src={iconVideoPlaylist} alt='' />
										Xem video giới thiệu
									</button>
								</div>
								<Wallethub title="32" description='Khách hàng' />
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='w-full max-w-[1185px] mx-auto space-y-10 sticky top-0 z-2'>
				{/* ======= LIST ACTIONS ======= */}
				<div className='bg-white sticky top-0 flex justify-between px-4 mx-3.5 border-[0.5px] border-cbs-border border-t-0'>
					<div className='space-x-8'>
            {navLinks.map(({url, title}) => (
              <NavLink
                exact
                key={url}
                className="inline-block py-5 border-b border-transparent"
                activeClassName="text-cbs-primary border-cbs-primary"
                to={generatePath(url, params)}
              >
                {title}
              </NavLink>
            ))}
					</div>
					<div className='space-x-2 flex items-center'>
						<button className='bg-cbs-active-comment text-cbs-primary p-1.5 rounded-cbs'>
							<img className='inline-block w-6 h-6 mr-2' src={iconRss} alt="" />
							Theo dõi
						</button>
						<button className='bg-cbs-gray text-cbs-subtext p-1.5 rounded-cbs'>
							<img className='inline-block w-6 h-6 mr-2' src={iconChat} alt="" />
							Nhắn tin
						</button>
						<button className='bg-cbs-gray text-cbs-subtext p-1.5 rounded-cbs'>
							<SearchIcon className='h-6 w-6' />
						</button>
						<button className='bg-cbs-gray text-cbs-subtext p-1.5 rounded-cbs'>
							<DotsHorizontalIcon className='h-6 w-6' />
						</button>
					</div>
				</div>
			</div>
			<div className='flex justify-center'>
				<div className='w-full max-w-[1185px] mt-4 flex justify-center'>
					{children}
				</div>
			</div>
		</div >
	)
}
const DatahubContractorLayout: FC<Props> = ({ children, navLinks }) => {
  return (
    <ContractorProvider>
      <DatahubContractorLayoutDetail navLinks={navLinks}>
        {children}
      </DatahubContractorLayoutDetail>
    </ContractorProvider>
  );
};

export default DatahubContractorLayout