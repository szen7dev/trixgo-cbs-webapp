import React, { FC, useEffect, useState } from "react";
import { DropdownSearchable } from "shareComponents/common";
import { toast } from "react-toastify";
import { object, string } from "yup";
import { getIn, Formik } from "formik";
import { Task } from "typings/task";
import { useBudgetWork } from "services/hooks/budget/useBudgetWork";
import { useBudgetSubmittal } from "services/hooks/budget/useBudgetSubmittal";
import { useUserSystem } from 'services/hooks/users/useUserSystem';
import { useQueryContact } from "services/hooks/items/useContact";
import { useGoods } from "services/hooks/items/useGoods";

type Props = {
    task: Task;
    userId?: string;
    cancelCreateSubmittal: () => void;
    confirmCreateSubmittal: () => void;
}

export const CreateSubmitDetail: FC<Props> = ({ task, userId, cancelCreateSubmittal, confirmCreateSubmittal }) => {
    const LIMIT_PER_PAGE_USER = 20;
    const [keywordBugetWork, setKeywordBugetWork] = useState('');
    const [keywordUser, setKeywordUser] = useState('');
    const [keywordUContact, setKeywordUContact] = useState('');
    const [keywordWoods, setKeywordWoods] = useState('');
    const companyID = task?.company?._id

    const {
		list: listBudgetWorks
	} = useBudgetWork({
		params: {
            companyID,
			keyword: keywordBugetWork
		},
		isFetchList: true
	})

    const {
        data: listUsersSystem,
    } = useUserSystem({
        companyID,
        keyword: keywordUser,
        limit: LIMIT_PER_PAGE_USER
    }, !!task?.company?._id);

    const { listContact } = useQueryContact({ 
        companyID, 
        keyword: keywordUContact
     });

    const {
        list: listGoods
    } = useGoods({
        params: { 
            companyID,
            keyword: keywordWoods 
        },
        isFetchList: true
    })

    const {
		insertAsync: insertBugetWorkAsync,
	} = useBudgetSubmittal({
		params: {
			// isMember: 1,
			// keyword
		},
		isFetchList: true
	})

    const handleSearchBudgetWork = (keyword: string) => {
        setKeywordBugetWork(keyword);
    };
    const handleSearchUser = (keyword: string) => {
        setKeywordUser(keyword);
    };
    const handleSearchContact = (keyword: string) => {
        setKeywordUContact(keyword);
    };
    const handleSearchWoods = (keyword: string) => {
        setKeywordWoods(keyword);
    };

    const handleCancelCreateSubmittal = () => {
        cancelCreateSubmittal();
    }

    const handleAddSubmittal = async (values: any) => {
        try {
            const dataUpdate: any = {
                isUpdateNews: true,
                taskID: task._id,
            }

            const { error, data } = await insertBugetWorkAsync({
                ...values,
                ...dataUpdate
            });

            if (error) return toast.warning(data?.message);

            toast.success('Tạo mẩu tin thành công');
            confirmCreateSubmittal();
        } catch (error) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            handleCancelCreateSubmittal();
        }
    }

    const initialValues = {
        name: "",
        note: "",
    };

    const validateSchema = object().shape({
        name: string().required("Bạn cần nhập nội dung")
    });

    return (
        <div className={"create-new-subtask border-0.5 border-primary-border rounded ml-6 mt-4"}>
            <Formik
                initialValues={initialValues}
                validationSchema={validateSchema}
                onSubmit={handleAddSubmittal}
            >
                {({
                    values,
                    touched,
                    errors,
                    handleBlur,
                    handleChange,
                    setFieldValue,
                    handleSubmit,
                }) => {
                    return (
                        <>
                            <div className="flex w-full px-4 pt-4">
                                <div className="w-2/6 mr-1 border-b">
                                    <input
                                        name="name"
                                        className="w-full h-8 placeholder-gray-300 focus:outline-none"
                                        placeholder={"Nội dung"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <div className="mr-1 border-b">
                                    <DropdownSearchable
                                        placeholder={"Nhân sự"}
                                        className={"w-full flex-1"}
                                        showTriangle={false}
                                        maxWidthInput={"max-w-none"}
                                        isMultiple={false}
                                        allowClearValueSingleInput={true}
                                        renderSelectedItem={(item) => (
                                            <div className={"flex items-center"}>
                                                <span>{item.text}</span>
                                            </div>
                                        )}
                                        data={listUsersSystem.map((item) => ({
                                            label: item.fullname,
                                            value: item._id,
                                        }))}
                                        formatItem={{
                                            id: "value",
                                            text: "label",
                                        }}
                                        inlineSearch={true}
                                        onSearchInputChange={handleSearchUser}
                                        onchangeValue={item => setFieldValue("staffID", item.id)}
                                        onClearData={() => setFieldValue("staffID", "")}
                                    />
                                </div>
                                <div className="mr-1 border-b">
                                    <DropdownSearchable
                                        placeholder={"Vật tư"}
                                        className={"w-full flex-1"}
                                        showTriangle={false}
                                        maxWidthInput={"max-w-none"}
                                        isMultiple={false}
                                        allowClearValueSingleInput={true}
                                        renderSelectedItem={(item) => (
                                            <div className={"flex items-center"}>
                                                <span>{item.text}</span>
                                            </div>
                                        )}
                                        data={listGoods.map((item) => ({
                                            label: `${item.name}`,
                                            value: item._id,
                                        }))}
                                        formatItem={{
                                            id: "value",
                                            text: "label",
                                        }}
                                        inlineSearch={true}
                                        onSearchInputChange={handleSearchWoods}
                                        onchangeValue={item => setFieldValue("goodsID", item.id)}
                                        onClearData={() => setFieldValue("goodsID", "")}
                                    />
                                </div>
                                <div className="mr-1 border-b">
                                    <DropdownSearchable
                                        placeholder={"Mã khách"}
                                        className={"w-full flex-1"}
                                        showTriangle={false}
                                        maxWidthInput={"max-w-none"}
                                        isMultiple={false}
                                        allowClearValueSingleInput={true}
                                        renderSelectedItem={(item) => (
                                            <div className={"flex items-center"}>
                                                <span>{item.text}</span>
                                            </div>
                                        )}
                                        data={listContact.map((item) => ({
                                            label: `${item.name}-${item.phone}`,
                                            value: item._id,
                                        }))}
                                        formatItem={{
                                            id: "value",
                                            text: "label",
                                        }}
                                        inlineSearch={true}
                                        onSearchInputChange={handleSearchContact}
                                        onchangeValue={item => setFieldValue("contactID", item.id)}
                                        onClearData={() => setFieldValue("contactID", "")}
                                    />
                                </div>
                                <div className="mr-1 border-b">
                                    <DropdownSearchable
                                        placeholder={"Khoản mục phí"}
                                        className={"w-full flex-1"}
                                        showTriangle={false}
                                        maxWidthInput={"max-w-none"}
                                        isMultiple={false}
                                        allowClearValueSingleInput={true}
                                        renderSelectedItem={(item) => (
                                            <div className={"flex items-center"}>
                                                <span>{item.text}</span>
                                            </div>
                                        )}
                                        data={listBudgetWorks.map((item) => ({
                                            label: `${item.sign}-${item.name}`,
                                            value: item._id,
                                        }))}
                                        formatItem={{
                                            id: "value",
                                            text: "label",
                                        }}
                                        inlineSearch={true}
                                        onSearchInputChange={handleSearchBudgetWork}
                                        onchangeValue={item => setFieldValue("workID", item.id)}
                                        onClearData={() => setFieldValue("workID", "")}
                                    />
                                </div>
                                <div className="mr-1 border-b">
                                    <DropdownSearchable
                                        placeholder={"Thuộc thiết bị"}
                                        className={"w-full flex-1"}
                                        showTriangle={false}
                                        maxWidthInput={"max-w-none"}
                                        isMultiple={false}
                                        allowClearValueSingleInput={true}
                                        renderSelectedItem={(item) => (
                                            <div className={"flex items-center"}>
                                                <span>{item.text}</span>
                                            </div>
                                        )}
                                        data={listGoods.map((item) => ({
                                            label: `${item.name}`,
                                            value: item._id,
                                        }))}
                                        formatItem={{
                                            id: "value",
                                            text: "label",
                                        }}
                                        inlineSearch={true}
                                        onSearchInputChange={handleSearchWoods}
                                        onchangeValue={item => setFieldValue("assetsID", item.id)}
                                        onClearData={() => setFieldValue("assetsID", "")}
                                    />
                                </div>
                                <div className="mr-1 border-b">
                                    <input
                                        type="number"
                                        name="quantity"
                                        className="w-full h-8 placeholder-gray-300 focus:outline-none"
                                        placeholder={"KL"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <div className="border-b">
                                    <input
                                        type="number"
                                        name="unitPrice"
                                        className="w-full h-8 placeholder-gray-300 focus:outline-none"
                                        placeholder={"Đơn giá"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                            </div>

                             {/* Validate data */}
                             <div className="flex w-full px-4 pb-4 mt-1">
                                <div className="w-2/6">
                                    <span
                                        className="text-red-500"
                                        style={{ fontSize: 11 }}
                                    >
                                        {touched.name && errors.name}
                                    </span>
                                </div>
                                <div className="w-2/6 mx-3">
                                    <span
                                        className="text-red-500"
                                        style={{ fontSize: 11 }}
                                    >
                                        {getIn(touched, "workID") &&
                                            getIn(errors, "workID")}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4">
                                <textarea name="" rows={8}
                                    className="border-0.5 p-4 rounded-md w-full bg-white outline:none outlineNone"
                                    placeholder="Nhập ghi chú"
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                        setFieldValue("note", e.target.value);
                                    }}
                                ></textarea>
                            </div>
                            <div className={"flex items-center justify-between pt-0 p-4"}>
                                <div className="flex items-center">
                                    <button className={"py-2 px-4 rounded bg-cbs-form-input-bg text-primary-gray mr-2 font-bold"} onClick={handleCancelCreateSubmittal}>
                                        Bỏ qua
                                    </button>
                                    <button
                                        onClick={() => handleSubmit()}
                                        className={"py-2 px-4 bg-primary rounded text-white"}
                                    >
                                        Xác nhận
                                    </button>
                                </div>
                            </div>
                        </>
                    );
                }}
            </Formik>
        </div>
    )
}