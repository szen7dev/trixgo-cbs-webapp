import React, { FC, useState, UIEvent } from "react";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import { useModal } from "services/hooks/useModal";
import { useDoctype } from "services/hooks/items/useDoctype";
import { ModalProps } from 'typings/items/doctype';
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { DropdownSearchable } from "shareComponents/common";
import RadioEmpty from "assets/images/Ellipse 27.svg";
import RadioChecked from "assets/images/icons8-checked-40 (2) 2.svg";

export const ModalCreateOrUpdateDoctype: FC<ModalProps> = ({
  modalType,
  onConfirm,
  level = 'parent',
  initialValues = {
    doctypeID: '',
    parent: '',
    name: '',
    sign: '',
    unit: '',
    linkItem: '',
    description: '',
    type: 1,
    subType: 1,
    grade: 1,
    salesChannel: 1,
    amount: 0,
    alert: 0,
  }
}) => {
  const { closeModal } = useModal();
  const [formData, setFormData] = useState(initialValues);
  const [keyword, setKeyword] = useState();

  const { 
    list,
    hasNextPage,
    refetch,
    fetchNextPage,
    totalRecord,
    insertAsync,
    updateAsync,
   } = useDoctype({
      params: {
        type: 3,
        keyword,
    },
    isFetchList: true
   });

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop >= clientHeight - 10;
    if (!bottom || !hasNextPage) return;

      fetchNextPage();
  }

  const handleSubmit = async () => {
    if(!formData.name) {
      return toast.warn('Vui lòng nhập nội dung');
    }

    try {
      // Handle api here!
      switch (modalType) {
        case 'create': {
          const { error, data } = await insertAsync({...formData, salesChannel: +formData?.salesChannel, amount: +formData?.amount, alert: +formData?.alert});

          if (error) {
            return toast.warning(data.message);
          }

          toast.success('Tạo thành công', { autoClose: 500 });
          break;
        }
        case 'update': {
          const { error, data } = await updateAsync({...formData, salesChannel: +formData?.salesChannel, amount: +formData?.amount, alert: +formData?.alert});

          if (error) {
            return toast.warning(data.message);
          }

          toast.success('Cập nhật thành công', { autoClose: 500 });
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

  const onChange = ({ name, value }: { name: string, value: string | number | undefined }) => {
    console.log({name, value })
    setFormData(previous => ({
      ...previous,
      [name]: value
    }))
  }

  return (
    <main className="relative h-full">
      <header className="px-5 py-2 flex items-center justify-between">
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

      <section className="px-5 mt-1">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtName">
          Tên (*)
        </label>
        <input
          type="text"
          placeholder="Nhập nội dung"
          name="name"
          className="w-full mt-2 rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target)}
        />
      </section>
      
      <section className="px-5 mt-1">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtSign">
          Mã hiệu
        </label>
        <input
          type="text"
          placeholder="Nhập mã hiệu"
          name="sign"
          className="w-full mt-2 rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.sign}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target)}
        />
      </section>

      <section className="px-5 mt-1">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtSign">
          Đơn vị tính
        </label>
        <input
          type="text"
          placeholder="Đơn vị tính"
          name="unit"
          className="w-full mt-2 rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.unit}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target)}
        />
      </section>

      <section className="px-5 mt-1">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtSign">
          Giá trị
        </label>
        <input
          type="number"
          placeholder="Giá trị"
          name="amount"
          className="w-full mt-2 rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.amount}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target)}
        />
      </section>

      <section className="px-5 mt-1">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtSign">
          Thời hạn (giờ)
        </label>
        <input
          type="number"
          placeholder="Thời hạn (giờ)"
          name="alert"
          className="w-full mt-2 rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.alert}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target)}
        />
      </section>

      <section className="px-5 mt-1">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtSign">
          Cấp độ
        </label>
        <input
          type="number"
          placeholder="1-Nhẹ | 2-Cơ bản | 3-Nặng | 4-Nghiêm trọng"
          name="grade"
          className="w-full mt-2 rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.grade}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target)}
        />
      </section>

      <section className="px-5 mt-1">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtSign">
          Phân loại
        </label>
        <input
          type="number"
          placeholder="1-Chung | 2-Khảo sát khách hàng | 3-Hành trình trải nghiệm"
          name="subType"
          className="w-full mt-2 rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.subType}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target)}
        />
      </section>

      <section className="px-5 mt-1">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtDescription">
          Mô tả, ghi chú
        </label>
        <input
          type="text"
          placeholder="Nhập mô tả"
          name="description"
          className="w-full mt-2 rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={formData.description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target)}
        />
      </section>

      <section className="px-5 py-1">
        <p>Link danh mục</p>
        <DropdownSearchable
            onchangeValue={(value: any) => {
                setFormData((previous: any) => ({
                    ...previous,
                    linkItemID: value?.id
                }))
            }}
            onClearData={() => {
                setFormData((previous: any) => ({
                    ...previous,
                    linkItemID: ""
                }))
            }}
            onSearchInputChange={debounce((value: any) => setKeyword(value), 600)}
            onScroll={handleScroll}
            className="w-full mt-2 rounded-md border border-primary-border py-1 placeholder-primary-gray bg-cbs-table-header"
            placeholder="Tìm kiếm danh mục"
            isMultiple={false}
            allowClearValueSingleInput={true}
            showTriangle={false}
            maxWidthInput="max-w-full"
            renderSelectedItem={(item: any) => (
                <div className="max-w-full">
                    <p className={"truncate"}>{item.text}</p>
                </div>
            )}
            data={list.map((item) => ({
                label: `${item.name}`,
                value: item._id,
            }))}
            // initialValue={{
            //   label: `${initialValues?.linkItem?.name}`,
            //   value: initialValues?.linkItem?._id
            // }}
            formatItem={{
                id: "value",
                text: "label",
            }}
            inlineSearch={true}
        />
      </section>

      {(initialValues.type === 22) && (
        <section className="px-10 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtSalesChannel">
            Phân loại kênh bán hàng
          </label>
          <div>
              <FormControl sx={{ marginTop: "-5px" }} >
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="salesChannel"
                >
                  <FormControlLabel
                    sx={{ marginLeft: "0" }}
                    value={1}
                    control={
                      <Radio
                        style={{}}
                        icon={<img src={RadioEmpty} alt="" />}
                        checkedIcon={<img src={RadioChecked} alt="" />}
                        onChange={(event: any) => onChange(event.target)}
                        checked={(formData.salesChannel == 1) ? true : false}
                      />
                    }
                    label={<span className="text-[13px]">Offline</span>}
                  />
                  <FormControlLabel
                    sx={{ marginLeft: "0" }}
                    value={2}
                    control={
                      <Radio
                        style={{}}
                        icon={<img src={RadioEmpty} alt="" />}
                        checkedIcon={<img src={RadioChecked} alt="" />}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target)}
                        checked={(formData.salesChannel == 2) ? true : false}
                      />
                    }
                    label={<span className="text-[13px]">Grab</span>}
                  />
                  <FormControlLabel
                    sx={{ marginLeft: "0" }}
                    value={3}
                    control={
                      <Radio
                        style={{}}
                        icon={<img src={RadioEmpty} alt="" />}
                        checkedIcon={<img src={RadioChecked} alt="" />}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target)}
                        checked={(formData.salesChannel == 3) ? true : false}
                      />
                    }
                    label={<span className="text-[13px]">Shopee</span>}
                  />
                </RadioGroup>
              </FormControl>
            </div>
        </section>
      )} 
      {(level === 'child' && initialValues.type === 21) && (
        <section className="px-10 mt-3">
          <DropdownSearchable
            onchangeValue={(value) => onChange({ name: 'level', value: value.id })}
            placeholder={"Phân loại"}
            className={"w-full h-12 flex-1 border border-primary-border p-2"}
            focusedClass={"border-b border-primary"}
            maxWidthInput={"max-w-none"}
            isMultiple={false}
            allowClearValueSingleInput={false}
            data={[
              { value: 1, text: 'Không hài lòng' },
              { value: 2, text: 'Hài lòng' },
            ]}
            initialValue={{
              value: 1, text: 'Không hài lòng'
            }}
            formatItem={{
              id: "value",
              text: "text",
            }}
            disableSearch={true}
          />
        </section>
      )}

      <footer className="absolute right-0 bottom-0 px-5 py-5">
        <button className="bg-primary text-primary-light text-base w-24 h-8 rounded" onClick={handleSubmit}>
          Xác nhận
        </button>
      </footer>
    </main>
  );
};