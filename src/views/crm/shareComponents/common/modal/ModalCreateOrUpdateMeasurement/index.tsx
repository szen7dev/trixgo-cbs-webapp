import React, { UIEvent, FC, useState } from "react";
import { toast } from "react-toastify";
import moment from 'moment';
import { useModal } from "services/hooks/useModal";
import { useMediaMenu } from "services/hooks/crm/useMediaMeasurement";
import { DropdownSearchable } from "shareComponents/common";
import debounce from 'lodash/debounce';
import { LIMIT_DROPDOWN } from "apis/localdb/index";
import { useListHuman } from "services/hooks/human/useHuman";
import { useQueryListDoctype } from "services/hooks/useHuman";
import {
    useQueryListGood
} from "services/hooks/cmcs/useContractIncome";

export const ModalCreateOrUpdateMeasurement: FC<any> = ({
  modalType,
  onConfirm,
  initialValues = {
    trackID: '',
    contactID: '',
    supportID: '',
    secialistID: '',
    sourceID: '',
    productID: '',
    type: 1,
    status: 1,
    name: '',
    parentName: '',
    expired: '',
    slug: '',
    note: '',
    phone: '',
    email: '',
    facebook: '',
    tiktok: '',
    birthday: '',
    pubertyOnsetDate: '',
    gender: 1,
    height: 0,
    weight: 0,
    quantity: 0,
    unitPrice: 0,
  }
}) => {
  const { closeModal } = useModal();
  const [formData, setFormData] = useState(initialValues);
  const { refetch: refetchCustomer, insertAsync, updateAsync } = useMediaMenu({});

  const [keywordContact, setKeywordContact] = useState('');
    
  const { listHuman } = useListHuman({
      params: {
          limit: 10,
          keyword: keywordContact,
      },
      isFetchList: true
  })

  const [searchSubTypeValue, setSearchSubTypeValue] = useState("");
  const { listDoctypes: listSubType } = useQueryListDoctype({
    limit: LIMIT_DROPDOWN,
    type: 25,
    keyword: searchSubTypeValue,
  });

	const [searchGoodValue, setSearchGoodValue] = useState("");
  const { listGood } = useQueryListGood({
    limit: LIMIT_DROPDOWN,
    keyword: searchGoodValue,
  });

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

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((previous: any) => ({
      ...previous,
      [name]: value
    }))
  }

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop === clientHeight;
    return bottom;
  }

  return (
    <main className="relative"  style={{
        height: "1250px",
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
          <label className="block text-gray-700 text-sm font-bold" htmlFor="" title="Bắt buộc nhập thông tin">
            Support/Chủ Trạm Tăng Cao
          </label>
          <DropdownSearchable
            onchangeValue={(value: any) => {
                setFormData((previous: any) => ({
                    ...previous,
                    supportID: value?.id
                }))
            }}
            onClearData={() => {
                setFormData((previous: any) => ({
                    ...previous,
                    supportID: ""
                }))
            }}
            onSearchInputChange={debounce((value: any) => setKeywordContact(value), 600)}
            onScroll={handleScroll}
            className="w-full rounded-md border border-primary-border px-1 placeholder-primary-gray bg-cbs-table-header"
            placeholder="Support/Chủ Trạm Tăng Cao"
            isMultiple={false}
            allowClearValueSingleInput={true}
            showTriangle={false}
            maxWidthInput="max-w-full"
            renderSelectedItem={(item: any) => (
                <div className="max-w-full">
                    <p className={"truncate"}>{item.text}</p>
                </div>
            )}
            data={listHuman.map((item:any) => ({
                label: item.name,
                value: item._id,
            }))}
            initialValue={{
              value: formData?.support?._id || "",
              label: formData?.support?.name || "Support/Chủ Trạm Tăng Cao"
            }}
            formatItem={{
                id: "value",
                text: "label",
            }}
            inlineSearch={true}
          />
      </section>

      <section className="px-5 mt-2">
          <label className="block text-gray-700 text-sm font-bold" htmlFor="" title="Bắt buộc nhập thông tin">
            Chuyên viên tư vấn
          </label>
          <DropdownSearchable
            onchangeValue={(value: any) => {
                setFormData((previous: any) => ({
                    ...previous,
                    secialistID: value?.id
                }))
            }}
            onClearData={() => {
                setFormData((previous: any) => ({
                    ...previous,
                    secialistID: ""
                }))
            }}
            onSearchInputChange={debounce((value: any) => setKeywordContact(value), 600)}
            onScroll={handleScroll}
            className="w-full rounded-md border border-primary-border px-1 placeholder-primary-gray bg-cbs-table-header"
            placeholder="Chuyên viên tư vấn"
            isMultiple={false}
            allowClearValueSingleInput={true}
            showTriangle={false}
            maxWidthInput="max-w-full"
            renderSelectedItem={(item: any) => (
                <div className="max-w-full">
                    <p className={"truncate"}>{item.text}</p>
                </div>
            )}
            data={listHuman.map((item:any) => ({
                label: item.name,
                value: item._id,
            }))}
            initialValue={{
              value: formData?.secialist?._id || "",
              label: formData?.secialist?.name || "Chuyên viên tư vấn"
            }}
            formatItem={{
                id: "value",
                text: "label",
            }}
            inlineSearch={true}
          />
      </section>

      <section className="px-5 mt-2">
          <label className="block text-gray-700 text-sm font-bold" htmlFor="" title="Bắt buộc nhập thông tin">
            Chọn bé-Nếu chọn mục này thì tên bé, giới tính, ngày sinh, ngày dậy thì...sẽ được lấy theo dữ liệu hệ thống
          </label>
          <DropdownSearchable
            onchangeValue={(value: any) => {
                setFormData((previous: any) => ({
                    ...previous,
                    contactID: value?.id
                }))
            }}
            onClearData={() => {
                setFormData((previous: any) => ({
                    ...previous,
                    contactID: ""
                }))
            }}
            onSearchInputChange={debounce((value: any) => setKeywordContact(value), 600)}
            onScroll={handleScroll}
            className="w-full rounded-md border border-primary-border px-1 placeholder-primary-gray bg-cbs-table-header"
            placeholder="Chọn bé"
            isMultiple={false}
            allowClearValueSingleInput={true}
            showTriangle={false}
            maxWidthInput="max-w-full"
            renderSelectedItem={(item: any) => (
                <div className="max-w-full">
                    <p className={"truncate"}>{item.text}</p>
                </div>
            )}
            data={listHuman.map((item:any) => ({
                label: item.name,
                value: item._id,
            }))}
            initialValue={{
              value: formData?.contact?._id || "",
              label: formData?.contact?.name || "Chọn bé"
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
          Họ và tên của bé (*)
        </label>
        <input
          type="text"
          placeholder="Nhập tên bé"
          name="name"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.name}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
          <label className="block text-gray-700 text-sm font-bold" htmlFor="" title="Bắt buộc nhập thông tin">
            Nguồn đến từ đâu
          </label>
          <DropdownSearchable
            onchangeValue={(value: any) => {
                setFormData((previous: any) => ({
                    ...previous,
                    sourceID: value?.id
                }))
            }}
            onClearData={() => {
                setFormData((previous: any) => ({
                    ...previous,
                    sourceID: ""
                }))
            }}
            onSearchInputChange={debounce((value: any) => setSearchSubTypeValue(value), 600)}
            onScroll={handleScroll}
            className="w-full rounded-md border border-primary-border px-1 placeholder-primary-gray bg-cbs-table-header"
            placeholder="Nguồn đến từ đâu"
            isMultiple={false}
            allowClearValueSingleInput={true}
            showTriangle={false}
            maxWidthInput="max-w-full"
            renderSelectedItem={(item: any) => (
                <div className="max-w-full">
                    <p className={"truncate"}>{item.text}</p>
                </div>
            )}
            data={listSubType.map((item:any) => ({
                label: item.name,
                value: item._id,
            }))}
            initialValue={{
              value: formData?.source?._id || "",
              label: formData?.source?.name || "Nguồn đến từ đâu"
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
                  checked={formData.gender == 1 ? true : false}
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
                  checked={formData.gender == 2 ? true : false}
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
                  checked={formData.gender == 3 ? true : false}
                  onChange={onChange}
                />
                <label htmlFor="gender" className={"text-left ml-3"}>Khác</label>
            </div>
          </div>
      </section>

      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
          Ngày sinh (*)
        </label>
        <input
          type="date"
          placeholder="Thời hạn"
          name="birthday"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={moment(formData.birthday).format("YYYY-MM-DD")}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
          Chiều cao (cm) *
        </label>
        <input
          type="number"
          placeholder="Nhập nội dung"
          name="height"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.height}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
          Cân nặng (kg) *
        </label>
        <input
          type="number"
          placeholder="Nhập nội dung"
          name="weight"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.weight}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
          Ngày dậy thì (nếu có)
        </label>
        <input
          type="date"
          placeholder="Ngày dậy thì"
          name="pubertyOnsetDate"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={moment(formData.pubertyOnsetDate).format("YYYY-MM-DD")}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
          Tên ba hoặc mẹ (*)
        </label>
        <input
          type="text"
          placeholder="Nhập tên ba hoặc mẹ"
          name="parentName"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.parentName}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
          Số điện thoại ba hoặc mẹ (*)
        </label>
        <input
          type="text"
          placeholder="Nhập điện thoại ba hoặc mẹ"
          name="phone"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.phone}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
          Email ba hoặc mẹ (*)
        </label>
        <input
          type="text"
          placeholder="Nhập email ba hoặc mẹ"
          name="email"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.email}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
          <label className="block text-gray-700 text-sm font-bold" htmlFor="" title="Bắt buộc nhập thông tin">
            Sản phẩm lựa chọn
          </label>
          <DropdownSearchable
            onchangeValue={(value: any) => {
                setFormData((previous: any) => ({
                    ...previous,
                    productID: value?.id
                }))
            }}
            onClearData={() => {
                setFormData((previous: any) => ({
                    ...previous,
                    productID: ""
                }))
            }}
            onSearchInputChange={debounce((value: any) => setSearchGoodValue(value), 600)}
            onScroll={handleScroll}
            className="w-full rounded-md border border-primary-border px-1 placeholder-primary-gray bg-cbs-table-header"
            placeholder="Sản phẩm lựa chọn"
            isMultiple={false}
            allowClearValueSingleInput={true}
            showTriangle={false}
            maxWidthInput="max-w-full"
            renderSelectedItem={(item: any) => (
                <div className="max-w-full">
                    <p className={"truncate"}>{item.text}</p>
                </div>
            )}
            data={listGood.map((item:any) => ({
                label: item.name,
                value: item._id,
            }))}
            initialValue={{
              value: formData?.product?._id || "",
              label: formData?.product?.name || "Sản phẩm lựa chọn"
            }}
            formatItem={{
                id: "value",
                text: "label",
            }}
            inlineSearch={true}
          />
      </section>

      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
          Số lượng
        </label>
        <input
          type="number"
          placeholder="Nhập nội dung"
          name="quantity"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.quantity}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
          Đơn giá
        </label>
        <input
          type="number"
          placeholder="Nhập nội dung"
          name="unitPrice"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.unitPrice}
          onChange={onChange}
        />
      </section>

      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
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