import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
  UIEvent, forwardRef, useImperativeHandle,
} from "react";
import { map as _map } from "lodash";
import classNames from "classnames";
import Close from "assets/icons/Close";
import BlueCheck from "assets/images/blue-check.svg";
import TriangleDown from "assets/icons/TriangleDown";
import { Item } from "../DropdownSearchable";

type FormatItem = {
  id?: string | number;
  text?: string | number;
  [x: string]: any;
};

type Props = {
  id?: string;
  data?: Array<Item>;
  placeholder?: string;
  initialValue?: Item | Item[];
  onchangeValue?: (item: Item) => void;
  className?: string;
  classNameItem?: string;
  classNameInput?: string;
  focusedClass?: string;
  renderItem?: (item: Item) => ReactNode;
  renderSelectedItem?: (item: Item) => ReactNode;
  isMultiple?: boolean;
  showTriangle?: boolean;
  allowClearValueSingleInput?: boolean;
  maxWidthInput?: string;
  maxHeightInput?: string;
  formatItem?: FormatItem;
  inlineSearch?: boolean;
  disableSearch?: boolean;
  onMultipleRemoveValue?: (id: string | number) => void;
  onClearData?: () => void;
  disabled?: boolean;
  disableClass?: string;
  searchInputClassName?: string;
  onSearchInputChange?: (valueSearch: string) => void;
  onScroll?: (e: UIEvent<HTMLDivElement>) => void;
  bordered?: boolean;
  prefixIcon?: ReactNode;
  selectOneByOne?: boolean;
  countBadge?: number;
  reset?: boolean;
};
type DropdownSearchableV2Handle = {
  resetDropdown: () => void;
  setValuesDropdown: (value: any) => void;
}

export const DropdownSearchableV2 = forwardRef<DropdownSearchableV2Handle, Props>(({
  data,
  id,
  placeholder = "Lựa chọn",
  initialValue,
  onchangeValue,
  className,
  classNameItem,
  classNameInput,
  focusedClass,
  renderItem,
  isMultiple,
  showTriangle,
  allowClearValueSingleInput,
  renderSelectedItem,
  maxWidthInput,
  formatItem,
  inlineSearch,
  maxHeightInput,
  disableSearch,
  onMultipleRemoveValue,
  onClearData,
  disabled,
  disableClass,
  searchInputClassName,
  onSearchInputChange,
  onScroll,
  prefixIcon,
  bordered = true,
  selectOneByOne,
  countBadge,
  reset
}, dropdownsearchRef) => {
  const [value, setValue] = useState<Item>()
  const [values, setValues] = useState<Array<Item>>()

  const [displayData, setDisplayData] = useState<Array<Item>>([])
  const [showOption, setShowOption] = useState(false)
  const [firstInit, setFirstInit] = useState(true)

  const [searchTerm, setSearchTerm] = useState("")
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputSearchRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(dropdownsearchRef, () => ({
    resetDropdown() {
      setValue(undefined)
      setValues([])
      if (onClearData) {
        onClearData()
      }
    },
    setValuesDropdown(value: any) {
      setValues(value)
    }
  }))

  const readDataValue = React.useCallback(
      (item: Item | undefined, key: string) => {
        if (!item) return undefined;
        if (formatItem) {
          return item[formatItem[key]] ?? item[key];
        }
        return item[key];
      },
      [formatItem]
  );

  const modifyItem = (item: Item) => {
    if (formatItem) {
      return {
        ...item,
        id: item[formatItem.id ?? "id"] ?? "",
        text: item[formatItem.text ?? "text"] ?? "",
        imageUrl: item[formatItem.imageUrl ?? "imageUrl"] ?? "",
      };
    }
    return item;
  };

  useEffect(() => {
    if (reset) {
      setValues([]);
      setValue(undefined);
    }
  }, [reset]);

  const handleSetValue = (item: Item) => {
    setSearchTerm("");
    if (isMultiple) {
      const existThatItem = (values ?? []).findIndex(
          (i) => readDataValue(i, "id") === readDataValue(item, "id")
      );
      if (existThatItem > -1) {
        const oldValues = values ?? [];
        oldValues.splice(existThatItem, 1);
        setValues([...oldValues]);
        if (onMultipleRemoveValue) {
          onMultipleRemoveValue(readDataValue(item, "id"));
        }
        if ([...oldValues].length <= 0) {
          onClearData && onClearData();
        }
      } else {
        setValues((oldValues) => [...(oldValues ?? []), item]);
        if (onchangeValue) {
          onchangeValue(modifyItem(item));
        }
      }
      if (selectOneByOne) setShowOption(false);
    } else {
      setShowOption(false);
      if (value && readDataValue(value, "id") === readDataValue(item, "id")) {
        setValue(undefined);
        onClearData && onClearData();
      } else {
        setValue(item);
        if (onchangeValue) {
          onchangeValue(modifyItem(item));
        }
      }
    }
  };

  const toggleShowOption = () => {
    if (disabled) return;
    setShowOption(!showOption);
  };

  const setDefaultValue = React.useCallback(
      (checkDataArr: Array<Item>, _initialValue) => {
        if (_initialValue) {
          if (isMultiple) {
            if (
                typeof _initialValue !== "number" &&
                typeof _initialValue !== "string"
            ) {
              const initialItem = checkDataArr?.filter((item) =>
                  _initialValue.includes(readDataValue(item, "id"))
              );
              setValues(initialItem ?? []);
            }
          } else {
            const initialItem = checkDataArr?.find(
                (item) => readDataValue(item, "id") === _initialValue
            );
            setValue(initialItem);
          }
        }
      },
      [isMultiple, readDataValue]
  );

  const handleRemoveItem = (id: string | number) => {
    const valuesWillUpdate = values?.filter(
        (item) => readDataValue(item, "id") !== id
    );
    setValues(valuesWillUpdate);
    onMultipleRemoveValue && onMultipleRemoveValue(id);
    if (!valuesWillUpdate || valuesWillUpdate?.length <= 0) {
      onClearData && onClearData();
    }
  };

  const handleRemoveItemSingle = () => {
    setValue(undefined);
    onClearData && onClearData();
  };

  useEffect(() => {
    if (inputSearchRef.current) {
      inputSearchRef.current?.focus();
    }
  }, [inputSearchRef.current]);

  React.useLayoutEffect(() => {
    if (data) {
      setDisplayData(data);
      if (firstInit && initialValue) {
        if (
            isMultiple &&
            Array.isArray(initialValue) &&
            initialValue.every((elm) => Object.keys(elm).length > 0)
        ) {
          setValues(initialValue);
        } else if (
            !Array.isArray(initialValue) &&
            Object.keys(initialValue).length > 0
        ) {
          setValue(initialValue);
        }
        setFirstInit(false);
      }
    }
  }, [data, firstInit, initialValue, isMultiple, setDefaultValue]);

  const renderOptions = () => {
    if (displayData?.length === 0) {
      return (
          <div className={"pt-3 pb-3 alert alert-warning m-3"}>
            Danh sách rỗng
          </div>
      );
    }
    return _map(displayData, (option) => (
        <div
            key={readDataValue(option, "id")}
            className={
                (classNameItem ?? "") +
                " select-option max-w-full hover:bg-gray-100 transition duration-150 flex cursor-pointer py-3 px-4 "
            }
            onClick={() => handleSetValue(option)}
            data-option-value={option.id}
        >
          {(isMultiple &&
              values?.find(
                  (v) => readDataValue(v, "id") === readDataValue(option, "id")
              )) ||
          readDataValue(option, "id") === readDataValue(value, "id") ? (
              <img src={BlueCheck} alt={"checked"} className={"w-[15px] mr-3 min-w-[15px]"} />
          ) : (
              <div className={"w-[15px] mr-3 min-w-[15px]"} />
          )}
          {renderItem ? (
              renderItem(modifyItem(option))
          ) : (
              <div className={"flex flex-1 align-items-center text-left"}>
                {readDataValue(option, "imageUrl") ? (
                    <img
                        alt={"Avt"}
                        src={readDataValue(option, "imageUrl")}
                        className={"w-9 h-9 object-cover rounded-full mr-3"}
                    />
                ) : null}
                <span className={"flex-1 ml-1 mr-1 whitespace-normal"}>
                  {readDataValue(option, "text")}
                </span>
              </div>
          )}
        </div>
    ));
  };

  const renderMultiSelectedValue = () => {
    return (
        <div
            className={
              "flex w-full px-3 py-1 cursor-pointer align-items-center flex-wrap overflow-y-scroll"
            }
        >
          {_map(values, (option) => (
              <div
                  key={readDataValue(option, "id")}
                  className={
                    "relative border rounded p-2 mr-1.5 pr-8 mb-1.5 bg-white"
                  }
                  title={
                    renderSelectedItem
                        ? modifyItem(option).text
                        : readDataValue(option, "text")
                  }
              >
                {renderSelectedItem
                    ? renderSelectedItem(modifyItem(option))
                    : <p className={"line-clamp-2"}>{readDataValue(option, "text")}</p>}
                <div
                    className={
                      "absolute inset-y-0 right-0 flex items-center justify-center pr-2"
                    }
                >
                  <Close
                      onClick={() => handleRemoveItem(readDataValue(option, "id"))}
                  />
                </div>
              </div>
          ))}
        </div>
    );
  };

  const renderSingleSelectedValueWithClearValue = () => {
    if (!value) return null;
    return (
        <div
            className={classNames("flex text-left relative px-3 py-1 pr-8 mb-1 mt-1 ", {
              "text-gray-300": !value,
              border: bordered,
              "rounded-3xl": bordered,
            })}
            title={
              renderSelectedItem
                  ? modifyItem(value).text
                  : readDataValue(value, "text")
            }
        >
          {renderSelectedItem
              ? renderSelectedItem(modifyItem(value))
              : <p className={"line-clamp-2"}>{readDataValue(value, "text")}</p>}
          <div
              className={
                "absolute inset-y-0 right-0 flex items-center justify-center pr-2"
              }
          >
            <Close onClick={() => handleRemoveItemSingle()} />
          </div>
        </div>
    );
  };

  const renderSingleSelectedValueWithoutClearValue = () => {
    if (!value) return null;
    return (
        <div className={"flex-1 px-3 py-1 flex text-left "}>
          <div
              title={
                renderSelectedItem
                    ? modifyItem(value).text
                    : readDataValue(value, "text")
              }
          >
            {readDataValue(value, "text")
                ? renderSelectedItem
                    ? renderSelectedItem(modifyItem(value))
                    : <p className={"line-clamp-2"}>{readDataValue(value, "text")}</p>
                : placeholder}
          </div>
        </div>
    );
  };

  const renderSingleSelectedValue = () => {
    return (
        <div
            className={
              "relative w-full flex p-1 h-full pl-2 cursor-pointer align-items-center"
            }
        >
          {allowClearValueSingleInput
              ? renderSingleSelectedValueWithClearValue()
              : renderSingleSelectedValueWithoutClearValue()}
        </div>
    );
  };

  const renderSelectedValue = () => {
    if (isMultiple) {
      return renderMultiSelectedValue();
    }
    return renderSingleSelectedValue();
  };

  const handleSearchingValue = (value: string) => {
    setSearchTerm(value);
    setShowOption(true);
    onSearchInputChange && onSearchInputChange(value);
  };

  const maxWidthClass = isMultiple
      ? maxWidthInput
          ? maxWidthInput
          : "max-w-[250px]"
      : "";
  const maxHeightClass = maxHeightInput ?? "";
  const beingFocusClass = showOption ? focusedClass ?? "" : "";
  const extraClassName = className ?? "";
  const disableClassCustom = disableClass ?? "bg-gray-100";
  const disabledClass = disabled
      ? `cursor-not-allowed ${disableClassCustom}`
      : "";
  return (
      <div
          ref={wrapperRef}
          id={id}
          placeholder={placeholder}
          className={`${extraClassName} relative select-dropdown flex items-center ${maxWidthClass} ${maxHeightClass} ${beingFocusClass} ${disabledClass}`}
          data-value={value?.id}
      >
        <div
            onClick={() => toggleShowOption()}
            className={
                (classNameInput ?? "") +
                " flex w-full p-1 pl-2 " +
                (showTriangle ? "pr-4" : "pl-2") +
                " cursor-pointer align-items-center flex-wrap overflow-y-scroll"
            }
        >
          {prefixIcon ?? null}
          <span className={"text-left"}>
          {placeholder}{" "}
            {isMultiple
                ? countBadge ? `(${countBadge})` : (values && values.length)
                    ? `(${values.length})`
                    : ""
                : value
                    ? "(1)"
                    : ""}
        </span>
          {showTriangle && (
              <div
                  className={
                    "absolute inset-y-0 right-1 flex items-center justify-center px-1"
                  }
              >
                <TriangleDown />
              </div>
          )}
        </div>
        {showOption ? (
            <div
                className={
                  "border-0.5 border-primary-border bg-white rounded select-options-container absolute z-100 min-w-[240px] max-w-[400px] w-max rounded-md left-0"
                }
            >
              {renderSelectedValue()}
              {!inlineSearch && !disableSearch && (
                  <div className={"w-full px-3 flex"}>
                    <input
                        disabled={disabled}
                        className={
                            "select-SearchMessage flex-1 py-3 focus:outline-none focus:ring-0" +
                            (searchInputClassName ?? "")
                        }
                        placeholder={"Nhập nội dung"}
                        type="text"
                        autoComplete="off"
                        value={searchTerm}
                        autoFocus
                        onChange={(e) => handleSearchingValue(e.target.value)}
                    />
                  </div>
              )}
              <div className={"border-t-0.5 border-primary-border mx-3"} />
              <div
                  className="select-options-section overflow-y-auto bg-white rounded-md"
                  onScroll={onScroll}
              >
                {renderOptions()}
              </div>
            </div>
        ) : null}
      </div>
  );
});
const defaultProps: Props = {
  isMultiple: false,
  showTriangle: true,
  disableSearch: false,
  disabled: false,
  selectOneByOne: false
};
DropdownSearchableV2.displayName = "DropdownSearchableV2";
DropdownSearchableV2.defaultProps = defaultProps;