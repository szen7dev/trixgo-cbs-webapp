import { FC } from "react";
import { Link } from "react-router-dom";
import { ModalContainer } from "shareComponents/common";
import { abbreviateNumber } from 'utils';
import iconComment from 'assets/images/icon-chat-project.png';

interface Props {
	isModalOpen: boolean,
	toggle(): void,
	icon: string,
	data: any[],
	total?: number,
	userID?: string,
}

export const ModalListUser: FC<Props> = ({ isModalOpen, toggle, icon, data, total, userID }) => {
	return (
		<ModalContainer isModalOpen={isModalOpen} toggle={toggle}>
			<div className="inline-flex flex-col text-black my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl" style={{ width: "550px", maxHeight: "440px" }}>
				<div className="flex items-center justify-between border-b border-secondary-gray border-opacity-30 px-3">
					<div className="flex">
						<div className="flex items-center justify-center border-b-2 border-primary py-4 text-primary" style={{ minWidth: "100px" }}>
							<img src={icon} alt="Like" className="inline-block" />
							<span className="ml-3">
								{abbreviateNumber(total)}
							</span>
						</div>
					</div>
					<button className="bg-primary-gray bg-opacity-20 p-2 rounded-3xl mr-1 h-10 w-10" onClick={toggle}>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<ul className="py-1 overflow-y-auto custom-scroll">
					{(data && data.length) ? data.map((item: any) => (
						<li key={item._id} className="flex justify-between pl-4 pr-2 py-2">
							<div className="flex">
								<img src={`${process.env.REACT_APP_URL_S3_USER}/${item?.userCreate?.image}`} alt="avatar" className="h-10 w-10 rounded-full mr-3" />
								<div>
									<p className="text-black text-[15px]">{item?.userCreate?.bizfullname}</p>
									<p className="leading-[15px] mt-1">
										{userID === item?.userCreate?._id ? 'Đã là bạn' : ''}
									</p>
								</div>
							</div>
							<div>
								<Link to={`/messages/#${item?.userCreate?._id}`} className="flex items-center text-black py-1.5 pl-1.5 pr-4 bg-gray-100 rounded-md">
									<img src={iconComment} alt="" className="inline-block w-6 h-6 mr-1" />
									Nhắn tin
								</Link>
							</div>
						</li>
					)) : ''}
				</ul>
			</div>
		</ModalContainer>
	)
}