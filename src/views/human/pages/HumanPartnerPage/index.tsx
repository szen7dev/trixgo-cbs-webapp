/*=====1.LIBRARY=====*/
import { FC, useEffect, useCallback, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu } from '@headlessui/react';
import { toast } from "react-toastify";
import debounce from 'lodash/debounce';

/*=====2.CSS=====*/
import "views/human/styles/style.module.css";

/*=====3.ICONS=====*/
// import BackIcon from "assets/images/icon-back.svg";
import SearchIcon from "assets/images/icons8-search.svg";
// import ThreeDotIcon from "assets/images/icon-3dots.png";

/*=====4.PAGES/COMPONENTS=====*/
import { InputClearable, DropdownOption, Loader } from "shareComponents/common";
import { NewHumanModal } from "views/human/shareComponents/common/NewHumanModal";
import { useModal } from "services/hooks/useModal";
import { DropdownFilterButton } from "views/human/shareComponents/common";

/*=====5.TYPINGS=====*/
import type { Human } from "typings/human";

/*=====6.HOOKS/APIS=====*/
import { useFetchListHuman, useCreateContactMutation, useHumanCustom } from "services/hooks/useHuman";
import { useHistoryTraffics } from "services/hooks/auth/useAuth";
// import { usePcmProject } from "services/hooks/pcm/usePcmProject";

/*=====7.OTHER=====*/
import { APP_ID } from "apis/localdb"
import { createLinkAndClick } from 'utils';
// const ImageStorageUrl = process.env.REACT_APP_URL_S3_CONTACT;

export const HumanPartnerPage: FC = () => {
  const { t } = useTranslation(["human"]);
	const { id: departmentID } = useParams<{ id: string }>();
  // const history = useHistory();

  const [pageParam, setPageParam] = useState<any>({departmentID});
  const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
		isExporting: false,
	});
  const { openModal } = useModal();
  // Lấy ra data/messageList data ngay lúc đầu vào màn hình
  const humans = useFetchListHuman({ ...pageParam, isPartner: 1 });

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

	// const { infoDepartment } = usePcmProject({ departmentID });

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
          <DropdownFilterButton
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

      <div className="px-6 py-4 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 gap-3">
        {humans.listHuman.map((item: Human) => {
          return (
            <div
              key={item._id}
              className="relative flex flex-col justify-between items-center rounded-lg"
              style={{
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                border: "1px solid #cccccc",
              }}
            >
              {/* <div className="absolute top-2 right-2 w-[32px] h-[32px] cursor-pointer flex justify-center items-center bg-cbs-gray rounded-full">
                <img src={ThreeDotIcon} alt="Three Dot" style={{ margin: 0 }} />
              </div> */}
              <div className="text-center ml-2 mr-2 pt-[20px] pb-[17px] h-[220px]">
                <div className="flex justify-center mb-6">
                  <img src={`${process.env.REACT_APP_URL_S3_CONTACT}/${item.image}`} alt="Avatar" className="w-20 h-20 rounded-full" />
                </div>
                <span className="text-xl font-normal">{`${item.name}`}</span>
                <p className="text-sm pt-2 text-secondary-gray">{item?.company?.sign}.{item?.position?.name}</p>
              </div>
              <Link
                to={`/human/home/hid=${item._id}`}
                className="w-full text-center"
              >
                <div className="py-3 text-sm w-full rounded-bl-lg rounded-br-lg border border-primary-gray bg-primary text-primary-light">
                  {t("view-info")}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
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