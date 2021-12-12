import React from 'react'

import cn from "classnames";

import styles from "../../style.module.css";
import { Link } from 'react-router-dom';

const ReportProfile: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
	return (
		<div {...props}>
			<h3>Hồ sơ, bản vẽ và danh bạ</h3>
			<div className={cn(styles['profile-container'], "text-center whitespace-nowrap w-full")}>
				<div>
					<Link to="/">
						<p>84</p>
						<p>Danh bạ</p>
					</Link>
				</div>
				<div>
					<Link to="/">
						<p>122</p>
						<p>Biên bản họp</p>
					</Link>
				</div>
				<div>
					<Link to="/">
						<p>2.632</p>
						<p>Hồ sơ văn bản</p>
					</Link>
				</div>
				<div>
					<Link to="/">
						<p>55</p>
						<p>Bản vẽ</p>
					</Link>
				</div>
				<div>
					<Link to="/">
						<p>55</p>
						<p>Báo cáo</p>
					</Link>
				</div>
				<div>
					<Link to="/">
						<p>226</p>
						<p>Thanh toán</p>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default ReportProfile
