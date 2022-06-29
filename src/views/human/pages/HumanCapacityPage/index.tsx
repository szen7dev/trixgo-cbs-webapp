/*=====1.LIBRARY=====*/
import { FC, useEffect, useCallback, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu } from '@headlessui/react';
import { toast } from "react-toastify";
import debounce from 'lodash/debounce';
import cn from "classnames";
import moment from "moment";

/*=====2.CSS=====*/
import "views/human/styles/style.module.css";
import styles from "views/support/styles/support.module.css";

/*=====3.ICONS=====*/
// import BackIcon from "assets/images/icon-back.svg";
import SearchIcon from "assets/images/icons8-search.svg";
// import ThreeDotIcon from "assets/images/icon-3dots.png";

/*=====4.PAGES/COMPONENTS=====*/
import { InputClearable, DropdownOption, Loader } from "shareComponents/common";
import { NewHumanModal } from "views/human/shareComponents/common/NewHumanModal";
import { useModal } from "services/hooks/useModal";
import { DropdownFilterButtonCapacity } from "views/human/shareComponents/common";

/*=====5.TYPINGS=====*/
import type { Human } from "typings/human";

/*=====6.HOOKS/APIS=====*/
import { useFetchListHuman, useCreateContactMutation, useHumanCustom } from "services/hooks/useHuman";
import { useHistoryTraffics } from "services/hooks/auth/useAuth";
// import { usePcmProject } from "services/hooks/pcm/usePcmProject";

/*=====7.OTHER=====*/
import { APP_ID , GENDER_TYPES} from "apis/localdb"
import { createLinkAndClick } from 'utils';
// const ImageStorageUrl = process.env.REACT_APP_URL_S3_CONTACT;

export const HumanCapacityPage: FC = () => {
  const { t } = useTranslation(["human"]);
	const { id: departmentID } = useParams<{ id: string }>();
  // const history = useHistory();

  const [pageParam, setPageParam] = useState<any>({departmentID});
  const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
		isExporting: false,
	});
  const { openModal } = useModal();
  const [itemsChecked, setItemsChecked] = useState<Array<any>>([]);

  // Lấy ra data/messageList data ngay lúc đầu vào màn hình
  const humans = useFetchListHuman(pageParam);

  // Tạo mẩu tin mới, khởi tạo sẵn hàm createContactMutateAsync để khi user
  // bấm vào nút tạo thì gọi luôn đến api tạo mẩu tin
  const { createContactMutateAsync } = useCreateContactMutation();
  const { createHistoryTraffics } = useHistoryTraffics();
  const { exportHumanAsync } = useHumanCustom({});

  useEffect(() => {
    createHistoryTraffics(
      {
        "appID": APP_ID.HUMAN.id,
        "menuID": APP_ID.CMCS.menuCmcsApp.income.id,
        "type": 1
      }
    )
  }, [])
  
  const handleFinishForm = useCallback(async (values) => {
    const res = await createContactMutateAsync(values);
    if (!res.error) {
      humans.refetchListHuman()
      return true;
    }
    return false;
  }, [createContactMutateAsync, humans]);

  const handleOnFilter = useCallback((values) => {
    const optionFilter = {
      ...values,
      type: values.type?._id ?? values.type,
      gender: values.gender?._id ?? values.gender,
      realStatus: values.realStatus?._id ?? values.realStatus,
      insuranceStatus: values.insuranceStatus?._id ?? values.insuranceStatus,
      familyPolicy: values.familyPolicy?._id ?? values.familyPolicy,
      departmentID: values.department?._id ?? values.department,
      positionID: values.position?._id ?? values.position,
      contractTypeID: values.contractType?._id ?? values.contractType,
      workingStatusID: values.workingStatus?._id ?? values.workingStatus,
      educationalBackground2: values.educationalBackground2?._id ?? values.educationalBackground2,
      field2: values.field2?._id ?? values.field2
    }

    setPageParam(optionFilter);
    return true;
  }, []);

  // const handleOnCancelFilter = useCallback(() => {
  //   setPageParam({departmentID});
  // }, []);

  const handleOnCancelFilter = useCallback(() => {
    setPageParam({});
  }, []);

  const handleExportReport = async () => {
		try {
			setStateExport({ isExporting: true });
			const { error, data } = await exportHumanAsync({
        filterParams: pageParam
      });

			if(error) {
				return toast.warn(data?.message);
			}

			data && createLinkAndClick(data, '_self');
		} catch (error: any) {
      toast.error(error.message)
		} finally {
			setStateExport({ isExporting: false });
		}
	}

  // Check chọn 1 hoặc nhiều mẩu tin
  const getStateChecked = useCallback((id: string) => {
      const user = itemsChecked.find(item => item._id === id);
      return user ? true : false;
  }, [itemsChecked]);

  const getStateCheckedAll = useCallback(() => {
      return itemsChecked.length == humans.listHuman.length;
  }, [itemsChecked]);

  const onClickCheckAll = () => {
      if (itemsChecked.length == humans.listHuman.length) {
          setItemsChecked([]);
      } else {
          setItemsChecked(humans.listHuman);
      }
  };
  if(stateExport.isExporting) {
    return <Loader className="border-primary" />
  }
  return (
    <section className="w-full">
      <div className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-12 px-6 border border-gray-200">
        <div className="flex items-center">
          <p className="text-lg">Danh sách</p>
        {/* <img
          src={BackIcon}
          alt="Back"
          onClick={() => history.goBack()}
          className="cursor-pointer"  />
          &ensp;
          <p className="text-lg truncate">{infoDepartment?.data?.sign}.{infoDepartment?.data?.name}</p> */}
          <div className="relative pl-4">
            <span>
              <img
                src={SearchIcon}
                alt="Search"
                className="absolute top-2 left-7 w-4 h-4"
              />
            </span>
            <InputClearable
              placeholder="Nhập từ khóa tìm kiếm"
              className="w-[296px] h-[30px] pl-10 outline-none bg-cbs-table-header"
              onChange={debounce((value) => {
                handleOnFilter({
                  keyword: value,
                })
              }, 800)}
              initialValue={pageParam.keyword}
              isSlider={false}
            />
          </div>
          <DropdownFilterButtonCapacity
            onSubmit={handleOnFilter}
            onCancel={handleOnCancelFilter}
            initialValues={pageParam}
          />
        </div>

        <div className="task-management-header-right-block flex items-center">
          <button
            className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold mr-4"
            onClick={() =>
              openModal(
                // <div className={ "inline-block w-screen h-screen overflow-hidden transition-all transform bg-primary-light shadow-xl rounded absolute left-0 right-0 top-0" } >
                  <div
                    className={
                      "inline-block w-screen h-screen overflow-hidden transition-all transform bg-primary-light shadow-xl rounded absolute left-0 right-0 top-0"
                    }
                  >
                  <NewHumanModal onFinish={handleFinishForm} />
                </div>
              )
            }
          >
            Tạo mới
          </button>

          <DropdownOption>
            {/* IN ẤN */}
            <Menu.Item onClick={handleExportReport}>
              <div className={"w-full hover:bg-gray-100 flex items-center px-4 py-3"}>
                <img src="/images/common/icons8-download-48.png" alt="Download Excel" />
                <div className={"flex-1 text-left ml-4"}>
                  Download Excel
                </div>
              </div>
            </Menu.Item>
          </DropdownOption>
        </div>
      </div>
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
                <th className="py-1">
                    <div className="border-r-2 border-gray-300 font-normal pl-2">
                      Mã hiệu
                    </div>
                </th> 
                <th className="w-1/12 py-1">
                    <div className="border-r-2 border-gray-300 font-normal pl-2">
                      Họ tên
                    </div>
                </th>
                <th className="w-1/12 py-1">
                    <div className="border-r-2 border-gray-300 font-normal pl-2">
                      Ảnh đại diện
                    </div>
                </th>
                <th className="w-1/6 py-1">
                    <div className="border-r-2 border-gray-300 font-normal pl-2">
                      Chức vụ
                    </div>
                </th>
                <th className="py-1">
                    <div className="border-r-2 border-gray-300 font-normal pl-2">
                      Giới tính
                    </div>
                </th>
                <th className="py-1">
                    <div className="border-r-2 border-gray-300 font-normal pl-2">
                      Trình độ
                    </div>
                </th>
                <th className={cn("py-1 font-normal", styles.theadTwelvePercent)}>
                    <div className="border-r-2 border-gray-300 font-normal pl-2">
                      Chuyên ngành
                    </div>
                </th>
                <th className="py-1 font-normal">
                    <div className="border-r-2 border-gray-300 font-normal pl-2">
                        Năm kinh nghiệm
                    </div>
                </th>
                <th className="py-1 font-normal">
                    <div className="border-r-2 border-gray-300 font-normal pl-2">
                    </div>
                </th>
                <th className="py-1 font-normal">
                    <div className="border-r-2 border-gray-300 font-normal pl-2">
                      Loại hợp đồng
                    </div>
                </th>
                <th className="py-1 font-normal">
                    <div className="border-r-2 border-gray-300 font-normal pl-2">
                      Tình trạng
                    </div>
                </th>
                <th className="py-1 font-normal">
                    <div className="border-r-2 border-gray-300 font-normal pl-2">
                      Nơi làm việc hiện tại
                    </div>
                </th>
            </tr>
        </thead>

        <tbody>
              {humans.listHuman.length ? humans.listHuman.map((item: any) => {
                const d = new Date();
                let minYear = d.getFullYear();
                item.documents?.forEach((subitem: any) => {
                  if(subitem.educationalBackground2){
                    if(subitem.toDate && Number(subitem.toDate.getFullYear()) < Number(minYear)){
                      minYear = Number(subitem.toDate.getFullYear())
                    }
                  }
                })
                const arr = ['Dưới 5 năm','Từ 5 đến dưới 10 năm','Từ 10 đến dưới 15 năm','Từ 15 năm trở lên']
                const arr2 = ['Cấp L1','Cấp L2','Cấp L3','Cấp L4']
                let numberAgo = 0, type = 0;
                if(item.graduationYear){
                  numberAgo = Number(d.getFullYear() - new Date(item?.graduationYear).getFullYear())
                }
                if(numberAgo < 5){
                  type = 0
                }else if(numberAgo >= 5 && numberAgo < 10 ){
                  type = 1
                }else if(numberAgo >= 10 && numberAgo < 15 ){
                  type = 2	
                }else{
                  type = 3		
                }
                return (
                  <tr key={item._id} className="border-b border-primary-border h-10">
                      <td className="py-1 px-2 text-center">
                          <input
                              className="form-check-input"
                              type="checkbox"
                              checked={getStateChecked(item._id)}
                              // onChange={() => onClickCheckButton(item)}
                          />
                      </td>
                      <td className="py-1 px-2">{item?.sign}</td>
                      <td className="py-1 px-2">
                          <Link to={`/human/home/hid=${item._id}`}>
                              {item.amountChilds>0? <b>{item.name}({item.amountChilds})</b>: item.name }
                          </Link>
                      </td>
                      <td className="py-1 px-2">
                        <img
                          src={item.image ? `${process.env.REACT_APP_URL_S3_CONTACT}/${item.image}` : `${process.env.REACT_APP_URL_S3_CONTACT}/contact_default.png`}
                          alt="Member"
                          className="w-6 h-6 rounded-full"
                        />
                      </td>
                      <td className="py-1 px-2">{item.position?.name}</td>
                      <td className="py-1 px-2">{(Number(item.gender) > 0) && GENDER_TYPES[Number(item.gender)-1].text}</td>
                      <td className="py-1 px-2">{item.documents?.[0]?.educationalBackground2?.name}</td>
                      <td className="py-1 px-2">{item.documents?.[0]?.field2?.name}</td>
                      <td className="py-1 px-2">{numberAgo}</td>
                      <td className="py-1 px-2">
                        <i>{arr[type]}</i>
                        <i>{arr2[type]}</i>
                      </td>
                      <td className="py-1 px-2">
                        {item?.contractType?.name}
                      </td>
                      <td className="py-1 px-2">
                        {item?.workingStatus?.name}
                      </td>
                      <td className="py-1 px-2">
                        {item?.workplace?.[0]?.name}
                      </td>
                  </tr> 
                )
            }) : <></>}
        </tbody>
      </table>
      {!!humans.totalRecord && humans.totalRecord - humans.listHuman.length > 0 && (
        <div className="w-full flex justify-center my-5">
          <button onClick={() => humans.fetchNextPageHuman()}>
            <span className="text-primary">{`Xem thêm (${humans.totalRecord - humans.listHuman.length })`}</span>
          </button>
        </div>
      )}
    </section>
  );
};