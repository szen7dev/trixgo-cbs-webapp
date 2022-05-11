import { FC, UIEvent, useState } from "react";
import { Formik, Form } from "formik";
import DayPickerInput from "react-day-picker/DayPickerInput";
import moment from "moment";
import debounce from "lodash/debounce";

/**
 * Components, Assets
 */
import TagIcon from "assets/images/icons8-price-tag-96.svg";
import fakeThumbnail from "assets/images/avatar.jpg";
import { DropdownSearchable } from "shareComponents/common";
import { ModalCreateResultSearch } from "./components";
import { PCM_PROPOSAL_TASK, PCM_STATUS_TASK } from "apis/localdb/index";

/**
 * Hooks, Typings
 */
import { useModal } from "services/hooks/useModal";
import { useUserSystem } from "services/hooks/users/useUserSystem";
import { useQueryListDoctype } from "services/hooks/useHuman";
import { useQueryListDepartmentsIsMember } from "services/hooks/items/useDepartment";
import { useQueryListCompany } from "services/hooks/useCompanies";

interface InitialValues {
  fromDate: string;
  toDate: string;
  assigneesID: string[];
  companiesOfAssignee: string[];
  authorsID: string[];
  projectsID: string[];
  subtypes: string[];
  status: string[];
  fieldsID: string[];
}

type Props = {
  handleFilterData: (filterData: any) => void,
  toggleSearchFilter: () => void,
}

export const MainSearchFilter: FC<Props> = ({ handleFilterData, toggleSearchFilter }) => {
  const onSubmitFilterData = (values: any) => {
    handleFilterData(values);
    toggleSearchFilter();
  };
  const { openModal } = useModal();

  const [searchDepartmentValue, setSearchDepartmentValue] = useState("");
  const [otherFieldValue, setOtherFieldValue] = useState("");
  const [searchUserSystem, setSearchUserSystem] = useState("");
  const [searchCompanyName, setSearchCompanyName] = useState("");

  const { data: listDepartments } = useQueryListDepartmentsIsMember({
    limit: 50,
    keyword: searchDepartmentValue,
    isFetch: true
  });

  const { listDoctypes } = useQueryListDoctype({ 
    limit: 50,
    type: 2,
    keyword: otherFieldValue
  });

  const {
    data: listUsersSystem,
    hasNextPage: hasNextPageUserSystem,
    fetchNextPage: fetchNextPageUserSystem,
  } = useUserSystem({ keyword: searchUserSystem }, true);

  const {
    data: listCompany,
    hasNextPage: hasNextPageCompany,
    fetchNextPage: fetchNextPageCompany
  } = useQueryListCompany({ keyword: searchCompanyName });

  const handleScrollUserSystem = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop === clientHeight;

    if(bottom && hasNextPageUserSystem) {
      fetchNextPageUserSystem();
    }
  }

  const handleScrollCompany = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop === clientHeight;

    if(bottom && hasNextPageCompany) {
      fetchNextPageCompany();
    }
  }

  const initialValues: InitialValues = {
    fromDate: '',
    toDate: '',
    assigneesID: [],
    companiesOfAssignee: [],
    authorsID: [],
    projectsID: [],
    subtypes: [],
    status: [],
    fieldsID: [],
  }

  return (
    <>
      <div className="t-main-search-filter-wrapper">
        <Formik initialValues={initialValues} onSubmit={onSubmitFilterData}>
          {(formik) => {
            const { setFieldValue, values } = formik;

            return (
              <Form>
                {/* filter item */}
                <div className="t-main-search-filter-item flex items-center mt-4">
                  <p className={"t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"}>Người thực hiện</p>
                  <DropdownSearchable
                    onchangeValue={(value) => {
                      if(!values.assigneesID?.includes?.(value.id as string)) {
                        setFieldValue("assigneesID", [...values.assigneesID, value.id]);
                      }
                      setSearchUserSystem('')
                    }}
                    onMultipleRemoveValue={(id: any) => {
                      const newList = values.assigneesID.filter(item => item !== id);
                      setFieldValue('assigneesID', newList);
                    }}
                    onClearData={() => setFieldValue("assigneesID", [])}
                    onSearchInputChange={debounce(
                      (value) => setSearchUserSystem(value),
                      500
                    )}
                    className={"t-main-search-filter-item-dropdown w-full flex-1 border-b border-gray-200"}
                    placeholder="Người thực hiện"
                    isMultiple={true}
                    allowClearValueSingleInput={true}
                    showTriangle={false}
                    maxWidthInput="max-w-none"
                    onScroll={handleScrollUserSystem}
                    renderSelectedItem={(item) => (
                      <div
                        style={{ width: 100 }}
                        className="flex items-center"
                      >
                        <img alt="Thumbnail" src={item.imageUrl || fakeThumbnail} className="mr-1 w-6 h-6 rounded-full" />
                        <p
                          style={{
                            textOverflow: "ellipsis",
                            maxWidth: "100%",
                            minWidth: 0,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            flex: "1 1 auto",
                          }}
                        >
                          {item.text}
                        </p>
                      </div>
                    )}
                    data={listUsersSystem.map((item) => ({
                      label: item.bizfullname || item.fullname,
                      value: item._id,
                      imgUrl: item.imgUrl,
                    }))}
                    formatItem={{
                      id: "value",
                      text: "label",
                    }}
                    inlineSearch={true}
                  />
                </div>
                {/* filter item */}
                <div className="t-main-search-filter-item flex items-center mt-4">
                  <p className={"t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"}>Đơn vị thực hiện</p>
                  <DropdownSearchable
                    onchangeValue={(value) => {
                      if(!values.companiesOfAssignee?.includes?.(value.id as string)) {
                        setFieldValue("companiesOfAssignee", [...values.companiesOfAssignee, value.id]);
                      }
                      setSearchCompanyName("")
                    }}
                    onMultipleRemoveValue={(id: any) => {
                      const newList = values.companiesOfAssignee.filter(item => item !== id);
                      setFieldValue('companiesOfAssignee', newList);
                    }}
                    onClearData={() => setFieldValue("companiesOfAssignee", [])}
                    onSearchInputChange={debounce(
                      (value) => setSearchCompanyName(value),
                      500
                    )}
                    className={"t-main-search-filter-item-dropdown w-full flex-1 border-b border-gray-200"}
                    placeholder="Đơn vị thực hiện"
                    isMultiple={true}
                    allowClearValueSingleInput={true}
                    showTriangle={false}
                    maxWidthInput="max-w-none"
                    onScroll={handleScrollCompany}
                    renderSelectedItem={(item) => (
                      <div
                        style={{ width: 100 }}
                        className="flex items-center"
                      >
                        <img alt="Tag" src={TagIcon} className="mr-1" />
                        <p
                          style={{
                            textOverflow: "ellipsis",
                            maxWidth: "100%",
                            minWidth: 0,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            flex: "1 1 auto",
                          }}
                        >
                          {item.text}
                        </p>
                      </div>
                    )}
                    data={listCompany.map((company) => ({
                      label: company.name,
                      value: company._id,
                    }))}
                    formatItem={{
                      id: "value",
                      text: "label",
                    }}
                    inlineSearch={true}
                  />
                </div>
                {/* filter item */}
                <div className="t-main-search-filter-item flex items-center mt-4">
                  <p className={"t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"}>Thời hạn</p>
                  <div className="t-main-search-filter-item-dropdown t-main-search-filter-item-date flex items-center">
                    <div className="w-1/2 flex items-center">
                      <span className="w-3/12 text-primary-gray text-left">
                        Từ ngày
                      </span>
                      <DayPickerInput
                        value={values.fromDate && moment(values.fromDate).format("DD/MM/YYYY")}
                        onDayChange={(day) => setFieldValue("fromDate", moment(day).format("MM/DD/YYYY"))}
                        inputProps={{
                          className: "w-full h-6 outline-none pl-3 border-b border-gray-200",
                          placeholder: "Từ ngày...",
                          readOnly: true,
                        }}
                      />
                    </div>
                    <div className="w-1/2 flex items-center">
                      <span className="w-3/12 text-primary-gray text-left">
                        Đến ngày
                      </span>
                      <DayPickerInput
                        value={values.toDate && moment(values.toDate).format("DD/MM/YYYY")}
                        onDayChange={(day) => setFieldValue("toDate", moment(day).format("MM/DD/YYYY"))}
                        inputProps={{
                          className: "w-full h-6 outline-none pl-3 border-b border-gray-200",
                          placeholder: "Đến ngày...",
                          readOnly: true,
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* filter item */}
                <div className="t-main-search-filter-item flex items-center mt-4">
                  <p className={"t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"}>Người tạo</p>
                  <DropdownSearchable
                    onchangeValue={(value) => {
                      if(!values.authorsID?.includes?.(value.id as string)) {
                        setFieldValue("authorsID", [...values.authorsID, value.id]);
                      }
                      setSearchUserSystem("")
                    }}
                    onMultipleRemoveValue={(id: any) => {
                      const newList = values.authorsID.filter(item => item !== id);
                      setFieldValue('authorsID', newList);
                    }}
                    onClearData={() => setFieldValue("authorsID", [])}
                    onSearchInputChange={debounce(
                      (value) => setSearchUserSystem(value),
                      500
                    )}
                    className={"t-main-search-filter-item-dropdown w-full flex-1 border-b border-gray-200"}
                    placeholder="Người tạo"
                    isMultiple={true}
                    allowClearValueSingleInput={true}
                    showTriangle={false}
                    maxWidthInput="max-w-none"
                    onScroll={handleScrollUserSystem}
                    renderSelectedItem={(item) => (
                      <div
                        style={{ width: 100 }}
                        className="flex items-center"
                      >
                        <img alt="Thumbnail" src={item.imageUrl || fakeThumbnail} className="mr-1 w-6 h-6 rounded-full" />
                        <p
                          style={{
                            textOverflow: "ellipsis",
                            maxWidth: "100%",
                            minWidth: 0,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            flex: "1 1 auto",
                          }}
                        >
                          {item.text}
                        </p>
                      </div>
                    )}
                    data={listUsersSystem.map((item) => ({
                      label: item.bizfullname || item.fullname,
                      value: item._id,
                      imgUrl: item.imgUrl,
                    }))}
                    formatItem={{
                      id: "value",
                      text: "label",
                    }}
                    inlineSearch={true}
                  />
                </div>
                {/* filter item */}
                <div className="t-main-search-filter-item flex items-center mt-4">
                  <p className={"t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"}>Dự án</p>
                  <DropdownSearchable
                    onchangeValue={(value) => {
                      if(!values.projectsID?.includes?.(value.id as string)) {
                        setFieldValue("projectsID", [...values.projectsID, value.id]);
                      }
                      setSearchDepartmentValue("")
                    }}
                    onMultipleRemoveValue={(id: any) => {
                      const newList = values.projectsID.filter(item => item !== id);
                      setFieldValue('projectsID', newList);
                    }}
                    onClearData={() => setFieldValue("projectsID", [])}
                    onSearchInputChange={debounce(
                      (value) => setSearchDepartmentValue(value),
                      500
                    )}
                    className={"t-main-search-filter-item-dropdown w-full flex-1 border-b border-gray-200"}
                    placeholder="Dự án"
                    isMultiple={true}
                    allowClearValueSingleInput={true}
                    showTriangle={false}
                    maxWidthInput="max-w-none"
                    renderSelectedItem={(item) => (
                      <div
                        style={{ width: 100 }}
                        className="flex items-center"
                      >
                        <img alt="Tag" src={TagIcon} className="mr-1" />
                        <p
                          style={{
                            textOverflow: "ellipsis",
                            maxWidth: "100%",
                            minWidth: 0,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            flex: "1 1 auto",
                          }}
                        >
                          {item.text}
                        </p>
                      </div>
                    )}
                    data={listDepartments.map((department) => ({
                      label: `${department.sign}.${department.name}`,
                      value: department._id,
                    }))}
                    formatItem={{
                      id: "value",
                      text: "label",
                    }}
                    inlineSearch={true}
                  />
                </div>
                {/* filter item */}
                <div className="t-main-search-filter-item flex items-center mt-4">
                  <p className={"t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"}>Phân loại</p>
                  <DropdownSearchable
                    onchangeValue={(value) => {
                      if(!values.subtypes?.includes?.(value.id as string)) {
                        setFieldValue("subtypes", [...values.subtypes, value.id]);
                      }
                    }}
                    onMultipleRemoveValue={(id: any) => {
                      const newList = values.subtypes.filter(item => item !== id);
                      setFieldValue('subtypes', newList);
                    }}
                    onClearData={() => setFieldValue("subtypes", [])}
                    placeholder={"Phân loại"}
                    className={"t-main-search-filter-item-dropdown w-full flex-1 border-b border-gray-200"}
                    focusedClass={"border-b border-primary"}
                    maxWidthInput={"max-w-none"}
                    isMultiple={true}
                    allowClearValueSingleInput={true}
                    renderSelectedItem={item => (
                      <div className={"flex items-center"}>
                        <img alt={"tag icon"} src={TagIcon}/>
                        <span>{item.text}</span>
                      </div>
                    )}
                    data={PCM_PROPOSAL_TASK}
                    formatItem={{
                        id: "value",
                        text: "text",
                    }}
                    inlineSearch={true}
                  />
                </div>
                {/* filter item */}
                <div className="t-main-search-filter-item flex items-center mt-4">
                  <p className={"t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"}>Nhanh chậm</p>
                  <DropdownSearchable
                    onchangeValue={(value) =>
                      setFieldValue("isExpired", value.id)
                    }
                    onClearData={() => setFieldValue("isExpired", "")}
                    placeholder={"Nhanh chậm"}
                    className={"t-main-search-filter-item-dropdown w-full flex-1 border-b border-gray-200"}
                    focusedClass={"border-b border-primary"}
                    maxWidthInput={"max-w-none"}
                    allowClearValueSingleInput={true}
                    renderSelectedItem={item => (
                      <div className={"flex items-center"}>
                        <img alt={"tag icon"} src={TagIcon}/>
                        <span>{item.text}</span>
                      </div>
                    )}
                    data={[
                      {
                          "value": 1,
                          "text":"Bình thường"
                      },
                      {
                          "value": 2,
                          "text":"Chậm"
                      },
                    ]}
                    formatItem={{
                        id : "value",
                        text : "text"
                    }}
                    inlineSearch={true}
                  />
                </div>
                {/* filter item */}
                <div className="t-main-search-filter-item flex items-center mt-4">
                  <p className={"t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"}>Trạng thái</p>
                  <DropdownSearchable
                    onchangeValue={(value) => {
                      if(!values.status?.includes?.(value.id as string)) {
                        setFieldValue("status", [...values.status, value.id]);
                      }
                    }}
                    onMultipleRemoveValue={(id: any) => {
                      const newList = values.status.filter(item => item !== id);
                      setFieldValue('status', newList);
                    }}
                    onClearData={() => setFieldValue("status", [])}
                    placeholder={"Trạng thái"}
                    className={"t-main-search-filter-item-dropdown w-full flex-1 border-b border-gray-200"}
                    focusedClass={"border-b border-primary"}
                    maxWidthInput={"max-w-none"}
                    isMultiple={true}
                    allowClearValueSingleInput={true}
                    renderSelectedItem={item => (
                      <div className={"flex items-center"}>
                        <img alt={"tag icon"} src={TagIcon}/>
                        <span>{item.text}</span>
                      </div>
                    )}
                    data={PCM_STATUS_TASK}
                    formatItem={{
                        id: "value",
                        text: "text",
                    }}
                    inlineSearch={true}
                  />
                </div>
                {/* filter item */}
                <div className="t-main-search-filter-item flex items-center mt-4">
                  <p className={"t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"}>Phân loại khác</p>
                  <DropdownSearchable
                    onchangeValue={(value) => {
                      if(!values.fieldsID?.includes?.(value.id as string)) {
                        setFieldValue("fieldsID", [...values.fieldsID, value.id]);
                      }
                      setOtherFieldValue("");
                    }}
                    onMultipleRemoveValue={(id: any) => {
                      const newList = values.fieldsID.filter(item => item !== id);
                      setFieldValue('fieldsID', newList);
                    }}
                    onClearData={() => setFieldValue("fieldsID", [])}
                    onSearchInputChange={debounce(
                      (value) => setOtherFieldValue(value),
                      500
                    )}
                    className={"t-main-search-filter-item-dropdown w-full flex-1 border-b border-gray-200"}
                    placeholder="Phân loại khác"
                    isMultiple={true}
                    allowClearValueSingleInput={true}
                    showTriangle={false}
                    maxWidthInput="max-w-none"
                    renderSelectedItem={(item) => (
                      <div
                        style={{ width: 100 }}
                        className="flex items-center"
                      >
                        <img alt="Tag" src={TagIcon} className="mr-1" />
                        <p
                          style={{
                            textOverflow: "ellipsis",
                            maxWidth: "100%",
                            minWidth: 0,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            flex: "1 1 auto",
                          }}
                        >
                          {item.text}
                        </p>
                      </div>
                    )}
                    data={listDoctypes.map((doctypes) => ({
                      label: doctypes.name,
                      value: doctypes._id,
                    }))}
                    formatItem={{
                      id: "value",
                      text: "label",
                    }}
                    inlineSearch={true}
                  />
                </div>

                <div className="flex justify-between pt-12">
                  <div>
                  <button
                      onClick={() => {
                        openModal(
                          <div
                            className={
                              "inline-block w-[521px] h-[280px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"
                            }
                          >
                            <ModalCreateResultSearch condition={values} />
                          </div>
                        )
                      }}
                      className="rounded text-white font-bold py-3 px-7 bg-green-500"
                    >
                      Lưu kết quả
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={toggleSearchFilter}
                      className="rounded font-bold text-primary-gray py-3 px-7 bg-lighter-gray"
                    >
                      Bỏ qua
                    </button>
                    <button
                      type="submit"
                      className="rounded font-bold text-primary-light py-3 px-7 bg-blue ml-2"
                    >
                      Tìm kiếm
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};