import React, { UIEvent, FC, useState } from "react";
import debounce from "lodash/debounce";
import { useModal } from "services/hooks/useModal";
import { useGoods } from "services/hooks/items/useGoods";
import { useCashPayment } from "services/hooks/financial/useCashPayment";
import { toast } from "react-toastify";
import { DropdownSearchable, Popover } from "shareComponents/common";
import {
	useQueryListContact,
} from "services/hooks/cmcs/useContractIncome";
import { DATE_FORMAT, VOUCHER_TYPES, LIMIT_DROPDOWN } from "apis/localdb/index";

export const ModalCreateOrUpdatePayment: FC<any> = ({
  modalType,
  onConfirm,
  initialValues = {
    cashPaymentID: '',
    customer: '',
    name: '',
    note: '',
    amount: 0,
    active: 1,
  }
}) => {
  const [searchCustomerValue, setSearchCustomerValue] = useState(
		initialValues?.customer || ""
	);
	const { listContact: listCustomer } = useQueryListContact({
		limit: LIMIT_DROPDOWN,
		keyword: searchCustomerValue,
	});

  const { closeModal } = useModal()
  const [formData, setFormData] = useState(initialValues)

  // const handleScroll = (e: UIEvent<HTMLDivElement>) => {
  //   const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
  //   const bottom = scrollHeight - scrollTop >= clientHeight - 10;
  //   if (!bottom || !hasNextPage) return;

  //   fetchNextPage();
  // }

  const [keyword, setKeyword] = useState('');

  const {
    insertAsync, 
    updateAsync
} = useCashPayment({
    params: { keyword },
    isFetchList: true
})

  const handleSubmit = async () => {
    if(!formData.name) {
      return toast.warn('Vui lòng nội dung');
    }
    const formDataFormat = { ...formData, amount: +formData.amount, active: +formData.active}
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

      <section className="px-5 mt-2">
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
            // onScroll={handleScroll}
            className="w-full mt-2 rounded-md border border-primary-border py-1 placeholder-primary-gray bg-cbs-table-header"
            placeholder="Mã khách"
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
                label: `${item.name}-${item.phone}`,
                value: item._id,
            }))}
            initialValue={{
              label: `${initialValues?.customer?.name}`,
              value: initialValues?.customer?._id
            }}
            formatItem={{
                id: "value",
                text: "label",
            }}
            inlineSearch={true}
        />
      </section>

      <section className="px-5 py-2">
        <input
          type="text"
          placeholder="Nội dung"
          name="name"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData.name}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <input
          type="number"
          placeholder="Giá trị"
          name="amount"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData?.amount}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <input
          type="text"
          placeholder="Ghi chú"
          name="note"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData.note}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <input
          type="text"
          placeholder="Trạng thá: 1-Có hiệu lực | 2-Hủy"
          name="active"
          className="h-12 w-full border border-primary-border outline-none px-8"
          defaultValue={formData.active}
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