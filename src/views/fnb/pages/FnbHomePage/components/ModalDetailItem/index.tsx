/**
 * Libraries
 */
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import moment from "moment";
import debounce from "lodash/debounce";

/**
 * Hooks, Typings
 */
import { useModal } from "services/hooks/useModal";
import { APP_ID, FNB_ORDER_STATUS, FNB_PAYMENT, FNB_SERVICE } from "apis/localdb";
import API from "apis/repository";
import { convertObToUrl } from "utils";
import { convertCurrency, formatNumberMoney } from 'utils/converter';

/**
 * Components, Assets
 */
import Close from "assets/icons/Close";
import ItemSample from "assets/images/image 430.jpg";
import IconGreenDot from "assets/images/Frame 4330.svg";
import CheckBoxEmpty from "assets/images/Frame 3548.svg";
import CheckedBox from "assets/images/Check-All.svg";
import IconCancel from "assets/images/icons8-cancel-96 1.svg";

import "react-day-picker/lib/style.css";
import { Button } from "@mui/material";
import { ModalErrorDetailItem } from "../ModalErrorDetailItem";
import { DropdownSearchable } from "shareComponents/common";

type Props = {
  order: any;
}

export const ModalDetailItem: FC<Props> = ({ order }) => {
  const { openModal, closeModal } = useModal();
  const [orderProducts, setOrderProducts] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [mistakesSelected, setMistakesSelected] = useState<any>([]);
  const [mistakeDoctypes, setMistakeDocTypes] = useState([]);

  const [keywordMistakeDoctypes, setKeywordMistakeDocTypes] = useState('');

  useEffect(() => {
    const fetchOrderProducts = async () => {
      const response = await API.get(
        `/api/fnb/order_products?${convertObToUrl({
          orderID: order._id,
          populates: JSON.stringify({
            path: 'subProducts product',
            populate: {
              path: 'images',
            }
          })
        })}`,
      );
      const { data, status } = response?.data;

      if (status !== 200) return;

      setOrderProducts(data.listRecords);
    }

    fetchOrderProducts();
  }, [])

  useEffect(() => {
    const fetchMistakes = async () => {
      const response = await API.get(
        `/api/fnb/mistakes?${convertObToUrl({
          orderID: order._id,
          populates: JSON.stringify({
            path: 'mistake',
          })
        })}`,
      );
      const { data, status } = response?.data;

      if (status !== 200) return;

      setMistakes(data.listRecords);
    }

    fetchMistakes();
  }, [])

  useEffect(() => {
    const fetchMistakeDoctypes = async () => {
      const response = await API.get(
        `/api/item/doctypes?${convertObToUrl({
          type: 19,
          keyword: keywordMistakeDoctypes,
        })}`,
      );
      const { data, status } = response?.data;

      if (status !== 200) return;

      setMistakeDocTypes(data.listRecords);
    }

    fetchMistakeDoctypes();
  }, [keywordMistakeDoctypes])

  const handleAddMistake = (item: any) => {
    const isExists = mistakesSelected.find((m: any) => m._id === item._id);

    if (isExists) return toast.warning('Lỗi đã được chọn');

    setMistakesSelected((prev: any) => ([...prev, item]));
  }

  const handleRemoveMistake = (item: any) => {
    const newItems = mistakesSelected.filter((m: any) => m._id !== item._id);
    setMistakesSelected(newItems);
  }

  if (!order) return <></>;

  return (
    <>
      <div className={"flex flex-col"}>
        <div className={"flex w-full py-3 px-6 border-b"}>
          <h4 className={"flex-1 text-lg font-bold text-left"}>Thông tin đơn hàng</h4>
          <div className={"flex items-center justify-center cursor-pointer"}>
            <Close onClick={closeModal} />
          </div>
        </div>
        <Formik
          initialValues={{}}
          onSubmit={() => Promise.resolve('Done!')}
        >
          {(formik) => {
            const { setFieldValue, values } = formik;
            return (
              <Form>
                <div className={"t-add-new-task-dialog-select px-6 pb-4"}>
                  <div className="flex gap-4">
                    <div className="boxlef w-1/2 ">
                      <div className={"border-0.5 p-2 my-2"}>
                        <div className={"flex py-2"}>
                          <div className={"w-full flex items-center"}>
                            <img src={IconGreenDot} alt="" />
                            <div className={"h-full text-left flex items-center px-1 "}>
                              <span className="text-gray-500 pr-1">Tên: </span>
                              <span>{order.name}</span>
                            </div>
                          </div>
                        </div>
                        <div className={"flex py-2"}>
                          <div className={"w-full flex items-center"}>
                            <img src={IconGreenDot} alt="" />
                            <div>
                              <div className={"h-full text-left flex items-center px-1 border-r-0.5 border-black"}>
                                <span className="text-gray-500 pr-1">Cơ sở: </span>
                                <span>{order.funda?.name}</span>
                              </div>
                            </div>
                            <div>
                              <div className={"h-full text-left flex items-center px-1 border-r-0.5 border-black"}>
                                <span className="text-gray-500 pr-1">Ca làm: </span>
                                <span>{order.shift?.name}</span>
                              </div>
                            </div>
                            <div>
                              <div className={"h-full text-left flex items-center px-1"}>
                                <span className="text-gray-500 pr-1">Người tạo: </span>
                                <span>{order.userCreate?.fullname}</span>
                              </div>
                            </div>
                            {/* Cơ sở: Winggo 30 Vĩnh Phúc | Ca làm: Ca sáng 24/11/2022 | Người tạo:  Phùng Thị Thu-Wgo */}
                          </div>
                        </div>
                        <div className={"flex py-2"}>
                          <div className={"w-full flex items-center"}>
                            <img src={IconGreenDot} alt="" />
                            <div className={"h-full text-left flex items-center px-1 "}>
                              <span className="text-gray-500 pr-1">Mã hiệu: </span>
                              <span><span className="text-cbs-primary">{order.sign}</span> - <span className="text-cbs-schedule-nextweek">{moment(order.createAt).format('DD/MM/YYYY HH:mm')}</span></span>
                            </div>
                            {/* Mã hiệu: 100003010 - 24/11/2022 15:30 */}
                          </div>
                        </div>
                        <div className={"flex py-2"}>
                          <div className={"w-full flex items-center"}>
                            <img src={IconGreenDot} alt="" />
                            <div className={"h-full text-left flex items-center px-1 "}>
                              <span className="text-gray-500 pr-1">Mã đơn trên App: </span>
                              <span>{order.appOrderSign}</span>
                            </div>
                          </div>
                          {/* Mã đơn trên App: Grab25688 */}
                        </div>
                        <div className={"flex py-2"}>
                          <div className={"w-full flex items-center"}>
                            <img src={IconGreenDot} alt="" />
                            <div>
                              <div className={"h-full text-left flex items-center px-1 border-r-0.5 border-black"}>
                                <span className="text-gray-500 pr-1">Thanh toán: </span>
                                <span>{FNB_PAYMENT[(order.paymentMethod || 1) - 1]?.text}</span>
                              </div>
                            </div>
                            <div>
                              <div className={"h-full text-left flex items-center px-1 "}>
                                <span className="text-gray-500 pr-1">Phục vụ: </span>
                                <span>{FNB_SERVICE[(order.service || 1) - 1]?.text}</span>
                              </div>
                            </div>
                            {/* Thanh toán: Tiền mặt | Phục vụ: Tại quán */}
                          </div>
                        </div>
                        <div className={"flex gap-4 py-2"}>
                          <div className={"w-full flex items-center"}>
                            <img src={IconGreenDot} alt="" />
                            <div className={"h-full text-left flex items-center px-1 "}>
                              <span className="text-gray-500 pr-1">Khách: </span>
                              <span>{order.customer?.phone} - {order.customer?.name} <span className="text-cbs-fnb-bg">(đã mua {order.customer?.numberOfOrders ?? 0} lần)</span></span>
                            </div>
                          </div>
                          {/* Khách: 0988115998 - Nguyễn Văn A (đã mua 68 lần) */}
                          <div className={" w-full h-full"} style={{ maxWidth: "30%" }}>
                            <DropdownSearchable
                              // onchangeValue={(value: any) => {
                              //     setFundaID(value?.id)
                              //     setFieldValue("fundaID", value?.id);
                              //     setShiftID("");
                              //     setFieldValue("shiftID", "");
                              // }}
                              // onClearData={() => {
                              //     setFundaID("")
                              //     setFieldValue("fundaID", "");
                              //     setShiftID("");
                              //     setFieldValue("shiftID", "");
                              // }}
                              // onSearchInputChange={
                              //     debounce(
                              //         (value) => setSearchFunda(value),
                              //         200)
                              // }
                              className={"max-w-full h-full flex-1 border-0.5 border-cbs-bg-input-search bg-cbs-bg-input-search placeholder-primary-gray rounded-md"}
                              placeholder="Tìm kiếm nhân sự"
                              isMultiple={false}
                              allowClearValueSingleInput={true}
                              showTriangle={false}
                              maxWidthInput="max-w-full"
                              renderSelectedItem={(item: any) => (
                                <div
                                  className="max-w-full"
                                >
                                  {/* <p className={"truncate"}>{item.text}</p> */}
                                </div>
                              )}
                              // data={fundas.map((funda: any) => ({
                              //     label: `${funda.sign}.${funda.name}`,
                              //     value: funda._id,
                              // }))}
                              // formatItem={{
                              //     id: "value",
                              //     text: "label",
                              // }}
                              inlineSearch={true}
                            />
                            <ErrorMessage
                              name="errorName"
                              component="div"
                              className="font-normal text-xs text-negative pl-3"
                            />
                          </div>
                        </div>
                        <div className={"flex py-2"}>
                          <div className={"w-full flex items-center"}>
                            <img src={IconGreenDot} alt="" />
                            <div className={"h-full text-left flex items-center px-1 "}>
                              <span className="text-gray-500 pr-1">Ghi chú: </span>
                              <span>{order.note}</span>
                            </div>
                          </div>
                          {/* Ghi chú: Đặt hộ khách qua Zalo */}
                        </div>
                        <div className={"flex py-2"}>
                          <div className={"w-full flex items-baseline	"}>
                            <img src={IconGreenDot} alt="" />
                            <div className={"h-full text-left flex px-1 "}>
                              <div className="text-gray-500" style={{ minWidth: "75px" }}>Lỗi gặp phải: </div>
                              <div className="flex flex-wrap gap-2 px-2">
                                {mistakes.map((m: any) => (
                                  <button key={m._id} className="cursor-pointer rounded-md bg-cbs-active-comment px-4 py-1"
                                    onClick={() =>
                                      openModal(
                                        <div className=" text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block" style={{ width: "640px" }}>
                                          <ModalErrorDetailItem />
                                        </div>
                                      )
                                    }
                                  >
                                    {m.mistake?.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="font-bold my-3">Lỗi gặp phải</div>
                        <div className="flex gap-2 my-3 flex-wrap">
                          {mistakesSelected.map((item: any) => (
                            <div key={item._id} className="flex gap-2 justify-between h-[40px] items-center border-0.5 border-cbs-border rounded-md px-3" style={{ minWidth: "33%" }}>
                              <div className="flex gap-2 items-center">
                                <span className="text-[14px]">{item.name}</span>
                              </div>
                              <button onClick={() => handleRemoveMistake(item)}>
                                <img src={IconCancel} alt="" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Tìm kiếm gán lỗi"
                            className="w-full h-[40px] rounded border-0.5 border-cbs-bg-input-search bg-cbs-bg-input-search px-3 py-1 outline-none "
                            onChange={debounce(
                              (e) => setKeywordMistakeDocTypes(e.target.value),
                              200)}
                          />
                        </div>
                        <div className="overflow-y-auto	my-2 ">
                          {mistakeDoctypes.map((md: any) => (
                            <div key={md._id} onClick={() => handleAddMistake(md)} className="cursor-pointer w-full h-[40px] rounded border-0.5 border-cbs-border bg-cbs-bg-input-search px-3 py-3 mt-1">
                              {md.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="boxright w-1/2">
                      <div className=" overflow-y-auto	mt-2 border-0.5 ">
                        {orderProducts.map((op: any) => (
                          <div key={op._id} className="flex gap-2 w-full border-b-0.5 p-2">
                            <img src={op.images?.length ? `${process.env.REACT_APP_URL_S3}${op.product?.images[0]?.path}` : ItemSample} alt="item" className="w-[44px] h-[44px]" />
                            <div className="w-full">
                              <div className="flex justify-between  ">
                                <div>
                                  <p className="font-bold truncate">{op.product?.name}</p>
                                  <p className="text-primary-gray">{op.note}</p>
                                </div>
                                <div className="text-primary">{convertCurrency(op.unitPrice)}</div>
                              </div>
                              <div className="flex flex-wrap w-4/5 mt-3">
                                {op.subProducts?.map?.((subProduct: any) => (
                                  <div key={subProduct._id} className="w-1/4 mb-2 pr-2 flex gap-2 items-center">
                                    <li> {subProduct.name} </li>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-l-0.5 border-r-0.5 px-2">
                        <div className="flex justify-between mt-2 mb-3">
                          <div className="font-bold">Tổng tiền</div>
                          <div className="font-bold">{convertCurrency(order.total)}</div>
                        </div>
                        <div className="flex justify-between	mt-2 mb-3">
                          <div className="">Triết khấu</div>
                          <div className="flex">
                            <div>{convertCurrency(order.discount)}</div>
                          </div>
                        </div>
                        <div className="flex justify-between mt-2 mb-3">
                          <div className="">Giảm giá</div>
                          <div className="flex">
                            <div>{convertCurrency(order.salesoff)}</div>
                          </div>
                        </div>
                      </div>
                      <div className="border-0.5 p-1">
                        <div className="flex justify-between bg-cbs-form-input-bg">
                          <div className="font-bold">Thanh toán</div>
                          <div className="font-bold text-primary">{convertCurrency(order.amount)}</div>
                        </div>
                      </div>
                      {/* <div className="text-right" style={{ marginTop: "100px" }}>
                        <button type="submit" className="btn btn-primary ml-auto" disabled={isUploading}>Xác nhận</button>
                      </div> */}
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