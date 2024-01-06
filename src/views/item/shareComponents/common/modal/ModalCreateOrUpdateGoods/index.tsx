import React, { UIEvent, FC, useState } from "react";
import debounce from "lodash/debounce";
import { useModal } from "services/hooks/useModal";
import { useGoods } from "services/hooks/items/useGoods";
import { toast } from "react-toastify";
import { DropdownSearchable, Popover } from "shareComponents/common";

export const ModalCreateOrUpdateGoods: FC<any> = ({
  modalType,
  onConfirm,
  initialValues = {
    goodsID: '',
    name: '',
    sign: '',
    unit: '',
    unitprice: 0,
    description: '',
    note: '',
    convert: '',
    convertQuantity: 1,
  }
}) => {
  const { closeModal } = useModal()
  const [formData, setFormData] = useState(initialValues)
  // const { insertAsync, updateAsync } = useGoods({})

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop >= clientHeight - 10;
    if (!bottom || !hasNextPage) return;

    fetchNextPage();
}

  const [keyword, setKeyword] = useState('');

  const {
    list: listGoods,
    hasNextPage,
    refetch,
    fetchNextPage,
    totalRecord,
    insertAsync, 
    updateAsync
} = useGoods({
    params: { keyword },
    isFetchList: true
})

  const handleSubmit = async () => {
    if(!formData.name) {
      return toast.warn('Vui lòng nhập nội dung');
    }
    const formDataFormat = { ...formData, unitprice: +formData.unitprice, convertQuantity: +formData.convertQuantity }
    try {
      // Handle api here!
      switch (modalType) {
        // Tạo mẩu tin
        case 'create': {
          const { error, message } = await insertAsync(formDataFormat);

          if (error) {
            return toast.warning(message);
          }

          toast.success('Tạo thành công', { autoClose: 1500 });
          break;
        }

        // Cập nhật mẩu tin
        case 'update': {
          const { error, message } = await updateAsync(formDataFormat);

          if (error) {
            return toast.warning(message);
          }

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

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((previous: any) => ({
      ...previous,
      [name]: value
    }))
  }

  return (
    <main className="relative h-full">
      <header className="px-5 py-1 flex items-center justify-between">
        <p className="font-bold text-xl">
          {modalType === 'create' ? 'Tạo mới' : 'Cập nhật'}
        </p>
        <img
          src={`${process.env.PUBLIC_URL}/images/common/icon-small-bold-close.svg`}
          alt="Close"
          className="cursor-pointer"
          onClick={closeModal}
        />
      </header>

      <section className="px-5 py-2">
        <input
          type="text"
          placeholder="Nhập nội dung"
          name="name"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData.name}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <input
          type="text"
          placeholder="Nhập mã hiệu"
          name="sign"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData?.sign}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <input
          type="text"
          placeholder="Nhập đơn vị"
          name="unit"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData?.unit}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <input
          type="number"
          placeholder="Nhập đơn giá"
          name="unitprice"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData?.unitprice}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <input
          type="text"
          placeholder="Nhập mô tả"
          name="description"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData.description}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <input
          type="text"
          placeholder="Nhập ghi chú"
          name="note"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData.note}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <DropdownSearchable
            onchangeValue={(value: any) => {
                setFormData((previous: any) => ({
                    ...previous,
                    convertID: value?.id
                }))
            }}
            onClearData={() => {
                setFormData((previous: any) => ({
                    ...previous,
                    convertID: ""
                }))
            }}
            onSearchInputChange={debounce((value: any) => setKeyword(value), 600)}
            onScroll={handleScroll}
            className="w-full mt-2 rounded-md border border-primary-border py-1 placeholder-primary-gray bg-cbs-table-header"
            placeholder="Tìm kiếm hàng hóa nguyên liệu"
            isMultiple={false}
            allowClearValueSingleInput={true}
            showTriangle={false}
            maxWidthInput="max-w-full"
            renderSelectedItem={(item: any) => (
                <div className="max-w-full">
                    <p className={"truncate"}>{item.text}</p>
                </div>
            )}
            data={listGoods.map((goods) => ({
                label: `${goods.name}`,
                value: goods._id,
            }))}
            initialValue={{
              label: `${initialValues?.convert?.name}`,
              value: initialValues?.convert?._id
            }}
            formatItem={{
                id: "value",
                text: "label",
            }}
            inlineSearch={true}
        />
      </section>

      <section className="px-5 mt-2">
        <input
          type="number"
          placeholder="Nhập định mức chuyển đổi"
          name="convertQuantity"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData?.convertQuantity}
          onChange={onChange}
        />
      </section>

      <footer className="absolute right-0 bottom-0 px-5 py-1">
        <button className="bg-primary text-primary-light text-base w-24 h-8 rounded"
          onClick={handleSubmit}>
          Xác nhận
        </button>
      </footer>
    </main>
  );
};