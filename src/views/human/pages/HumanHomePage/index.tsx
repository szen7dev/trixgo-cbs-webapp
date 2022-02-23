/*=====1.LIBRARY=====*/
import { FC, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

/*=====2.CSS=====*/
import "views/human/styles/style.module.css";

/*=====3.ICONS=====*/
import SearchIcon from "assets/images/icons8-search.svg";
import ThreeDotIcon from "assets/images/icon-3dots.png";

/*=====4.PAGES/COMPONENTS=====*/
import { NewHumanModal } from "views/human/shareComponents/common/NewHumanModal";
import { useModal } from "services/hooks/useModal";
import { DropdownFilterButton } from "views/human/shareComponents/common";

/*=====5.TYPINGS=====*/
import type { Human } from "typings/human";

/*=====6.HOOKS/APIS=====*/
import { useFetchListHuman, useCreateContactMutation } from "services/hooks/useHuman";

/*=====7.OTHER=====*/
const ImageStorageUrl = process.env.REACT_APP_URL_S3_CONTACT;

export const HumanHomePage: FC = () => {
  const { t } = useTranslation(["human"]);

  const [pageParam, setPageParam] = useState<any>({});

  // Lấy ra data/messageList data ngay lúc đầu vào màn hình
  const humans = useFetchListHuman(pageParam);

  const { openModal } = useModal();

  // Tạo mẩu tin mới, khởi tạo sẵn hàm createContactMutateAsync để khi user
  // bấm vào nút tạo thì gọi luôn đến api tạo mẩu tin
  const { createContactMutateAsync } = useCreateContactMutation();

  const handleFinishForm = useCallback(async (values) => {
    const res = await createContactMutateAsync(values);
    if (!res.error) {
      humans.refetchListHuman()
      return true;
    }
    return false;
  }, [createContactMutateAsync, humans]);

  const handleOnFilter = useCallback((values) => {
    // console.log(values);
    setPageParam(() => ({ ...values }));
    return true;
  }, []);

  const handleOnCancelFilter = useCallback(() => {
    setPageParam({});
  }, []);

  return (
    <section className="w-full">
      <div className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-12 px-6 border border-gray-200">
        <div className="flex items-center">
          <p className="text-lg">Danh sách</p>
          <div className="relative px-4">
            <span>
              <img
                src={SearchIcon}
                alt="Search"
                className="absolute top-2 left-7 w-4 h-4"
              />
            </span>
            <input
              type="text"
              placeholder="Nhập từ khóa tìm kiếm"
              className="w-[296px] h-[30px] pl-10 outline-none bg-cbs-table-header"
            />
          </div>
          <DropdownFilterButton
            onSubmit={handleOnFilter}
            onCancel={handleOnCancelFilter}
            initialValues={pageParam}
          />
          {/* <button className="w-[78px] h-[30px] flex items-center justify-around bg-cbs-table-header rounded text-primary-gray">
            <img src={SortIcon} alt="Sort" />
            <span>Filter</span>
          </button> */}
        </div>
        <button
          className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold"
          onClick={() =>
            openModal(
              <div
                className={
                  "inline-block w-screen h-screen overflow-hidden transition-all transform bg-primary-light shadow-xl rounded absolute left-0 right-0 top-0"
                }
              >
                <NewHumanModal
                  onFinish={handleFinishForm}
                />
              </div>
            )
          }
        >
          Tạo mới
        </button>
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
              <div className="absolute top-2 right-2 w-[32px] h-[32px] cursor-pointer flex justify-center items-center bg-cbs-gray rounded-full">
                <img src={ThreeDotIcon} alt="Three Dot" style={{ margin: 0 }} />
              </div>
              <div className="text-center ml-2 mr-2 pt-[20px] pb-[17px] h-[220px]">
                <div className="flex justify-center mb-6">
                  <img src={`${ImageStorageUrl}/${item.image}`} alt="Avatar" className="w-20 h-20 rounded-full" />
                </div>
                <span className="text-xl font-normal">{`${item.name}`}</span>
                <p className="text-sm pt-2 text-secondary-gray">{item?.position?.name}</p>
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
      {humans.totalRecord && humans.totalRecord - humans.listHuman.length > 0 && (
        <div className="w-full flex justify-center my-5">
          <button onClick={() => humans.fetchNextPageHuman()}>
            <span className="text-primary">{`Xem thêm (${humans.totalRecord - humans.listHuman.length
              })`}</span>
          </button>
        </div>
      )}
    </section>
  );
};