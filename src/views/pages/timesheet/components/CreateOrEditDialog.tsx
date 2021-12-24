import { FC } from "react";
import Close from "assets/icons/Close";
import DropdownSearchable from "components/common/DropdownSearch";

import { useModal } from "services/hooks/useModal";

const users = [
  {
    _id: 1,
    content: "Phạm Thanh Hương-CPMI",
  },
  {
    _id: 2,
    content: "Phạm Thanh Hương-CPMI",
  },
  {
    _id: 3,
    content: "Phạm Thanh Hương-CPMI",
  },
];

const projects = [
  {
    _id: 1,
    content: "CHG. THTT.Trường trung học cơ sở Tây Hồ Tây",
  },
  {
    _id: 2,
    content: "CHG. THTT.Trường trung học cơ sở Tây Hồ Tây",
  },
  {
    _id: 3,
    content: "CHG. THTT.Trường trung học cơ sở Tây Hồ Tây",
  },
];

const types = [
  {
    _id: 1,
    content: "Chuyên gia",
  },
  {
    _id: 2,
    content: "Chuyên gia",
  },
  {
    _id: 3,
    content: "Chuyên gia",
  },
];

const CreateOrEditDialog: FC = () => {
  const { closeModal } = useModal();

  return (
    <div className="w-full h-[540px] overflow-scroll">
      <div className="fixed top-0 w-full">
        <div
          className={"flex items-center mb-3 border-b bg-cbs-table-header p-2"}
        >
          <div className={"flex-1 flex items-center"}>
            <p className={"text-lg ml-2"}>Tạo mới</p>
          </div>
          <button
            onClick={() => closeModal()}
            className={
              "w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
            }
          >
            <Close />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-20 pb-4 flex flex-col space-y-4 overflow-scroll">
        <div>
          <p className="text-[13px] text-primary-gray mb-1">Nội dung (*)</p>
          <div className="rounded border px-2 py-1 bg-cbs-table-header">
            <textarea
              rows={2}
              className="w-full bg-cbs-table-header focus:outline-none"
              placeholder="Nhập nội dung"
            />
          </div>
        </div>

        <div>
          <p className="text-[13px] text-primary-gray mb-1">Người thực hiện</p>
          <DropdownSearchable
            className={"w-full flex-1 border rounded border-gray-200 py-1 px-3"}
            focusedClass={"border-b border-primary"}
            maxWidthInput={"max-w-none"}
            showTriangle={true}
            renderSelectedItem={(item) => <span>{item.text}</span>}
            data={users}
            formatItem={{
              id: "_id",
              text: "content",
            }}
            inlineSearch={true}
          />
        </div>

        <div>
          <p className="text-[13px] text-primary-gray mb-1">Phân loại</p>
          <DropdownSearchable
            className={"w-full flex-1 border rounded border-gray-200 py-1 px-3"}
            focusedClass={"border-b border-primary"}
            maxWidthInput={"max-w-none"}
            showTriangle={true}
            renderSelectedItem={(item) => <span>{item.text}</span>}
            data={types}
            formatItem={{
              id: "_id",
              text: "content",
            }}
            inlineSearch={true}
          />
        </div>

        <div>
          <p className="text-[13px] text-primary-gray mb-1">Dự án, phòng ban</p>
          <DropdownSearchable
            className={"w-full flex-1 border rounded border-gray-200 py-1 px-3"}
            focusedClass={"border-b border-primary"}
            maxWidthInput={"max-w-none"}
            showTriangle={true}
            renderSelectedItem={(item) => <span>{item.text}</span>}
            data={projects}
            formatItem={{
              id: "_id",
              text: "content",
            }}
            inlineSearch={true}
          />
        </div>
        <div>
          <p className="text-primary-gray text-[13px] mb-1">Ghi chú</p>
          <div className="rounded border px-2 py-1 bg-cbs-table-header">
            <textarea
              rows={2}
              className="w-full bg-cbs-table-header focus:outline-none"
              placeholder="Nhập nội dung ghi chú"
            />
          </div>
        </div>
      </div>

      <div className={"fixed bottom-0 w-full bg-white"}>
        <div className="h-px w-full bg-gray-100 my-3" />
        <div className="flex px-3 w-full justify-end pb-2">
          <button
            className={
              "bg-primary rounded h-[32px] w-[95px] text-white font-semibold"
            }
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrEditDialog;
