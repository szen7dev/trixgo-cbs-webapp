/**
 * Libraries
 */
import React, { FC, useEffect, useRef, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { useHistory } from 'react-router-dom';
import { number, object, string } from "yup";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import { formatNumberMoney, convertCurrency } from 'utils/converter';
import { useSocket } from "services/hooks/useSocket";
import { useAuth } from 'services/hooks/auth/useAuth';
import { useQueryClient } from 'react-query';

/**
 * Hooks, Typings
 */

/**
 * Components, Assets
 */
import Close from "assets/icons/Close";
import { useModal } from "services/hooks/useModal";
import RadioEmpty from "assets/images/Ellipse 27.svg";
import RadioChecked from "assets/images/icons8-checked-40 (2) 2.svg";
import IconSearch from "assets/images/icons8-search-96 1.svg";
import beverageIcon from "assets/images/icons8-beverage.png";
import "react-day-picker/lib/style.css";
import { DropdownSearchable, Loader } from "shareComponents/common";
import { GroupSearchable } from "shareComponents/common/GroupSearchable";
import API from "apis/repository";
import { useContact } from "services/hooks/items/useContact";
import { convertObToUrl } from "utils";
import { FormControl, FormControlLabel, IconButton, InputBase, Paper, Radio, RadioGroup } from "@mui/material";
// import SearchIcon from "assets/icons/Search";
import { ItemInCartMenu } from "./itemInCartDetail";

interface InitialValues {
  fundaID: string,
  shiftID: string,
  customerID: string,
  seasons: number,
  paymentMethod: string,
  salesChannel: number,
  name: string,
  note: string,
  appOrderSign: string,
}

type Props = {
  defaultValues?: any;
}

type GroupSearchableHandle = React.ElementRef<typeof GroupSearchable>;
type DropdownSearchableHandle = React.ElementRef<typeof DropdownSearchable>;

export const ModalAddNewOrder: FC<Props> = () => {
  const history = useHistory();
  const dropdownFundaRef = useRef<DropdownSearchableHandle>(null);
  const dropdownShiftsRef = useRef<DropdownSearchableHandle>(null);
  const queryClient = useQueryClient();
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

  const [fundas, setFundas] = useState<any>([]);
  const [shifts, setShifts] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);
  const [productsInCart, setProductsInCart] = useState<any>([]);

  const [productIsParent, setProductIsParent] = useState<any>([]);
  const [indexParentID, setIndexParentID] = useState('');

  const [service, setService] = useState("1");
  const [loading, setLoading] = useState(false);
  const [isUseCredit, setIsUseCredit] = useState(false);

  const [credit, setCredit] = useState(0);
  const [creditTemp, setCreditTemp] = useState(0);

  /**
   * Code cũ: Tuấn Dev
   */
  // useEffect(() => {
  //   const fetchFundas = async () => {
  //     const response = await API.get(
  //       `/api/fnb/products?isParent=1&limit=50`, ////
  //     );
  //     const { data, status } = response?.data;

  //     if (status !== 200) return;
  //     setProductIsParent(data?.listRecords || []);
  //   }

  //   fetchFundas();
  // }, []);
  // console.log({fundaID})

  useEffect(() => {
    const fetchFundas = async () => {
      const response = await API.get(
        `/api/item/fundas?keyword=${searchFunda}&isMember=1`,
      );
      const { data, status } = response?.data;

      if (status !== 200) return;
      const fundaList = data.listRecords || [];
      if (fundaList && fundaList.length) {
        dropdownFundaRef?.current?.setValueRef({
          label: `${fundaList[0].sign}.${fundaList[0].name}`,
          value: fundaList[0]._id,
        });
        setFundaID(fundaList[0]._id)
        setShiftID("");
      }
      setFundas(fundaList);
    }

    fetchFundas();
  }, [searchFunda]);

  useEffect(() => {
    if (!fundaID) return;

    // Tìm kiếm ca làm việc của Cơ sở/Điểm bán
    const fetchShifts = async () => {
      const response = await API.get(
        `/api/fnb/shifts?fundaID=${fundaID}`,
        {
          params: {
            populates: {
              "path": "funda",
              "select": "sign",
            }
          },
        }
      );
      const { data, status } = response?.data;

      if (status !== 200) return;
      const shiftsList = data.listRecords || [];
      if (shiftsList && shiftsList.length) {
        dropdownShiftsRef?.current?.setValueRef({
          label: shiftsList[0].name,
          value: shiftsList[0]._id,
        });
        setShiftID(shiftsList[0]._id);
      } else {
        dropdownShiftsRef?.current?.setValueRef(null);
        setShiftID("");
      }
      setShifts(shiftsList);
    }
    fetchShifts();

    /**
     * Tìm kiếm DANH MỤC sản phẩm
     * Code mới-Hiệp Dev
     */
    const fetchCateProduct = async () => {
      const response = await API.get(
        `/api/fnb/products?isParent=1&limit=50&fundaID=${fundaID}`, ////
        // `/api/fnb/products?isParent=1&limit=50`, ////
      );
      const { data, status } = response?.data;

      if (status !== 200) return;
      setProductIsParent(data?.listRecords || []);
    }
    fetchCateProduct();

  }, [fundaID])

  /**
   * Tìm kiếm sản phẩm của Cơ sở/Điểm bán
   */
  const fetchProducts = async () => {
    const response: any = await API.get(
      `/api/fnb/products?${convertObToUrl({
        type: 1,
        limit: 50,
        keyword: keywordSearchProduct,
        populates: JSON.stringify({
          path: 'images',
        }),
        parentID: indexParentID,
        fundaID,
      })}`,
    );
    const { data, status } = response?.data;
    if (status !== 200) return;

    const response2 = await API.get(
      `/api/fnb/products?type=2&limit=50&fundaID=${fundaID}`,
    );

    const productsAsync = data.listRecords?.map?.(async (product: any) => {
      return {
        ...product,
        variants: response2?.data?.data?.listRecords,
      }
    })
    const products = await Promise.all(productsAsync);

    setProducts(products);
  };

  useEffect(() => {
    fetchProducts();
  }, [keywordSearchProduct, indexParentID, fundaID]); // Hiepnh: Bổ sung thêm trường này fundaID

  useEffect(() => {
    calTotalMoney();
  }, [JSON.stringify(productsInCart)]);

  useEffect(() => {
    calTotalMoney(service);
  }, [service]);

  const increaseCount = (product: any) => {
    const newProducts = [...productsInCart];
    for (let i = 0; i < newProducts.length; i++) {
      if (newProducts[i]._id === product._id && newProducts[i].createdAt === product.createdAt) {
        newProducts[i].quantity = newProducts[i].quantity + 1;
      }
    }
    setProductsInCart(newProducts);
  };
  const decreaseCount = (product: any) => {
    const newProducts = [...productsInCart];
    for (let i = 0; i < newProducts.length; i++) {
      if (newProducts[i]._id === product._id && newProducts[i].createdAt === product.createdAt && newProducts[i].quantity > 1) {
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
      if (!productsInCart || productsInCart.length === 0) {
        toast.warning('Vui lòng chọn sản phẩm');
        return;
      };
      setLoading(true);
      for (const value in values) {
        values[value] = values[value].toString();
      }

      const products = productsInCart.map((p: any) => {
        let price = 0;
        switch (true) {
          case service === "1" && p.size === "1":
            price = p.unitPrice || 0;
            break;
          case service === "2" && p.size === "1":
            price = p.unitPrice2 || 0;
            break;
          case service === "1" && p.size === "2":
            price = p.unitPrice3 || 0;
            break;
          case service === "2" && p.size === "2":
            price = p.unitPrice4 || 0;
            break;
          default:
            break;
        }
        return {
          ...p,
          productID: p._id,
          quantity: p.quantity,
          note: p.note,
          variantsID: p.variantsSelected ? p.variantsSelected.map((v: any) => v._id) : [],
          unitPrice: price,
        }
      })

      const realCredit = (totalMoney - discountAndSales.discount - discountAndSales.sales) > credit ? credit : totalMoney - discountAndSales.discount - discountAndSales.sales;
      const dataAddNewOrder: any = {
        ...values,
        fundaID,
        shiftID,
        products,
        total: `${totalMoney}`,
        discount: `${discountAndSales.discount}`,
        salesoff: `${discountAndSales.sales}`,
        credit: realCredit.toString(),
      }
      closeModal();

      const { data, status } = await API.post(
        `/api/fnb/orders`,
        dataAddNewOrder
      );

      setLoading(false);

      if (status !== 200) return toast.warning('Yêu cầu tạo đơn thất bại');
      if (data.error) return toast.warning('Tạo đơn thất bại');

      socket?.emit('FNB_CSS_ADD_NEW_ORDER', {
        companyID: user?.company?._id,
        fundaID: dataAddNewOrder.fundaID,
        orderInfo: data?.data,
      })
      queryClient.refetchQueries('fnb-order-list');

      history.push(`/fnb/home/${data?.data?._id}/print/1`);
      // return toast.success('Tạo đơn thành công',{
      //   position: toast.POSITION.BOTTOM_RIGHT,
      // });
    } catch (error) {
      setLoading(false);
      if (typeof error === "string") {
        toast.error(error);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const fetchCredit = async (contactID: any, isUseCredit: boolean) => {
    const { data, status } = await API.get(`/api/item/contacts?select=name phone remainLoyaltyPoints&contactID=${contactID}`);
    if (status !== 200) return;
    const value = data?.data?.remainLoyaltyPoints || 0;
    setCreditTemp(value);

    isUseCredit && setCredit(value);
  }

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
    let totalPay = totalMoney - newDiscount - discountAndSales.sales;
    if (service === "1") {
      totalPay = totalPay - credit;
    }

    setTotalPay(totalPay < 0 ? 0 : totalPay);
  }

  const handleAutoChangeDiscount = (totalMoney: number, name: string, value: number) => {
    const inputValue = Number(value);
    let newDiscount = inputValue;
    let newDiscountPercent = inputValue;
    let newSales = discountAndSales.sales;
    newSales = (totalMoney * discountAndSales.salesPercent) / 100;
    if (name === 'discount') {
      newDiscountPercent = +((inputValue * 100) / totalMoney).toFixed(2);
    } else if (name === 'discountPercent') {
      newDiscount = (totalMoney * inputValue) / 100;
    }

    setDiscountAndSales(prev => ({
      ...prev,
      discount: newDiscount,
      discountPercent: newDiscountPercent,
      sales: newSales
    }));
    let totalPay = totalMoney - newDiscount - newSales;
    if (service === "1") {
      totalPay = totalPay - credit;
    }

    setTotalPay(totalPay < 0 ? 0 : totalPay);
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

    let totalPay = totalMoney - discountAndSales.discount - newSales;
    if (service === "1") {
      totalPay = totalPay - credit;
    }

    setTotalPay(totalPay < 0 ? 0 : totalPay);
  }

  const handleChangeQuantity = (e: any, product: any) => {
    const value = Number(e.target.value);
    if (value < 1) return;
    const newProductsInCart = productsInCart.map((p: any) => {
      if (p._id === product._id && p.createdAt === product.createdAt) {
        return { ...p, quantity: value };
      }
      return p;
    })
    setProductsInCart(newProductsInCart);
  }

  const handleRemoveItem = (product: any) => {
    const newProductsInCart: any = [];
    productsInCart.forEach((item: any) => {
      if (item.createdAt !== product.createdAt) {
        newProductsInCart.push(item);
      }
    });
    setProductsInCart(newProductsInCart);
  }

  const handleChangeNote = (e: any, product: any) => {
    const value = e.target.value;

    const newProductsInCart = productsInCart.map((p: any) => {
      if (p._id === product._id && p.createdAt === product.createdAt) {
        return { ...p, note: value };
      }
      return p;
    })
    setProductsInCart(newProductsInCart);
  }

  const handleChangeValue = (product: any, key: any, value: any) => {
    const newProductsInCart = productsInCart.map((p: any) => {
      if (p._id === product._id && p.createdAt === product.createdAt) {
        return { ...p, [key]: value };
      }
      return p;
    })
    setProductsInCart(newProductsInCart);
  }

  const handleChooseVariant = (e: any, productId: string, variant: any, createdAt: any) => {
    const isChecked = e.target.checked;
    const newProductsInCart = productsInCart.map((product: any) => {
      if (!product.variantsSelected) product.variantsSelected = [];

      if (product._id === productId && createdAt === product.createdAt) {
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

  const calTotalMoney = (serviceApp = "0") => {
    const amount = productsInCart.reduce((prev: any, product: any) => {
      if (product.variantsSelected && product.variantsSelected.length) {
        product.variantsSelected.forEach((variant: any) => {
          let variantPrice = 0;
          switch (true) {
            case service === "1" && product.size === "1":
              variantPrice = variant.unitPrice || 0;
              break;
            case service === "2" && product.size === "1":
              variantPrice = variant.unitPrice2 || 0;
              break;
            case service === "1" && product.size === "2":
              variantPrice = variant.unitPrice3 || 0;
              break;
            case service === "2" && product.size === "2":
              variantPrice = variant.unitPrice4 || 0;
              break;
            default:
              break;
          }
          prev += variantPrice * product.quantity;
        });
      }

      let price = 0;
      switch (true) {
        case service === "1" && product.size === "1":
          price = product.unitPrice || 0;
          break;
        case service === "2" && product.size === "1":
          price = product.unitPrice2 || 0;
          break;
        case service === "1" && product.size === "2":
          price = product.unitPrice3 || 0;
          break;
        case service === "2" && product.size === "2":
          price = product.unitPrice4 || 0;
          break;
        default:
          break;
      }

      return prev += (price * product.quantity)
    }, 0)
    setTotalMoney(amount);

    if (serviceApp !== "0") {
      if (serviceApp === "1") {
        handleAutoChangeDiscount(amount, 'discountPercent', 0);
      } else {
        handleAutoChangeDiscount(amount, 'discountPercent', 25);
      }
    } else {
      handleAutoChangeDiscount(amount, 'discountPercent', discountAndSales.discountPercent);
    }
  }

  const resetCredit = (newCredit: any = creditTemp) => {
    if(isUseCredit) {
      setTotalPay((totalMoney - discountAndSales.discount - discountAndSales.sales) > newCredit ? newCredit : totalMoney - discountAndSales.discount - discountAndSales.sales);
    }
    setCredit(0);
    setCreditTemp(0);
    setIsUseCredit(false);
  }

  const addOrderSchema = object().shape({
    // fundaID: string().required("Vui lòng chọn cơ sở"),
    // shiftID: string().required("Vui lòng chọn ca"),
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
    paymentMethod: "1",
    salesChannel: 1,
    name: "",
    note: "",
    appOrderSign: "",
  };

  return (
    <>
      {(loading) && <Loader className="border-primary" />}
      <div className={"flex flex-col"}>
        <div className={"flex w-full py-3 px-3 border-b"}>
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
                <div className={"t-add-new-task-dialog-select"}>
                  <div className="flex">
                    <div className="boxlef w-2/3">
                      <div className="px-3">
                        <div className={"flex py-1 "}>
                          <div className={"w-1/3 flex items-start"}>
                            <div className={"h-full text-left  text-gray-500 flex items-center mr-2  w-1/5 h-full h-full"}>Cơ sở</div>
                            <div className={"flex-1 max-w-4/5 w-4/5 h-full"}>
                              <DropdownSearchable
                                ref={dropdownFundaRef}
                                onchangeValue={(value: any) => {
                                  setFundaID(value?.id)
                                  setFieldValue("fundaID", value?.id);
                                  // setShiftID("");
                                  // setFieldValue("shiftID", "");
                                }}
                                onClearData={() => {
                                  setFundaID("")
                                  setFieldValue("fundaID", "");
                                  // setShiftID("");
                                  // setFieldValue("shiftID", "");
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
                                className="font-normal text-xs text-negative pl-3 absolute"
                              />
                            </div>
                          </div>
                          <div className={"w-1/3 flex items-start pl-3"}>
                            <div className={"h-full text-left  text-gray-500 flex items-center mr-2  w-1/5 h-full"}>Ca làm</div>
                            <div className={"flex-1 max-w-4/5 w-4/5 h-full"}>
                              <DropdownSearchable
                                ref={dropdownShiftsRef}
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
                                  label: `${shift.funda.sign}.${shift.name}`,
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
                          <div className={"w-1/3 flex items-start pl-3"}>
                            <div className={"h-full text-left  text-gray-500 flex items-center mr-2 w-1/5 h-full"}>Mã khách</div>
                            <div className={"flex-1 max-w-4/5 w-4/5 h-full"}>
                              <DropdownSearchable
                                onchangeValue={(value: any) => {
                                  setFieldValue("customerID", value.id);
                                  setFieldValue("name", `Đơn hàng ${value.label}`);
                                  resetCredit(value);
                                  fetchCredit(value.id, false);
                                }}
                                onClearData={() => {
                                  resetCredit();
                                  setFieldValue("customerID", "")
                                }}
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
                        </div>
                        <div className="flex justify-between pt-1 my-1">
                          <div>
                            <span>Phân loại kênh bán hàng</span>
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
                                        style={{}}
                                        icon={<img src={RadioEmpty} alt="" />}
                                        checkedIcon={<img src={RadioChecked} alt="" />}
                                        onChange={() => {
                                          setFieldValue("salesChannel", 1);
                                          setFieldValue("paymentMethod", "1");
                                          setService("1");
                                        }}
                                        checked={(values.salesChannel === 1) ? true : false}
                                      />
                                    }
                                    label={<span className="text-[13px]">Offline</span>}
                                  />
                                  <FormControlLabel
                                    sx={{ marginLeft: "0" }}
                                    value="2"
                                    control={
                                      <Radio
                                        style={{}}
                                        icon={<img src={RadioEmpty} alt="" />}
                                        checkedIcon={<img src={RadioChecked} alt="" />}
                                        onChange={() => {
                                          setFieldValue("salesChannel", 2);
                                          setFieldValue("paymentMethod", "2");
                                          setService("2");
                                        }}
                                        checked={(values.salesChannel === 2) ? true : false}
                                      />
                                    }
                                    label={<span className="text-[13px]">Grab</span>}
                                  />
                                  <FormControlLabel
                                    sx={{ marginLeft: "0" }}
                                    value="3"
                                    control={
                                      <Radio
                                        style={{}}
                                        icon={<img src={RadioEmpty} alt="" />}
                                        checkedIcon={<img src={RadioChecked} alt="" />}
                                        onChange={() => {
                                          setFieldValue("salesChannel", 3);
                                          setFieldValue("paymentMethod", "2");
                                          setService("2");
                                        }}
                                        checked={(values.salesChannel === 3) ? true : false}
                                      />
                                    }
                                    label={<span className="text-[13px]">Shopee</span>}
                                  />
                                  <FormControlLabel
                                    sx={{ marginLeft: "0" }}
                                    value="4"
                                    control={
                                      <Radio
                                        style={{}}
                                        icon={<img src={RadioEmpty} alt="" />}
                                        checkedIcon={<img src={RadioChecked} alt="" />}
                                        onChange={() => {
                                          setFieldValue("salesChannel", 4);
                                          setFieldValue("paymentMethod", "2");
                                          setService("2");
                                        }}
                                        checked={(values.salesChannel === 4) ? true : false}
                                      />
                                    }
                                    label={<span className="text-[13px]">Gojek</span>}
                                  />
                                  <FormControlLabel
                                    sx={{ marginLeft: "0" }}
                                    value="5"
                                    control={
                                      <Radio
                                        style={{}}
                                        icon={<img src={RadioEmpty} alt="" />}
                                        checkedIcon={<img src={RadioChecked} alt="" />}
                                        onChange={() => {
                                          setFieldValue("salesChannel", 5);
                                          setFieldValue("paymentMethod", "2");
                                          setService("2");
                                        }}
                                        checked={(values.salesChannel === 5) ? true : false}
                                      />
                                    }
                                    label={<span className="text-[13px]">Baemin</span>}
                                  />
                                  <FormControlLabel
                                    sx={{ marginLeft: "0" }}
                                    value="6"
                                    control={
                                      <Radio
                                        style={{}}
                                        icon={<img src={RadioEmpty} alt="" />}
                                        checkedIcon={<img src={RadioChecked} alt="" />}
                                        onChange={() => {
                                          setFieldValue("salesChannel", 6);
                                          setFieldValue("paymentMethod", "2");
                                          setService("2");
                                        }}
                                        checked={(values.salesChannel === 6) ? true : false}
                                      />
                                    }
                                    label={<span className="text-[13px]">Loship</span>}
                                  />
                                  <FormControlLabel
                                    sx={{ marginLeft: "0" }}
                                    value="7"
                                    control={
                                      <Radio
                                        style={{}}
                                        icon={<img src={RadioEmpty} alt="" />}
                                        checkedIcon={<img src={RadioChecked} alt="" />}
                                        onChange={() => {
                                          setFieldValue("salesChannel", 7);
                                          setFieldValue("paymentMethod", "2");
                                          setService("2");
                                        }}
                                        checked={(values.salesChannel === 7) ? true : false}
                                      />
                                    }
                                    label={<span className="text-[13px]">Bee</span>}
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
                                        style={{}}
                                        icon={<img src={RadioEmpty} alt="" />}
                                        checkedIcon={<img src={RadioChecked} alt="" />}
                                        onChange={() => setFieldValue("paymentMethod", "1")}
                                        checked={(values.paymentMethod === "1") ? true : false}
                                      />
                                    }
                                    label={<span className="text-[13px]">Tiền mặt</span>}
                                  />
                                  <FormControlLabel
                                    sx={{ marginLeft: "0" }}
                                    value="2"
                                    control={
                                      <Radio
                                        style={{}}
                                        icon={<img src={RadioEmpty} alt="" />}
                                        checkedIcon={<img src={RadioChecked} alt="" />}
                                        onChange={() => setFieldValue("paymentMethod", "2")}
                                        checked={(values.paymentMethod === "2") ? true : false}
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
                        </div>
                      </div>
                      <div className="flex justify-between	gap-2 border-t-0.5 border-b-0.5 px-3">
                        <div className="flex justify-between	gap-2 w-1/2">
                          <div className={"flex w-3/5 py-4 "}>
                            <div className={" flex items-start"}>
                              <div className={"h-full text-left text-gray-500 flex items-center mr-2 "}>Tên (*)</div>
                              <div className={"w-full flex-1"}>
                                <input
                                  placeholder="Tên"
                                  type="text"
                                  className="border-0 flex-grow outline-none px-3 mt-0.5 w-3/4"
                                  onChange={(event) => setFieldValue("name", event.target.value)}
                                  value={values.name}
                                />
                                <ErrorMessage
                                  name="name"
                                  component="div"
                                  className="font-normal text-xs text-negative pl-3 absolute"
                                />
                              </div>
                            </div>
                          </div>
                          <div className={"flex w-2/5 py-4"}>
                            <div className={" flex items-start"}>
                              <div className={"h-full text-left  text-gray-500 flex items-center mr-2 "}>Đơn app</div>
                              <div className={"w-full flex-1"}>
                                <input
                                  placeholder="Nhập nội dung...."
                                  type="text"
                                  className="border-0 flex-grow outline-none px-1 mt-0.5 w-3/4"
                                  onChange={(event) => setFieldValue("appOrderSign", event.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" w-1/2">
                          <div className={"flex w-full py-4"}>
                            <div className={" flex items-start"}>
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
                        </div>
                      </div>
                      <div className="flex gap-4 bg-cbs-form-input-bg p-3">
                        <div className="w-1/5 bg-white py-3 px-2 rounded" style={{ maxWidth: "175px" }}>
                          <div>
                            <button
                              type="button"
                              onClick={() => setIndexParentID('')}
                              className={`
                            left-menu-nav flex items-center p-1.5 my-1 rounded w-full hover:bg-gray-400 hover:text-white
                            ${!indexParentID ? "bg-gray-400 text-white" : ""}
                            `}>
                              <span className={"flex-1  text-left text-[14px]"}>TẤT CẢ</span>
                            </button>
                            {productIsParent.map((item: any, index: number) => (
                              <button key={index}
                                type="button"
                                onClick={() => setIndexParentID(item._id)}
                                className={`
                            left-menu-nav flex items-center p-1.5 my-1 rounded w-full hover:bg-gray-400 hover:text-white
                            ${indexParentID === item._id ? "bg-gray-400 text-white" : ""}
                            `}>
                                <span className={"flex-1  text-left text-[14px]"}>{item?.name}</span>
                              </button>
                            ))
                            }
                          </div>
                        </div>
                        <div className="w-full  bg-white p-3 rounded">
                          <div>
                            <Paper
                              component="form"
                              sx={{ p: '4px', display: 'flex', alignItems: 'center', boxShadow: 'none' }}
                              className=" border-0.5 border-cbs-bg-input-search "
                            >
                              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                <img src={IconSearch} style={{ width: "18px", height: "18px" }} />
                              </IconButton>
                              <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Tìm kiếm sản phẩm"
                                onKeyUp={debounce(e => {
                                  setKeywordSearchProduct(e.target.value);
                                }, 100)}
                              />
                            </Paper>
                          </div>
                          <div className="overflow-y-auto	my-2 " style={{ height: "600px" }}>
                            <div className="flex flex-wrap gap-2">
                              {!!products.length && products.map((product: any) => (
                                product?.parent ? (
                                  <button
                                    title={product.name}
                                    key={product._id}
                                    type="button"
                                    className="flex-1 w-1/5 pb-1/2 bg-purple-300 relative"
                                    style={{ maxWidth: "24%", maxHeight: "200px", flexBasis: "24%" }}
                                    onClick={() => {
                                      setProductsInCart((prevProducts: any) => {
                                        return [...prevProducts, {
                                          ...product,
                                          quantity: 1,
                                          size: "1",
                                          sugar: "1",
                                          ice: "1",
                                          createdAt: new Date()
                                        }];
                                      });
                                    }}
                                  >
                                    <img src={product?.images?.length ? `${process.env.REACT_APP_URL_S3}${product?.images[0]?.path}` : beverageIcon} className="w-full h-full object-contain" />
                                    <div className="w-full absolute bottom-0 bg-black opacity-75 text-white text-[14px] px-3 py-1">
                                      <div className="overflow-ellipsis line-clamp-2 text-left">{product.name}</div>
                                      <div className="text-right font-bold">{formatNumberMoney(product.unitPrice)}</div>
                                    </div>
                                  </button>
                                ) : (<></>)
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* right */}
                    <div className="boxright w-1/3 border-l-0.5">
                      <div className=" overflow-y-auto	mb-2 border-b-0.5 bg-cbs-form-input-bg ">
                        {/* loop */}
                        {(productsInCart || []).map((item: any, index: number) =>
                          <ItemInCartMenu
                            key={index}
                            item={item}
                            service={service}
                            handleChooseVariant={handleChooseVariant}
                            handleChangeQuantity={handleChangeQuantity}
                            increaseCount={increaseCount}
                            decreaseCount={decreaseCount}
                            handleChangeNote={handleChangeNote}
                            handleChangeValue={handleChangeValue}
                            handleRemoveItem={handleRemoveItem}
                          />)
                        }
                      </div>
                      <div className="">
                        <div className="flex justify-between my-2 p-2">
                          <div className="font-bold">Tổng tiền</div>
                          <div className="font-bold">{formatNumberMoney(totalMoney)}</div>
                        </div>
                        <div className="flex justify-between items-center mb-1 px-2 py-2">
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
                                className="w-[100px] h-[30px] border-0.5 border-cbs-border bg-cbs-table-header px-1 py-1 outline-none text-right"
                                onChange={handleChangeDiscount}
                                value={discountAndSales.discount}
                                name="discount"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mb-1 px-2 py-2">
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
                                className="w-[100px] h-[30px] border-0.5 border-cbs-border bg-cbs-table-header px-1 py-1 outline-none text-right"
                                onChange={handleChangeSales}
                                value={discountAndSales.sales}
                                name="sales"
                              />
                            </div>
                          </div>
                        </div>

                        {values.customerID && service === "1" ?
                          <div className="flex justify-between items-center mb-1 px-2 py-2">
                            <div>
                              <div>Credit {`(${formatNumberMoney(credit || creditTemp)})`}</div>
                              <div>
                                <FormControl sx={{ marginTop: "-5px" }} >
                                  <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="isUseCredit"
                                  >
                                    <FormControlLabel
                                      sx={{ marginLeft: "0", fontSize: "13px" }}
                                      value="1"
                                      control={
                                        <Radio
                                          style={{}}
                                          icon={<img src={RadioEmpty} alt="" />}
                                          checkedIcon={<img src={RadioChecked} alt="" />}
                                          onChange={() => {
                                            setCredit(0);
                                            setIsUseCredit(false);

                                            const amountPay = (totalMoney - discountAndSales.discount - discountAndSales.sales) > credit ? credit : totalMoney - discountAndSales.discount - discountAndSales.sales;

                                            if(totalPay) {
                                              setTotalPay(totalPay + credit);
                                            } else if(totalPay === 0 && amountPay < credit) {
                                              setTotalPay(amountPay);
                                            }
                                          }}
                                          checked={!isUseCredit ? true : false}
                                        />
                                      }
                                      label={<span className="text-[13px]">Không sử dụng</span>}
                                    />
                                    <FormControlLabel
                                      sx={{ marginLeft: "0" }}
                                      value="2"
                                      control={
                                        <Radio
                                          style={{}}
                                          icon={<img src={RadioEmpty} alt="" />}
                                          checkedIcon={<img src={RadioChecked} alt="" />}
                                          onChange={() => {
                                            setCredit(creditTemp);
                                            setIsUseCredit(true);

                                            if(totalPay) {
                                              setTotalPay(creditTemp > totalPay ? 0 : totalPay - creditTemp);
                                            }

                                            fetchCredit(values.customerID, true);
                                          }}
                                          checked={isUseCredit ? true : false}
                                        />
                                      }
                                      label={<span className="text-[13px]">Sử dụng</span>}
                                    />
                                  </RadioGroup>
                                </FormControl>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <div>
                                <input placeholder="25%"
                                  className="w-[100px] h-[30px] border-0.5 border-cbs-border bg-cbs-table-header px-1 py-1 outline-none text-right"
                                  value={(totalMoney - discountAndSales.discount - discountAndSales.sales) > credit ? credit : totalMoney - discountAndSales.discount - discountAndSales.sales}
                                  disabled
                                />
                              </div>
                            </div>
                          </div> : <></>
                        }
                      </div>
                      <div className="border-t-0.5 border-b-0.5 px-2 py-2">
                        <div className="flex justify-between">
                          <div className="font-bold">Thanh toán</div>
                          <div className={`font-bold ${totalPay > 0 ? 'text-primary' : 'text-red-500'} font-bold`}>{formatNumberMoney(totalPay)}</div>
                        </div>
                      </div>
                      <div className="text-right mb-5 mx-2" style={{ marginTop: "100px" }}>
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
  )
}