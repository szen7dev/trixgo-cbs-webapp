import moment from "moment";
import React, {FC, useState, useEffect } from "react";
import { CONTRACT_COME_IN_STATUS } from "apis/localdb/index";
import { useListDocument } from "services/hooks/document/useDocument";
import { Link } from "react-router-dom";
import { formatNumberMoney } from "utils/cmcs"

interface Props {
    contractInfo: any
    // contractInfo: {
    //     _id: string,
    //     name: string,
    //     sign: string,
    //     date: any,
    //     project: {
    //         _id: string,
    //         name: string,
    //     },
    //     buyerBank?: string,
    //     buyerInfo?:  {
    //         _id: string,
    //         name: string,
    //     },
    //     sellerInfo?: {
    //         _id: string,
    //         name: string,
    //     },
    //     sellerBank?: string,
    //     status?: number,
    //     expiredAg?: any,
    //     expiredCg?:any,
    //     contractValue?: number,
    //     contractVatValue?: number,
    //     contractPlus?: number,
    //     contractVatPlus?: number,
    //     contractProduce?: number,
    //     contractVatProduce?: number,
    //     contractAcceptance?: number,
    //     contractVatAcceptance?: number,
    //     contractPlusAcceptance?: number,
    //     contractVatPlusAcceptance?: number,
    //     contractAmountPaid?: number,
    //     contractRemainingPayment?: number,
    //     finalValue?: number,
    // }
};

export const ProjectBudgetDetailTab1:FC<Props> = ({ contractInfo }) => {
    const [paramsSearch, setParamsSearch] = useState({});
    useEffect(() => {
        setParamsSearch({
            contractID: contractInfo?._id,
            limit: "20",
        })
    }, [contractInfo]);

    const { listDocument, isLoading, totalRecord, totalPage, nextCursor } = useListDocument({
        params: paramsSearch,
        isFetchList: true
    }); 

    // console.log({ contractInfo })
    // console.log({ listDocument })

    return (
        <div className={"mt-4 mb-6"}>
            <div className={"px-4 mb-2 text-lg text-primary-gray"}>
                Thông tin chung
            </div>
            <table className={"table-fixed border-collapse w-full"}>
                <tbody>
                <tr>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Hợp đồng
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        {contractInfo?.name}
                    </td>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Thuộc dự án
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        { contractInfo?.project?.name}
                    </td>
                </tr>
                <tr>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Số hiệu/Ngày ký
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        {contractInfo?.sign} ngày {moment(contractInfo?.date).format("L")}
                    </td>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Trạng thái
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        {CONTRACT_COME_IN_STATUS[contractInfo?.status - 1]?.text}
                    </td>
                </tr>
                <tr>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Thông tin người mua/Tài khoản
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        {contractInfo?.buyerInfo?.name}{contractInfo?.buyerBank}
                    </td>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Bảo lãnh tạm ứng
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        Thời hạn {moment(contractInfo?.expiredAg).format("L")}
                    </td>
                </tr>
                <tr>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Thông tin người bán/Tài khoản
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                       {contractInfo?.buyerInfo?.name}{contractInfo?.sellerBank}
                    </td>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Bảo lãnh thực hiện hợp đồng
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        Thời hạn {moment(contractInfo?.expiredCg).format("L")}
                    </td>
                </tr>
                </tbody>
            </table>

            <div className={"px-4 mb-2 mt-4 text-lg text-primary-gray"}>
                Giá trị ký, sản lượng, nghiệm thu, thanh toán
            </div>
            <table className={"table-fixed border-collapse w-1/2"}>
                <tbody>
                <tr>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Giá trị ký
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        {formatNumberMoney(contractInfo?.value+contractInfo?.vatValue+contractInfo?.plus+contractInfo?.vatPlus)}
                    </td>
                </tr>
                <tr>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Sản lượng
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        {formatNumberMoney(contractInfo?.produce+contractInfo?.plusProduce)}
                    </td>
                </tr>
                <tr>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Nghiệm thu hoàn thành
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        { formatNumberMoney(contractInfo?.acceptance + contractInfo?.vatAcceptance + contractInfo?.plusAcceptance + contractInfo?.vatPlusAcceptance) }
                    </td>
                </tr>
                <tr>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Thanh toán
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        {formatNumberMoney(contractInfo?.advancePaymentPaid+contractInfo?.amountPaid)}
                    </td>
                </tr>
                <tr>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Còn lại chưa thanh toán
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        {formatNumberMoney(contractInfo?.remainingPayment)}
                    </td>
                </tr>
                <tr>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Ngày ký
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        {moment(contractInfo?.date).format("L")}
                    </td>
                </tr>
                <tr>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Giá trị quyết toán
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        {contractInfo?.finalValue}
                    </td>
                </tr>
                </tbody>
            </table>

            {/* <div className={"px-4 mb-2 mt-4 text-lg text-primary-gray"}>
                Hồ sơ đính kèm
            </div> */}

            <table className={"table-fixed border-collapse w-full"}>
                <tbody>
                {listDocument.map((document, i) => (
                    <tr key={i}>
                        <td className={"w-4/12 border-b-0.5 border-primary-border px-4 py-2"}>
                            <p>
                                <Link to={`/pm/project/${document?.project}/document/${document?._id}`}>
                                    {document?.name}
                                </Link>
                            </p>
                            <p className={"text-xs text-primary-gray mt-1"}>{document?.author?.fullname}-{moment(document?.createAt).format("L")}</p>
                        </td>
                        <td className={"w-3/12 border-b-0.5 border-primary-border px-4 py-2"}>
                           {document?.sign}
                        </td>
                        <td className={"w-1/12 border-b-0.5 border-primary-border px-4 py-2"}>
                            {moment(document?.date).format("L")}
                        </td>
                        <td className={"w-2/12 border-b-0.5 border-primary-border px-4 py-2"}>
                            {document?.storage?.name}
                        </td>
                        <td className={"w-2/12 border-b-0.5 border-primary-border px-4 py-2"}>
                            {document?.note}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    )
}