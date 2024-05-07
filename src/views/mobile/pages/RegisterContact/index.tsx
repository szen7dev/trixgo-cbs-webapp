import { ChangeEvent, FC, useState } from "react";
import { toast } from "react-toastify";
import API from "apis/repository";
import moment from 'moment';

const defaultValue = {
    authorID: '5f7363e2c229794d8c0bc691',
    fundaID: '65b0c41d6fb3b30012e0ad29',
    name: '',
    email: '',
    phone: '',
    birthday: '',
}

const RegisterContactPage: FC = () => {
    const [formData, setFormData] = useState(defaultValue);

    const resetForm = () => setFormData(defaultValue);

    const handleSubmit = async () => {
        try {
            if(!formData.name) {
                return toast.warn("Bạn cần nhập họ và tên");
            }

            if(!formData.phone) {
                return toast.warn("Bạn cần nhập số điện thoại");
            }

            const { status, data } = await API.post(`/api/item/contacts/register`, { ...formData });

            if(status !== 200 || data.error) {
                return toast.warn(data?.message || data?.data?.message || "Đăng ký thất bại")
            }

            toast.success("Đăng ký thành công");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            resetForm();
        }
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(curr => ({ ...curr, [name]: value }));
    }

    return (
        <>
            <main>
                <header className="px-5 py-2 flex items-center justify-between">
                    <p className="font-bold text-xl">
                        Đăng ký khách hàng
                    </p>
                </header>

                <section className="px-5 mt-2">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="input-name" title="Bắt buộc nhập thông tin">
                        Tên danh bạ (*)
                    </label>
                    <input
                        type="text"
                        placeholder="Nhập tên"
                        name="name"
                        id="input-name"
                        className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
                        value={formData.name}
                        onChange={onChange}
                    />
                </section>

                <section className="px-5 mt-2">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="input-phone" title="Bắt buộc nhập thông tin">
                        Điện thoại (*)
                    </label>
                    <input
                        type="text"
                        placeholder="Điện thoại"
                        name="phone"
                        id="input-phone"
                        className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
                        value={formData.phone}
                        onChange={onChange}
                    />
                </section>

                <section className="px-5 mt-2">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="input-email">
                        Email
                    </label>
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        id="input-email"
                        className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
                        value={formData.email}
                        onChange={onChange}
                    />
                </section>

                {/* <section className="px-5 mt-2">
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
                </section> */}

                <section className="px-5 mt-2">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="input-birthday">
                        Ngày sinh
                    </label>
                    <input
                        type="date"
                        placeholder="Ngày sinh"
                        name="birthday"
                        id="input-birthday"
                        className="w-full rounded-md border border-primary-border px-2 py-1 pb-2 placeholder-primary-gray bg-cbs-table-header"
                        value={moment(formData.birthday).format("YYYY-MM-DD")}
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
                        onChange={onChange}
                    />
                </section>

                <footer className="px-5 py-5 flex justify-end">
                    <button className="bg-primary text-primary-light text-base w-24 h-8 rounded"
                    onClick={handleSubmit}>
                        Xác nhận
                    </button>
                </footer>
            </main>
        </>
    )
}

export default RegisterContactPage;