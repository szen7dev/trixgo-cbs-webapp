import { FC, useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import moment from "moment";
import FakeUser from "assets/images/fake-user.png";

const PcmTagPage: FC = () => {
	const [filter, setFilter] = useState("all");

	return (
		<main className="h-full overflow-auto">
			<div className={"filter-bar flex flex-wrap px-4 py-2 header-table flex px-4 w-full top-0 bg-white pb-4"}>
				<button
					className={
						"py-1 px-6 mr-2 rounded-full border border-primary-border " +
						(filter === "all"
							? "text-white bg-cbs-secondary border-none"
							: "text-primary-gray bg-white")
					}
				>
					Tất cả hoạt động
				</button>
				<button
					className={
						"py-1 px-6 mr-2 rounded-full border border-primary-border " +
						(filter === "unread"
							? "text-white bg-cbs-secondary border-none"
							: "text-primary-gray bg-white")
					}
				>
					Hoạt động ngày nay
				</button>
				<button
					className={
						"py-1 px-6 mr-2 rounded-full border border-primary-border " +
						(filter === "read"
							? "text-white bg-cbs-secondary border-none"
							: "text-primary-gray bg-white")
					}
				>
					Đơn vị tạo việc
				</button>
				<button
					className={
						"py-1 px-6 mr-2 rounded-full border border-primary-border " +
						(filter === "read"
							? "text-white bg-cbs-secondary border-none"
							: "text-primary-gray bg-white")
					}
				>
					Đơn vị thực hiện
				</button>
			</div>

			<div className="gap-7">
				<div className="px-4 mb-4">
					<p className="text-lg text-primary-gray mb-2">
						HAR.MAR.Court Yard By Marriott Ha Long Bay (105)
					</p>
					<div className="gap-3">
						<div className="flex rounded-lg py-1">
							<img
								src={FakeUser}
								alt="User"
								className="w-[60px] h-[60px] rounded-full mr-2"
							/>
							<div>
								<p className="text-[15px]">Nguyễn Phan Thanh Hương-CPMI</p>
								<p className="text-primary-gray">102 thông báo</p>
							</div>
						</div>

						<div className="flex rounded-lg py-1">
							<img
								src={FakeUser}
								alt="User"
								className="w-[60px] h-[60px] rounded-full mr-2"
							/>
							<div>
								<p className="text-[15px]">Nguyễn Phan Thanh Hương-CPMI</p>
								<p className="text-primary-gray">102 thông báo</p>
							</div>
						</div>

						<div className="flex rounded-lg py-1">
							<img
								src={FakeUser}
								alt="User"
								className="w-[60px] h-[60px] rounded-full mr-2"
							/>
							<div>
								<p className="text-[15px]">Nguyễn Phan Thanh Hương-CPMI</p>
								<p className="text-primary-gray">102 thông báo</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default PcmTagPage