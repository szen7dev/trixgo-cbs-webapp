import React, { UIEvent, FC, useState } from "react";
import { useModal } from "services/hooks/useModal";
import { useFunda } from "services/hooks/items/useFunda";
import { toast } from "react-toastify";
import moment from "moment";
import { DropdownSearchable } from "shareComponents/common";
import { useArea } from "services/hooks/items/useArea";
import debounce from 'lodash/debounce';
import { useDoctype } from "services/hooks/items/useDoctype";
import { useQueryListDepartments } from "services/hooks/items/useDepartment";
import department from "views/ppt/constants/department";

export const ModalCreateOrUpdateFunda: FC<any> = ({
  modalType,
  onConfirm,
  initialValues = {
    fundaID: '',
    name: '',
    sign: '',
    description: '',
    address: '',
    phone: '',
    bankAccount: '',
    loyaltyPointsRate: '',
    initialDay: new Date(),
    campaign: 1,
    internal: 1,
    platform: 1,
    trialStaffSalary: 0,
    officialStaffSalar: 0,
    nightShiftStaffSalary: 0,
  }
}) => {
  const { closeModal } = useModal();
  const [formData, setFormData] = useState(initialValues);
  const { insertAsync, updateAsync } = useFunda({});
  const [keywordArea, setKeywordArea] = useState('');
  const [searchhDepartmentStr, setSearchDepartmentSrt] = useState();

  const { listDepartments } = useQueryListDepartments({
    keyword: searchhDepartmentStr,
    select: 'name sign'
  }, true);

  const { listAreas, nextPageList: nextPageListArea } = useArea({
    params: {
      keyword: keywordArea,
      populates: JSON.stringify({
        path: "parent",
        select: "name",
        populate: {
          path: "parent",
          select: "name",
        }
      })
    },
    isFetchAreas: true
  });
  const handleSubmit = async () => {
    if(!formData.name) {
      return toast.warn('Vui lòng nhập nội dung');
    }

    const formDataFormat = { ...formData, campaign: +formData.campaign, internal: +formData.internal, platform: +formData.platform };
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
        // toast.error(error.message);
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

  const onChangeCampain = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const campainIDs = formData.activeCampaign || [];
    const findIdx = campainIDs.indexOf(value);
    
    if (findIdx > -1) {
      campainIDs.splice(findIdx, 1);
    } else {
      campainIDs.push(value);
    }

    setFormData((previous: any) => ({
      ...previous,
      [name]: campainIDs
    }))
  }

  const handleSearchArea = debounce((value) => setKeywordArea(value), 500);
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop === clientHeight;
    bottom && nextPageListArea();
  }

  const {
      list: listDoctypes,
  } = useDoctype({
      params: {
          type: 22,// Chiến dịch
          limit: 30
      },
      isFetchList: true
  });

  return (
    <main className="relative h-full">
      <header className="px-10 py-2 flex items-center justify-between">
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

      <section className="px-10 py-2">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtName">
          Nội dung
        </label>
        <input
          type="text"
          placeholder="Nhập nội dung"
          name="name"
          className={"w-full rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header"}
          defaultValue={formData.name}
          onChange={onChange}
        />
      </section>

      <section className="px-10">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtSign">
          Mã hiệu
        </label>
        <input
          type="text"
          placeholder="Nhập mã hiệu"
          name="sign"
          className={"w-full rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header"}
          defaultValue={formData?.sign}
          onChange={onChange}
        />
      </section>

      <section className="px-10">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtDescription">
          Mô tả
        </label>
        <input
          type="text"
          placeholder="Mô tả"
          name="description"
          className={"w-full rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header"}
          defaultValue={formData?.description}
          onChange={onChange}
        />
      </section>

      <section className="px-10">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtAddress">
          Địa chỉ
        </label>
        <input
            placeholder={"Địa chỉ"}
            className={"w-full rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header"}
            defaultValue={formData?.address}
            onChange={onChange}
            name = "address"
        ></input>
      </section>

      <section className="px-10">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtPhone">
          Điện thoại
        </label>
        <input
            placeholder={"Điện thoại"}
            className={"w-full rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header"}
            defaultValue={formData?.phone}
            onChange={onChange}
            name = "phone"
        ></input>
      </section>

      <section className="px-10">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtBankAccount">
          Tài khoản ngân hàng
        </label>
        <input
            placeholder={"Tài khoản ngân hàng"}
            className={"w-full rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header"}
            defaultValue={formData?.bankAccount}
            onChange={onChange}
            name = "bankAccount"
        ></input>
      </section>

      <section className="px-10">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtTrialStaffSalary">
          Lương thử việc/giờ
        </label>
        <input
            type="number"
            placeholder={"Lương thử việc/giờ"}
            className={"w-full rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header"}
            defaultValue={Number(formData?.trialStaffSalary)}
            onChange={onChange}
            name = "trialStaffSalary"
        ></input>
      </section>

      <section className="px-10">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtOfficialStaffSalar">
          Lương chính thức/giờ
        </label>
        <input
            type="number"
            placeholder={"Lương chính thức/giờ"}
            className={"w-full rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header"}
            defaultValue={Number(formData?.officialStaffSalar)}
            onChange={onChange}
            name = "officialStaffSalar"
        ></input>
      </section>

      <section className="px-10">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtNightShiftStaffSalary">
          Lương ca đêm/giờ
        </label>
        <input
            type="number"
            placeholder={"Lương ca đêm/giờ"}
            className={"w-full rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header"}
            defaultValue={Number(formData?.nightShiftStaffSalary)}
            onChange={onChange}
            name = "nightShiftStaffSalary"
        ></input>
      </section>

      <section className="px-10">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="txtBankAccount">
          Tỷ lệ tích điểm (%)
        </label>
        <input
            placeholder={"Tỷ lệ tích điểm % (mặc định 10%)"}
            className={"w-full rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header"}
            defaultValue={formData?.loyaltyPointsRate}
            onChange={onChange}
            name = "loyaltyPointsRate"
        ></input>
      </section>

      <section className="px-10">
          <label className="block text-gray-700 text-sm font-bold" htmlFor="txtInitialDay">
            Link dự án phòng ban
          </label>
          <DropdownSearchable
            onchangeValue={(value: any) => {
                setFormData((previous: any) => ({
                    ...previous,
                    project: value?.id
                }))
            }}
            onClearData={() => {
                setFormData((previous: any) => ({
                    ...previous,
                    project: ""
                }))
            }}
            onSearchInputChange={debounce((value: any) => setSearchDepartmentSrt(value), 600)}
            onScroll={handleScroll}
            className="w-full rounded-md border border-primary-border px-1 py-1 placeholder-primary-gray bg-cbs-table-header"
            placeholder="Tìm kiếm"
            isMultiple={false}
            allowClearValueSingleInput={true}
            showTriangle={false}
            maxWidthInput="max-w-full"
            renderSelectedItem={(item: any) => (
                <div className="max-w-full">
                    <p className={"truncate"}>{item.text}</p>
                </div>
            )}
            data={listDepartments.map((item:any) => ({
              label: `${item.sign}.${item.name}`,
              value: item._id,
            }))}
            initialValue={{
              value: formData?.project?.id, 
              label: formData?.project && `${formData?.project?.name}` || "Chọn dự án phòng ban"
            }}
            formatItem={{
              id: "value",
              text: "label",
            }}
            inlineSearch={true}
          />
      </section>

      <section className="px-10">
          <label className="block text-gray-700 text-sm font-bold" htmlFor="txtInitialDay">
            Khu vực
          </label>
          <DropdownSearchable
            onchangeValue={(value: any) => {
                setFormData((previous: any) => ({
                    ...previous,
                    area: value?.id
                }))
            }}
            onClearData={() => {
                setFormData((previous: any) => ({
                    ...previous,
                    area: ""
                }))
            }}
            onSearchInputChange={debounce((value: any) => setKeywordArea(value), 600)}
            onScroll={handleScroll}
            className="w-full rounded-md border border-primary-border px-1 py-1 placeholder-primary-gray bg-cbs-table-header"
            placeholder="Tìm kiếm khu vực"
            isMultiple={false}
            allowClearValueSingleInput={true}
            showTriangle={false}
            maxWidthInput="max-w-full"
            renderSelectedItem={(item: any) => (
                <div className="max-w-full">
                    <p className={"truncate"}>{item.text}</p>
                </div>
            )}
            data={listAreas.map((area:any) => ({
                label: `${area?.name}, ${area?.parent?.name}, ${area?.parent?.parent?.name}`,
                value: area._id,
            }))}
            initialValue={{
              value: formData?.area3?._id, 
              label: formData?.area3 && `${formData?.area3?.name}, ${formData?.area2?.name}, ${formData?.area1?.name}` || "Chọn khu vực"
            }}
            formatItem={{
                id: "value",
                text: "label",
            }}
            inlineSearch={true}
          />
      </section>

      <section className="px-10">
          <label className="block text-gray-700 text-sm font-bold" htmlFor="txtInitialDay">
            Ngày bắt đầu
          </label>
        <input
          type="date"
          placeholder="Ngày bắt đầu"
          name="initialDay"
          className="w-full rounded-md border border-primary-border px-1 py-1 placeholder-primary-gray bg-cbs-table-header"
          defaultValue={moment(formData.initialDay).format('YYYY-MM-DD')}
          onChange={onChange}
        />
      </section>

      <section className="px-10">
          <label className="block text-gray-700 text-sm font-bold" htmlFor="txtPlatform">
            Phân loại mảng hoạt động
          </label>
          <div className={"flex items-center"}>
            <div className={"flex items-center ml-3"}>
                <input
                  type="radio"
                  value={1}
                  name="platform"
                  className="form-check-input mt-0"
                  defaultValue={formData.platform}
                  checked={formData.platform == 1?true: false}
                  onChange={onChange}
                />
                <label htmlFor="platform" className={"text-left ml-3"}>Bán tại điểm bán</label>
            </div>
            <div className={"flex items-center ml-3"}>
                <input
                  type="radio"
                  value={2}
                  name="platform"
                  className="form-check-input mt-0"
                  defaultValue={formData.platform}
                  checked={formData.platform == 2?true: false}
                  onChange={onChange}
                />
                <label htmlFor="platform" className={"text-left ml-3"}>Bán qua sàn bán lẻ</label>
            </div>
          </div>
      </section>

      <section className="px-10">
          <label className="block text-gray-700 text-sm font-bold" htmlFor="txtCampaign">
            Chiến dịch quảng cáo
          </label>
          <div className={"flex items-center"}>
            <div className={"flex items-center ml-3"}>
                <input
                  type="radio"
                  value={1}
                  name="campaign"
                  className="form-check-input mt-0"
                  defaultValue={formData.campaign}
                  checked={formData.campaign == 1?true: false}
                  onChange={onChange}
                />
                <label htmlFor="campaign" className={"text-left ml-3"}>Tắt</label>
            </div>
            <div className={"flex items-center ml-3"}>
                <input
                  type="radio"
                  value={2}
                  name="campaign"
                  className="form-check-input mt-0"
                  defaultValue={formData.campaign}
                  checked={formData.campaign == 2?true: false}
                  onChange={onChange}
                />
                <label htmlFor="campaign" className={"text-left ml-3"}>Bật</label>
            </div>
          </div>
      </section>

      <section className="px-10">
          <label className="block text-gray-700 text-sm font-bold" htmlFor="txtInternal">
            Phân loại
          </label>
          <div className={"flex items-center"}>
            <div className={"flex items-center ml-3"}>
                <input
                  type="radio"
                  value={1}
                  name="internal"
                  className="form-check-input mt-0"
                  defaultValue={formData.internal}
                  checked={formData.internal == 1?true: false}
                  onChange={onChange}
                />
                <label htmlFor="internal" className={"text-left ml-3"}>Hệ thống</label>
            </div>
            <div className={"flex items-center ml-3"}>
                <input
                  type="radio"
                  value={2}
                  name="internal"
                  className="form-check-input mt-0"
                  defaultValue={formData.internal}
                  checked={formData.internal == 2?true: false}
                  onChange={onChange}
                />
                <label htmlFor="internal" className={"text-left ml-3"}>Nhượng quyền</label>
            </div>
          </div>
      </section>

      <section className="px-10">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtCampaign">
            Chiến dịch đang hoạt động
          </label>
          <div className="flex flex-wrap w-full">
            {
              listDoctypes.map((doctype: any) => (
                <div className={"flex items-center ml-3 mb-2"} key={doctype._id}>
                    <input
                      type="checkbox"
                      value={doctype._id}
                      name="activeCampaign"
                      className="form-check-input mt-0"
                      defaultValue={doctype._id}
                      onChange={onChangeCampain}
                      checked={formData?.activeCampaign?.includes(doctype._id)}
                    />
                    <label htmlFor="activeCampaign" className={"text-left ml-3"}>{doctype.name}</label>
              </div>
              ))
            }
          </div>
      </section>
      
      <footer className="absolute right-0 bottom-0 px-10 py-5">
        <button className="bg-primary text-primary-light text-base w-24 h-8 rounded"
          onClick={handleSubmit}>
          Xác nhận
        </button>
      </footer>
    </main>
  );
};