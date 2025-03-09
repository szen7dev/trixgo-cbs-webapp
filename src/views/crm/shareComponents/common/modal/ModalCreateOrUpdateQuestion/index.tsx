import React, { UIEvent, FC, useState } from "react";
import { toast } from "react-toastify";
import moment from 'moment';
import { useModal } from "services/hooks/useModal";
import { useMediaMenu } from "services/hooks/crm/useMediaQuestion";
import { DropdownSearchable } from "shareComponents/common";
import debounce from 'lodash/debounce';
import { useGoods } from "services/hooks/items/useGoods";

export const ModalCreateOrUpdateQuestion: FC<any> = ({
  modalType,
  onConfirm,
  initialValues = {
    questionID: '',
    goodsID: '',
    type: 1,
    status: 1,
    name: '',
    expired: '',
    slug: '',
    note: '',
  }
}) => {
  const { closeModal } = useModal();
  const [formData, setFormData] = useState(initialValues);
  const { refetch: refetchCustomer, insertAsync, updateAsync } = useMediaMenu({});
  const [keywordGoods, setKeywordGoods] = useState('');

  const {
      list: listGoods,
  } = useGoods({
      params: { 
          usage: 2,
          keyword: keywordGoods, 
      },
      isFetchList: true,
  })

  const handleSubmit = async () => {
    if(!formData.name) {
      return toast.warn('Vui lòng nhập nội dung');
    }

    try {
      // Handle api here!
      switch (modalType) {
        // Tạo mẩu tin
        case 'create': {
          const { error, data } = await insertAsync(formData);

          if (error) {
            return toast.error(data.message);
          }
          refetchCustomer();
          toast.success('Tạo thành công', { autoClose: 1500 });
          break;
        }

        // Cập nhật mẩu tin
        case 'update': {
          const { error, message, data } = await updateAsync({
            ...formData,
            type: `${formData.type}`,
            status: `${formData.status}`,
          })

          if (error) {
            if(data.message){
              return toast.error(data.message);
            }
            return toast.error(message);
          }
          refetchCustomer();
          toast.success('Cập nhật thành công', { autoClose: 1500 });
          break;
        }

        default:
          break;
      }
    } catch (error: unknown) {
      if (typeof error === "string") {
        toast.error(error);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }

    onConfirm && onConfirm();
    closeModal();
  };

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop === clientHeight;
    return bottom;
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((previous: any) => ({
      ...previous,
      [name]: value
    }))
  }

  return (
    <main className="relative"  style={{
        height: "500px",
    }}>
      <header className="px-5 py-2 flex items-center justify-between">
        <p className="font-bold text-xl">
          {modalType === 'create' ? 'Tạo' : 'Cập nhật'}
        </p>
        <img
          src={`${process.env.PUBLIC_URL}/images/common/icon-small-bold-close.svg`}
          alt="Close"
          className="cursor-pointer"
          onClick={closeModal}
        />
      </header>

      <section className="px-5 mt-2">
          <label className="block text-gray-700 text-sm font-bold" htmlFor="txtInitialDay" title="Bắt buộc nhập thông tin">
            Sản phẩm  (*)
          </label>
          <DropdownSearchable
            onchangeValue={(value: any) => {
                setFormData((previous: any) => ({
                    ...previous,
                    goodsID: value?.id
                }))
            }}
            onClearData={() => {
                setFormData((previous: any) => ({
                    ...previous,
                    goodsID: ""
                }))
            }}
            onSearchInputChange={debounce((value: any) => setKeywordGoods(value), 600)}
            onScroll={handleScroll}
            className="w-full rounded-md border border-primary-border px-1 placeholder-primary-gray bg-cbs-table-header"
            placeholder="Tìm kiếm sản phẩm"
            isMultiple={false}
            allowClearValueSingleInput={true}
            showTriangle={false}
            maxWidthInput="max-w-full"
            renderSelectedItem={(item: any) => (
                <div className="max-w-full">
                    <p className={"truncate"}>{item.text}</p>
                </div>
            )}
            data={listGoods.map((item:any) => ({
                label: item.name,
                value: item._id,
            }))}
            initialValue={{
              value: formData?.goods?._id || "",
              label: formData?.goods?.name || "Chọn sản phẩm"
            }}
            formatItem={{
                id: "value",
                text: "label",
            }}
            inlineSearch={true}
          />
      </section>

      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtDescription" title="Bắt buộc nhập thông tin">
          Câu hỏi (*)
        </label>
        <input
          type="text"
          placeholder="Nội dung"
          name="name"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.name}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
          Câu trả lời
        </label>
        <input
          type="text"
          placeholder="Nhập trả lời"
          name="note"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.note}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtDescription" title="Bắt buộc nhập thông tin">
          Trạng thái
        </label>
        <div className={"flex items-center"}>
            <div className={"flex items-center ml-3"}>
                <input
                  type="radio"
                  value={1}
                  name="status"
                  className="form-check-input mt-0"
                  defaultValue={formData.status}
                  checked={formData.status == 1?true: false}
                  onChange={onChange}
                />
                <label htmlFor="status" className={"text-left ml-3"}>Active</label>
            </div>
            <div className={"flex items-center ml-3"}>
                <input
                  type="radio"
                  value={2}
                  name="status"
                  className="form-check-input mt-0"
                  defaultValue={formData.status}
                  checked={formData.status == 2?true: false}
                  onChange={onChange}
                />
                <label htmlFor="status" className={"text-left ml-3"}>Inactive</label>
            </div>
          </div>
      </section>

      <footer className="absolute right-0 bottom-0 px-5 py-5">
        <button className="bg-primary text-primary-light text-base w-24 h-8 rounded"
          onClick={handleSubmit}>
          Xác nhận
        </button>
      </footer>
    </main>
  )
}