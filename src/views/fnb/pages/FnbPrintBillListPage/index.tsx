import { FC, useEffect, useRef, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import classNames from "classnames";
import moment from "moment";
import { toast } from "react-toastify";

/**
 * Assets, Components
 */
// import styles from "../../styles/fnb_print.module.css";
import { Loader } from "shareComponents/common";

/**
 * Utils
 */

/**
 * Hooks, Types
 */
import { useFnbOrder } from 'services/hooks/fnb/useFnbOrder';
import { formatNumberMoney, convertCurrency } from "utils/converter";
import API from "apis/repository";
import { convertObToUrl } from "utils";
import usePrintComponent from "services/hooks/ppt/usePrintComponent";

import { FNB_CHANNEL, FNB_SERVICE, FNB_PAYMENT, FNB_ORDER_STATUS, FNB_SIZE, FNB_SUGAR, FNB_ICE } from "apis/localdb";

const FnbPrintBillListPage: FC = () => {
  const { orderID } = useParams<{ orderID: string }>()
  const [orderProducts, setOrderProducts] = useState([]);

  const { info, refetch, isLoadingInfo } = useFnbOrder(
    {
        params: {
            orderID,
            populates: JSON.stringify({
                path: 'funda shift customer userCreate',
                select: "name sign address fullname phone bankAccount",
            })
        },
        isFetchList: false,
        isFetchInfo: true
    }
)

useEffect(() => {
    const fetchOrderProducts = async () => {
        const response = await API.get(
            `/api/fnb/order_products?${convertObToUrl({
                orderID,
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

        setOrderProducts(data.listRecords)
    }

    fetchOrderProducts();
}, [])

useEffect(() => {
  if (isLoadingInfo) return;
  document.title = `Trixgo | FnB`;
}, [info]);
const componentRef = useRef(null);
usePrintComponent({ ref: componentRef });
// console.log(orderProducts)

useEffect(() => {
  if (orderProducts && orderProducts.length) {
      setTimeout(function(){
          window.print();
      },1000);
  }
}, [orderProducts]);

if (isLoadingInfo) return <Loader className="border-primary" />;

  return (
    <div className="bg-cbs-gray">
      <div className="h-full">
        <div className="bg-white mx-auto shadow-cbs-md" style={{ width: "50mm"}}>
            <div
                ref={componentRef}
                className="print_area border-separate"
                
            >
                <style type="text/css" media="print">
                  {`
                      @media print { 
                          table { page-break-inside:auto }
                          thead { display:table-header-group; }
                          tfoot { display:table-footer-group; }

                          .print_area{
                              page-break-after:always;
                          }
                      }
                  `}
                </style>
                <Link to={`/fnb/home`}>
                  {
                      orderProducts.map((item: any, index: number) => {
                          // let amount = Number(item.quantity * item.unitPrice)
                          let amount = Number(item.unitPrice)

                          let str = ""

                          if (item?.subProducts) {
                              for (const subProduct of item?.subProducts) {
                                  amount = Number(amount) + Number(subProduct.unitPrice)
                                  str = str + subProduct.name
                              }
                          }

                          const quantity = [];
                          for (let i = 1; i <= Number(item.quantity); i++) {
                              quantity.push(i);
                          }

                          return (
                              <div
                                key={index}
                                className =""
                                // style={{ height: "30mm", width: "100%" }}
                              >
                                  {
                                        quantity.map((e) => {
                                            return (
                                             <table key={`${e}.${item._id}`} style={{ height: "30mm", width: "100%" }}>
                                                <tbody>
                                                  <tr>
                                                    <td className="text-xs px-2">
                                                        <div className="font-bold">
                                                        {info?.funda?.name} ({e}/{Number(item.quantity)})
                                                      </div>
                                                      <div className="mb-2">
                                                        <p className="font-bold">{item.product?.name} - Size {item.size >= 1 && FNB_SIZE[Number(item.size) - 1].text}</p>
                                                        <p><i>Đường {FNB_SUGAR[Number(item.sugar)-1].text}, Đá {FNB_ICE[Number(item.ice)-1].text}, {item?.note}, {str}</i></p>
                                                      </div>
                                                      <div className="flex justify-between">
                                                          <div>{moment(info?.createAt).format('HH:mm DD/MM/YYYY')}</div>
                                                          <div className="font-bold">{formatNumberMoney(amount)}đ</div>
                                                      </div>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                             </table>
                                            )
                                        })
                                      }
                              </div>

                          )
                      })
                    }                            
                </Link>
              </div>
        </div>
      </div>
    </div>
  );
};

export default FnbPrintBillListPage;