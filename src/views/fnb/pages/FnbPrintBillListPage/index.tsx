import { FC, useEffect, useRef, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import classNames from "classnames";
import moment from "moment";
import { toast } from "react-toastify";

/**
 * Assets, Components
 */
import styles from "../../styles/fnb_print.module.css";
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

if (isLoadingInfo) return <Loader className="border-primary" />;

  return (
    <div className="bg-cbs-gray">
      <div className="h-full">
        <div className="bg-white mx-auto shadow-cbs-md" style={{ width: "50mm", height: "30mm" }}>
            <div
                ref={componentRef}
                className="print_area space-y-5 border-separate"
                style={{ width: "50mm", height: "30mm" }}
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
                            <table
                              key={index}
                            >
                                <tbody>
                                      {
                                      quantity.map((e) => {
                                          return (
                                            <tr key={`${e}.${item._id}`}>
                                              <td>
                                                  <div className="font-bold">
                                                  <Link to={`/fnb/home`}>
                                                      {info?.funda?.name} ({e}/{Number(item.quantity)})
                                                  </Link>
                                                </div>
                                                <div>
                                                  <p>{item.product?.name} - Size {item.product?.size >= 1 && FNB_SIZE[Number(item.product.size) - 1].text}</p>
                                                  <p><i>Đường {FNB_SUGAR[Number(item.sugar)-1].text}, Đá {FNB_ICE[Number(item.ice)-1].text}, {item?.note}, {str}</i></p>
                                                </div>
                                              </td>
                                            </tr>
                                          )
                                      })
                                    }
                                </tbody>
                            </table>
                        )
                    })
                  }
              </div> : <div />
        </div>
      </div>
    </div>
  );
};

export default FnbPrintBillListPage;