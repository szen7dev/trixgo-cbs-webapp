import React from 'react';
import { Link } from 'react-router-dom';
import parse from "html-react-parser";
import _truncate from "lodash/truncate";

import { useRelatedResponse } from 'services/hooks/useTask';

type Props = {
	projectID: string;
} & React.HTMLAttributes<HTMLDivElement>

const ReportQuickReport: React.FC<Props> = ({ projectID, ...props }) => {
	const { listResponses } = useRelatedResponse({
		params: {
		  projectID,
		  switchType: 'PROJECT',
		  isGetReaction: false,
		  limit: 3
		},
		isFetch: true
	});

	return (
		<div {...props}>
			<h3>Báo cáo nhanh về dự án (tình trạng, việc nóng)</h3>
			<div className='mt-2.5 mb-4 text-black'>
				{/* <p><u><b>TÌNH TRẠNG CHÍNH</b></u></p> */}
				{(listResponses && listResponses.length) ? listResponses.map(response => (
					<p key={response._id}>
						{parse(_truncate(response.content, { length: 200 }))}
					</p>
				)) : ''}
				{/* <p>
					Hồ sơ thiết kế bản vẽ thi công đã có để phục vụ việc triển khai. Đã có dự toán và khối lượng ban đầu
				</p>
				<p><u>
					<b>HOT FIX</b>
				</u></p>
				<p>
					Cần tập trung đẩy nhanh công tác chọn thầu theo đúng kế hoạch các bên đã thống nhất. Xử lý quan hệ với địa phương để đảm...
				</p> */}
			</div>
			<Link to={`/pcm/project/${projectID}/responses`} className="text-cbs-primary">
				Xem tất cả
			</Link>
		</div>
	)
}

export default ReportQuickReport