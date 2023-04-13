import { FC } from "react";
import { useModal } from "services/hooks/useModal";
import DatePicker from "react-datepicker";

import {DropdownSearchable} from "shareComponents/common";

import Close from "assets/icons/Close";
import AttachIcon from "assets/images/icons8-attach-50.png";
import TagIcon from "assets/images/icons8-price-tag-96.svg";

const AddNewTaskDialog: FC = () => {
  const { closeModal } = useModal();
  const tempData = [
    {
      _id: 1,
      content: "Trần Thanh Quang",
    },
    {
      _id: 2,
      content: "Trần Thanh Quang 2",
    },
    {
      _id: 3,
      content: "Trần Thanh Quang 3",
    },
    {
      _id: 4,
      content: "Trần Thanh Quang 4",
    },
  ];

  return (
    <>
      <div className={"flex flex-col"}>
        <div className={"flex w-full py-3 px-6 border-b"}>
          <h4 className={"flex-1 text-lg font-bold text-left"}>
            Công việc mới
          </h4>
          <div className={"flex items-center justify-center cursor-pointer"}>
            <Close onClick={() => closeModal()} />
          </div>
        </div>
        {/* input select */}
        <div className={"t-add-new-task-dialog-select px-6"}>
          <div className={"flex pb-1 pt-2 border-b"}>
            <div className={"w-1/4 flex items-start"}>
              <div
                className={
                  "text-left text-gray-500 flex items-center mr-2 mt-1"
                }
              >
                Dự án
              </div>
              <DropdownSearchable
                placeholder={"Dự án"}
                className={"w-full flex-1"}
                showTriangle={false}
                maxWidthInput={"max-w-none"}
                isMultiple={true}
                allowClearValueSingleInput={true}
                renderSelectedItem={(item: any) => (
                  <div className={"flex items-center"}>
                    <img alt={"tag icon"} src={TagIcon} />
                    <span>{item.text}</span>
                  </div>
                )}
                data={tempData}
                formatItem={{
                  id: "_id",
                  text: "content",
                }}
                inlineSearch={true}
              />
            </div>
            <div className={"w-1/4 flex items-start"}>
              <div
                className={
                  "text-left text-gray-500 flex items-center mr-2 mt-1"
                }
              >
                Nhóm
              </div>
              <DropdownSearchable
                placeholder={"Nhóm"}
                className={"w-full flex-11"}
                showTriangle={false}
                maxWidthInput={"max-w-none"}
                isMultiple={true}
                allowClearValueSingleInput={true}
                renderSelectedItem={(item: any) => (
                  <div className={"flex items-center"}>
                    <img alt={"tag icon"} src={TagIcon} />
                    <span>{item.text}</span>
                  </div>
                )}
                data={tempData}
                formatItem={{
                  id: "_id",
                  text: "content",
                }}
                inlineSearch={true}
              />
            </div>
            <div className={"w-1/4 flex items-start"}>
              <div
                className={
                  "text-left text-gray-500 flex items-center mr-2 mt-1"
                }
              >
                Phân loại
              </div>
              <DropdownSearchable
                placeholder={"Phân loại"}
                className={"w-full flex-1"}
                showTriangle={false}
                maxWidthInput={"max-w-none"}
                isMultiple={true}
                allowClearValueSingleInput={true}
                renderSelectedItem={(item: any) => (
                  <div className={"flex items-center"}>
                    <img alt={"tag icon"} src={TagIcon} />
                    <span>{item.text}</span>
                  </div>
                )}
                data={tempData}
                formatItem={{
                  id: "_id",
                  text: "content",
                }}
                inlineSearch={true}
              />
            </div>
            <div className={"w-1/4 flex items-start"}>
              <div
                className={
                  "text-left text-gray-500 flex items-center mr-2 mt-1"
                }
              >
                Tính chất
              </div>
              <DropdownSearchable
                placeholder={"Tính chất"}
                className={"w-full flex-1"}
                showTriangle={false}
                maxWidthInput={"max-w-none"}
                isMultiple={true}
                allowClearValueSingleInput={true}
                renderSelectedItem={(item: any) => (
                  <div className={"flex items-center"}>
                    <img alt={"tag icon"} src={TagIcon} />
                    <span>{item.text}</span>
                  </div>
                )}
                data={tempData}
                formatItem={{
                  id: "_id",
                  text: "content",
                }}
                inlineSearch={true}
              />
            </div>
          </div>
          <div className={"flex pb-1 pt-2 border-b"}>
            <div className={"w-full flex items-start"}>
              <div
                className={
                  "text-left text-gray-500 flex items-center mr-2 mt-1"
                }
              >
                Gửi tới
              </div>
              <DropdownSearchable
                placeholder={"Gửi tới"}
                className={"w-full flex-1"}
                showTriangle={false}
                maxWidthInput={"max-w-none"}
                isMultiple={true}
                allowClearValueSingleInput={true}
                renderSelectedItem={(item: any) => (
                  <div className={"flex items-center"}>
                    <img alt={"tag icon"} src={TagIcon} />
                    <span>{item.text}</span>
                  </div>
                )}
                data={tempData}
                formatItem={{
                  id: "_id",
                  text: "content",
                }}
                inlineSearch={true}
              />
            </div>
          </div>
          <div className={"flex pb-1 pt-2 border-b"}>
            <div className={"w-full flex items-start"}>
              <div
                className={
                  "text-left text-gray-500 flex items-center mr-2 mt-1"
                }
              >
                Liên quan
              </div>
              <DropdownSearchable
                placeholder={"Liên quan"}
                className={"w-full flex-1"}
                showTriangle={false}
                maxWidthInput={"max-w-none"}
                isMultiple={true}
                allowClearValueSingleInput={true}
                renderSelectedItem={(item: any) => (
                  <div className={"flex items-center"}>
                    <img alt={"tag icon"} src={TagIcon} />
                    <span>{item.text}</span>
                  </div>
                )}
                data={tempData}
                formatItem={{
                  id: "_id",
                  text: "content",
                }}
                inlineSearch={true}
              />
            </div>
          </div>
          <div className={"flex pb-1 pt-2 border-b"}>
            <div className={"w-3/4 flex items-start"}>
              <div
                className={
                  "text-left text-gray-500 flex items-center mr-2 mt-1"
                }
              >
                Tiêu đề
              </div>
              <DropdownSearchable
                placeholder={"Tiêu đề"}
                className={"w-full flex-1"}
                showTriangle={false}
                maxWidthInput={"max-w-none"}
                isMultiple={true}
                allowClearValueSingleInput={true}
                renderSelectedItem={(item: any) => (
                  <div className={"flex items-center"}>
                    <img alt={"tag icon"} src={TagIcon} />
                    <span>{item.text}</span>
                  </div>
                )}
                data={tempData}
                formatItem={{
                  id: "_id",
                  text: "content",
                }}
                inlineSearch={true}
              />
            </div>
            <div className={"w-1/4 flex items-start"}>
              <div
                className={
                  "text-left text-gray-500 flex items-center mr-2 mt-1"
                }
              >
                Thời hạn
              </div>
              <DatePicker
                wrapperClassName={"w-auto"}
                name="endDate"
                selected={null}
                customInput={
                  <div className={"relative w-auto ml-2 min-h-fit mt-0.5"}>
                    <input
                      placeholder={"Thời hạn"}
                      type="text"
                      name="startDate"
                      className="focus:outline-none placeholder:text-sm"
                    />
                  </div>
                }
                onChange={() => alert('Tính năng đang phát triển')}
              />
            </div>
          </div>
        </div>

        <div className={"px-6 my-3"}>
          <div
            className="t-add-new-task-dialog-content outline-none"
            contentEditable="true"
            placeholder="Nhập nội dung..."
          ></div>
        </div>

        <div className="t-add-new-task-dialog-attachment px-6 mb-3">
          <div className="t-add-new-task-dialog-attachment-item px-3 py-2 mb-3 flex items-center">
            <p
              className="t-add-new-task-dialog-attachment-title truncate mr-2"
              title="BaoCaoDanhGiaTacDongNgoaiCanhLenThietKeMau.png"
            >
              BaoCaoDanhGiaTacDongNgoaiCanhLenThietKeMau.png
            </p>
            <span className="mr-2">(3.908K)</span>
            <div className="t-home-training-progress-bar w-1/3 mr-2">
              <div style={{ width: "10%" }}></div>
            </div>
            <button className="ml-auto">
              <Close />
            </button>
          </div>
          <div className="t-add-new-task-dialog-attachment-item px-3 py-2 mb-3 flex items-center">
            <p
              className="t-add-new-task-dialog-attachment-title truncate mr-2"
              title="BaoCaoDanhGiaTacDongNgoaiCanhLenThietKeMau.png"
            >
              BaoCaoDanhGiaTacDongNgoaiCanhLenThietKeMau.png
            </p>
            <span className="mr-2">(3.908K)</span>
            <button className="ml-auto">
              <Close />
            </button>
          </div>
          <div className="t-add-new-task-dialog-attachment-item px-3 py-2 mb-3 flex items-center">
            <p
              className="t-add-new-task-dialog-attachment-title truncate mr-2"
              title="BaoCaoDanhGiaTacDongNgoaiCanhLenThietKeMau.png"
            >
              BaoCaoDanhGiaTacDongNgoaiCanhLenThietKeMau.png
            </p>
            <span className="mr-2">(3.908K)</span>
            <button className="ml-auto">
              <Close />
            </button>
          </div>
        </div>

        <div className={"flex items-center border-t py-3 px-6"}>
          <label>
            <img
              src={AttachIcon}
              alt="Icon attach"
              className="h-6 w-6 transform -rotate-45"
            />
            <input
              type="file"
              name="files"
              id="file"
              className="hidden"
              accept="image/*"
              multiple
            />
          </label>
          <div className={"flex items-center ml-4"}>
            <input
              type="checkbox"
              id="email-notice"
              className={"form-check-input mt-0"}
            />
            <label
              htmlFor="email-notice"
              className={"text-left ml-2 whitespace-nowrap"}
            >
              Thông báo email
            </label>
          </div>
          <button className="btn btn-primary ml-auto">Xác nhận</button>
        </div>
      </div>
    </>
  );
};

export default AddNewTaskDialog;
