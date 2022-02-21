import React, { HTMLAttributes } from "react";
import cn from "classnames";

import SortingIcon from "assets/images/icons8-sorting-100.svg";
import FormFilter from "./FormFilter";

import { useQueryDetailDepartment } from "services/hooks/items/useDepartment";
import { useQueryDetailDoctype } from "services/hooks/items/useDoctype";
import { 
  CONTACT_SUB_TYPES,
  GENDER_TYPES,
  CONTACT_TA,
  INSURANCE_STATUS,
  CONTACT_POLICY
} from 'apis/localdb';

const DropdownFilterButton: React.FC<
  HTMLAttributes<HTMLDivElement> & {
    onSubmit?: (values: any) => boolean;
    onCancel?: () => void;
    initialValues?: {
      [k: string]: any;
    };
  }
> = ({ onCancel, onSubmit, initialValues, ...props }) => {
  const [showFilter, setShowFilter] = React.useState(false);
  const [defaultValues, setDefaultValues] = React.useState<any>({});

  const { onFetchDetailDepartmentAsync } = useQueryDetailDepartment();
  const { onFetchDetailDoctypeAsync } = useQueryDetailDoctype();

  const handleSubmit = React.useCallback(
    ({ ...values }) => {
      // console.log(values)
      const result =
        onSubmit &&
        onSubmit({
          ...values,
        });
      if (result) {
        setShowFilter(false);
      }
    },
    [onSubmit]
  );

  const handleFetchInitialValue = React.useCallback(async (values) => {
    const data = { ...values };
    if (values.department) {
      const result = await onFetchDetailDepartmentAsync(values.department);
      data.department = {
        _id: result._id,
        name: result.name,
      }
    }
    if (values.position) {
      const result = await onFetchDetailDoctypeAsync(values.position);
      data.position = {
        _id: result._id,
        name: result.name,
      }
    }
    if (values.workingStatus) {
      const result = await onFetchDetailDoctypeAsync(values.workingStatus);
      data.workingStatus = {
        _id: result._id,
        name: result.name,
      }
    }
    if (values.contractType) {
      const result = await onFetchDetailDoctypeAsync(values.contractType);
      data.contractType = {
        _id: result._id,
        name: result.name,
      }
    }
    if (values.type) {
      const result = CONTACT_SUB_TYPES.find(elm => elm.value === values.type);
      data.type = {
        _id: result?.value,
        name: result?.text,
      }
    }
    if (values.gender) {
      const result = GENDER_TYPES.find(elm => elm.value === values.gender);
      data.gender = {
        _id: result?.value,
        name: result?.text,
      }
    }
    if (values.realStatus) {
      const result = CONTACT_TA.find(elm => elm.value === values.realStatus);
      data.realStatus = {
        _id: result?.value,
        name: result?.text,
      }
    }
    if (values.insuranceStatus) {
      const result = INSURANCE_STATUS.find(elm => elm.value === values.insuranceStatus);
      data.insuranceStatus = {
        _id: result?.value,
        name: result?.text,
      }
    }
    if (values.familyPolicy) {
      const result = CONTACT_POLICY.find(elm => elm.value === values.familyPolicy);
      data.familyPolicy = {
        _id: result?.value,
        name: result?.text,
      }
    }
    setDefaultValues(data);
  }, [onFetchDetailDepartmentAsync, onFetchDetailDoctypeAsync]);

  React.useEffect(() => {
    handleFetchInitialValue(initialValues);
  }, [handleFetchInitialValue, initialValues]);

  return (
    <div {...props} className={cn("relative", props.className)}>
      <button
        onClick={() => {
          setShowFilter(!showFilter);
          if (showFilter) {
            onCancel && onCancel();
          }
        }}
        className={
          "bg-gray-50 flex items-center justify-center ml-3 px-3 h-[30px] rounded hover:bg-blue-100"
        }
      >
        <img src={SortingIcon} alt={"icon sorting icon"} />
        <span className={"ml-2 text-gray-500"}>Filter</span>
      </button>
      {showFilter && (
        <FormFilter
          onShowFilter={setShowFilter}
          onSubmit={handleSubmit}
          initialValues={defaultValues || {}}
          onCancel={onCancel}
        />
      )}
    </div>
  );
};
export default DropdownFilterButton;
