import moment from "moment";
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

//
import Wallethub from '../../common/Wallethub';

//
import iconVideoPlaylist from 'assets/images/icons8-video-playlist-90 1.png';
import converPage from "assets/images/trx-construction-cover2.svg";
import { generatePath, NavLink, useParams } from 'react-router-dom';

import DatahubRepository from 'apis/datahub';
import { useQuery } from 'react-query';
import { ContractorProvider, useContractorCompany } from 'views/datahub/contexts/Company';

interface Props {
  navLinks: { url: string; title: string }[];
}
const DatahubContractorLayoutDetail: FC<Props> = ({ children, navLinks }) => {
	const { data, isLoading } = useContractorCompany();

	const params = useParams<{ id: string }>();
  const datahubPackages = useQuery(
    ["datahub_packages", 2, params.id],
    () => DatahubRepository.getDatahubPackageList(2, { contractorID: params.id }),
    {
      enabled: Boolean(params.id),
    }
  );

	return (
		<div id="datahub-contractor-detail" className='h-full w-full overflow-scroll bg-white'>
			<div className='w-full max-w-[1185px] mx-auto space-y-10'>
				{/* ======= FIRST BLOCK ======= */}
				<div className='bg-white border-cbs-border border-[0.5px] border-b-0 mx-3.5'>
					{/* ======= BACKGROUND ======= */}
					<div className='h-[365px]'>
						<img className='w-full h-full object-cover' src={converPage} alt="" />
					</div>
					{/* ======= GENERAL INFO ======= */}
					<div className='flex border-cbs-border border-b-[0.5px]'>
						<div className='w-4/12'>
							<div className='flex w-full justify-around items-center h-full'>
								<Wallethub title={datahubPackages.data?.data.number1||0} description='Dịch vụ' />
								<Wallethub title={datahubPackages.data?.data.number2||0} description='Dự án' />
								<Wallethub title={datahubPackages.data?.data.number3||0} description='Hợp đồng' />
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
										{ data ? `${data.data.description}`: '' }
										<p><span className='inline-block mr-2 mt-1 bg-cbs-schedule-oneweek rounded-full w-2 h-2'></span>Thành lập {moment(data?.data?.birthDay).format("YYYY")}</p>
									</div>
								</div>
							</div>
							<div className='pt-16 max-w-xs mx-auto text-2x-large'>
								<p className='pt-4 line-clamp-2 text-center'>
									{ data ? data.data.sign + "." + data.data.name : '' }
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
								<Wallethub title={datahubPackages.data?.data.number4||0} description='Khách hàng' />
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
					{/* <div className='space-x-2 flex items-center'>
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
					</div> */}
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