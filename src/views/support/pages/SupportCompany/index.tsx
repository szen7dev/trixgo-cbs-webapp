import { FC, useState, useCallback, ChangeEvent, useEffect } from "react";
import cn from "classnames";
import moment from "moment";
import debounce from 'lodash/debounce';
import { toast } from "react-toastify";

import { SearchInput, ModalContainer, Loader } from "shareComponents/common";
import { ModalCreateOrUpdateCompany, ModalConfirm } from 'views/support/shareComponents/common';
import CompanyLogo from "assets/images/thumbnail1.jpg";
import DeleteIcon from "assets/images/icons8-remove.svg";
import iconPencil from 'assets/images/icons8-pencil-96 1.png';
import ThreeDotVerticalIcon from "assets/images/icon-3dots-vertical-gray.svg";
import CameraIcon from "assets/images/camera-icon.svg";

import styles from "views/support/styles/support.module.css";
import { useQueryListCompany } from 'services/hooks/useCompanies';
import { useModal } from "services/hooks/useModal";
import { CompanyItem } from "typings/companies";
import { useUpload } from 'services/hooks/useUpload';
import { useCompany } from 'services/hooks/useCompanies';

export const SupportCompanyPage: FC = () => {
	const { closeModal, openModal } = useModal();
	const [keyword, setKeyword] = useState('');
	const [modalCreateCompany, setModalCreateCompany] = useState<boolean>(false);
	const [companiesChecked, setCompaniesChecked] = useState<Array<any>>([]);
    const [imgaeCompanyName, setImageCompanyName] = useState("");

	const [initialValues, setInitialValues] = useState({
		companyID: "",
		name: "",
		sign: "",
		taxid: "",
		address: "",
		areaName: "",
		area: "",
		phone: "",
		email: "",
		description: "",
		birthDay: "",
		website: "",
	})
	
	const { addFileToUpload } = useUpload({
		typeUpload: 'company'
	});

	const {
		data: dataListCompanies,
		loading: isLoading,
		totalRecord,
		hasNextPage,
		refetch,
		fetchNextPage,
	} = useQueryListCompany({ keyword });
	const { createCompanyAsync, updateCompanyAsync } = useCompany();

	const toggleModalCreateOrUpdateCompany = () => setModalCreateCompany(!modalCreateCompany);
	// const prevPageAction = () => fetchPreviousPage();
	// const nextPageAction = () => fetchNextPage();
	const onConfirmCreateCompany = () => refetch();

	const onSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value), 600);

	const clearData = () => {
		setInitialValues({
			companyID: "",
			name: "",
			sign: "",
			taxid: "",
			address: "",
			area: "",
			areaName: "",
			phone: "",
			email: "",
			description: "",
			birthDay: "",
			website: ""
		})
	}

  	const onClickCheckButton = (user: CompanyItem) => {
		const check = companiesChecked.find(item => item._id === user._id);
		let newListIDChecked = [];

		if (check) {
			newListIDChecked = companiesChecked.filter(item => item._id !== user._id)
			setCompaniesChecked(newListIDChecked);
		} else {
			newListIDChecked = [...companiesChecked, user];
			setCompaniesChecked(newListIDChecked);
		};

		if(newListIDChecked.length === 1) {
			const { _id, name, sign, taxid, address, area, phone, email, description, birthDay, website } = newListIDChecked[0];
			setInitialValues({
				companyID: _id,
				areaName: area?.name,
				area: area?._id,
				name,
				sign,
				taxid,
				address,
				phone,
				email,
				description,
				birthDay,
				website
			});
		} else{
			clearData();
		}
	};

  	const getStateChecked = useCallback((id: string) => {
    	const user = companiesChecked.find(item => item._id === id);
		return user ? true : false;
	}, [companiesChecked]);

  	const getStateCheckedAll = useCallback(() => {
		return companiesChecked.length == dataListCompanies.length;
	}, [companiesChecked]);

	const onClickCheckAll = () => {
		if (companiesChecked.length == dataListCompanies.length) {
			setCompaniesChecked([]);
		} else {
			setCompaniesChecked(dataListCompanies);
		}
	};

	const handleConfirmDelete = async () => {
		toast.info('Tính năng đang phát triển');
		closeModal();
	}

	if (isLoading) {
		return <Loader className="border-primary" />
	}

	const handleChangeLogo = async (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if(!files || !files.length) return toast.warning("Vui lòng chọn ảnh công ty");

		const { name } = await addFileToUpload({
			files: files[0] as any,
			fileType: 1,
			useCompress: true
		});

		if(name){
			const companyID = event.target.name;
			// Cập nhật hình ảnh
			const { error, message } = await updateCompanyAsync({ companyID, image: name });
			setTimeout(() => {
				refetch();
			}, 1000);
		}
	}

	return (
		<main className="relative h-full">
			<header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-12 px-6 border border-primary-border">
				<div className="flex items-center">
					<p className="text-lg">Danh sách</p>
					<SearchInput
						classNameWrapper="ml-4"
						classNameInput="outline-none w-[296px]"
						onChange={onSearch}
					/>

					{companiesChecked.length === 1 ? (
						<button
							className="mr-3"
							onClick={() => {
							setCompaniesChecked([]);
							toggleModalCreateOrUpdateCompany();
							}}
						>
							<img src={iconPencil} alt="icon pencil" />
						</button>
					) : ''}

					{companiesChecked.length ? (
					<button
						onClick={() =>
						openModal(
							<div
							className={
								"inline-block w-[521px] h-[185px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
							}
							>
								<ModalConfirm onConfirm={handleConfirmDelete} />
							</div>
						)
						}>
						<img src={DeleteIcon} alt="Delete" />
					</button>
					) : ''}
					{/* <FinancialCashFlowFilterButton />
					{ && (
						<div className="border-l-2 border-primary-border ml-5 pl-5">
						<ActionGroupFinancial />
						</div>
					)} */}
				</div>
				<div className="flex items-center">
					<button
						className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold"
						onClick={() => {
							setCompaniesChecked([]);
							clearData();
							toggleModalCreateOrUpdateCompany();
						}}
					>
						Tạo mới
					</button>
					<div className="w-10 h-10 bg-secondary-light rounded-full flex items-center justify-center ml-5 cursor-pointer">
						<img src={ThreeDotVerticalIcon} alt="Three Dot" />
					</div>
				</div>
			</header>
			<div className="overflow-auto" style={{height:'calc(100% - 87px)'}}>
				<table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border pl-10">
					<thead className="bg-cbs-table-header h-[38px] border-b border-primary-border">
						<tr className="text-left text-sm">
							<th className={cn("py-1 text-center", styles.theadInput)}>
								<div className="border-r-2 border-gray-300 flex items-center justify-center">
									<input
										className="form-check-input"
										type="checkbox"
										defaultChecked={getStateCheckedAll()}
										onClick={onClickCheckAll}
									/>
									{/* <img src={PolygonIcon} alt="Polygon" className="ml-1" /> */}
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
										checked={getStateChecked(company._id)}
										onChange={() => onClickCheckButton(company)}
									/>
								</td>
								<td className="py-1 px-2">{company.name}</td>
								<td className="py-1 px-2">{company.sign}</td>
								<td className="py-1 px-2">
									<span>
										<img src={company.image ? `${process.env.REACT_APP_URL_S3_COMPANY}/${company.image}` : CompanyLogo} alt="Company" className="w-10 h-10" />
										<input type="file" name={company._id}  accept="image/*"  onChange={handleChangeLogo} />
									</span>
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

				{hasNextPage && (
					<div className="w-full flex justify-center my-5">
						<button onClick={fetchNextPage}>
							<span className="text-primary">
								{`Xem thêm (${totalRecord - dataListCompanies.length})`}
							</span>
						</button>
					</div>
				)}
			</div>

			<ModalContainer isModalOpen={modalCreateCompany} toggle={toggleModalCreateOrUpdateCompany}>
				<div className="inline-flex flex-col text-black w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl">
				<ModalCreateOrUpdateCompany
					modalType={initialValues.companyID ? 'update' : 'create'}
					show={modalCreateCompany}
					toggle={toggleModalCreateOrUpdateCompany}
					initialValues={initialValues}
					onConfirm={onConfirmCreateCompany}
				/>
				</div>
			</ModalContainer>

			{/* <Paginate
				totalPages={totalPages}
				totalRecord={totalRecord}
				hasNextPage={hasNextPage}
				prevPageAction={prevPageAction}
				nextPageAction={nextPageAction} /> */}
		</main>
	);
};