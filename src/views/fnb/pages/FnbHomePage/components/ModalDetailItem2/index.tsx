/**
 * Libraries
 */
import { FC, UIEvent, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import moment from "moment";
import debounce from "lodash/debounce";

/**
 * Hooks, Typings
 */
import { useModal } from "services/hooks/useModal";
import { FNB_CHANNEL, FNB_PAYMENT, FNB_SERVICE, FNB_SIZE } from "apis/localdb";
import API from "apis/repository";
import { convertObToUrl } from "utils";
import { formatNumberMoney } from 'utils/converter';

/**
 * Components, Assets
 */
import Close from "assets/icons/Close";
import beverageIcon from "assets/images/icons8-beverage.png";
import IconGreenDot from "assets/images/Frame 4330.svg";
import { ModalErrorDetailItem } from "../ModalErrorDetailItem";
import { DropdownSearchable } from "shareComponents/common";
import { useQueryContact, useContact } from 'services/hooks/items/useContact';

type Props = {
  order: any;
  onUpdate?: () => void;
}

// Hàm tính giá sản phẩm, topping
export const getProdPrice = (size: any, salesChannel: any, prod: any) => {
  // console.log({size, salesChannel, prod })
    // M-Off
    if(Number(size) == 1 && Number(salesChannel) == 1){
      return prod.unitPrice
    }

    // M-App
    if(Number(size) == 1 && Number(salesChannel) != 1){
      return prod.unitPrice2
    }

    // L-Off
    if(Number(size) == 2 && Number(salesChannel) == 1){
      return prod.unitPrice3
    }

    // L-App
    if(Number(size) == 2 && Number(salesChannel) != 1){
      // console.log(prod.unitPrice4)
      return prod.unitPrice4
    }
}
// console.log(getProdPrice)

export const ModalDetailItem2: FC<Props> = ({ order, onUpdate }) => {
  const { openModal, closeModal } = useModal();
  const [orderProducts, setOrderProducts] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [mistakeDoctypes, setMistakeDocTypes] = useState([]);

  const [keywordMistakeDoctypes, setKeywordMistakeDocTypes] = useState('');
  const [keywordCustomerSearch, setKeywordCustomerSearch] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: order.customer?.name,
    phone: order.customer?.phone,
    numberOfOrders: order.customer?.numberOfOrders,
  });

  const { fetchNextPageContact, hasNextPage, listContact: listCustomers } = useQueryContact({
    keyword: keywordCustomerSearch,
    type: 1,
  });

  const { list: contacts } = useContact({
    params: { keyword: keywordCustomerSearch },
    isFetchList: true,
  })

  useEffect(() => {
    const fetchOrderProducts = async () => {
    const response = await API.get(
        `/api/fnb/order_goods?${convertObToUrl({
        orderID: order._id,
        populates: JSON.stringify({
            path: 'goods subGoods',
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
            path: 'mistake executor',
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

  const handleScrollCustomer = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop === clientHeight;

    if (bottom && hasNextPage) {
      fetchNextPageContact();
    }
  };

  const handleUpdateCustomer = async (value: any) => {
    const [customerID, phone, numberOfOrders] = value.value?.split?.('__');

    if(!customerID) return;

    try {
      const { data, status } = await API.put(
        `/api/fnb/orders`,
        {
          orderID: order._id,
          customerID,
        }
      );

      if (status !== 200 || data?.error) return toast.warning('Cập nhật khách hàng thất bại');

      onUpdate?.();
      setCustomerInfo({
        name: value.text,
        phone,
        numberOfOrders: numberOfOrders === 'undefined' ? 0 : numberOfOrders,
      });
      toast.success('Cập nhật khách hàng thành công');
    } catch(error: any) {
      toast.error(error.message);
    }
  }

  const handleUpdateNote = debounce(async (e: any) => {
    const value = e.target.value;
    try {
      const { data, status } = await API.put(
        `/api/fnb/orders`,
        {
          orderID: order._id,
          cancelNote: value,
        }
      )
      if (status !== 200 || data?.error) return toast.warning('Cập nhật ghi chú thất bại');
    } catch(error: any) {
      toast.error(error.message);
    }
  }, 300)

  const handleUpdate1 = debounce(async (e: any) => {
    const value = e.target.value;
    try {
      const { data, status } = await API.put(
        `/api/fnb/orders`,
        {
          orderID: order._id,
          shippingFeeTotal: value,
        }
      )
      if (status !== 200 || data?.error) return toast.warning('Cập nhật Tổng phí ship bại');
    } catch(error: any) {
      toast.error(error.message);
    }
  }, 300)

  const handleUpdate2 = debounce(async (e: any) => {
    const value = e.target.value;
    try {
      const { data, status } = await API.put(
        `/api/fnb/orders`,
        {
          orderID: order._id,
          shippingFee: value,
        }
      )
      if (status !== 200 || data?.error) return toast.warning('Cập nhật Phí ship thất bại');
    } catch(error: any) {
      toast.error(error.message);
    }
  }, 300)

  const handleUpdate3 = debounce(async (e: any) => {
    const value = e.target.value;
    try {
      const { data, status } = await API.put(
        `/api/fnb/orders`,
        {
          orderID: order._id,
          paid: value,
        }
      )
      if (status !== 200 || data?.error) return toast.warning('Cập nhật giá trị khách trả thất bại');
    } catch(error: any) {
      toast.error(error.message);
    }
  }, 300)

  if (!order) return <></>;

  return (
    <>
      <div className={"flex flex-col"}>
        <div className={"flex w-full py-3 px-6 border-b"}>
          <h4 className={"flex-1 text-lg font-bold text-left"}>Thông tin đơn hàng New</h4>
          <div className={"flex items-center justify-center cursor-pointer"}>
            <Close onClick={closeModal} />
          </div>
        </div>
        <Formik
          initialValues={{}}
          onSubmit={() => Promise.resolve('Done!')}
        >
          {(formik) => {
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
                              <span>{order.name} - </span>
                              <span className="text-gray-500 pr-1"> Mã hiệu: </span>
                              <span><span className="text-cbs-primary">{order.sign}</span></span>
                            </div>
                          </div>
                        </div>
                        <div className={"flex py-2"}>
                          <div className={"w-full flex items-center"}>
                            <img src={IconGreenDot} alt="" />
                            <div>
                              <div className={"h-full text-left flex items-center px-1 border-r-0.5 border-black"}>
                                <span className="text-gray-500 pr-1">Cơ sở: </span>
                                <span>{order?.funda?.sign}.{order.funda?.name}</span>
                              </div>
                            </div>
                            <div>
                              <div className={"h-full text-left flex items-center px-1 border-r-0.5 border-black"}>
                                <span className="text-gray-500 pr-1">Ca làm: </span>
                                <span>{order.shift?.name}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={"flex py-2"}>
                          <div className={"w-full flex items-center"}>
                            <img src={IconGreenDot} alt="" />
                            <div>
                              <div className={"h-full text-left flex items-center px-1"}>
                                <span className="text-gray-500 pr-1">Người tạo: </span>
                                <span>{order.userCreate?.fullname} | <span className="text-cbs-primary">{moment(order.createAt).format('HH:mm DD/MM/YYYY')} ({moment(order.createAt).fromNow()})</span></span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={"flex py-2"}>
                          <div className={"w-full flex items-center"}>
                            <img src={IconGreenDot} alt="" />
                            <div className={"h-full text-left flex items-center px-1 "}>
                              <span className="text-gray-500 pr-1">Nhân sự ca làm: </span>
                              <span>
                                  {order.assignee?.map?.((staff: any) => (
                                     <span key={staff._id} className="text-cbs-primary">
                                      {staff?.fullname}, 
                                    </span>
                                  ))}
                                <span className="text-cbs-primary"></span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className={"flex py-2"}>
                          <div className={"w-full flex items-center"}>
                            <img src={IconGreenDot} alt="" />
                            <div className={"h-full text-left flex items-center px-1 "}>
                              <span className="text-gray-500 pr-1">Mã đơn trên App: </span>
                              <span>{FNB_CHANNEL[Number(order?.salesChannel)-1]?.sign}{order?.appOrderSign}</span>
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
                              <span>{customerInfo?.phone} - {customerInfo?.name} <span className="text-cbs-fnb-bg">(đã mua {customerInfo?.numberOfOrders ?? 0} lần)</span></span>
                            </div>
                          </div>
                          {/* Khách: 0988115998 - Nguyễn Văn A (đã mua 68 lần) */}
                          <div className={" w-full h-full"} style={{ maxWidth: "30%" }}>
                            <DropdownSearchable
                              onchangeValue={handleUpdateCustomer}
                              onSearchInputChange={
                                  debounce(
                                      (value) => setKeywordCustomerSearch(value),
                                      200)
                              }
                              onScroll={handleScrollCustomer}
                              className={"max-w-full h-full flex-1 border-0.5 border-cbs-bg-input-search bg-cbs-bg-input-search placeholder-primary-gray rounded-md"}
                              placeholder="Tìm kiếm khách hàng"
                              isMultiple={false}
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
                          </div>
                        </div>
                        <div className={"flex py-2"}>
                          <div className={"w-full items-center"}>
                            <img src={IconGreenDot} alt="" />
                            <div className={"h-full text-left flex items-center px-1"}>
                              <span className="text-gray-500 pr-1">Ghi chú: </span>
                              <textarea rows={2} onKeyUp={handleUpdateNote} className="resize block text-sm text-gray-900 bg-gray-50 rounded-lg p-2 w-full" placeholder="Viết ghi chú tại đây...">{order.note}</textarea>
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
                                  <button key={m._id} className="cursor-pointer rounded-md bg-cbs-active-comment px-4 py-1">
                                    <p className="text-left text-[14px] my-1">{m.mistake?.name}</p>
                                    <p className="text-gray-500 text-left"><i>Mắc lỗi: {m.executor?.fullname}</i></p>
                                    <p className="text-gray-500 text-left"><i>Trừ thưởng: {formatNumberMoney(m.amount)}</i></p>
                                    <p className="text-gray-500 text-left"><i>Ghi chú: {m.note}</i></p>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-cbs-primary my-2">
                          <button
                            className="text-cbs-primary"
                            onClick={() =>
                              openModal(
                                <div className=" text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block" style={{ width: "640px" }}>
                                  <ModalErrorDetailItem defaultValues={{ orderID: order._id }} />
                                </div>
                              )
                            }
                          >
                            <i>Bấm vào đây để cập nhật gán lỗi</i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="boxright w-1/2">
                      <div className=" overflow-y-auto mt-2 border-0.5">
                        {orderProducts.map((op: any) => (
                          <div key={op._id} className="flex gap-2 w-full border-b-0.5 p-2">
                            <img src={op.goods.images?.length ? `${process.env.REACT_APP_URL_S3}${op.goods?.images[op.goods?.images?.length - 1]?.path}` : beverageIcon} alt="item" className="w-[44px] h-[44px]" />
                            <div className="w-full">
                              <div className="flex justify-between">
                                <div>
                                  <p className="font-bold truncate">{op.goods?.name} - Size {FNB_SIZE[Number(op.size)-1].text}-{formatNumberMoney(getProdPrice(op.size, order.salesChannel, op.goods))}</p>
                                  <p className="text-primary-gray">{op.note}</p>
                                </div>
                                <div className="text-primary">{formatNumberMoney(op.unitPrice)}{` x `}{op.quantity}</div>
                              </div>
                              <div className="flex">
                                <div className="w-4/5 mt-3">
                                  {op.subProducts?.map?.((subProduct: any) => (
                                    <div key={subProduct._id} className="mb-2 pr-2 flex items-center">
                                      <li> {`${subProduct.name.trim()}`}: {formatNumberMoney(getProdPrice(op.size, order.salesChannel, subProduct))} </li>
                                    </div>
                                  ))}
                                </div>
                                <div className="w-2/5 flex justify-end items-end">
                                  {formatNumberMoney(op.unitPrice * op.quantity)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-l-0.5 border-r-0.5 px-2">
                        <div className="flex justify-between mt-2 mb-3 text-xl">
                          <div className="font-bold">Tổng tiền</div>
                          <div className="font-bold">{formatNumberMoney(order.total)}</div>
                        </div>
                        <div className="flex justify-between	mt-2 mb-3">
                          <div className="">Chiết khấu</div>
                          <div className="flex">
                            <div>{formatNumberMoney(order.discount)}</div>
                          </div>
                        </div>
                        <div className="flex justify-between mt-2 mb-3">
                          <div className="">Giảm giá</div>
                          <div className="flex">
                            <div>{formatNumberMoney(order.salesoff)}</div>
                          </div>
                        </div>
                        <div className="flex justify-between mt-2 mb-3">
                          <div className="">Trừ tích điểm/gói trả trước</div>
                          <div className="flex">
                            <div>{formatNumberMoney(order.credit)}</div>
                          </div>
                        </div>
                        <div className="flex justify-between mt-2 mb-3">
                          <div className="">Trừ voucher</div>
                          <div className="flex">
                            <div>{formatNumberMoney(order.offer)}</div>
                          </div>
                        </div>
                      </div>
                      <div className="border-0.5 p-1">
                        <div className="flex justify-between bg-cbs-form-input-bg text-xl">
                          <div className="font-bold">Thanh toán</div>
                          <div className="font-bold text-primary">{formatNumberMoney(order.amount)}</div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-2 mb-3">
                        <div className="">Tổng phí ship (nếu có)</div>
                        <div className="flex">
                          <textarea onKeyUp={handleUpdate1} className="text-right block text-sm text-gray-900 bg-gray-50 rounded-lg p-2 w-full h-8">{order?.shippingFeeTotal}</textarea>
                        </div>
                      </div>
                      <div className="flex justify-between mt-2 mb-3">
                        <div className="">Phí ship khách phải trả (nếu có)</div>
                        <div className="flex">
                          <textarea onKeyUp={handleUpdate2} className="text-right block text-sm text-gray-900 bg-gray-50 rounded-lg p-2 w-full h-8">{order?.shippingFee}</textarea>
                        </div>
                      </div>
                      <div className="flex justify-between mt-2 mb-3">
                        <div className="">Tiền mặt khách trả</div>
                        <div className="flex">
                          <textarea onKeyUp={handleUpdate3} className="text-right block text-sm text-gray-900 bg-gray-50 rounded-lg p-2 w-full h-8">{order?.paid}</textarea>
                        </div>
                      </div>
                      {
                          (order?.paid && order?.paid > 0 && order?.paymentMethod == 1) ?
                          <div className="flex justify-between mt-2 mb-3 font-bold"><div>Tiền thừa trả lại:</div><div>{formatNumberMoney(order?.paid - order?.amount)}</div></div>
                          : <></>
                      }
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