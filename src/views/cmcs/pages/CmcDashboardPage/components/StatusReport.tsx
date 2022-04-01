import { FC } from "react";

import CommentIcon from "assets/images/icons8-comments.svg";
import { Contract } from "typings/cmcs";
import { Popover } from "shareComponents/common";

type Props = {
  listContracts: Array<Contract>
}

const StatusReport: FC<Props> = ({ listContracts }) => {
  return (
    <div className="bg-primary-light h-full">
      <div className="flex pl-6 pr-2 py-4 justify-between items-center">
        <p className="font-bold text-lg text-primary-gray">Tình trạng</p>

        <div className="flex text-primary-gray text-xs">
          <div className="flex items-center mr-4">
            <div className="w-[10px] h-[10px] bg-cbs-secondary mr-1" />
            <span>Giá trị ký</span>
          </div>
          <div className="flex items-center mr-4">
            <div className="w-[10px] h-[10px] bg-cbs-failed mr-1" />
            <span>Nghiệm thu</span>
          </div>
          <div className="flex items-center mr-4">
            <div className="w-[10px] h-[10px] bg-cbs-completed mr-1" />
            <span>Tiền về (tỷ VND)</span>
          </div>
        </div>
      </div>

      <div className="px-4 bg-primary-light">

        {listContracts.length ? listContracts.map((contract: Contract) => (
          <div className="border-b -mt-1 py-3" key={contract._id}>
            <div className="flex justify-between">
              <div className="max-w-[240px]">
                {/* <p className="text-2-line-clamp">{contract.project?.sign}.{contract.name}</p> */}
                {/* <Popover tooltip={`${contract.project?.sign}.${contract.name}`} > */}
                <Popover onMouseEnterTooltip={false} tooltip={`${contract.project?.sign}.${contract.name}`} classTooltip="w-[240px] whitespace-normal" >
                  <p className="text-2-line-clamp">{contract.project?.sign}.{contract.name}</p>
                </Popover>
              </div>

              <div className="flex w-[165px] justify-between">
                <div className="flex items-baseline">
                  <div className="h-2 w-2 rounded-full bg-cbs-secondary mr-1" />
                  <span className="text-xs text-primary-gray">100,00</span>
                </div>
                <div className="flex items-baseline">
                  <div className="h-2 w-2 rounded-full bg-cbs-failed mr-1" />
                  <span className="text-xs text-primary-gray">37,50</span>
                </div>
                <div className="flex items-baseline">
                  <div className="h-2 w-2 rounded-full bg-cbs-completed mr-1" />
                  <span className="text-xs text-primary-gray">25,00</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="empty w-[65px]"></div>
              <div>
                <div className="flex justify-between w-[180px] min-w-[124px]">
                  <span className="text-xs text-primary-gray">2020</span>
                  <div className="flex">
                    <div>
                      <span className="text-green-success">2</span>
                      <span>/8</span>
                    </div>
                    <span className="text-primary-gray">&nbsp;(27%)</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="min-w-[124px] h-[5px] border border-primary-border" />
                  <div className="absolute w-[30px] h-[5px] bg-primary-gray top-0" />
                </div>
              </div>

              <div className="flex items-center justify-around py-2 w-[165px] bg-cbs-table-header">
                <div>
                  <span className="text-primary">25/12/21</span>
                  <span>&nbsp;(12,6)</span>
                </div>
                <div className="flex">
                  <img src={CommentIcon} alt="Comment" />
                  <span className="text-xs ml-1 text-primary-gray">12</span>
                </div>
              </div>
            </div>
          </div>
        )) : ''}

        {/* <div className="border-b mt-1">
          <div className="flex justify-between">
            <div className="max-w-[240px]">
              <p>MAR.HAR.Tư vấn Quản lý dự án và nền tảng Trixgo</p>
            </div>

            <div className="flex w-[165px] justify-between">
              <div className="flex items-baseline">
                <div className="h-2 w-2 rounded-full bg-cbs-secondary mr-1" />
                <span className="text-xs text-primary-gray">100,00</span>
              </div>
              <div className="flex items-baseline">
                <div className="h-2 w-2 rounded-full bg-cbs-failed mr-1" />
                <span className="text-xs text-primary-gray">37,50</span>
              </div>
              <div className="flex items-baseline">
                <div className="h-2 w-2 rounded-full bg-cbs-completed mr-1" />
                <span className="text-xs text-primary-gray">25,00</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <div className="flex justify-between max-w-[240px]">
                <span className="text-xs text-primary-gray">2020</span>
                <div className="flex">
                  <div>
                    <span className="text-green-success">2</span>
                    <span>/8</span>
                  </div>
                  <span className="text-primary-gray">&nbsp;(27%)</span>
                </div>
              </div>
              <div className="relative">
                <div className="w-[240px] h-[5px] border border-primary-border" />
                <div className="absolute w-[60px] h-[5px] bg-primary-gray top-0" />
              </div>
            </div>

            <div className="flex items-center justify-around py-2 w-[165px] bg-cbs-table-header">
              <div>
                <span className="text-primary">25/12/21</span>
                <span>&nbsp;(12,6)</span>
              </div>
              <div className="flex">
                <img src={CommentIcon} alt="Comment" />
                <span className="text-xs ml-1 text-primary-gray">12</span>
              </div>
            </div>
          </div>
        </div> */}

        <p className="text-primary ml-2 mt-1">Xem tất cả</p>
      </div>
    </div >
  );
};

export default StatusReport;
