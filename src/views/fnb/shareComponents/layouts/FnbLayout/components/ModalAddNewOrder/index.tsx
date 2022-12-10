/**
 * Libraries
 */
import React, { FC, useEffect, useRef, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useHistory } from 'react-router-dom';
import { number, object, string } from "yup";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import { convertCurrency } from 'utils/converter';
import { useSocket } from "services/hooks/useSocket";
import { useAuth } from 'services/hooks/auth/useAuth';

/**
 * Hooks, Typings
 */

/**
 * Components, Assets
 */
import { DropdownSearchable } from "shareComponents/common";
import Close from "assets/icons/Close";
import { useModal } from "services/hooks/useModal";
import IconMinus from "assets/images/icons8-reduce-96 1.svg";
import ItemSample from "assets/images/icons8-beverage-100.svg";
import IconPlus from "assets/images/icons8-add-new-100 1.svg";
import CheckBoxEmpty from "assets/images/Frame 3548.svg";
import CheckedBox from "assets/images/Check-All.svg";

import "react-day-picker/lib/style.css";
import { GroupSearchable } from "shareComponents/common/GroupSearchable";
import API from "apis/repository";
import { useContact } from "services/hooks/items/useContact";
import { convertObToUrl } from "utils";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

interface InitialValues {
  fundaID: string,
  shiftID: string,
  customerID: string,
  seasons: number,
  service: number,
  paymentMethod: number,
  salesChannel: number,
  name: string,
  note: string,
  appOrderSign: string,
}

type Props = {
  defaultValues?: any;
}

type GroupSearchableHandle = React.ElementRef<typeof GroupSearchable>;

const SEASONS_TYPE = [
  { text: 'Mùa xuân', value: 1 },
  { text: 'Mùa hạ', value: 2 },
  { text: 'Mùa thu', value: 3 },
  { text: 'Mùa đông', value: 4 },
];

export const ModalAddNewOrder: FC<Props> = () => {
  const { closeModal } = useModal();
  const { current: socket }: any = useSocket();
  const { user } = useAuth();
  const groupSearchableRef = React.useRef<GroupSearchableHandle>(null);

  const [keywordSearchProduct, setKeywordSearchProduct] = useState("");
  const [totalMoney, setTotalMoney] = useState(0);
  const [totalPay, setTotalPay] = useState(0);
  const [searchContact, setSearchContact] = useState('');
  const [searchFunda, setSearchFunda] = useState('');
  const [discountAndSales, setDiscountAndSales] = useState({
    discount: 0,
    discountPercent: 0,
    sales: 0,
    salesPercent: 0,
  });

  const [fundaID, setFundaID] = useState("");
  const [shiftID, setShiftID] = useState("");

  const [groupParentPicker, setGroupParentPicker] = useState<any>({});
  const [fundas, setFundas] = useState<any>([]);
  const [shifts, setShifts] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);
  const [productsInCart, setProductsInCart] = useState<any>([]);

  useEffect(() => {
    const fetchFundas = async () => {
      const response = await API.get(
        `/api/item/fundas?keyword=${searchFunda}`,
      );
      const { data, status } = response?.data;

      if (status !== 200) return;

      setFundas(data.listRecords);
    }

    fetchFundas();
  }, [searchFunda])

  useEffect(() => {
    if (!fundaID) return;

    const fetchShifts = async () => {
      const response = await API.get(
        `/api/fnb/shifts?fundaID=${fundaID}`,
      );
      const { data, status } = response?.data;

      if (status !== 200) return;

      setShifts(data.listRecords);
    }

    fetchShifts();
  }, [fundaID])

  useEffect(() => {
    const fetchProducts = async () => {
      const response: any = await API.get(
        `/api/fnb/products?${convertObToUrl({
          type: 1,
          keyword: keywordSearchProduct,
          populates: JSON.stringify({
            path: 'images',
          })
        })}`,
      );
      const { data, status } = response?.data;

      if (status !== 200) return;

      const productsAsync = data.listRecords?.map?.(async (product: any) => {
        const response = await API.get(
          `/api/fnb/products?type=2`,
        );

        return {
          ...product,
          variants: response?.data?.data?.listRecords,
        }
      })

      const products = await Promise.all(productsAsync);
      setProducts(products);
    }

    fetchProducts();
  }, [keywordSearchProduct])

  useEffect(() => {
    calTotalMoney();
  }, [JSON.stringify(productsInCart)])

  const increaseCount = (product: any) => {
    const newProducts = [...productsInCart];
    for (let i = 0; i < newProducts.length; i++) {
      if (newProducts[i]._id === product._id) {
        newProducts[i].quantity = newProducts[i].quantity + 1;
      }
    }
    setProductsInCart(newProducts);
  };
  const decreaseCount = (product: any) => {
    const newProducts = [...productsInCart];
    for (let i = 0; i < newProducts.length; i++) {
      if (newProducts[i]._id === product._id && newProducts[i].quantity > 1) {
        newProducts[i].quantity = newProducts[i].quantity - 1;
      }
    }
    setProductsInCart(newProducts);
  };

  const { list: contacts } = useContact({
    params: { keyword: searchContact },
    isFetchList: true,
  })

  const onSubmitFilterData = async (values: any) => {
    try {
      for (const value in values) {
        values[value] = values[value].toString();
      }

      const products = productsInCart.map((p: any) => ({
        productID: p._id,
        quantity: p.quantity,
        note: p.note,
        variantsID: p.variantsSelected.map((v: any) => v._id),
        upsize: 1,
        topping: 1,
      }))

      const dataAddNewOrder: any = {
        ...values,
        products,
        total: `${totalPay}`,
        discount: `${discountAndSales.discount}`,
        salesoff: `${discountAndSales.sales}`,
      }

      const { data, status } = await API.post(
        `/api/fnb/orders`,
        dataAddNewOrder
      );

      if (status !== 200) return toast.warning('Yêu cầu tạo đơn thất bại');
      if (data.error) return toast.warning('Tạo đơn thất bại');

      socket?.emit('FNB_CSS_ADD_NEW_ORDER', {
        companyID: user?.company?._id,
        fundaID: dataAddNewOrder.fundaID,
        orderInfo: data?.data,
      })

      closeModal();
      return toast.success('Tạo đơn thành công');
    } catch (error) {
      if (typeof error === "string") {
        toast.error(error);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleChangeDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const inputValue = Number(value);
    let newDiscount = inputValue;
    let newDiscountPercent = inputValue;

    if (name === 'discount') {
      newDiscountPercent = +((inputValue * 100) / totalMoney).toFixed(2);
    } else if (name === 'discountPercent') {
      newDiscount = (totalMoney * inputValue) / 100;
    }

    setDiscountAndSales(prev => ({
      ...prev,
      discount: newDiscount,
      discountPercent: newDiscountPercent,
    }));
    setTotalPay(totalMoney - newDiscount - discountAndSales.sales);
  }

  const handleChangeSales = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const inputValue = Number(value);
    let newSales = inputValue;
    let newSalesPercent = inputValue;

    if (name === 'sales') {
      newSalesPercent = +((inputValue * 100) / totalMoney).toFixed(2);
    } else if (name === 'salesPercent') {
      newSales = (totalMoney * inputValue) / 100;
    }

    setDiscountAndSales(prev => ({
      ...prev,
      sales: newSales,
      salesPercent: newSalesPercent,
    }));
    setTotalPay(totalMoney - discountAndSales.discount - newSales);
  }

  const handleChangeQuantity = (e: any, product: any) => {
    const value = Number(e.target.value);
    if (value < 1) return;

    const newProductsInCart = productsInCart.map((p: any) => {
      if (p._id === product._id) {
        return { ...p, quantity: value };
      }
      return p;
    })
    setProductsInCart(newProductsInCart);
  }

  const handleChangeNote = (e: any, product: any) => {
    const value = e.target.value;

    const newProductsInCart = productsInCart.map((p: any) => {
      if (p._id === product._id) {
        return { ...p, note: value };
      }
      return p;
    })
    setProductsInCart(newProductsInCart);
  }

  const handleChangeType = (type: string, product: any) => {
    const newProductsInCart = productsInCart.map((p: any) => {
      if (p._id === product._id) {
        return { ...p, statusApp: type };
      }
      return p;
    })
    setProductsInCart(newProductsInCart);
  }

  const handleChooseVariant = (e: any, productId: string, variant: any) => {
    const isChecked = e.target.checked;
    const newProductsInCart = productsInCart.map((product: any) => {
      if (!product.variantsSelected) product.variantsSelected = [];

      if (product._id === productId) {
        if (isChecked) {
          product.variantsSelected.push(variant);
        } else {
          product.variantsSelected = product.variantsSelected.filter((v: any) => v._id !== variant._id)
        }
      }
      return product;
    })

    setProductsInCart(newProductsInCart);
  }

  const calTotalPriceEachProduct = (product: any) => {
    let amount = (product.statusApp === 'app' ? product.unitPrice2 : product.unitPrice) * product.quantity;
    if (product.variantsSelected && product.variantsSelected.length) {
      product.variantsSelected.forEach((variant: any) => {
        amount += variant.unitPrice;
      });
    }
    return amount;
  }

  const calTotalMoney = () => {
    const amount = productsInCart.reduce((prev: any, product: any) => {
      if (product.variantsSelected && product.variantsSelected.length) {
        product.variantsSelected.forEach((variant: any) => {
          prev += variant.unitPrice;
        });
      }
      return prev += ((product.statusApp === 'app' ? product.unitPrice2 : product.unitPrice) * product.quantity)
    }, 0)
    setTotalMoney(amount);
    setTotalPay(amount);
  }

  const addOrderSchema = object().shape({
    fundaID: string().required("Vui lòng chọn cơ sở"),
    shiftID: string().required("Vui lòng chọn ca"),
    customerID: string().required("Vui lòng chọn mã khách hàng"),
    salesChannel: number().required("Vui lòng chọn kênh bán hàng"),
    paymentMethod: number().required("Vui lòng chọn phương thức thanh toán"),
    name: string().required("Vui lòng nhập tên khách hàng"),
  });

  const initialValues: InitialValues = {
    fundaID,
    shiftID,
    customerID: "",
    seasons: 1,
    service: 1,
    paymentMethod: 1,
    salesChannel: 1,
    name: "",
    note: "",
    appOrderSign: "",
  };

  return (
    <>
      <div className={"flex flex-col"}>
        <div className={"flex w-full py-3 px-6 border-b"}>
          <h4 className={"flex-1 text-lg font-bold text-left"}>Đơn hàng mới</h4>
          <div className={"flex items-center justify-center cursor-pointer"}>
            <Close onClick={closeModal} />
          </div>
        </div>
        {/* input select */}
        <Formik
          validationSchema={addOrderSchema}
          initialValues={initialValues}
          onSubmit={onSubmitFilterData}
        >
          {(formik) => {
            const { setFieldValue, values } = formik;
            return (
              <Form>
                <div className={"t-add-new-task-dialog-select px-6"}>
                  <div className={"flex py-2 border-b"}>
                    <div className={"w-1/4 flex items-start"}>
                      <div className={"h-full text-left  text-gray-500 flex items-center mr-2  w-1/5 h-full h-full"}>Cơ sở</div>
                      <div className={"flex-1 max-w-4/5 w-4/5 h-full h-full"}>
                        <DropdownSearchable
                          onchangeValue={(value: any) => {
                            setFundaID(value?.id)
                            setFieldValue("fundaID", value?.id);
                            setShiftID("");
                            setFieldValue("shiftID", "");
                          }}
                          onClearData={() => {
                            setFundaID("")
                            setFieldValue("fundaID", "");
                            setShiftID("");
                            setFieldValue("shiftID", "");
                          }}
                          onSearchInputChange={
                            debounce(
                              (value) => setSearchFunda(value),
                              200)
                          }
                          className={"max-w-full h-full flex-1"}
                          placeholder="Cơ sở"
                          isMultiple={false}
                          allowClearValueSingleInput={true}
                          showTriangle={false}
                          maxWidthInput="max-w-full"
                          renderSelectedItem={(item: any) => (
                            <div
                              className="max-w-full"
                            >
                              <p className={"truncate"}>{item.text}</p>
                            </div>
                          )}
                          data={fundas.map((funda: any) => ({
                            label: `${funda.sign}.${funda.name}`,
                            value: funda._id,
                          }))}
                          formatItem={{
                            id: "value",
                            text: "label",
                          }}
                          inlineSearch={true}
                        />
                        <ErrorMessage
                          name="fundaID"
                          component="div"
                          className="font-normal text-xs text-negative pl-3"
                        />
                      </div>
                    </div>
                    <div className={"w-1/4 flex items-start pl-3"}>
                      <div className={"h-full text-left  text-gray-500 flex items-center mr-2  w-1/5 h-full"}>Ca làm</div>
                      <div className={"flex-1 max-w-4/5 w-4/5 h-full"}>
                        <DropdownSearchable
                          onchangeValue={(value: any) => {
                            setShiftID(value?.id)
                            setFieldValue("shiftID", value?.id);
                          }}
                          onClearData={() => {
                            setShiftID("")
                            setFieldValue("shiftID", "");
                            // groupSearchableRef.current && groupSearchableRef.current.resetGroupSearchable();
                          }}
                          // onScroll={(e) => handleScroll(e, 'project')}
                          className={"max-w-full h-full flex-1"}
                          placeholder="Chọn ca làm"
                          isMultiple={false}
                          allowClearValueSingleInput={true}
                          showTriangle={false}
                          maxWidthInput="max-w-full"
                          renderSelectedItem={(item: any) => (
                            <div
                              className="max-w-full"
                            >
                              <p className={"truncate"}>{item.text}</p>
                            </div>
                          )}
                          data={shifts?.map((shift: any) => ({
                            label: shift.name,
                            value: shift._id,
                          }))}
                          formatItem={{
                            id: "value",
                            text: "label",
                          }}
                          inlineSearch={true}
                        />
                        <ErrorMessage
                          name="shiftID"
                          component="div"
                          className="font-normal text-xs text-negative pl-3"
                        />
                      </div>
                    </div>
                    <div className={"w-1/4 flex items-start pl-3"}>
                      <div className={"h-full text-left  text-gray-500 flex items-center mr-2  w-1/5 h-full"}>Mã khách</div>
                      <div className={"flex-1 max-w-4/5 w-4/5 h-full"}>
                        <DropdownSearchable
                          onchangeValue={(value: any) => setFieldValue("customerID", value.id)}
                          onClearData={() => setFieldValue("customerID", "")}
                          onSearchInputChange={
                            debounce(
                              (value) => setSearchContact(value),
                              200)
                          }
                          placeholder={"Mã khách hàng"}
                          className={"max-w-full h-full flex-1"}
                          focusedClass={"border-b border-primary"}
                          allowClearValueSingleInput={true}
                          showTriangle={false}
                          maxWidthInput="max-w-full"
                          renderSelectedItem={(item: any) => (
                            <div className="max-w-full">
                              <p className={"truncate"}>{item.text}</p>
                            </div>
                          )}
                          data={contacts.map(contact => ({
                            label: `${contact.name}-${contact.phone}`,
                            value: contact._id,
                          }))}
                          formatItem={{
                            id: "value",
                            text: "label",
                          }}
                          inlineSearch={true}
                        />
                        <ErrorMessage
                          name="customerID"
                          component="div"
                          className="font-normal text-xs text-negative pl-3"
                        />
                      </div>
                    </div>
                    <div className={"w-1/4 flex items-start pl-3"}>
                      <div className={"h-full text-left  text-gray-500 flex items-center mr-2  w-1/5 h-full"}>Mùa</div>
                      <div className={"flex-1 max-w-4/5 w-4/5 h-full"}>
                        <DropdownSearchable
                          onchangeValue={(item: any) => setFieldValue("seasons", item.value)}
                          onClearData={() => setFieldValue("seasons", "")}
                          className={"max-w-full h-full flex-1"}
                          placeholder="Chọn mùa"
                          isMultiple={false}
                          allowClearValueSingleInput={true}
                          showTriangle={false}
                          maxWidthInput="max-w-full"
                          renderSelectedItem={(item: any) => (
                            <div
                              className="max-w-full"
                            >
                              <p className={"truncate"}>{item.text}</p>
                            </div>
                          )}
                          data={SEASONS_TYPE.map((season) => ({
                            label: season.text,
                            value: season.value,
                          }))}
                          formatItem={{
                            id: "value",
                            text: "label",
                          }}
                          initialValue={{
                            label: SEASONS_TYPE[0].text,
                            value: SEASONS_TYPE[0].value,
                          }}
                          inlineSearch={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between my-6">
                    <div>
                      <span>Kênh bán hàng</span>
                      <div>
                        <FormControl sx={{ marginTop: "-5px" }} >
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="salesChannel"
                          >
                            <FormControlLabel
                              sx={{ marginLeft: "0" }}
                              value="1"
                              control={
                                <Radio
                                  style={{ paddingRight: "5px" }}
                                  icon={<img src={CheckBoxEmpty} alt="" />}
                                  checkedIcon={<img src={CheckedBox} alt="" />}
                                />
                              }
                              label={<span className="text-[13px]">Offline</span>}
                            />
                            <FormControlLabel
                              sx={{ marginLeft: "0" }}
                              value="2"
                              control={
                                <Radio
                                  style={{ paddingRight: "5px" }}
                                  icon={<img src={CheckBoxEmpty} alt="" />}
                                  checkedIcon={<img src={CheckedBox} alt="" />}
                                />
                              }
                              label={<span className="text-[13px]">Grab</span>}
                            />
                            <FormControlLabel
                              sx={{ marginLeft: "0" }}
                              value="3"
                              control={
                                <Radio
                                  style={{ paddingRight: "5px" }}
                                  icon={<img src={CheckBoxEmpty} alt="" />}
                                  checkedIcon={<img src={CheckedBox} alt="" />}
                                />
                              }
                              label={<span className="text-[13px]">Shopee</span>}
                            />
                            <FormControlLabel
                              sx={{ marginLeft: "0" }}
                              value="4"
                              control={
                                <Radio
                                  style={{ paddingRight: "5px" }}
                                  icon={<img src={CheckBoxEmpty} alt="" />}
                                  checkedIcon={<img src={CheckedBox} alt="" />}
                                />
                              }
                              label={<span className="text-[13px]">Gojek</span>}
                            />
                            <FormControlLabel
                              sx={{ marginLeft: "0" }}
                              value="5"
                              control={
                                <Radio
                                  style={{ paddingRight: "5px" }}
                                  icon={<img src={CheckBoxEmpty} alt="" />}
                                  checkedIcon={<img src={CheckedBox} alt="" />}
                                />
                              }
                              label={<span className="text-[13px]">Baemin</span>}
                            />
                            <FormControlLabel
                              sx={{ marginLeft: "0" }}
                              value="6"
                              control={
                                <Radio
                                  style={{ paddingRight: "5px" }}
                                  icon={<img src={CheckBoxEmpty} alt="" />}
                                  checkedIcon={<img src={CheckedBox} alt="" />}
                                />
                              }
                              label={<span className="text-[13px]">Loship</span>}
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                      <ErrorMessage
                        name="salesChannel"
                        component="div"
                        className="font-normal text-xs text-negative pl-3"
                      />
                    </div>
                    <div>
                      <span>Phương thức thanh toán</span>
                      {/* <div className="flex flex-wrap mt-2 mb-2">
                        <div className="flex items-center mr-4">
                          <Field id="paymentMethod1" type="radio" value="1" name="paymentMethod" className="w-4 h-4" checked />
                          <label htmlFor="paymentMethod1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Tiền mặt
                          </label>
                        </div>
                        <div className="flex items-center mr-4">
                          <Field id="paymentMethod2" type="radio" value="2" name="paymentMethod" className="w-4 h-4" />
                          <label htmlFor="paymentMethod2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Chuyển khoản
                          </label>
                        </div>
                      </div> */}
                      <div>
                        <FormControl sx={{ marginTop: "-5px" }} >
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="paymentMethod"
                          >
                            <FormControlLabel
                              sx={{ marginLeft: "0", fontSize: "13px" }}
                              value="1"
                              control={
                                <Radio
                                  style={{ paddingRight: "5px" }}
                                  icon={<img src={CheckBoxEmpty} alt="" />}
                                  checkedIcon={<img src={CheckedBox} alt="" />}
                                />
                              }
                              label={<span className="text-[13px]">Tiền mặt</span>}
                            />
                            <FormControlLabel
                              sx={{ marginLeft: "0" }}
                              value="2"
                              control={
                                <Radio
                                  style={{ paddingRight: "5px" }}
                                  icon={<img src={CheckBoxEmpty} alt="" />}
                                  checkedIcon={<img src={CheckedBox} alt="" />}
                                />
                              }
                              label={<span className="text-[13px]">Chuyển khoản</span>}
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                      <ErrorMessage
                        name="paymentMethod"
                        component="div"
                        className="font-normal text-xs text-negative pl-3"
                      />
                    </div>
                    <div>
                      <span>Hình thức phục vụ</span>
                      <div>
                        <FormControl sx={{ marginTop: "-5px" }} >
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="service"
                          >
                            <FormControlLabel
                              sx={{ marginLeft: "0" }}
                              value="1"
                              control={
                                <Radio
                                  style={{ paddingRight: "5px" }}
                                  icon={<img src={CheckBoxEmpty} alt="" />}
                                  checkedIcon={<img src={CheckedBox} alt="" />}
                                />
                              }
                              label={<span className="text-[13px]">Tại quán</span>}
                            />
                            <FormControlLabel
                              sx={{ marginLeft: "0" }}
                              value="2"
                              control={
                                <Radio
                                  style={{ paddingRight: "5px" }}
                                  icon={<img src={CheckBoxEmpty} alt="" />}
                                  checkedIcon={<img src={CheckedBox} alt="" />}
                                />
                              }
                              label={<span className="text-[13px]">Giao hàng (app)</span>}
                            />
                            <FormControlLabel
                              sx={{ marginLeft: "0" }}
                              value="3"
                              control={
                                <Radio
                                  style={{ paddingRight: "5px" }}
                                  icon={<img src={CheckBoxEmpty} alt="" />}
                                  checkedIcon={<img src={CheckedBox} alt="" />}
                                />
                              }
                              label={<span className="text-[13px]">Mang đi</span>}
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="boxlef w-1/2">
                      <div className={"flex py-2 border-b"}>
                        <div className={"w-3/4 flex items-start"}>
                          <div className={"h-full text-left text-gray-500 flex items-center mr-2 "}>Tên (*)</div>
                          <div className={"w-full flex-1"}>
                            <input
                              placeholder="Tên"
                              type="text"
                              className="border-0 flex-grow outline-none px-3 mt-0.5 w-3/4"
                              onChange={(event) => setFieldValue("name", event.target.value)}
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="font-normal text-xs text-negative pl-3"
                            />
                          </div>
                        </div>
                      </div>
                      <div className={"flex py-2 border-b"}>
                        <div className={"w-3/4 flex items-start"}>
                          <div className={"h-full text-left  text-gray-500 flex items-center mr-2 "}>Ghi chú</div>
                          <div className={"w-full flex-1"}>
                            <input
                              placeholder="Nhập nội dung ...."
                              type="text"
                              className="border-0 flex-grow outline-none px-3 mt-0.5 w-3/4"
                              onChange={(event) => setFieldValue("note", event.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={"flex py-2 border-b"}>
                        <div className={"w-3/4 flex items-start"}>
                          <div className={"h-full text-left  text-gray-500 flex items-center mr-2 "}>Đơn app</div>
                          <div className={"w-full flex-1"}>
                            <input
                              placeholder="Nhập nội dung...."
                              type="text"
                              className="border-0 flex-grow outline-none px-3 mt-0.5 w-3/4"
                              onChange={(event) => setFieldValue("appOrderSign", event.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="my-3">Sản phẩm</div>
                        <div>
                          <input type="text" placeholder="Tìm kiếm sản phẩm"
                            onKeyUp={debounce(e => {
                              setKeywordSearchProduct(e.target.value);
                            }, 700)}
                            className="w-full h-[40px] rounded border-0.5 border-cbs-bg-input-search bg-cbs-bg-input-search px-3 py-1 outline-none "
                          />
                        </div>
                        <div className="h-[300px] overflow-y-auto	my-2 ">
                          {!!products.length && products.map((product: any) => (
                            <div key={product._id} className="flex gap-2 w-full border-b-0.5 py-2">
                              <img src={product?.images?.length ? `${process.env.REACT_APP_URL_S3}${product?.images[0]?.path}` : ItemSample} alt="item" className="w-[44px] h-[44px]" />
                              <div className="w-full">
                                <div className="flex justify-between">
                                  <div>
                                    <p className="font-bold truncate"> {product.name} </p>
                                    <textarea
                                      rows={3} cols={50}
                                      className="border-0 flex-grow outline-none mt-1 w-full h-[30px] resize-none "
                                      style={{ width: "300px" }}
                                      placeholder="Thêm ghi chú ...." onChange={e => handleChangeNote(e, product)} defaultValue={product.note}></textarea>
                                  </div>
                                  <div className="text-primary"> {convertCurrency(product.unitPrice)}</div>
                                </div>
                                <div className="flex gap-2 justify-end">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setProductsInCart((prevProducts: any) => {
                                        const isExists = prevProducts.find((p: any) => p._id === product._id);
                                        if (isExists) return prevProducts;
                                        else return [...prevProducts, product];
                                      });
                                    }}
                                  >
                                    <img src={IconPlus} alt="Add to cart" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="boxright w-1/2">
                      <div className="h-[300px] overflow-y-auto	my-2 border-0.5 ">
                        {!!productsInCart.length && productsInCart.map((product: any) => {
                          return (
                            <div key={product._id} className="flex gap-2 w-full border-b-0.5 py-2 pl-3 pr-3">
                            <img src={product?.images?.length ? `${process.env.REACT_APP_URL_S3}${product?.images[0]?.path}` : ItemSample} alt="item" className="w-[44px] h-[44px]" />
                            <div className="w-full">
                              <div className="flex justify-between">
                                <div>
                                  <p className="font-bold truncate">
                                    {product.name}
                                  </p>
                                  <textarea
                                    className="border-0 flex-grow outline-none mt-0.5 w-full h-[35px] resize-none"
                                    placeholder="Thêm ghi chú ...." onChange={e => handleChangeNote(e, product)} defaultValue={product.note}></textarea>
                                </div>
                                <div className="flex gap-3">
                                  <div className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    <label>
                                      <input onChange={() => handleChangeType('off', product)} type="radio" className="mr-2.5" checked={(product.statusApp == 'off' || !product.statusApp) ? true : false}/>
                                      Off
                                    </label>
                                  </div>

                                  <div className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    <label>
                                      <input onChange={() => handleChangeType('app', product)} type="radio" className="mr-2.5" checked={product.statusApp == 'app' ? true : false}/>
                                      App
                                    </label>
                                  </div>
                                </div>
                                <div className="text-blue-400">{calTotalPriceEachProduct(product)}</div>
                              </div>
                              {/* <div className="flex gap-2 justify-end"> */}
                              <div className="flex justify-end">
                                {/* <span>Số lượng: </span> */}
                                <div className="flex gap-2 justify-end items-center">
                                  {/* <button onClick={decreaseCount}><img src={IconMinus} alt="" /></button>
                                  <input type="number" min="1" className="ml-2 w-[40px]" defaultValue={count} onChange={e => handleChangeQuantity(e, product)} />
                                  <button onClick={increaseCount}><img src={IconPlus} alt="" /></button> */}
                                  <button type="button" onClick={() => decreaseCount(product)}><img src={IconMinus} /></button>
                                  <span onChange={e => handleChangeQuantity(e, product)} >{product.quantity}</span>
                                  <button type="button" onClick={() => increaseCount(product)}><img src={IconPlus} /></button>
                                </div>
                              </div>
                              <div className="flex flex-wrap w-4/5">
                                {!!product?.variants?.length && product.variants.map((variant: any) => (
                                  <div key={variant._id} className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                    <div className="form-check">
                                      <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value={variant._id} id={variant._id} onChange={e => handleChooseVariant(e, product._id, variant)} />
                                      <label className="form-check-label inline-block text-gray-800">
                                        {variant.name}
                                      </label>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          )
                        })}
                      </div>
                      <div className="border-0.5">
                        <div className="flex justify-between my-2 p-2">
                          <div className="font-bold">Tổng tiền</div>
                          <div className="font-bold">{convertCurrency(totalMoney)}</div>
                        </div>
                        <div className="flex justify-between items-center mb-1 pl-2 py-2">
                          <div className="">Chiết khấu</div>
                          <div className="flex gap-1">
                            <div>
                              <input placeholder="25%"
                                className="w-[100px] h-[30px] border-0.5 border-cbs-border bg-cbs-table-header px-1 py-1 outline-none text-right"
                                onChange={handleChangeDiscount}
                                value={discountAndSales.discountPercent}
                                name="discountPercent"
                              />
                            </div>
                            <div>
                              <input placeholder="10.000"
                                className="w-[100px] h-[30px] border-0.5 border-r-0 border-cbs-border bg-cbs-table-header px-1 py-1 outline-none text-right"
                                onChange={handleChangeDiscount}
                                value={discountAndSales.discount}
                                name="discount"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mb-1 pl-2 py-2">
                          <div className="">Giảm giá</div>
                          <div className="flex gap-1">
                            <div>
                              <input placeholder="25%"
                                className="w-[100px] h-[30px] border-0.5 border-cbs-border bg-cbs-table-header px-1 py-1 outline-none text-right"
                                onChange={handleChangeSales}
                                value={discountAndSales.salesPercent}
                                name="salesPercent"
                              />
                            </div>
                            <div>
                              <input placeholder="10.000"
                                className="w-[100px] h-[30px] border-0.5 border-r-0 border-cbs-border bg-cbs-table-header px-1 py-1 outline-none text-right"
                                onChange={handleChangeSales}
                                value={discountAndSales.sales}
                                name="sales"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="border-0.5 p-1">
                        <div className="flex justify-between">
                          <div className="font-bold">Thanh toán</div>
                          <div className={`font-bold ${totalPay > 0 ? 'text-primary' : 'text-red-500'} font-bold`}>{convertCurrency(totalPay)}</div>
                        </div>
                      </div>
                      <div className="text-right mb-5" style={{ marginTop: "100px" }}>
                        <button type="submit" className="btn btn-primary ml-auto">Xác nhận</button>
                      </div>
                    </div>
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