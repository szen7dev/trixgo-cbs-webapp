import React, { UIEvent, FC, useState } from "react";
import debounce from "lodash/debounce";
import { useModal } from "services/hooks/useModal";
import { useGoods } from "services/hooks/items/useGoods";
import { toast } from "react-toastify";
import { DropdownSearchable } from "shareComponents/common";

export const ModalCreateOrUpdateGoods: FC<any> = ({
  modalType,
  onConfirm,
  initialValues = {
    goodsID: '',
    type: 1,
    status: 1,
    usage: 1,
    name: '',
    sign: '',
    unit: '',
    unitprice: 0,
    sellingUnitprice: 0,
    unitPrice: 0,
    unitPrice2: 0,
    unitPrice3: 0,
    unitPrice4: 0,
    note: '',
    convert: '',
    convertQuantity: 1,
  }
}) => {
  const { closeModal } = useModal()
  const [formData, setFormData] = useState(initialValues)

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
      return toast.warn('Vui lòng nội dung');
    }
    const formDataFormat = { ...formData, 
      type: +formData.type, 
      status: +formData.status,
      usage: +formData.usage,
      unitprice: +formData.unitprice, 
      unitPrice: +formData.unitPrice, 
      unitPrice2: +formData.unitPrice2, 
      unitPrice3: +formData.unitPrice3, 
      unitPrice4: +formData.unitPrice4, 
      sellingUnitprice: +formData.sellingUnitprice, 
      convertQuantity: +formData.convertQuantity,
    }
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

      <section className="px-5 py-1">
        <p>Phân loại</p>
        <input
          type="number"
          placeholder="1-Thông thường | 2-Topping"
          name="type"
          className="h-8 w-full border border-primary-border outline-none px-4"
          defaultValue={formData?.type}
          onChange={onChange}
        />
      </section>

      <section className="px-5 py-1">
        <p>Nội dung</p>
        <input
          type="text"
          placeholder="Nội dung"
          name="name"
          className="h-8 w-full border border-primary-border outline-none px-4"
          defaultValue={formData.name}
          onChange={onChange}
        />
      </section>

      <section className="px-5 py-1">
        <p>Mã hiệu</p>
        <input
          type="text"
          placeholder="Mã hiệu"
          name="sign"
          className="h-8 w-full border border-primary-border outline-none px-4"
          defaultValue={formData?.sign}
          onChange={onChange}
        />
      </section>

      <section className="px-5 py-1">
        <p>Đơn vị tính</p>
        <input
          type="text"
          placeholder="Đơn vị"
          name="unit"
          className="h-8 w-full border border-primary-border outline-none px-4"
          defaultValue={formData?.unit}
          onChange={onChange}
        />
      </section>

      <section className="px-5 py-1">
        <p>Đơn giá nhập</p>
        <input
          type="number"
          placeholder="Đơn giá nhập"
          name="unitprice"
          className="h-8 w-full border border-primary-border outline-none px-4"
          defaultValue={formData?.unitprice}
          onChange={onChange}
        />
      </section>

      <section className="px-5 py-1">
        <p>Đơn giá xuất</p>
        <input
          type="number"
          placeholder="Đơn giá xuất"
          name="sellingUnitprice"
          className="h-8 w-full border border-primary-border outline-none px-4"
          defaultValue={formData?.sellingUnitprice}
          onChange={onChange}
        />
      </section>

      <section className="px-5 py-1">
        <p>Đơn giá bán 1</p>
        <input
          type="number"
          placeholder="Đơn giá bán M-Off"
          name="unitPrice"
          className="h-8 w-full border border-primary-border outline-none px-4"
          defaultValue={formData?.unitPrice}
          onChange={onChange}
        />
      </section>

      <section className="px-5 py-1">
        <p>Đơn giá bán 2</p>
        <input
          type="number"
          placeholder="Đơn giá bán M-App"
          name="unitPrice2"
          className="h-8 w-full border border-primary-border outline-none px-4"
          defaultValue={formData?.unitPrice2}
          onChange={onChange}
        />
      </section>

      <section className="px-5 py-1">
        <p>Đơn giá bán 3</p>
        <input
          type="number"
          placeholder="Đơn giá bán L-Off"
          name="unitPrice3"
          className="h-8 w-full border border-primary-border outline-none px-4"
          defaultValue={formData?.unitPrice3}
          onChange={onChange}
        />
      </section>

      <section className="px-5 py-1">
        <p>Đơn giá bán 4</p>
        <input
          type="number"
          placeholder="Đơn giá bán L-App"
          name="unitPrice4"
          className="h-8 w-full border border-primary-border outline-none px-4"
          defaultValue={formData?.unitPrice4}
          onChange={onChange}
        />
      </section>

      <section className="px-5 py-1">
        <p>Ghi chú</p>
        <input
          type="text"
          placeholder="Ghi chú"
          name="note"
          className="h-8 w-full border border-primary-border outline-none px-4"
          defaultValue={formData.note}
          onChange={onChange}
        />
      </section>
      
      <section className="px-5 py-1">
        <p>Trạng thái</p>
        <input
          type="number"
          placeholder="1-Hoạt động | 2-Hủy"
          name="status"
          className="h-8 w-full border border-primary-border outline-none px-4"
          defaultValue={formData?.status}
          onChange={onChange}
        />
      </section>

      <section className="px-5 py-1">
        <p>Mục đích sử dụng</p>
        <input
          type="number"
          placeholder="1-Chung | 2-Cho đơn hàng"
          name="usage"
          className="h-8 w-full border border-primary-border outline-none px-4"
          defaultValue={formData?.usage}
          onChange={onChange}
        />
      </section>

      <section className="px-5 py-1">
        <p>Link danh mục</p>
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

      <section className="px-5 py-1">
        <p>Định mức chuyển đổi</p>
        <input
          type="number"
          placeholder="Định mức chuyển đổi"
          name="convertQuantity"
          className="h-8 w-full border border-primary-border outline-none px-4"
          defaultValue={formData?.convertQuantity}
          onChange={onChange}
        />
      </section>

      <footer className="absolute right-0 bottom-3 px-5 py-1">
        <button className="bg-primary text-primary-light text-base w-24 h-8 rounded"
          onClick={handleSubmit}>
          Xác nhận
        </button>
      </footer>
    </main>
  )
}