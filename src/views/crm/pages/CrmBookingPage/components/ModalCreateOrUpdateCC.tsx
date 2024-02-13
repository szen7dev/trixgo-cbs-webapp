import React, { FC, useState } from "react";
import debounce from "lodash/debounce";
import { useModal } from "services/hooks/useModal";
import { useFnbCustomerBooking } from "services/hooks/fnb/useFnbCustomerBooking";
import { toast } from "react-toastify";
// import DatePicker from "react-datepicker";
// import { ErrorMessage, Field } from "formik";
// import DayPickerInput from "react-day-picker/DayPickerInput";
// import moment from "moment";
import { useUserSystem } from 'services/hooks/users/useUserSystem';
import { DropdownSearchable } from "shareComponents/common";
import { useQueryListContact } from "services/hooks/cmcs/useContractIncome";
import { LIMIT_DROPDOWN } from "apis/localdb/index";
import { useAuth } from "services/hooks/auth/useAuth";
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
    journey: '',
    name: '',
    description: '',
    note: '',
    date: '',
    business: '',
    assignee: '',
    rating: 1,
    amount: 0,
    status: 1,
    type: 1,
    alert: 0,
  }
}) => {
  // User
  const { user } = useAuth();
  const [userKeyword, setUserKeyword] = useState("");  
  const { data: listUser } = useUserSystem({
      companyID: user?.company?._id,
      keyword: userKeyword,
      limit: 10,
      isFetch: true
  }, true)
  
  // Business
  const [searchDoctypeKeyword, setSearchDoctypeKeyword] = useState("");
	const { listDoctypes } = useQueryListDoctype({
        type: 3,
        limit: 10,
        keyword: searchDoctypeKeyword,
	});

  // Customer
  const [searchCustomerValue, setSearchCustomerValue] = useState("");
	const { listContact: listCustomer } = useQueryListContact({
		limit: LIMIT_DROPDOWN,
		keyword: searchCustomerValue,
	});

  // Order
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
  } = useFnbCustomerBooking({
      params: { keyword },
      isFetchList: true
  })

  const handleSubmit = async () => {
    if(!formData.name) {
      return toast.warn('Vui lòng nội dung');
    }

    const formDataFormat = {
      ...formData, amount: +formData.amount, rating: +formData.rating, status: +formData.status, type: +formData.type, alert: +formData.alert
    }
    delete formDataFormat['customer'];
    delete formDataFormat['mistake'];
    delete formDataFormat['order'];
    delete formDataFormat['journey'];
    delete formDataFormat['business'];
    delete formDataFormat['assignee'];

    try {
      // Handle API
      switch (modalType) {
        // Create
        case 'create': {
          delete formDataFormat['customerCareID']; //
          const { error, message } = await insertAsync(formDataFormat);

          if (error) {
            return toast.warning(message);
          }

          toast.success('Tạo thành công', { autoClose: 1500 });
          break;
        }

        // Update
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
        <p>Lĩnh vực kinh doanh (*)</p>
        <DropdownSearchable
            onchangeValue={(value: any) => {
                setFormData((previous: any) => ({
                    ...previous,
                    businessID: value?.id
                }))
            }}
            onClearData={() => {
                setFormData((previous: any) => ({
                    ...previous,
                    businessID: ""
                }))
            }}
            onSearchInputChange={debounce((value: any) => setSearchDoctypeKeyword(value), 600)}
            className="w-full rounded-md border border-primary-border py-1 placeholder-primary-gray bg-cbs-table-header"
            placeholder="Lĩnh vực kinh doanh (*)"
            isMultiple={false}
            allowClearValueSingleInput={true}
            showTriangle={false}
            maxWidthInput="max-w-full"
            renderSelectedItem={(item: any) => (
                <div className="max-w-full">
                    <p className={"truncate"}>{item.text}</p>
                </div>
            )}
            data={listDoctypes.map((item: any) => ({
                label: `${item.name}`,
                value: item._id,
            }))}
            initialValue={initialValues.business ? {
              label: `${initialValues.business?.name}`,
              value: initialValues.business?._id
            } : {}}
            formatItem={{
                id: "value",
                text: "label",
            }}
            inlineSearch={true}
        />
      </section>

      <section className="px-5 mt-2">
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
        <p>Nội dung (*)</p>
        <input
          type="text"
          placeholder="Nội dung"
          name="name"
          className="h-8 w-full border border-primary-border outline-none px-2"
          defaultValue={formData.name}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <p>Thời hạn thực hiện (*)</p>
        <input
          type="text"
          placeholder="Thời hạn thực hiện"
          name="date"
          className="h-8 w-full border border-primary-border outline-none px-2"
          defaultValue={formData.date}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <p>Nhắc trước thời hạn (số giờ)</p>
        <input
          type="text"
          placeholder="Số giờ nhắc trước thời hạn"
          name="alert"
          className="h-8 w-full border border-primary-border outline-none px-2"
          defaultValue={formData.alert}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <p>Người thực hiện</p>
        <DropdownSearchable
            onchangeValue={(value: any) => {
                setFormData((previous: any) => ({
                    ...previous,
                    assigneeID: value?.id
                }))
            }}
            onClearData={() => {
                setFormData((previous: any) => ({
                    ...previous,
                    assigneeID: ""
                }))
            }}
            onSearchInputChange={debounce((value: any) => setUserKeyword(value), 600)}
            className="w-full rounded-md border border-primary-border py-1 placeholder-primary-gray bg-cbs-table-header"
            placeholder="Người thực hiện"
            isMultiple={false}
            allowClearValueSingleInput={true}
            showTriangle={false}
            maxWidthInput="max-w-full"
            renderSelectedItem={(item: any) => (
                <div className="max-w-full">
                    <p className={"truncate"}>{item.text}</p>
                </div>
            )}
            data={listUser.map((item: any) => ({
                label: `${item.fullname}`,
                value: item._id,
            }))}
            initialValue={initialValues.assignee ? {
              label: `${initialValues.assignee?.fullname}`,
              value: initialValues.assignee?._id
            } : {}}
            formatItem={{
                id: "value",
                text: "label",
            }}
            inlineSearch={true}
        />
      </section>

      <section className="px-5 mt-2">
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

      <section className="px-5 mt-2">
        <p>Đơn hàng</p>
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
            placeholder="Đơn hàng"
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

      <section className="px-5 mt-2">
        <p>Tình trạng (1-Khởi tạo|2-Hoàn thành)</p>
        <input
          type="number"
          placeholder="1-Khởi tạo | 2-Hoàn thành"
          name="status"
          className="h-8 w-full border border-primary-border outline-none px-2"
          defaultValue={formData?.status}
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