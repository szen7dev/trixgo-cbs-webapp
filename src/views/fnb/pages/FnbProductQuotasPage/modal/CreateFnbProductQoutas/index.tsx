/**
 * Libraries
 */
import { FC, useState } from "react";
import { Dialog } from '@headlessui/react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { DropdownSearchable } from "shareComponents/common";
import debounce from "lodash/debounce";
import { useParams } from "react-router-dom";

/**
 * Types, Services
 */
import "react-datepicker/dist/react-datepicker.css";
import { useFnbQuota } from 'services/hooks/fnb/useFnbQuota';
import { useGoods } from "services/hooks/items/useGoods";

const CreateFnbProductQoutas: FC<any> = ({ toggle, modalType, onConfirm, initialValues = {
    goodsID: "",
    quantity: "",
    note: ""  
} }) => {
    console.log({initialValues})
	const { productID } = useParams<{ productID: string }>();
    const [keyword, setKeyword] = useState('');
    const {  insertAsync, updateAsync, refetch } = useFnbQuota({ params: { keyword: "", productID, populates: JSON.stringify({
        path: 'goods', select: "name unit"
    })  }, isFetchList: false, isFetchInfo: false  });
    const handleSubmit = async (values: any) => {
        if (modalType == 'create') {
            const query = {
                ...values,
                productID,
                goodsID: values.goodsID,
                quantity: parseInt(values.quantity),
                note: values.note,
            };
           
            const result = await insertAsync(query);
            if (!result.error) {
                refetch();
                toggle();
                toast.success('Tạo mới dữ liệu thành công');
            } else {
                toast.error(result?.data?.message);
            }
        };
        
        if (modalType == 'update') {
            const query = {
                ...values,
                quotaID: values._id,
                goodsID: values.goodsID,
                quantity: parseInt(values.quantity),
                note: values.note,
            };
            const result = await updateAsync(query);
            if (!result.error) {
                refetch();
                toggle();
                toast.success('Cập nhật dữ liệu thành công');
            } else {
                toast.error(result?.data?.message);
            }
        };
    };

    const {
        deleteAsync,
        list: listGoods,
        hasNextPage,
        refetch: refetchGood,
        fetchNextPage,
        totalRecord
    } = useGoods({
        params: { keyword, isListParentOfListChilds: "1" }, // Khi keyword thay đổi giá trị => API thay đổi data => refretch kết quả
        isFetchList: true
    });
    return (
        <Formik
            initialValues={initialValues}
            // validationSchema={companySchema}
            onSubmit={handleSubmit}
        >
            {
                formik => {
                    const { values, getFieldProps, setFieldValue } = formik;
                    return (
                        <Form autoComplete="off">
                            <div className="flex items-center px-6 py-2.5 justify-between border-b border-secondary-gray border-opacity-30">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg leading-6 font-bold"
                                >
                                    {modalType == 'create' ? 'Tạo định mức thực đơn' : 'Cập nhật định mức thực đơn'}
                                </Dialog.Title>
                                <button className="bg-primary-gray bg-opacity-20 p-2 rounded-3xl" type="button" onClick={() => toggle()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="px-6 mt-2 pt-3.5 flex-1 flex flex-col">
                                <DropdownSearchable
                                    onchangeValue={(value: any) => {
                                        setFieldValue("goodsID", value?.id);
                                    }}
                                    onClearData={() => {
                                        setFieldValue("goodsID", "");
                                    }}
                                    onSearchInputChange={debounce((value: any) => setKeyword(value), 600)}
                                    // onScroll={handleScroll}
                                    className="w-full mt-2 rounded-md border border-primary-border px-1 py-1 placeholder-primary-gray bg-cbs-table-header"
                                    placeholder="Chọn nguyên liệu"
                                    isMultiple={false}
                                    allowClearValueSingleInput={true}
                                    showTriangle={false}
                                    maxWidthInput="max-w-full"
                                    disabled={modalType == 'create' ? false: true}
                                    renderSelectedItem={(item: any) => (
                                        <div className="max-w-full">
                                            <p className={"truncate"}>{item.text}</p>
                                        </div>
                                    )}
                                    data={listGoods.map((good) => ({
                                        label: `${good.name}`,
                                        value: good._id,
                                    }))}
                                    initialValue={{
                                        label: initialValues?.goods?.name || "Chọn nguyên liệu",
                                        value: initialValues?.goods?._id,
                                    }}
                                    formatItem={{
                                        id: "value",
                                        text: "label",
                                    }}
                                    inlineSearch={true}
                                />
                               
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtUnit">
                                     Khối lượng
                                    </label>
                                    <Field type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="txtQuantity" placeholder="Khối lượng" {...getFieldProps('quantity')} />
                                    <ErrorMessage
                                        name="unit"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtNote">
                                    Ghi chú
                                    </label>
                                    <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="txtNote" placeholder="Ghi chú" {...getFieldProps('note')} />
                                    <ErrorMessage
                                        name="note"
                                        component="span"
                                        className="font-normal leading-7 text-sm text-negative"
                                    />
                                </div>
                                <div className="flex justify-end pt-5 px-6 pb-6 mb-0.5">
                                    <div>
                                        <button type="submit" className="px-7 py-3.5 rounded-md bg-primary text-white font-bold text-sm leading-4">Xác nhận</button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )
                }
            }
        </Formik>
    )
};

export default CreateFnbProductQoutas;