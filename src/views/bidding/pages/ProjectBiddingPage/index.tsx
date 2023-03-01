import React, { FC, useEffect, useState } from "react";
import debounce from 'lodash/debounce';

import InfiniteScroll from "react-infinite-scroll-component";
import { Link, generatePath } from "react-router-dom";

import { useQueryListDepartmentsIsMember } from "services/hooks/items/useDepartment";

import projectImage from "assets/images/project.jpg";

// ========== Global Components ==========
import { SearchInput, ButtonCreate, ButtonMore } from "shareComponents/common";

// ========== App common Components ==========
// import DropdownFilterButton from "views/pages/document/components/DocumentFilterButton";
import { APP_ID, PROJECT_STAGE } from 'apis/localdb'

// Utils
import { dateLoadedPercentage, formatDate } from "utils/ppt";
import 'views/document/styles/document.css'
import { useCheckPerAccessScreen } from "services/hooks/auth/usePermissions";

const { REACT_APP_URL_S3, REACT_APP_URL_S3_PROJECT } = process.env;

export const ProjectBiddingPage: FC = () => {
	const [keyword, setKeyword] = useState('');
	
	const { createPermission, updatePermission, deletePermission } = useCheckPerAccessScreen({
		appID: APP_ID.PCM.id,
		menuID: APP_ID.PCM.menuPcmApp.projects.id,
		type: "1"
	});

	const { data: listDepartments, fetchNextPage, hasNextPage, totalRecord } = useQueryListDepartmentsIsMember({
		limit: 20,
		type: 2,
		keyword,
		isFetch: true
	});

	useEffect(() => {
		document.title = "Danh sách dự án";
	}, []);

	const onChangeSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value);
	}, 600)
	
	return (
		<div className="flex flex-col text-sm text-black overflow-hidden h-full">
			{/* Header */}
			<div className="px-4 flex items-center w-full text-primary-gray bg-white border-b-[0.5px] border-cbs-border py-1">
				<div className="flex flex-1 items-center">
					<span className="text-x-large mr-7 text-black">
						Danh sách
					</span>
					<SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu mr-2" onChange={onChangeSearch} />
					{/* <DropdownFilterButton /> */}
				</div>
				{createPermission &&
					<ButtonCreate />
				}
				{(updatePermission || deletePermission) &&
					<ButtonMore />
				}
			</div>
			
			<div className="flex-1 overflow-y-auto">
        <table
          className="text-black text-medium border-separate space-x-0 space-y-0 w-full"
          style={{ borderSpacing: 0 }}
        >
          <thead className="">
            <tr className="text-primary-gray whitespace-nowrap align-middle text-left">
              <th className="px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-b border-cbs-border w-1">
			  	<span className="pl-2 border-l border-cbs-border">STT</span>
              </th>
              <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-b border-cbs-border">
                <span className="pl-2 border-l border-cbs-border">Nội dung</span>
              </th>
              <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-b border-cbs-border">
                <span className="pl-2 border-l border-cbs-border">Tổng mức đầu tư</span>
              </th>
              <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-b border-cbs-border">
                <span className="pl-2 border-l border-cbs-border">Tổng số gói thầu</span>
              </th>
              <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-b border-cbs-border">
                <span className="pl-2 border-l border-cbs-border">Số gói chưa thực hiện</span>
              </th>
			  <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-b border-cbs-border">
                <span className="pl-2 border-l border-cbs-border">Số gói đang thực hiện</span>
              </th>
			  <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-b border-cbs-border">
                <span className="pl-2 border-l border-cbs-border">Số gói đã hoàn thành</span>
              </th>
			  <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-b border-cbs-border">
                <span className="pl-2 border-l border-cbs-border">Tổng giá trị hoàn thành</span>
              </th>
            </tr>
          </thead>
          <tbody className="text-small">
            {(listDepartments && listDepartments.length) ?
              listDepartments.map((item: any, index) => (
                <tr
                  key={item._id}
                  className="text-left hover:bg-cbs-active-comment cursor-pointer"
                >
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-center"  >
					          <span className="pl-2 ">{ index+ 1}</span>
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link to={`/bidding/plan/${item._id}`}
                      className="hover:text-cbs-primary"
                    >
                      {item.sign}.{item.name}
                    </Link>
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">
                    {(item.budget || 0 + item.vatBudget || 0).toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">
				  	        {item.numberOfPackage || 0}
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">
					          { item.numberOfUnexecutedPackage || 0}
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                    { item.numberOfExecutedPackage || 0}
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                    { item.numberOfCompletedPackage || 0}
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                      { item.amountOfCompletedPackage || 0} ({item.percentOfCompletedPackage || 0}%)
                  </td>
                </tr>
              )) : <></>}
          </tbody>
        </table>
      </div>

		{hasNextPage && (
			<div className="w-full flex justify-center my-5">
			<button onClick={fetchNextPage}>
				<span className="text-primary">
				{`Xem thêm (${totalRecord - listDepartments.length})`}
				</span>
			</button>
			</div>
		)}
		</div>
	);
};