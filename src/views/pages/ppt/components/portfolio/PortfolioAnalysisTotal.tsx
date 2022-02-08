import React, { FC, HTMLAttributes, useMemo } from 'react';
import { Link } from 'react-router-dom';

interface Props {
	data?: DataBlock1
}

const PortfolioAnalysisTotal: FC<HTMLAttributes<HTMLDivElement> & Props> = ({ data, ...props }) => {
	const _data = useMemo(() => {
		const _data = [0, 0, 0, 0];
		data?.forEach(d => {
			switch (true) {
				case Boolean(d._id.onbudget) && Boolean(d._id.onbudget):
					_data[0] = d.amount
					break;
				case Boolean(d._id.onbudget) && !d._id.onbudget:
					_data[1] = d.amount
					break;
				case !d._id.onbudget && d._id.onbudget:
					_data[2] = d.amount
					break;
				case !d._id.onbudget && !d._id.onbudget:
					_data[3] = d.amount
					break;
				default:
					break;
			}
		});
		return _data;
	}, [data])

	return <div {...props}>
		<div className='border border-cbs-border h-full px-5 pt-7 pb-8 bg-white'>
			<div className="flex box-border text-3x-large">
				<Link to="/">
					<div className="border-current flex items-center justify-center rounded-full border-4 w-[75px] h-[75px] my-2.5 mx-[25px] text-cbs-green">
						{_data[0]}
					</div>
				</Link>
				<Link to="/">
					<div className="border-current flex items-center justify-center rounded-full border-4 w-[75px] h-[75px] my-2.5 mx-[25px] text-cbs-schedule-nextweek">
						{_data[1]}
					</div>
				</Link>
				<Link to="/">
					<div className="border-current flex items-center justify-center rounded-full border-4 w-[75px] h-[75px] my-2.5 mx-[25px] text-cbs-purple">
						{_data[2]}
					</div>
				</Link>
				<Link to="/">
					<div className="border-current flex items-center justify-center rounded-full border-4 w-[75px] h-[75px] my-2.5 mx-[25px] text-cbs-red">
						{_data[3]}
					</div>
				</Link>
			</div>
			<div className="text-small grid grid-cols-2 gap-y-5 gap-x-8 mt-8">
				<Link to="/">
					<div className='text-cbs-green inline-block bg-current w-3 h-3 rounded-lg mr-2'></div>
					<span>
						Đúng tiến độ, đúng ngân sách
					</span>
				</Link>
				<Link to="/">
					<div className='text-cbs-schedule-nextweek inline-block bg-current w-3 h-3 rounded-lg mr-2'></div>
					<span>
						Chậm tiến độ, đúng ngân sách
					</span>
				</Link>
				<Link to="/">
					<div className='text-cbs-purple inline-block bg-current w-3 h-3 rounded-lg mr-2'></div>
					<span>
						Đúng tiến độ, vượt ngân sách
					</span>
				</Link>
				<Link to="/">
					<div className='text-cbs-red inline-block bg-current w-3 h-3 rounded-lg mr-2'></div>
					<span>
						Chậm tiến độ, vượt ngân sách
					</span>
				</Link>
			</div>
		</div>
	</div>;
};

export default PortfolioAnalysisTotal;
