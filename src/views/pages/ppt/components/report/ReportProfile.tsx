import React from 'react'

import cn from "classnames";

import styles from "../../style.module.css";

const ReportProfile: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
	return (
		<div {...props}>
			<h3>Hồ sơ, bản vẽ và danh bạ</h3>
			<div className={cn(styles['profile-container'], "text-center whitespace-nowrap w-max")}>
				<div>
					<p>84</p>
					<p>Danh bạ</p>
				</div>
				<div>
					<p>122</p>
					<p>Biên bản họp</p>
				</div>
				<div>
					<p>2.632</p>
					<p>Hồ sơ văn bản</p>
				</div>
				<div>
					<p>55</p>
					<p>Bản vẽ</p>
				</div>
				<div>
					<p>55</p>
					<p>Báo cáo</p>
				</div>
				<div>
					<p>226</p>
					<p>Thanh toán</p>
				</div>
			</div>
		</div>
	)
}

export default ReportProfile
