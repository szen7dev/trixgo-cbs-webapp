import React, { FC, useState } from "react";
import debounce from "lodash/debounce";
import { useModal } from "services/hooks/useModal";
import { useFnbCustomerCare } from "services/hooks/fnb/useFnbCustomerCare";
import { toast } from "react-toastify";
import { DropdownSearchable } from "shareComponents/common";
import { useQueryListContact } from "services/hooks/cmcs/useContractIncome";
import { LIMIT_DROPDOWN } from "apis/localdb/index";
import { useQueryListDoctype } from "services/hooks/useHuman";
import { useFnbOrder } from "services/hooks/fnb/useFnbOrder";

export const ModalCreateOrUpdateCC: FC<any> = ({
  modalType,
  onConfirm,
  initialValues = {
    customerCareID: '',
    mistake: '',
    customer: '',
    order: '',
    name: '',
    description: '',
    note: '',
    rating: 1,
    amount: 0,
    status: 1,
    type: 1,
  }
}) => {
  const [searchCustomerValue, setSearchCustomerValue] = useState("");
	const { listContact: listCustomer } = useQueryListContact({
		limit: LIMIT_DROPDOWN,
		keyword: searchCustomerValue,
	});

  const [searchSubTypeValue, setSearchSubTypeValue] = useState("");
	const { listDoctypes: listSubType } = useQueryListDoctype({
		limit: LIMIT_DROPDOWN,
		type: 19,
		keyword: searchSubTypeValue,
	});

  const [searchOrderValue, setSearchOrderValue] = useState("");

  const { list: listOrder } = useFnbOrder({
    params: {
      limit: 10,
      option: 1,
      keyword: searchOrderValue,
    }, isFetchList: true, 
    isFetchInfo: false
  })

  const { closeModal } = useModal()
  const [formData, setFormData] = useState(initialValues)

  const [keyword, setKeyword] = useState('');

  const {
    insertAsync, 
    updateAsync
} = useFnbCustomerCare({
    params: { keyword },
    isFetchList: true
})

  const handleSubmit = async () => {
    if(!formData.name) {
      return toast.warn('Vui lòng nội dung');
    }

    const formDataFormat = {
      ...formData, amount: +formData.amount, rating: +formData.rating, status: +formData.status, type: +formData.type
    }
    delete formDataFormat['customer'];
    delete formDataFormat['mistake'];
    delete formDataFormat['order'];
    delete formDataFormat['journey'];

    try {
      // Handle api here!
      switch (modalType) {
        // Tạo mẩu tin
        case 'create': {
          delete formDataFormat['customerCareID']; //
          const { error, data } = await insertAsync(formDataFormat);
          // console.log({ error, data })

          if (error) {
            return toast.warning(data.message);
          }

          toast.success('Tạo thành công', { autoClose: 1500 });
          break;
        }

        // Cập nhật mẩu tin
        case 'update': {
          const { error, data } = await updateAsync(formDataFormat);

          if (error) {
            return toast.warning(data.message);
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
    } finally {
      onConfirm && onConfirm();
      closeModal();
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((previous: any) => ({
      ...previous,
      [name]: value
    }))
  }

  const onRatingKeyUp = (event: any) => {
    const name = event.target.name;
    const value = +event.target.value;
    
    if(value < 0 || value > 5) {
      setFormData((previous: any) => ({
        ...previous,
        [name]: ""
      }))
      return toast.warn("Đánh giá của khách phải nằm trong khoảng từ 1 đến 5");
    }
  }

  return (
    <main className="relative h-full">
      <header className="px-5 py-1 flex items-center justify-between  mt-2 mb-2">
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

      <section className="px-5">
        <p>Khách hàng (*)</p>
        <DropdownSearchable
            onchangeValue={(value: any) => {
                setFormData((previous: any) => ({
                    ...previous,
                    customerID: value?.id
                }))
            }}
            onClearData={() => {
                setFormData((previous: any) => ({
                    ...previous,
                    customerID: ""
                }))
            }}
            onSearchInputChange={debounce((value: any) => setSearchCustomerValue(value), 600)}
            className="w-full rounded-md border border-primary-border py-1 placeholder-primary-gray bg-cbs-table-header"
            placeholder="Khách hàng (*)"
            isMultiple={false}
            allowClearValueSingleInput={true}
            showTriangle={false}
            maxWidthInput="max-w-full"
            renderSelectedItem={(item: any) => (
                <div className="max-w-full">
                    <p className={"truncate"}>{item.text}</p>
                </div>
            )}
            data={listCustomer.map((item: any) => ({
                label: `${item.name}`,
                value: item._id,
            }))}
            initialValue={initialValues.customer ? {
              label: `${initialValues.customer?.name}`,
              value: initialValues.customer?._id
            } : {}}
            formatItem={{
                id: "value",
                text: "label",
            }}
            inlineSearch={true}
        />
      </section>

      <section className="px-5 mt-2">
        <p>Phân loại vấn đề (*)</p>
        <DropdownSearchable
            onchangeValue={(value: any) => {
                setFormData((previous: any) => ({
                    ...previous,
                    mistakeID: value?.id
                }))
            }}
            onClearData={() => {
                setFormData((previous: any) => ({
                    ...previous,
                    mistakeID: ""
                }))
            }}
            onSearchInputChange={debounce((value: any) => setSearchSubTypeValue(value), 600)}
            className="w-full rounded-md border border-primary-border py-1 placeholder-primary-gray bg-cbs-table-header"
            placeholder="Phân loại vấn đề (*)"
            isMultiple={false}
            allowClearValueSingleInput={true}
            showTriangle={false}
            maxWidthInput="max-w-full"
            renderSelectedItem={(item: any) => (
                <div className="max-w-full">
                    <p className={"truncate"}>{item.text}</p>
                </div>
            )}
            data={listSubType.map((item: any) => ({
                label: `${item.name}`,
                value: item._id,
            }))}
            initialValue={initialValues.mistake ? {
              label: `${initialValues.mistake?.name}`,
              value: initialValues.mistake?._id
            } : {}}
            formatItem={{
                id: "value",
                text: "label",
            }}
            inlineSearch={true}
        />
      </section>

      <section className="px-5 mt-2">
        <p>Thuộc đơn hàng</p>
        <DropdownSearchable
            onchangeValue={(value: any) => {
                setFormData((previous: any) => ({
                    ...previous,
                    orderID: value?.id
                }))
            }}
            onClearData={() => {
                setFormData((previous: any) => ({
                    ...previous,
                    orderID: ""
                }))
            }}
            onSearchInputChange={debounce((value: any) => setSearchOrderValue(value), 600)}
            className="w-full rounded-md border border-primary-border py-1 placeholder-primary-gray bg-cbs-table-header"
            placeholder="Thuộc đơn hàng"
            isMultiple={false}
            allowClearValueSingleInput={true}
            showTriangle={false}
            maxWidthInput="max-w-full"
            renderSelectedItem={(item: any) => (
                <div className="max-w-full">
                    <p className={"truncate"}>{item.text}</p>
                </div>
            )}
            data={listOrder.map((item: any) => ({
                label: `${item.name}`,
                value: item._id,
            }))}
            initialValue={initialValues.order ? {
              label: `${initialValues.order?.name}`,
              value: initialValues.order?._id
            } : {}}
            formatItem={{
                id: "value",
                text: "label",
            }}
            inlineSearch={true}
        />
      </section>

      <section className="px-5 py-1">
        <p>Nội dung sự việc</p>
        <input
          type="text"
          placeholder="Nội dung"
          name="name"
          className="h-8 w-full border border-primary-border outline-none px-2"
          defaultValue={formData.name}
          onChange={onChange}
        />
      </section>

      <section className="px-5 py-1">
        <p>Diễn giải/cách xử lý</p>
        <input
          type="text"
          placeholder="Diễn giải/cách xử lý"
          name="description"
          className="h-8 w-full border border-primary-border outline-none px-2"
          defaultValue={formData.description}
          onChange={onChange}
        />
      </section>

      <section className="px-5 py-1">
        <p>Ghi chú</p>
        <input
          type="text"
          placeholder="Ghi chú"
          name="note"
          className="h-8 w-full border border-primary-border outline-none px-2"
          defaultValue={formData.note}
          onChange={onChange}
        />
      </section>

      <section className="px-5 py-1">
        <p>Đánh giá của khách (1-5*)</p>
        <input
          type="number"
          placeholder="Đánh giá của khách (1-5)"
          name="rating"
          min={1}
          max={5}
          className="h-8 w-full border border-primary-border outline-none px-2"
          value={formData?.rating}
          onChange={onChange}
          onKeyUp={onRatingKeyUp}
        />
      </section>

      <section className="px-5 py-1">
        <p>Giá trị bồi thường cho khách</p>
        <input
          type="number"
          placeholder="Giá trị bồi thường cho khách"
          name="amount"
          className="h-8 w-full border border-primary-border outline-none px-2"
          defaultValue={formData?.amount}
          onChange={onChange}
        />
      </section>

      <section className="px-5 py-1">
        <p>Tình trạng xử lý (1-Chưa, đang xử lý|2-Đã xử lý)</p>
        <input
          type="number"
          placeholder="1-Chưa, đang xử lý|2-Đã xử lý"
          name="status"
          className="h-8 w-full border border-primary-border outline-none px-2"
          defaultValue={formData?.status}
          onChange={onChange}
        />
      </section>

      <section className="px-5 py-1">
        <p>Phân loại (1-Lỗi của nhân viên|2-Lỗi khách quan)</p>
        <input
          type="number"
          placeholder="1-Lỗi của nhân viên|2-Lỗi khách quan)"
          name="type"
          className="h-8 w-full border border-primary-border outline-none px-2"
          defaultValue={formData?.type}
          onChange={onChange}
        />
      </section>

      <footer className="absolute right-0 bottom-5 px-5 py-1">
        <button className="bg-primary text-primary-light text-base w-24 h-8 rounded"
          onClick={handleSubmit}>
          Xác nhận
        </button>
      </footer>
    </main>
  )
}