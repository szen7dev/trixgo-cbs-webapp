import React from 'react'
import cn from "classnames";

import styles from "../../../style.module.css";
import { Link } from 'react-router-dom';
import { Project } from 'typings/items/project';
import { formatNumberMoney } from 'utils/converter';

type Props = {
	projectInfo: Project | undefined
} & React.HTMLAttributes<HTMLDivElement>

const ReportProfile: React.FC<Props> = ({ projectInfo, ...props }) => {
	if(!projectInfo) return <></>

	return (
		<div {...props}>
			<h3>Hồ sơ, bản vẽ và danh bạ</h3>
			<div className={cn(styles['profile-container'], "text-center whitespace-nowrap w-full")}>
				<div>
					<Link to="/">
						<p>{formatNumberMoney(projectInfo.numberOfContact)}</p>
						<p>Danh bạ</p>
					</Link>
				</div>
				<div>
					<Link to="/">
						<p>{formatNumberMoney(projectInfo.numberOfMoms)}</p>
						<p>Biên bản họp</p>
					</Link>
				</div>
				<div>
					<Link to="/">
						<p>{formatNumberMoney(projectInfo.numberOfDocs)}</p>
						<p>Hồ sơ văn bản</p>
					</Link>
				</div>
				<div>
					<Link to="/">
						<p>{formatNumberMoney(projectInfo.numberOfDrawings)}</p>
						<p>Bản vẽ</p>
					</Link>
				</div>
				<div>
					<Link to="/">
						<p>{formatNumberMoney(projectInfo.numberOfReports)}</p>
						<p>Báo cáo</p>
					</Link>
				</div>
				<div>
					<Link to="/">
						<p>{formatNumberMoney(projectInfo.numberOfIpcs)}</p>
						<p>Thanh toán</p>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default ReportProfile
