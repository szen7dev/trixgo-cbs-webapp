import { FC, useState } from "react";
import cn from "classnames";
import moment from "moment";

import { Paginate, SearchInput, ModalContainer, Loader } from "shareComponents/common";
import { ModalCreateCompany } from 'views/support/shareComponents/common';
import PolygonIcon from "assets/images/icon-polygon.svg";
import CompanyLogo from "assets/images/thumbnail1.jpg";
import ThreeDotVerticalIcon from "assets/images/icon-3dots-vertical-gray.svg";

import styles from "views/support/styles/support.module.css";
import { useQueryListCompany } from 'services/hooks/useCompanies';

export const SupportCompanyPage: FC = () => {
  const [itemChecked, setItemChecked] = useState(false);
  const [modalCreateCompany, setModalCreateCompany] = useState<boolean>(false);
  const {
    data: dataListCompanies,
    loading: isLoading,
    totalPages,
    totalRecord,
    hasNextPage,
    refetch,
    fetchNextPage,
    fetchPreviousPage
  } = useQueryListCompany();

  const toggleModalCreateCompany = () => setModalCreateCompany(!modalCreateCompany);
  const prevPageAction = () => fetchPreviousPage();
  const nextPageAction = () => fetchNextPage();
  const onConfirmCreateCompany = () => refetch();

  const initialValues = {
    name: "",
    sign: "",
    taxid: "",
    address: "",
    area: ""
  }

  if (isLoading) {
    return <Loader className="border-primary" />
  }

  return (
    <main className="relative h-full">
      <header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-12 px-6 border border-primary-border">
        <div className="flex items-center">
          <p className="text-lg">Danh sách</p>
          <SearchInput
            classNameWrapper="ml-4"
            classNameInput="outline-none w-[296px]"
            onChange={() => ''}
          />
          {/* <FinancialCashFlowFilterButton />
          {itemChecked && (
            <div className="border-l-2 border-primary-border ml-5 pl-5">
              <ActionGroupFinancial />
            </div>
          )} */}
        </div>
        <div className="flex items-center">
          <button
            className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold"
            onClick={toggleModalCreateCompany}
          >
            Tạo mới
          </button>
          <div className="w-10 h-10 bg-secondary-light rounded-full flex items-center justify-center ml-5 cursor-pointer">
            <img src={ThreeDotVerticalIcon} alt="Three Dot" />
          </div>
        </div>
      </header>
			<div className="overflow-auto" style={{height:'calc(100% - 87px)'}}>
				<table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
					<thead className="bg-cbs-table-header h-[38px] border-b border-primary-border">
						<tr className="text-left text-sm">
							<th className={cn("py-1 text-center", styles.theadInput)}>
								<div className="border-r-2 border-gray-300 flex items-center justify-center">
									<input
										className="form-check-input mr-2"
										type="checkbox"
										value=""
										id="flexCheckDefault"
										defaultChecked
									/>
									<img src={PolygonIcon} alt="Polygon" />
								</div>
							</th>
							<th className="w-1/5 py-1">
								<div className="border-r-2 border-gray-300 font-normal pl-2">
									Nội dung
								</div>
							</th>
							<th className={cn("py-1 font-normal", styles.theadSignDate)}>
								<div className="border-r-2 border-gray-300 font-normal pl-2">
									Mã hiệu
								</div>
							</th>
							<th className={cn("py-1 font-normal", styles.theadSignDate)}>
								<div className="border-r-2 border-gray-300 font-normal pl-2">
									Logo
								</div>
							</th>
							<th className="w-1/6 py-1 font-normal">
								<div className="border-r-2 border-gray-300 font-normal pl-2">
									Địa chỉ
								</div>
							</th>
							<th className="w-1/12 py-1 font-normal">
								<div className="border-r-2 border-gray-300 font-normal pl-2">
									Mã số thuế
								</div>
							</th>
							<th className="w-1/12 py-1 font-normal">
								<div className="border-r-2 border-gray-300 font-normal pl-2">
									Điện thoại
								</div>
							</th>
							<th className="w-2/12 py-1 font-normal">
								<div className="border-r-2 border-gray-300 font-normal pl-2">
									Email
								</div>
							</th>
							<th className={cn("py-1 font-normal", styles.theadTenPercent)}>
								<div className="border-r-2 border-gray-300 font-normal pl-2">
									Ngày khởi tạo
								</div>
							</th>
							<th className="w-1/12 py-1 font-normal">
								<div className="font-normal pl-2">Quy mô</div>
							</th>
						</tr>
					</thead>

					<tbody>
						{dataListCompanies.length ? dataListCompanies.map(company => (
							<tr key={company._id} className="border-b border-primary-border h-10">
								<td className="py-1 px-2 text-center">
									<input
										className="form-check-input"
										type="checkbox"
										value=""
										id="flexCheckDefault"
										style={{ marginLeft: "-23px" }}
										defaultChecked={itemChecked}
										onClick={() => setItemChecked(!itemChecked)}
									/>
								</td>
								<td className="py-1 px-2">{company.name}</td>
								<td className="py-1 px-2">{company.sign}</td>
								<td className="py-1 px-2">
									<img src={company.image ? `${process.env.REACT_APP_URL_S3_COMPANY}/${company.image}` : CompanyLogo} alt="Company" className="w-10 h-10" />
								</td>
								<td className="py-1 px-2">
									{company.address}
								</td>
								<td className="py-1 px-2">{company.taxid}</td>
								<td className="py-1 px-2">{company.phone}</td>
								<td className="py-1 px-2">{company.email}</td>
								<td className="py-1 px-2">{moment(company.createAt).format('DD/MM/YYYY')}</td>
								<td className="py-1 px-2">{company.scale}</td>
							</tr>
						)) : ''}
					</tbody>
				</table>
			</div>

      <ModalContainer isModalOpen={modalCreateCompany} toggle={toggleModalCreateCompany}>
        <div className="inline-flex flex-col text-black w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl">
          <ModalCreateCompany
            modalType="create"
            show={modalCreateCompany}
            toggle={toggleModalCreateCompany}
            initialValues={initialValues}
            onConfirm={onConfirmCreateCompany}
          />
        </div>
      </ModalContainer>

      <Paginate
        totalPages={totalPages}
        totalRecord={totalRecord}
        hasNextPage={hasNextPage}
        prevPageAction={prevPageAction}
        nextPageAction={nextPageAction} />
    </main>
  );
};