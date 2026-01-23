/*=====1.LIBRARY=====*/
import React, { UIEvent, FC, useState } from "react";
import { toast } from "react-toastify";
import debounce from 'lodash/debounce';
import moment from 'moment';

/*=====2.CSS=====*/

/*=====3.ICONS=====*/

/*=====4.PAGES/COMPONENTS=====*/
import { ModalProps } from 'typings/items/customer';
import { DropdownSearchable } from "shareComponents/common";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useModal } from "services/hooks/useModal";
import { useCustomer } from "services/hooks/items/useCustomer";
import { useFunda } from "services/hooks/items/useFunda";

/*=====7.OTHER=====*/
export const ModalCreateOrUpdateCustomer: FC<ModalProps> = ({
  modalType,
  onConfirm,
  initialValues = {
    contactID: '',
    type: 2,
    name: '',
    sign: '',
    address: '',
    taxid: '',
    phone: '',
    gender: 1,
    birthday: '',
    description: '',
    note: '',
    email: '',
    nonResident: '',
    funda: {},
  }
}) => {
  const { closeModal } = useModal();
  const [formData, setFormData] = useState(initialValues);
  const { refetch: refetchCustomer, insertAsync, updateAsync } = useCustomer({});

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
            gender: `${formData.gender}`,
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

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(previous => ({
      ...previous,
      [name]: value
    }))
  }

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop === clientHeight;
    return bottom;
  }

  const [keywordFunda, setKeywordFunda] = useState('');
  const { list: listFunda } = useFunda({
    params: {
        keyword: keywordFunda,
        isListParentOfListChilds: "1",
        populates: {
            "path": "area1 area2 area3",
            "select": "name"
        },
    },
    isFetchList: true
  })

  return (
    <main className="relative"  style={{
        height: "820px",
    }}>
      <header className="px-5 py-2 flex items-center justify-between">
        <p className="font-bold text-xl">
          {modalType === 'create' ? 'Tạo danh bạ' : 'Cập nhật danh bạ'}
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
            Khu vực  (*)
          </label>
          <DropdownSearchable
            onchangeValue={(value: any) => {
                setFormData((previous: any) => ({
                    ...previous,
                    fundaID: value?.id
                }))
            }}
            onClearData={() => {
                setFormData((previous: any) => ({
                    ...previous,
                    fundaID: ""
                }))
            }}
            onSearchInputChange={debounce((value: any) => setKeywordFunda(value), 600)}
            onScroll={handleScroll}
            className="w-full rounded-md border border-primary-border px-1 placeholder-primary-gray bg-cbs-table-header"
            placeholder="Tìm kiếm cơ sở"
            isMultiple={false}
            allowClearValueSingleInput={true}
            showTriangle={false}
            maxWidthInput="max-w-full"
            renderSelectedItem={(item: any) => (
                <div className="max-w-full">
                    <p className={"truncate"}>{item.text}</p>
                </div>
            )}
            data={listFunda.map((funda:any) => ({
                label: `${funda.sign}.${funda.name}`,
                value: funda._id,
            }))}
            initialValue={{
              value: formData?.funda?._id || "",
              label: formData?.funda?.name || "Chọn cơ sở"
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
          Tên danh bạ (*)
        </label>
        <input
          type="text"
          placeholder="Nhập tên"
          name="name"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.name}
          onChange={onChange}
        />
      </section>
      
      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtDescription" title="Bắt buộc nhập thông tin">
          Mã hiệu (nếu có)
        </label>
        <input
          type="text"
          placeholder="Nhập mã hiệu"
          name="sign"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.sign}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtDescription" title="Bắt buộc nhập thông tin">
          Điện thoại (*)
        </label>
        <input
          type="text"
          placeholder="Điện thoại"
          name="phone"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.phone}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtEmail">
          Email
        </label>
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.email}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtDescription" title="Bắt buộc nhập thông tin">
          Giới tính (*)
        </label>
        <div className={"flex items-center"}>
            <div className={"flex items-center ml-3"}>
                <input
                  type="radio"
                  value={1}
                  name="gender"
                  className="form-check-input mt-0"
                  defaultValue={formData.gender}
                  checked={formData.gender == 1?true: false}
                  onChange={onChange}
                />
                <label htmlFor="gender" className={"text-left ml-3"}>Nam</label>
            </div>
            <div className={"flex items-center ml-3"}>
                <input
                  type="radio"
                  value={2}
                  name="gender"
                  className="form-check-input mt-0"
                  defaultValue={formData.gender}
                  checked={formData.gender == 2?true: false}
                  onChange={onChange}
                />
                <label htmlFor="gender" className={"text-left ml-3"}>Nữ</label>
            </div>
            <div className={"flex items-center ml-3"}>
                <input
                  type="radio"
                  value={3}
                  name="gender"
                  className="form-check-input mt-0"
                  defaultValue={formData.gender}
                  checked={formData.gender == 3?true: false}
                  onChange={onChange}
                />
                <label htmlFor="campaign" className={"text-left ml-3"}>Khác</label>
            </div>
          </div>
      </section>

      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtDescription">
          Ngày sinh
        </label>
        <input
          type="date"
          placeholder="Ngày sinh"
          name="birthday"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={moment(formData.birthday).format("YYYY-MM-DD")}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtDescription" title="Bắt buộc nhập thông tin">
          Phân loại (*)
        </label>
        <div className={"flex items-center"}>
            <div className={"flex items-center ml-3"}>
                <input
                  type="radio"
                  value={1}
                  name="type"
                  className="form-check-input mt-0"
                  defaultValue={formData.type}
                  checked={formData.type == 1?true: false}
                  onChange={onChange}
                />
                <label htmlFor="type" className={"text-left ml-3"}>Nhân viên</label>
            </div>
            <div className={"flex items-center ml-3"}>
                <input
                  type="radio"
                  value={2}
                  name="type"
                  className="form-check-input mt-0"
                  defaultValue={formData.type}
                  checked={formData.type == 2?true: false}
                  onChange={onChange}
                />
                <label htmlFor="type" className={"text-left ml-3"}>Khách hàng</label>
            </div>
          </div>
      </section>

      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtDescription">
          Địa chỉ
        </label>
        <input
          type="text"
          placeholder="Nhập địa chỉ"
          name="address"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.address}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtTaxid">
          Mã số thuế
        </label>
        <input
          type="text"
          placeholder="Nhập mã số thuế"
          name="taxid"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.taxid}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtDescription">
          Ghi chú
        </label>
        <input
          type="text"
          placeholder="Nhập ghi chú"
          name="note"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.note}
          onChange={onChange}
        />
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