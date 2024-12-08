/*=====1.LIBRARY=====*/
import { FC, useRef, useState, useCallback, ChangeEvent } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";
import moment from "moment";
import { toast } from "react-toastify";
import { Link, useParams, useHistory } from "react-router-dom";
import { validateFiles } from 'validation/file';
import { APP_ID } from "apis/localdb";

/*=====2.CSS=====*/
import styles from "views/support/styles/support.module.css";

/*=====3.ICONS=====*/
import iconPencil from 'assets/images/icons8-pencil-96 1.png';
import CameraIcon from "assets/images/camera-icon.svg";

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput } from "shareComponents/common";
import { ModalCreateOrUpdateFunda } from '../../shareComponents/common';
import { convertCurrency } from "utils/converter";

/*=====5.TYPINGS=====*/
import { Storage } from "typings/items";

/*=====6.HOOKS/APIS=====*/
import { useModal } from "services/hooks/useModal";
import { useFunda } from "services/hooks/items/useFunda";
import { useUpload } from "services/hooks/useUpload";
import { useAuth } from "services/hooks/auth/useAuth";
import API from "apis/repository";

/*=====7.OTHER=====*/
const CAMPAIGN_CONSTANT = ["Tắt", "Bật"];
const INTERNAL_CONSTANT = ["Hệ thống", "Nhượng quyền"];
const PLATFORM_CONSTANT = ["Bán tại điểm bán", "Bán qua sàn bán lẻ"];

export const ItemFundasPage: FC<{ type: number }> = ({ type }) => {
    const { user } = useAuth();
	const history = useHistory();
    const { closeModal, openModal } = useModal();
    const [keyword, setKeyword] = useState('');
	const { parentID } = useParams<{ parentID: string }>();

    const [itemsChecked, setItemsChecked] = useState<Array<any>>([]);
    const [initialValues, setInitialValues] = useState({
        fundaID: '',
        description: '',
        name: "",
        sign: "",
        phone: "",
        bankAccount: '',
        loyaltyPointsRate: '',
        address: '',
        area1: '', 
        area2: '',
        area3: '',
        project: '',
        manager: '',
        initialDay: new Date(),
        campaign: 1,
        internal: 1,
        platform: 1,
        activeCampaign: [],
        trialStaffSalary: 0,
        officialStaffSalar: 0,
    });

    const {
        list: listFunda,
        hasNextPage,
        refetch,
        fetchNextPage,
        totalRecord
    } = useFunda({
        params: { 
            option: 1,
            limit: 50,
            keyword, 
            isListParentOfListChilds: "1", 
            populates: { 
                "path": "area1 area2 area3 warehouse contact images project manager",
                "select": "name sign path funda fullname",
                populate: {
                    "path": 'funda',
                    "select": "name sign path",
                }
            }, 
            parentID 
        },
        isFetchList: true
    })

    // Reset form
    const clearData = () => {
        setInitialValues(previousValue => ({
            ...previousValue,
            fundaID: '',
            name: '',
            description: '',
        }))
    }

    // Gọi lại API refetch lại danh sách sau khi tạo/update thành công
    const handleConfirmCreateOrUpdate = () => refetch();

    // Xử lý sự kiện tìm kiếm
    const onChangeSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    }, 500);

    // Làm việc với update mẩu tin
    const onClickCheckButton = (doc: Storage.Storage) => {
        const check = itemsChecked.find(item => item._id === doc._id);
        let newListIDChecked = [];

        if (check) {
            newListIDChecked = itemsChecked.filter(item => item._id !== doc._id)
            setItemsChecked(newListIDChecked);
        } else {
            newListIDChecked = [...itemsChecked, doc];
            setItemsChecked(newListIDChecked);
        };

        if (newListIDChecked.length === 1) {
            const { _id, name, sign, phone, bankAccount, loyaltyPointsRate, description, address, initialDay, platform, campaign, internal, area1, area2, area3, project, activeCampaign, trialStaffSalary, officialStaffSalar, manager } = newListIDChecked[0];
            setInitialValues({
                fundaID: _id,
                name,
                sign,
                phone,
                bankAccount,
                loyaltyPointsRate,
                description,
                address,
                initialDay,
                campaign,
                platform,
                internal,
                area1, 
                area2,
                area3,
                project,
                manager,
                activeCampaign,
                trialStaffSalary: Number(trialStaffSalary),
                officialStaffSalar: Number(officialStaffSalar),
            });
        } else {
            clearData();
        }
    };

    // Check chọn 1 hoặc nhiều mẩu tin
    const getStateChecked = useCallback((id: string) => {
        const user = itemsChecked.find(item => item._id === id);
        return user ? true : false;
    }, [itemsChecked]);

    const getStateCheckedAll = useCallback(() => {
        return itemsChecked.length == listFunda.length;
    }, [itemsChecked]);

    const onClickCheckAll = () => {
        if (itemsChecked.length == listFunda.length) {
            setItemsChecked([]);
        } else {
            setItemsChecked(listFunda);
        }
    };

    const handleOpenModalCreateOrUpdate = (modalType: 'create' | 'update') => {

        let initValues: any = {...initialValues};
        setItemsChecked([]);

        // Mở modal tạo mới
        if(modalType === 'create') {
            clearData();
            initValues = {
                parentID,
                fundaID: '',
                name: '',
                sign: '',
                phone: '',
                bankAccount: '',
                loyaltyPointsRate: '',
                description: '',
                address: '',
                initialDay: new Date(),
                campaign: 1,
                internal: 1,
                platform: 1,
                activeCampaign: [],
                trialStaffSalary: 0,
                officialStaffSalar: 0,
            };
        }

        openModal(
            <div
                className={"inline-block w-[521px] h-[300px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"}
                style={{
                    height: "1100px",
                }}
            >
                <ModalCreateOrUpdateFunda
                    modalType={modalType}
                    initialValues={initValues}
                    onConfirm={handleConfirmCreateOrUpdate}
                />
            </div>
        )
    }

    /**
     * UPLOAD HÌNH ẢNH
     */
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { addFileToUpload } = useUpload({
		appID: APP_ID.FNB.id,
		companyID: user?.company?._id,
	});

    const handleUploadAttach = async (filesSelected: FileList | null, fundaID: string) => {
		if (!filesSelected || !filesSelected.length) return;

		const validation = await validateFiles(filesSelected);
		if (validation.error) return toast.warn(validation.message);

		// Clear input file
		if (fileInputRef.current) {
		  fileInputRef.current.value = '';
		}

		const imagesID: any = [];
		const bankQrcode: any = [];

		// Upload images
		for (const [_, file] of Object.entries(filesSelected)) {
			const { _id } = await addFileToUpload({
				files: file as any,
				fileType: 1,
				progress: percentCompleted => {
					console.info(`${percentCompleted}%`)
				}
			})
			_id && imagesID.push(_id);
			_id && bankQrcode.push(_id);
		}

		// Update image to products
		await API.put(
			`/api/item/fundas`,
			{
				fundaID,
				imagesID,
                bankQrcode
			}
		);
		refetch();
	  }

    return (
        <main className="relative h-full">
            <header className="sticky top-0 bg-primary-light z-10">
                <div className="h-[50px] border border-primary-border flex items-center justify-between px-5">
                    <div className="flex items-center">
                        <button onClick={history.goBack}>
							<img src="/images/common/button_back.png" alt="Button Back" />
						</button>
                        <p className="text-lg ml-2">Danh sách</p>

                        <SearchInput
                            classNameWrapper="ml-4 mr-2"
                            classNameInput="outline-none w-[296px]"
                            onChange={onChangeSearch}
                        />

                        {itemsChecked.length === 1 ? (
                            <button
                                className="mr-3"
                                onClick={() => handleOpenModalCreateOrUpdate('update')}
                            >
                                <img src={iconPencil} alt="icon pencil" />
                            </button>
                        ) : ''}
                    </div>

                    <div className="flex items-center">
                        <button
                            className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold"
                            onClick={() => handleOpenModalCreateOrUpdate('create')}
                            >
                            Tạo mới
                        </button>
                        <div className="w-10 h-10 bg-secondary-light rounded-full flex items-center justify-center ml-5 cursor-pointer">
                            <img src={`${process.env.PUBLIC_URL}/images/common/icon-3dots-vertical-gray.svg`} alt="Three Dot" />
                        </div>
                    </div>
                </div>
            </header>

            <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
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
                            </div>
                        </th>
                        <th className="w-1/6 py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Nội dung
                            </div>
                        </th>
                        <th className="w-1/6 py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                               Mã hiệu
                            </div>
                        </th>
                        <th className="w-1/6 py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                               Mô tả
                            </div>
                        </th>
                        <th className="w-1/6 py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Địa chỉ
                            </div>
                        </th>
                        <th className={cn("py-1 font-normal", styles.theadTwelvePercent)}>
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                             Ngày bắt đầu
                            </div>
                        </th>
                        <th className={cn("py-1 font-normal", styles.theadTwelvePercent)}>
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Lương thử việc/giờ
                            </div>
                        </th>
                        <th className={cn("py-1 font-normal", styles.theadTwelvePercent)}>
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Lương chính thức/Ca đêm/giờ
                            </div>
                        </th>
                        <th className={cn("py-1 font-normal", styles.theadTwelvePercent)}>
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                              Phân loại
                            </div>
                        </th>
                        <th className="w-1/12 py-1 font-normal">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Thành viên
                            </div>
                        </th>
                        <th className="w-1/12 py-1 font-normal">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Hình ảnh
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {listFunda.length ? listFunda.map((item: any) => (
                        <tr key={item._id} className="border-b border-primary-border h-10">
                            <td className="py-1 px-2 text-center">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={getStateChecked(item._id)}
                                    onChange={() => onClickCheckButton(item)}
                                />
                            </td>
                            <td className="py-1 px-2">
                                <Link to={`/item/fundas/${item._id}`}>
                                    {item.amountChilds>0? <b>{item?.name}({item.amountChilds})</b>: item.name }
                                </Link>
                                <p className="text-primary "><i>{item?.warehouse?.name}</i></p>
                                <p className="text-primary "><i>{item?.contact?.name}</i></p>
                                <hr />
                                <p className="text-primary "><i>Quản lý: {item?.manager?.fullname}</i></p>
                                <hr />
                                <p>TKNH: <b>{item?.bankAccount}</b></p>
                                <p className="text-primary-gray text-[12px]"><i>{item._id}</i></p>
                            </td>
                            <td className="py-1 px-2">{item?.sign}</td>
                            <td className="py-1 px-2">{item?.description}</td>
                            <td className="py-1 px-2">
                                {item?.address}, {item?.area3?.name}, {item?.area2?.name}, {item?.area1?.name}
                                <p className="text-primary"><i>Dự án: {item?.project?.name}</i></p>
                                <p className="text-primary"><i>Link cơ sở: {item?.project?.funda?.name}</i></p>
                            </td>
                            <td className="py-1 px-2">{moment(item.initialDay).format('L')}</td>
                            <td className="py-1 px-2">{convertCurrency(Number(item?.trialStaffSalary).toFixed(0))}</td>
                            <td className="py-1 px-2">
                                {convertCurrency(Number(item?.officialStaffSalar).toFixed(0))}
                                <p><i>Ca đêm: {convertCurrency(Number(item?.nightShiftStaffSalary).toFixed(0))}</i></p>
                            </td>
                            {/* <td className="py-1 px-2">{CAMPAIGN_CONSTANT[item?.campaign-1]}</td> */}
                            <td className="py-1 px-2">
                                <p>{INTERNAL_CONSTANT[item?.internal-1]}</p>
                                <p className="text-primary ">{PLATFORM_CONSTANT[item?.platform-1]}</p>
                            </td>
                            <td className="py-1 px-2 text-primary-gray">
                                 <Link to={`/item/fundas/${item._id}/members`}  className="underline text-sky-600">
                                    Xem thành viên
                                </Link>
                            </td>
                            <td className={"p-2 border-0.5 border-primary-border"}>
								<div style={{display: "flex"}}>
									{!!item?.images?.length && (
										<img
											className="w-[75px] h-[75px] object-contain"
											src={`${process.env.REACT_APP_URL_S3}${item?.images[item?.images?.length - 1]?.path}`}
											alt="Left side bar"
										/>
									)}
								</div>
                                <div>
                                    <label className="ml-2">
                                        <div className="w-[30px] h-[30px] bg-secondary-gray rounded-full flex items-center justify-center">
                                            <img
                                                src={CameraIcon}
                                                alt="Camera"
                                                className="w-[15px] h-[13px]"
                                            />
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleUploadAttach(e.target.files, item._id)}
                                            />
                                        </div>
                                    </label>
                                </div>
							</td>
                        </tr>
                    )) : <></>}
                </tbody>
            </table>

            {hasNextPage && (
                <div className="w-full flex justify-center my-5">
                    <button onClick={fetchNextPage}>
                        <span className="text-primary">
                            {`Xem thêm (${totalRecord - listFunda.length})`}
                        </span>
                    </button>
                </div>
            )}
        </main>
    )
}