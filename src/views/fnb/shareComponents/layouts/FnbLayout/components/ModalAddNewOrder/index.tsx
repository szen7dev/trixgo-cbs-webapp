/**
 * Libraries
 */
import React, { FC, useEffect, useRef, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useHistory } from 'react-router-dom';
import { number, object, string } from "yup";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import { formatNumberMoney } from 'utils/converter';
import { useSocket } from "services/hooks/useSocket";
import { useAuth } from 'services/hooks/auth/useAuth';
import { useQueryClient } from 'react-query';
import DatePicker from "react-datepicker";
import moment from "moment";

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
import { ItemInCartMenu } from "./itemInCartDetail";
// import SearchIcon from "assets/icons/Search";
interface InitialValues {
  fundaID: string,
  shiftID: string,
  customerID: string,
  affiliateID: string,
  seasons: number,
  paymentMethod: string,
  salesChannel: number,
  shippingFee: number,
  paid: number,
  sources: number,
  name: string,
  note: string,
  date: string,
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
  const { current: socket }: any = useSocket(); // Cấu trúc khai báo Socket
  const { user } = useAuth();
  // const groupSearchableRef = React.useRef<GroupSearchableHandle>(null);

  const [keywordSearchProduct, setKeywordSearchProduct] = useState("");
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
  const [vouchers, setVouchers] = useState<any>([]);
  const [productsInCart, setProductsInCart] = useState<any>([]);

  const [productIsParent, setProductIsParent] = useState<any>([]);
  const [indexParentID, setIndexParentID] = useState('');

  const [service, setService] = useState("1");
  const [loading, setLoading] = useState(false);
  const [isUseCredit, setIsUseCredit] = useState(false);
  const [isEditCredit, setIsEditCredit] = useState(false);

  const [totalMoney, setTotalMoney] = useState(0);
  const [totalPay, setTotalPay] = useState(0);
  const [totalPayTemp, setTotalPayTemp] = useState(0);

  const [credit, setCredit] = useState(0);
  const [creditTemp, setCreditTemp] = useState(0);
  const [creditInput, setCreditInput] = useState(0);
  const [customerID, setCustomerID] = useState("");
  const [affiliateID, setAffiliateID] = useState("");

  const setTypingTimeoutVoucherRef: any = useRef(null);

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
        `/api/fnb/products?isParent=1&limit=50&fundaID=${fundaID}`,
      );
      const { data, status } = response?.data;

      console.log(data)

      if (status !== 200) return;
      setProductIsParent(data?.listRecords || []);
    }
    fetchCateProduct();

  }, [fundaID])

  useEffect(() => {
    if(!customerID) return;

    const fetchVouchers = async () => {
      try {
        const response: any = await API.get(
          `/api/fnb/vouchers?customerID=${customerID}`,
        );
        // console.log({ response })
        const { data, status } = response?.data;
        // console.log({ data, status })
        if (status !== 200) return;

        setVouchers(data.listRecords);
      } catch(err) {
        console.error(err)
      }
    }

    fetchVouchers();
  }, [customerID])

  /**
   * Tìm kiếm sản phẩm của Cơ sở/Điểm bán
   */
  const fetchProducts = async () => {
    const response: any = await API.get(
      `/api/fnb/products?${convertObToUrl({
        type: 1,
        status: 1,
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
      `/api/fnb/products?type=2&status=1&limit=50&fundaID=${fundaID}`,
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
          // ...p, // Lấy tất cả các field
          productID: p._id,
          quantity: p.quantity,
          black: p.black,
          size: p.size,
          sugar: p.sugar,
          ice: p.ice,
          note: p.note,
          doctype: p?.doctype,
          variantsSelected: p.variantsSelected,
          variantsID: p.variantsSelected ? p.variantsSelected.map((v: any) => v._id) : [],
          unitPrice: price,
        }
      })

      const realCredit = isEditCredit ? creditInput : (totalMoney - discountAndSales.discount - discountAndSales.sales) > credit ? credit : totalMoney - discountAndSales.discount - discountAndSales.sales;

      const dataAddNewOrder: any = {
        ...values,
        fundaID,
        shiftID,
        products,
        total: `${totalMoney}`,
        discount: `${discountAndSales.discount}`,
        salesoff: `${discountAndSales.sales}`,
        credit: realCredit.toString(),
        offer: voucherTotalPrice.toString(),
        voucherID: voucherId || ""
      }
      // console.log({ dataAddNewOrder })

      const { data, status } = await API.post(
        `/api/fnb/orders`,
        dataAddNewOrder
      );
      // console.log({ data, status })

      if (status !== 200) return toast.warning('Yêu cầu tạo đơn thất bại');
      if (data.error) return toast.warning(data.data.message);

      // console.log({
      //   isConnect: socket.connected,
      //   companyID: user?.company?._id,
      //   fundaID: dataAddNewOrder.fundaID,
      //   orderInfo: data?.data,
      // });

      // Bắn Socket lên Server
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
      if (typeof error === "string") {
        toast.error(error);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
      closeModal();
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

  const handleAutoChangeDiscount = (totalMoney: number, name: string, value: number, voucherTotalPrice?: number) => {
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
      totalPay = totalPay - credit - (voucherTotalPrice || 0);
    }

    setTotalPay(totalPay < 0 ? 0 : totalPay);
  }

  const handleChangeSales = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // console.log({ name, value })

    let inputValue = Number(value);
    let newSales = inputValue;
    let newSalesPercent = inputValue;

    if (name === 'sales') {
      newSalesPercent = +((inputValue * 100) / totalMoney).toFixed(2);
    } else if (name === 'salesPercent') {
      if(Number(inputValue) > 100){
        inputValue = 100
      }
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

  const calTotalMoney = async (serviceApp = "0") => {
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

    const totalVoucher = await fetchVoucher(voucherInput, customerID, true, amount);

    if (serviceApp !== "0") {
      if (serviceApp === "1") {
        handleAutoChangeDiscount(amount, 'discountPercent', 0, totalVoucher);
      } else {
        handleAutoChangeDiscount(amount, 'discountPercent', 25, totalVoucher);
      }
    } else {
      handleAutoChangeDiscount(amount, 'discountPercent', discountAndSales.discountPercent, totalVoucher);
    }
  }

  const resetCredit = (newCredit: any = creditTemp) => {
    if (isUseCredit) {
      setTotalPay((totalMoney - discountAndSales.discount - discountAndSales.sales) > newCredit ? newCredit : totalMoney - discountAndSales.discount - discountAndSales.sales);
    }
    setCredit(0);
    setCreditTemp(0);
    setCreditInput(0);
    setTotalPayTemp(0);
    setIsUseCredit(false);
    setIsEditCredit(false);

    setVoucherErrorStatus(false);
    setVoucherInput("");
    setVoucherId("");
    setVoucherTotalPrice(0);
    setVoucherName("");
    setVoucherStatus("");
  }

  ////
  const [voucherId, setVoucherId] = useState("");
  const [voucherInput, setVoucherInput] = useState("");
  const [voucherName, setVoucherName] = useState("");
  const [voucherStatus, setVoucherStatus] = useState("");
  const [voucherTotalPrice, setVoucherTotalPrice] = useState(0);
  const [voucherErrorStatus, setVoucherErrorStatus] = useState(false);

  ///

  const fetchVoucher = async (sign: string, customerID: string, noUpdateTotal = false, totalMoneyTmp?: number) => {
    if (!sign) {
      setVoucherTotalPrice(0);
      setVoucherId("");
      setVoucherName("");
      setVoucherStatus("");
      setVoucherErrorStatus(false);
      if (!noUpdateTotal) {
        handleAutoChangeDiscount(totalMoney, 'discountPercent', 0, 0);
      }
      return 0;
    };
    const { data, status } = await API.get(`/api/fnb/vouchers?sign=${sign}`);
    if (status !== 200) return 0;
    if (data?.error) {
      setVoucherTotalPrice(0);
      setVoucherId("");
      setVoucherName("");
      setVoucherStatus("Mã Voucher không chính xác");
      setVoucherErrorStatus(true);
      if (!noUpdateTotal) handleAutoChangeDiscount(totalMoney, 'discountPercent', 0, 0);
    } else {
      setVoucherErrorStatus(false);
      setVoucherId(data?.data?._id);
      if (data?.data?.name) {
        setVoucherName(data?.data?.name);
      }

      // Check dieu kien
      // 1. Đã sử dụng: nếu infoVocher.buyers[] chứa customerID
      if (data?.data?.buyers && data.data.buyers.includes(customerID)) {
        setVoucherTotalPrice(0);
        setVoucherId("");
        setVoucherStatus("Khách hàng này đã sử dụng mã Voucher rồi");
        setVoucherErrorStatus(true);
        if (!noUpdateTotal) handleAutoChangeDiscount(totalMoney, 'discountPercent', 0, 0);
        return 0;
      }

      // 2-Hết hiệu lực: nếu now() > expired
      const currentTime = new Date().getTime();
      const expiredTime = new Date(data?.data?.expired).getTime();
      if (currentTime > expiredTime) {
        setVoucherTotalPrice(0);
        setVoucherId("");
        setVoucherStatus("Mã Voucher này đã hết hạn");
        setVoucherErrorStatus(true);
        if (!noUpdateTotal) handleAutoChangeDiscount(totalMoney, 'discountPercent', 0, 0);
        return 0;
      }

      // 3-Giá trị đơn hàng không đủ điều kiện áp dụng: total < infoVoucher.minOrderAmount
      if ((totalMoneyTmp || totalMoney) < data?.data?.minOrderAmount) {
        setVoucherTotalPrice(0);
        setVoucherId("");
        setVoucherStatus(`Đơn hàng phải từ ${formatNumberMoney(data?.data?.minOrderAmount)} trở lên`);
        setVoucherErrorStatus(true);
        if (!noUpdateTotal) handleAutoChangeDiscount(totalMoney, 'discountPercent', 0, 0);
        return 0;
      }

      // 4-Kiểm tra nếu Mã khách (customerID) mà không nằm trong infoVoucher.receivers[] -> Báo mã khách không hợp lệ
      if (data?.data?.receivers && !data.data.receivers.includes(customerID)) {
        setVoucherTotalPrice(0);
        setVoucherId("");
        setVoucherStatus(`Khách hàng này không nằm trong danh sách khách hàng được hưởng Voucher`);
        setVoucherErrorStatus(true);
        if (!noUpdateTotal) handleAutoChangeDiscount(totalMoney, 'discountPercent', 0, 0);
        return 0;
      }

      if (data?.data?.salesoffAmount) {
        setVoucherTotalPrice(data?.data?.salesoffAmount);
        setVoucherStatus(`Voucher hợp lệ. Bạn được giảm: ${formatNumberMoney(data?.data?.salesoffAmount)}`);
        if (!noUpdateTotal) handleAutoChangeDiscount(totalMoney, 'discountPercent', 0, data?.data?.salesoffAmount);
        return data?.data?.salesoffAmount;
      } else {
        const moneyOfSales = Math.round(data?.data?.salesoffRate * totalMoney / 100);
        setVoucherTotalPrice(moneyOfSales);
        setVoucherStatus(`Voucher hợp lệ. Bạn được giảm: ${data?.data?.salesoffRate}% trên tổng hoá đơn`);
        if (!noUpdateTotal) handleAutoChangeDiscount(totalMoney, 'discountPercent', 0, moneyOfSales);
        return moneyOfSales;
      }
    }
  }

  const addOrderSchema = object().shape({
    customerID: string().required("Vui lòng chọn mã khách hàng"),
    salesChannel: number().required("Vui lòng chọn kênh bán hàng"),
    paymentMethod: number().required("Vui lòng chọn phương thức thanh toán"),
    name: string().required("Vui lòng nhập tên khách hàng"),
  });

  const initialValues: InitialValues = {
    fundaID,
    shiftID,
    customerID: "",
    affiliateID: "",
    seasons: 1,
    paymentMethod: "1",
    sources: 1,
    salesChannel: 1,
    shippingFee: 0,
    paid: 0,
    name: "",
    note: "",
    date: "",
    appOrderSign: "",
  }

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
                        <div className={"flex"}>
                          <div className={"w-1/3 flex items-start"}>
                            <div className={"h-full text-left  text-gray-500 flex items-center mr-2 w-1/5 h-full h-full"}>Cơ sở</div>
                            <div className={"flex-1 max-w-4/5 w-4/5 h-full"}>
                              <DropdownSearchable
                                ref={dropdownFundaRef}
                                onchangeValue={(value: any) => {
                                  setFundaID(value?.id)
                                  setFieldValue("fundaID", value?.id);
                                }}
                                onClearData={() => {
                                  setFundaID("")
                                  setFieldValue("fundaID", "");
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
                                }}
                                className={"max-w-full h-full flex-1"}
                                placeholder="Chọn ca làm"
                                isMultiple={false}
                                allowClearValueSingleInput={true}
                                showTriangle={false}
                                maxWidthInput="max-w-full"
                                renderSelectedItem={(item: any) => (
                                  <div className="max-w-full">
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
                                  setCustomerID(value.id);
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

                        <div className="flex justify-between pt-1">
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
                                    sx={{ marginLeft: "0", marginRight: "8px" }}
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
                                    sx={{ marginLeft: "0", marginRight: "8px" }}
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
                                    label={<span className="text-[13px]" title="Grab Food">Grab F</span>}
                                  />
                                  <FormControlLabel
                                    sx={{ marginLeft: "0", marginRight: "8px" }}
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
                                    label={<span className="text-[13px]" title="Shopee Food">Shopee F</span>}
                                  />
                                  <FormControlLabel
                                    sx={{ marginLeft: "0", marginRight: "8px" }}
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
                                    sx={{ marginLeft: "0", marginRight: "8px" }}
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
                                    sx={{ marginLeft: "0", marginRight: "8px" }}
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
                                    className="border-r mr-1.5"
                                    sx={{ marginLeft: "0", marginRight: "8px" }}
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
                                    label={<span className="text-[13px] mr-1.5">Bee</span>}
                                  />

                                  <FormControlLabel
                                    sx={{ marginLeft: "0", marginRight: "8px" }}
                                    title="Sàn TikTok Shop"
                                    value="8"
                                    control={
                                      <Radio
                                        style={{}}
                                        icon={<img src={RadioEmpty} alt="" />}
                                        checkedIcon={<img src={RadioChecked} alt="" />}
                                        onChange={() => {
                                          setFieldValue("salesChannel", 8);
                                          setFieldValue("paymentMethod", "2")
                                          setService("2");
                                        }}
                                        checked={(values.salesChannel === 8) ? true : false}
                                      />
                                    }
                                    label={<span className="text-[13px]">TikTok</span>}
                                  />
                                  <FormControlLabel
                                    sx={{ marginLeft: "0", marginRight: "8px" }}
                                    title="Sàn Shopee (không phải Shopee Food)"
                                    value="9"
                                    control={
                                      <Radio
                                        style={{}}
                                        icon={<img src={RadioEmpty} alt="" />}
                                        checkedIcon={<img src={RadioChecked} alt="" />}
                                        onChange={() => {
                                          setFieldValue("salesChannel", 9);
                                          setFieldValue("paymentMethod", "2");
                                          setService("2");
                                        }}
                                        checked={(values.salesChannel === 9) ? true : false}
                                      />
                                    }
                                    label={<span className="text-[13px]">Shopee S</span>}
                                  />
                                  
                                  <FormControlLabel
                                    sx={{ marginLeft: "0", marginRight: "8px" }}
                                    title="Sàn Lazada"
                                    value="10"
                                    control={
                                      <Radio
                                        style={{}}
                                        icon={<img src={RadioEmpty} alt="" />}
                                        checkedIcon={<img src={RadioChecked} alt="" />}
                                        onChange={() => {
                                          setFieldValue("salesChannel", 10);
                                          setFieldValue("paymentMethod", "2")
                                          setService("2");
                                        }}
                                        checked={(values.salesChannel === 10) ? true : false}
                                      />
                                    }
                                    label={<span className="text-[13px]">Lazada</span>}
                                  />
                                  
                                  <FormControlLabel
                                    sx={{ marginLeft: "0", marginRight: "8px" }}
                                    title="Sàn Reels"
                                    value="11"
                                    control={
                                      <Radio
                                        style={{}}
                                        icon={<img src={RadioEmpty} alt="" />}
                                        checkedIcon={<img src={RadioChecked} alt="" />}
                                        onChange={() => {
                                          setFieldValue("salesChannel", 11);
                                          setFieldValue("paymentMethod", "2")
                                          setService("2");
                                        }}
                                        checked={(values.salesChannel === 11) ? true : false}
                                      />
                                    }
                                    label={<span className="text-[13px]">Reels</span>}
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
                          
                          <div className={"flex w-2/10 py-4 "}>
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

                          <div className={"flex w-2/10 py-4"}>
                            <div className={" flex items-start"}>
                              <div className={"h-full text-left  text-gray-500 flex items-center mr-2 "}>Đơn app</div>
                              <div className={"w-full flex-1"}>
                                <input
                                  placeholder="Nhập mã..."
                                  type="text"
                                  className="border-0 flex-grow outline-none px-1 mt-0.5 w-3/4"
                                  onChange={(event) => setFieldValue("appOrderSign", event.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className={"flex w-4/10 py-4"}>
                            <div className={" flex items-start"}>
                              <div className={"h-full text-left  text-gray-500 flex items-center mr-2 "}>Affiliate</div>
                              <div className={"w-full flex-1"}>
                                  <div className={"flex-1 max-w-4/5 w-4/5 h-full"}>
                                    <DropdownSearchable
                                      onchangeValue={(value: any) => {
                                        setAffiliateID(value.id);
                                        setFieldValue("affiliateID", value.id);
                                      }}
                                      onClearData={() => {
                                        setFieldValue("affiliateID", "")
                                      }}
                                      onSearchInputChange={
                                        debounce(
                                          (value) => setSearchContact(value),
                                          200)
                                      }
                                      placeholder={"Nhập Affiliate"}
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
                                      name="affiliateID"
                                      component="div"
                                      className="font-normal text-xs text-negative pl-3"
                                    />
                                </div>
                              </div>
                            </div>
                        </div>
                        
                        <div className="">
                          <div className={"flex w-full py-4"}>
                            <div className={" flex items-start"}>
                              <div className={"h-full text-left  text-gray-500 flex items-center mr-2 "}>Ghi chú</div>
                              <div className={"w-full flex-1"}>
                                <input
                                  placeholder="Nhập ghi chú..."
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
                        {
                          service === '2' ?
                            <div className="flex justify-between items-center mb-1 px-2 py-2">
                              <div className="">Chiết khấu*** (chỉ áp dụng đơn App)</div>
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
                            </div> :
                            <div className="flex justify-between items-center mb-1 px-2 py-2">
                              <div className="">Giảm giá*** (chỉ áp dụng đơn Off)</div>
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
                        }

                        {values.customerID && service === "1" ?
                          <div className="flex justify-between items-center mb-1 px-2 py-2">
                            <div>
                              <div>Trừ từ tích điểm, gói trả trước-chỉ áp dụng đơn Off {`(${formatNumberMoney(credit || creditTemp)})`}</div>
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
                                          icon={<img src={RadioEmpty} alt="Radio Empty" />}
                                          checkedIcon={<img src={RadioChecked} alt="" />}
                                          onChange={() => {
                                            setCredit(0);
                                            setIsUseCredit(false);
                                            setIsEditCredit(false);
                                            setCreditInput(0);
                                            setTotalPayTemp(0);

                                            const amountPay = (totalMoney - discountAndSales.discount - discountAndSales.sales) > credit ? credit : totalMoney - discountAndSales.discount - discountAndSales.sales;

                                            if (totalPay && !isEditCredit) {
                                              setTotalPay(totalPay + credit);
                                            } else if (totalPay === 0 && amountPay < credit) {
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

                                            if (totalPay) {
                                              setTotalPay(creditTemp > (totalPay + voucherTotalPrice) ? 0 : (totalPay + voucherTotalPrice) - creditTemp);
                                            }

                                            fetchCredit(values.customerID, true);

                                            setVoucherErrorStatus(false);
                                            setVoucherInput("");
                                            setVoucherTotalPrice(0);
                                            setVoucherId("");
                                            setVoucherName("");
                                            setVoucherStatus("");
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
                                {!isEditCredit ? (
                                  <input placeholder="25%"
                                    className="w-[100px] h-[30px] border-0.5 border-cbs-border bg-cbs-table-header px-1 py-1 outline-none text-right"
                                    value={(totalMoney - discountAndSales.discount - discountAndSales.sales) > credit ? credit : totalMoney - discountAndSales.discount - discountAndSales.sales}
                                    onPointerUp={() => {
                                      setIsEditCredit(!isEditCredit);

                                      const amountPay = (totalMoney - discountAndSales.discount - discountAndSales.sales) > credit ? credit : totalMoney - discountAndSales.discount - discountAndSales.sales;

                                      if (totalPay) {
                                        setTotalPay(totalPay + credit);
                                        setTotalPayTemp(totalPay + credit);
                                      } else if (totalPay === 0 && amountPay < credit) {
                                        setTotalPay(amountPay);
                                        setTotalPayTemp(amountPay);
                                      }
                                    }}
                                    disabled
                                  />
                                ) : (
                                  <input placeholder="25%"
                                    className="w-[100px] h-[30px] border-0.5 border-cbs-border bg-cbs-table-header px-1 py-1 outline-none text-right"
                                    value={creditInput}
                                    type="number"
                                    onChange={(e: any) => {
                                      const value = +e.target.value;
                                      if (value <= credit) {
                                        setCreditInput(value);
                                      }
                                    }}
                                    onFocus={() => {
                                      setCreditInput(0);

                                      const amountPay = (totalMoney - discountAndSales.discount - discountAndSales.sales) > credit ? credit : totalMoney - discountAndSales.discount - discountAndSales.sales;

                                      if (totalPay) {
                                        setTotalPayTemp(totalPay);
                                      } else if (totalPay === 0 && amountPay < credit) {
                                        setTotalPayTemp(amountPay);
                                      }
                                    }}
                                    onBlur={(e: any) => {
                                      const value = +e.target.value;
                                      setTotalPayTemp(totalPayTemp - value);
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                          </div> : <></>
                        }

                        {values.customerID && service === "1" && !isUseCredit ?
                          <>
                          <div className="flex justify-between items-center mb-1 px-2 py-2">
                            <div>
                              <div>Voucher</div>
                              <div>
                                <input
                                  placeholder="Nhập mã voucher"
                                  className="w-[125px] h-[30px] border-0.5 border-cbs-border bg-cbs-table-header px-1 py-1 outline-none"
                                  value={voucherInput}
                                  onChange={(e: any) => {
                                    setVoucherInput(e.target.value);

                                    if (setTypingTimeoutVoucherRef.current) {
                                      clearTimeout(setTypingTimeoutVoucherRef.current);
                                    }

                                    setTypingTimeoutVoucherRef.current = setTimeout(() => {
                                      fetchVoucher(e.target.value, values.customerID);
                                    }, 500);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="flex gap-1">
                            <div className="font-bold">{formatNumberMoney(voucherTotalPrice)}</div>
                            </div>
                            </div>
                            {voucherName ?
                              <div className="text-primary ml-2 mb-2">Tên Voucher: {voucherName}</div> : <></>
                            }

                            {voucherStatus ?
                              <div className={`${voucherErrorStatus ? "text-red-500" : "text-primary"} ml-2 mb-5`}>Tình trạng: {voucherStatus}</div> : <></>
                            }

                            {!!vouchers.length && (
                              <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="voucher"
                              >
                                {vouchers.map((voucher: any) => (
                                  <FormControlLabel
                                    sx={{ marginLeft: "0" }}
                                    value={voucher.sign}
                                    key={voucher._id}
                                    control={
                                      <Radio
                                        style={{}}
                                        icon={<img src={RadioEmpty} alt={voucher.sign} />}
                                        checkedIcon={<img src={RadioChecked} alt={voucher.sign} />}
                                        key={voucher._id}
                                        onChange={() => {
                                          setVoucherId(voucher._id);
                                          setVoucherInput(voucher.sign);

                                          if (setTypingTimeoutVoucherRef.current) {
                                            clearTimeout(setTypingTimeoutVoucherRef.current);
                                          }

                                          setTypingTimeoutVoucherRef.current = setTimeout(() => {
                                            fetchVoucher(voucher.sign, values.customerID);
                                          }, 500);
                                        }}
                                        checked={voucherId === voucher._id}
                                      />
                                    }
                                    label={
                                      <span className="text-[13px]">
                                        {`${voucher.sign}-Ưu đãi ${formatNumberMoney(voucher.salesoffAmount)} | Giảm giá ${voucher.salesoffRate}% - Đơn hàng từ ${formatNumberMoney(voucher.minOrderAmount)}`}
                                        <p><i>{voucher?.note}</i></p>
                                      </span>
                                    }
                                  />
                                ))}
                              </RadioGroup>
                            )}

                          </> : <></>
                        }
                      </div>
                      <div className="border-t-0.5 border-b-0.5 px-2 py-2">
                        <div className="flex justify-between">
                          <div className="font-bold">Thanh toán</div>
                          {!isEditCredit ? (
                            <div className={`font-bold ${totalPay > 0 ? 'text-primary' : 'text-red-500'} font-bold`}>{formatNumberMoney(totalPay)}</div>
                          ) : (
                            <div className={`font-bold ${totalPayTemp > 0 ? 'text-primary' : 'text-red-500'} font-bold`}>{formatNumberMoney(totalPayTemp)}</div>
                          )}
                        </div>
                      </div>
                      <div className="border-b-0.5 px-2 py-1">
                        <div className="flex justify-between">
                          <div className="font-bold">Phí ship (nếu có)</div>
                          <div>
                            <input
                              type="number"
                              placeholder="Nhập phí ship"
                              name="shippingFee"
                              className="h-8 w-full border border-primary-border outline-none px-2"
                              onChange={(event) => setFieldValue("shippingFee", event.target.value)}
                            />
                            </div>
                        </div>
                      </div>
                      <div className="border-b-0.5 px-2 py-1">
                        <div className="flex justify-between">
                          <div className="font-bold">Tiền mặt khách trả (đơn mua tại quán)</div>
                          <div>
                            <input
                              type="number"
                              placeholder="Nhập tiền mặt khách trả để tính tiền phải trả lại"
                              name="paid"
                              className="h-8 w-full border border-primary-border outline-none px-2"
                              onChange={(event) => setFieldValue("paid", event.target.value)}
                            />
                            </div>
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