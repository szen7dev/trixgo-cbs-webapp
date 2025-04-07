import React, { UIEvent, FC, useState } from "react";
import { toast } from "react-toastify";
import moment from 'moment';
import { useModal } from "services/hooks/useModal";
import { useMediaConfig } from "services/hooks/crm/useMediaConfig";

export const ModalCreateOrUpdateConfig: FC<any> = ({
  modalType,
  onConfirm,
  initialValues = {
    configID: '',
    type: 1,
    status: 1,
    name: '',
    channel: '',
    template: '',
    secretKey: '',
    key: '',
    hotline1: '',
    hotline2: '',
    hotline3: '',
    youtube: '',
    facebook: '',
    zalo: '',
    tiktok: '',
    shopee: '',
    address: '',
    phone: '',
    email: '',
    content: '',
    registration: '',
    note: '',
  }
}) => {
  const { closeModal } = useModal();
  const [formData, setFormData] = useState(initialValues);
  const { refetch: refetchCustomer, insertAsync, updateAsync } = useMediaConfig({});

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

  return (
    <main className="relative"  style={{
        height: "1400px",
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
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtDescription" title="Bắt buộc nhập thông tin">
          Nội dung (*)
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
                  checked={formData.type == 1 ? true : false}
                  onChange={onChange}
                />
                <label htmlFor="type" className={"text-left ml-3"}>ZNS (Zalo OA)</label>
            </div>
            <div className={"flex items-center ml-3"}>
                <input
                  type="radio"
                  value={2}
                  name="type"
                  className="form-check-input mt-0"
                  defaultValue={formData.type}
                  checked={formData.type == 2 ? true : false}
                  onChange={onChange}
                />
                <label htmlFor="type" className={"text-left ml-3"}>Facebook</label>
            </div>
            <div className={"flex items-center ml-3"}>
                <input
                  type="radio"
                  value={3}
                  name="type"
                  className="form-check-input mt-0"
                  defaultValue={formData.type}
                  checked={formData.type == 3 ? true : false}
                  onChange={onChange}
                />
                <label htmlFor="type" className={"text-left ml-3"}>Contact công ty</label>
            </div>
          </div>
      </section>
      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
          ID kênh
        </label>
        <input
          type="text"
          placeholder="Nhập nội dung"
          name="channel"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.channel}
          onChange={onChange}
        />
      </section>
      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
        ID template
        </label>
        <input
          type="text"
          placeholder="Nhập nội dung"
          name="template"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.template}
          onChange={onChange}
        />
      </section>
      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
          Secret Key
        </label>
        <input
          type="text"
          placeholder="Nhập nội dung"
          name="secretKey"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.secretKey}
          onChange={onChange}
        />
      </section>
      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
         Token Key
        </label>
        <input
          type="text"
          placeholder="Nhập nội dung"
          name="key"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.key}
          onChange={onChange}
        />
      </section>
      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
         Hotline1
        </label>
        <input
          type="text"
          placeholder="Nhập nội dung"
          name="hotline1"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.hotline1}
          onChange={onChange}
        />
      </section>
      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
        Hotline2
        </label>
        <input
          type="text"
          placeholder="Nhập nội dung"
          name="hotline2"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.hotline2}
          onChange={onChange}
        />
      </section>
      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
        Hotline3
        </label>
        <input
          type="text"
          placeholder="Nhập nội dung"
          name="hotline3"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.hotline3}
          onChange={onChange}
        />
      </section>
      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
        Youtube
        </label>
        <input
          type="text"
          placeholder="Nhập nội dung"
          name="youtube"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.youtube}
          onChange={onChange}
        />
      </section>
      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
        Facebook
        </label>
        <input
          type="text"
          placeholder="Nhập nội dung"
          name="facebook"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.facebook}
          onChange={onChange}
        />
      </section>
      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
        Zalo
        </label>
        <input
          type="text"
          placeholder="Nhập nội dung"
          name="zalo"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.zalo}
          onChange={onChange}
        />
      </section>
      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
        Tiktok
        </label>
        <input
          type="text"
          placeholder="Nhập nội dung"
          name="tiktok"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.tiktok}
          onChange={onChange}
        />
      </section>
      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
        Shopee
        </label>
        <input
          type="text"
          placeholder="Nhập nội dung"
          name="shopee"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.shopee}
          onChange={onChange}
        />
      </section>
      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
          Địa chỉ
        </label>
        <input
          type="text"
          placeholder="Nhập nội dung"
          name="address"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.address}
          onChange={onChange}
        />
      </section>
      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
          Điện thoại
        </label>
        <input
          type="text"
          placeholder="Nhập nội dung"
          name="phone"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.phone}
          onChange={onChange}
        />
      </section>
      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
          Email
        </label>
        <input
          type="text"
          placeholder="Nhập nội dung"
          name="email"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.email}
          onChange={onChange}
        />
      </section>
      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
          Phụ trách nội dung
        </label>
        <input
          type="text"
          placeholder="Nhập nội dung"
          name="content"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.content}
          onChange={onChange}
        />
      </section>
      <section className="px-5 mt-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="">
          Mã số đăng ký kinh doanh
        </label>
        <input
          type="text"
          placeholder="Nhập nội dung"
          name="registration"
          className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.registration}
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