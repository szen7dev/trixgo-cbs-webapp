import { FC, useEffect, useMemo } from "react";

import cn from "classnames";
import LayoutPrimary from "../media/layouts/LayoutPrimary";

const pages = [
	{ id: '1', title: 'Hồ sơ dự thầu', path: '/pcm/project/1/bidding' },
	{ id: '2', title: 'Hồ sơ mời thầu', path: '/pcm/project/2/bidding' },
	{ id: '3', title: 'Tư vấn thầu', path: '/pcm/project/3/bidding' },
]

const ProjectBiddingPage: FC = () => {
	useEffect(() => {
		document.title = "CHG.THT-Lựa chọn nhà thầu"
	}, []);
	const data = useMemo(() => Array.from({ length: 3 }).map((_, index) => ({
		_id: index,
		project: { sign: 'test' },
		name: 'San lấp mặt bằng toàn bộ công trình',
		expiredTime: Date.now(),
		description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, rem?",
		data: Array.from({ length: Math.ceil(Math.random() * 10) }).map((_d, i) => ({
			_id: i,
			budget: 10000000 * Math.ceil(Math.random() * 3),
			predict: 100000000 * Math.ceil(Math.random() * 3),
			signed: 100000000 * Math.ceil(Math.random() * 3),
			advance: 100000000 * Math.ceil(Math.random() * 3),
			volume: 100000000 * Math.ceil(Math.random() * 3),
			finish: 100000000 * Math.ceil(Math.random() * 3),
			pay: 100000000 * Math.ceil(Math.random() * 3),
			rest: 100000000 * Math.ceil(Math.random() * 3),
			note: 'Xây dựng mẫu BoQ cho công tác preliminaries'
		}))
	})), []);

	return (
		<LayoutPrimary
			pages={pages}
		>
			<div className=''>
				<h2>Lựa chọn nhà thầu</h2>
			</div>
		</LayoutPrimary>
	);
};
export default ProjectBiddingPage;