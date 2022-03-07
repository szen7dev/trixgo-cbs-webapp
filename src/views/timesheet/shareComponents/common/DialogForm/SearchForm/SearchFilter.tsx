import { FC, useState } from "react";
import { Formik, Form } from "formik";
import DayPickerInput from "react-day-picker/DayPickerInput";
import moment from "moment";
import debounce from "lodash/debounce";
import { PCM_PROPOSAL_TASK, PCM_STATUS_TASK } from "apis/localdb/index";

import {
  useQueryListDepartments,
  useQueryListDoctype,
} from "services/hooks/useHuman";
import { useQueryListFriend } from "services/hooks/users/useFriend";
import { useQueryListCompany } from "services/hooks/useCompanies";

import DropdownSearchable from "shareComponents/common/DropdownSearch";

import TagIcon from "assets/images/icons8-price-tag-96.svg";
import fakeThumbnail from "assets/images/avatar.jpg";

type Props = {
  handleFilterData: (filterData: any) => void;
  toggleSearchFilter: () => void;
};

const MainSearchFilter: FC<Props> = ({
  handleFilterData,
  toggleSearchFilter,
}) => {
  const onSubmitFilterData = (values: any) => {
    handleFilterData(values);
    toggleSearchFilter();
  };

  const [searchDepartmentValue, setSearchDepartmentValue] = useState("");
  const [otherFieldValue, setOtherFieldValue] = useState("");
  const [searchFriendName, setSearchFriendName] = useState("");
  const [searchCompanyName, setSearchCompanyName] = useState("");

  const { listDepartments } = useQueryListDepartments({
    limit: 50,
    keyword: searchDepartmentValue,
  });
  const { listDoctypes } = useQueryListDoctype({
    limit: 50,
    type: 2,
    keyword: otherFieldValue,
  });
  const { data: listFriend } = useQueryListFriend({
    keyword: searchFriendName,
  });
  const { data: listCompany } = useQueryListCompany({
    keyword: searchCompanyName,
  });

  return (
    <>
      <div className="t-main-search-filter-wrapper">
        <Formik
          initialValues={{ fromDate: "", toDate: "" }}
          onSubmit={onSubmitFilterData}
        >
          {(formik) => {
            const { setFieldValue, values } = formik;

            return (
              <Form>
                {/* filter item */}
                <div className="t-main-search-filter-item flex items-center mt-4">
                  <p
                    className={
                      "t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"
                    }
                  >
                    Người thực hiện
                  </p>
                  <DropdownSearchable
                    onchangeValue={(value) => {
                      setFieldValue("assigneeID", value?.id);
                      setSearchFriendName("");
                    }}
                    onClearData={() => setFieldValue("assigneeID", "")}
                    onSearchInputChange={debounce(
                      (value) => setSearchFriendName(value),
                      500
                    )}
                    className={
                      "t-main-search-filter-item-dropdown w-full flex-1 border-b border-gray-200"
                    }
                    placeholder="Người thực hiện"
                    isMultiple={false}
                    allowClearValueSingleInput={true}
                    showTriangle={false}
                    maxWidthInput="max-w-none"
                    renderSelectedItem={(item) => (
                      <div style={{ width: 100 }} className="flex items-center">
                        <img
                          alt="Thumbnail"
                          src={item.imageUrl || fakeThumbnail}
                          className="mr-1 w-6 h-6 rounded-full"
                        />
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
                    data={listFriend.map((item) => ({
                      label: item.fullname,
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
                  <p
                    className={
                      "t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"
                    }
                  >
                    Đơn vị thực hiện
                  </p>
                  <DropdownSearchable
                    onchangeValue={(value) => {
                      setFieldValue("companyOfAssignee", value?.id);
                      setSearchCompanyName("");
                    }}
                    onClearData={() => setFieldValue("companyOfAssignee", "")}
                    onSearchInputChange={debounce(
                      (value) => setSearchCompanyName(value),
                      500
                    )}
                    className={
                      "t-main-search-filter-item-dropdown w-full flex-1 border-b border-gray-200"
                    }
                    placeholder="Đơn vị thực hiện"
                    isMultiple={false}
                    allowClearValueSingleInput={true}
                    showTriangle={false}
                    maxWidthInput="max-w-none"
                    renderSelectedItem={(item) => (
                      <div style={{ width: 100 }} className="flex items-center">
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
                  <p
                    className={
                      "t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"
                    }
                  >
                    Thời hạn
                  </p>
                  <div className="t-main-search-filter-item-dropdown t-main-search-filter-item-date flex items-center">
                    <div className="w-1/2 flex items-center">
                      <span className="w-3/12 text-primary-gray text-left">
                        Từ ngày
                      </span>
                      <DayPickerInput
                        value={
                          values.fromDate &&
                          moment(values.fromDate).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) =>
                          setFieldValue(
                            "fromDate",
                            moment(day).format("MM/DD/YYYY")
                          )
                        }
                        inputProps={{
                          className:
                            "w-full h-6 outline-none pl-3 border-b border-gray-200",
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
                        value={
                          values.toDate &&
                          moment(values.toDate).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) =>
                          setFieldValue(
                            "toDate",
                            moment(day).format("MM/DD/YYYY")
                          )
                        }
                        inputProps={{
                          className:
                            "w-full h-6 outline-none pl-3 border-b border-gray-200",
                          placeholder: "Đến ngày...",
                          readOnly: true,
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* filter item */}
                <div className="t-main-search-filter-item flex items-center mt-4">
                  <p
                    className={
                      "t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"
                    }
                  >
                    Người tạo
                  </p>
                  <DropdownSearchable
                    onchangeValue={(value) => {
                      setFieldValue("authorID", value?.id);
                      setSearchFriendName("");
                    }}
                    onClearData={() => setFieldValue("authorID", "")}
                    onSearchInputChange={debounce(
                      (value) => setSearchFriendName(value),
                      500
                    )}
                    className={
                      "t-main-search-filter-item-dropdown w-full flex-1 border-b border-gray-200"
                    }
                    placeholder="Người tạo"
                    isMultiple={false}
                    allowClearValueSingleInput={true}
                    showTriangle={false}
                    maxWidthInput="max-w-none"
                    renderSelectedItem={(item) => (
                      <div style={{ width: 100 }} className="flex items-center">
                        <img
                          alt="Thumbnail"
                          src={item.imageUrl || fakeThumbnail}
                          className="mr-1 w-6 h-6 rounded-full"
                        />
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
                    data={listFriend.map((item) => ({
                      label: item.fullname,
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
                  <p
                    className={
                      "t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"
                    }
                  >
                    Dự án
                  </p>
                  <DropdownSearchable
                    onchangeValue={(value) => {
                      setFieldValue("projectID", value?.id);
                      setSearchDepartmentValue("");
                    }}
                    onClearData={() => setFieldValue("projectID", "")}
                    onSearchInputChange={debounce(
                      (value) => setSearchDepartmentValue(value),
                      500
                    )}
                    className={
                      "t-main-search-filter-item-dropdown w-full flex-1 border-b border-gray-200"
                    }
                    placeholder="Dự án"
                    isMultiple={false}
                    allowClearValueSingleInput={true}
                    showTriangle={false}
                    maxWidthInput="max-w-none"
                    renderSelectedItem={(item) => (
                      <div style={{ width: 100 }} className="flex items-center">
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
                      label: department.name,
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
                  <p
                    className={
                      "t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"
                    }
                  >
                    Phân loại
                  </p>
                  <DropdownSearchable
                    onchangeValue={(value) =>
                      setFieldValue("subType", value.id)
                    }
                    onClearData={() => setFieldValue("subType", "")}
                    placeholder={"Phân loại"}
                    className={
                      "t-main-search-filter-item-dropdown w-full flex-1 border-b border-gray-200"
                    }
                    focusedClass={"border-b border-primary"}
                    maxWidthInput={"max-w-none"}
                    allowClearValueSingleInput={true}
                    renderSelectedItem={(item) => (
                      <div className={"flex items-center"}>
                        <img alt={"tag icon"} src={TagIcon} />
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
                  <p
                    className={
                      "t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"
                    }
                  >
                    Nhanh chậm
                  </p>
                  <DropdownSearchable
                    onchangeValue={(value) =>
                      setFieldValue("isExpired", value.id)
                    }
                    onClearData={() => setFieldValue("isExpired", "")}
                    placeholder={"Nhanh chậm"}
                    className={
                      "t-main-search-filter-item-dropdown w-full flex-1 border-b border-gray-200"
                    }
                    focusedClass={"border-b border-primary"}
                    maxWidthInput={"max-w-none"}
                    allowClearValueSingleInput={true}
                    renderSelectedItem={(item) => (
                      <div className={"flex items-center"}>
                        <img alt={"tag icon"} src={TagIcon} />
                        <span>{item.text}</span>
                      </div>
                    )}
                    data={[
                      {
                        value: 1,
                        text: "Bình thường",
                      },
                      {
                        value: 2,
                        text: "Chậm",
                      },
                    ]}
                    formatItem={{
                      id: "value",
                      text: "text",
                    }}
                    inlineSearch={true}
                  />
                </div>
                {/* filter item */}
                <div className="t-main-search-filter-item flex items-center mt-4">
                  <p
                    className={
                      "t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"
                    }
                  >
                    Trạng thái
                  </p>
                  <DropdownSearchable
                    onchangeValue={(value) => setFieldValue("status", value.id)}
                    onClearData={() => setFieldValue("status", "")}
                    placeholder={"Trạng thái"}
                    className={
                      "t-main-search-filter-item-dropdown w-full flex-1 border-b border-gray-200"
                    }
                    focusedClass={"border-b border-primary"}
                    maxWidthInput={"max-w-none"}
                    isMultiple={false}
                    allowClearValueSingleInput={true}
                    renderSelectedItem={(item) => (
                      <div className={"flex items-center"}>
                        <img alt={"tag icon"} src={TagIcon} />
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
                  <p
                    className={
                      "t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"
                    }
                  >
                    Phân loại khác
                  </p>
                  <DropdownSearchable
                    onchangeValue={(item) => {
                      setFieldValue("fieldID", item.value);
                      setOtherFieldValue("");
                    }}
                    onClearData={() => setFieldValue("fieldID", "")}
                    onSearchInputChange={debounce(
                      (value) => setOtherFieldValue(value),
                      500
                    )}
                    className={
                      "t-main-search-filter-item-dropdown w-full flex-1 border-b border-gray-200"
                    }
                    placeholder="Phân loại khác"
                    isMultiple={false}
                    allowClearValueSingleInput={true}
                    showTriangle={false}
                    maxWidthInput="max-w-none"
                    renderSelectedItem={(item) => (
                      <div style={{ width: 100 }} className="flex items-center">
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

                <div className="text-right pt-12">
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
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default MainSearchFilter;
