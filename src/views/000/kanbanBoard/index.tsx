import { FC } from "react";

import KanbanBoardItem from "./KanbanBoardItem";

import iconFilter from "assets/images/icons8-filter-96.png";

const KanbanBoard: FC = () => {
  return (
    <div className="t-kanban t-scrollbar-horizontal w-full h-full overflow-auto">
      <div className="t-kanban-container flex border-t border-solid border-primary-border">
        {/* kanban board column */}
        <div className="t-kanban-col w-1/6 border-l border-solid border-primary-border">
          {/* kanban board item - header */}
          <div className="t-kanban-col-header border-b border-solid border-primary-border pl-3 pr-3 pb-3 pt-2">
            <div className="t-kanban-col-header-title flex justify-between">
              <span className="text-lg font-bold block">Bước 1: Gặp gỡ khách hàng</span>
              <button className="relative w-6 h-6 bg-lighter-gray hover:bg-secondary-light transition duration-150 rounded focus:outline-none ml-1 text-center">
                <img src={iconFilter} alt="Filter" className="w-4 h-4 object-contain inline-block" />
              </button>
            </div>
            <div className="t-kanban-col-header-progress flex overflow-hidden">
              <div className="t-kanban-col-header-progress-red" style={{ width: "20%" }}>20</div>
              <div className="t-kanban-col-header-progress-orange" style={{ width: "60%" }}>20</div>
              <div className="t-kanban-col-header-progress-green" style={{ width: "20%" }}>20</div>
            </div>
          </div>
          {/* kanban board item messageList */}
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Biên soạn HĐ Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị. Ưu tiên triển khai sớm..." 
            author="Hương-PGI" 
            expiredDate="Tới hạn trong 2 ngày" 
            expireType="incoming"
          />
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Quá hạn 6 ngày" 
            expireType="expired"
          />
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Biên soạn HĐ Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Tới hạn trong 2 ngày" 
            expireType="incoming"
          />
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Tới hạn trong 12 ngày" 
            expireType="good"
          />
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Biên soạn HĐ Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Tới hạn trong 2 ngày" 
            expireType="incoming"
          />
          <div className="t-kanban-item-view-more text-center border-b border-solid border-primary-border pl-3 pr-3 pb-10 pt-4">
            <button className="text-primary font-bold">Xem thêm</button>
          </div>
        </div>
        {/* kanban board column */}
        <div className="t-kanban-col w-1/6 border-l border-solid border-primary-border">
          {/* kanban board item - header */}
          <div className="t-kanban-col-header border-b border-solid border-primary-border pl-3 pr-3 pb-3 pt-2">
            <div className="t-kanban-col-header-title flex justify-between">
              <span className="text-lg font-bold block">Bước 2: Tư vấn cho khách hàng</span>
              <button className="relative w-6 h-6 bg-lighter-gray hover:bg-secondary-light transition duration-150 rounded focus:outline-none ml-1 text-center">
                <img src={iconFilter} alt="Filter" className="w-4 h-4 object-contain inline-block" />
              </button>
            </div>
            <div className="t-kanban-col-header-progress flex overflow-hidden">
              <div className="t-kanban-col-header-progress-red" style={{ width: "20%" }}>20</div>
              <div className="t-kanban-col-header-progress-orange" style={{ width: "60%" }}>20</div>
              <div className="t-kanban-col-header-progress-green" style={{ width: "20%" }}>20</div>
            </div>
          </div>
          {/* kanban board item messageList */}
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị. Ưu tiên triển khai sớm..." 
            author="Hương-PGI" 
            expiredDate="Quá hạn 6 ngày" 
            expireType="expired"
          />
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Biên soạn HĐ Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Tới hạn trong 2 ngày" 
            expireType="incoming"
          />
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Biên soạn HĐ Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Tới hạn trong 2 ngày" 
            expireType="incoming"
          />
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Tới hạn trong 12 ngày" 
            expireType="good"
          />
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Biên soạn HĐ Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Tới hạn trong 2 ngày" 
            expireType="incoming"
          />
          <div className="t-kanban-item-view-more text-center border-b border-solid border-primary-border pl-3 pr-3 pb-10 pt-4">
            <button className="text-primary font-bold">Xem thêm</button>
          </div>
        </div>
        {/* kanban board column */}
        <div className="t-kanban-col w-1/6 border-l border-solid border-primary-border">
          {/* kanban board item - header */}
          <div className="t-kanban-col-header border-b border-solid border-primary-border pl-3 pr-3 pb-3 pt-2">
            <div className="t-kanban-col-header-title flex justify-between">
              <span className="text-lg font-bold block">Bước 3: Báo khách hàng đặt cọc</span>
              <button className="relative w-6 h-6 bg-lighter-gray hover:bg-secondary-light transition duration-150 rounded focus:outline-none ml-1 text-center">
                <img src={iconFilter} alt="Filter" className="w-4 h-4 object-contain inline-block" />
              </button>
            </div>
            <div className="t-kanban-col-header-progress flex overflow-hidden">
              <div className="t-kanban-col-header-progress-red" style={{ width: "20%" }}>20</div>
              <div className="t-kanban-col-header-progress-orange" style={{ width: "60%" }}>20</div>
              <div className="t-kanban-col-header-progress-green" style={{ width: "20%" }}>20</div>
            </div>
          </div>
          {/* kanban board item messageList */}
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Biên soạn HĐ Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Tới hạn trong 2 ngày" 
            expireType="incoming"
          />
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Biên soạn HĐ Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Tới hạn trong 2 ngày" 
            expireType="incoming"
          />
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Quá hạn 6 ngày" 
            expireType="expired"
          />
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Tới hạn trong 12 ngày" 
            expireType="good"
          />
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Biên soạn HĐ Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Tới hạn trong 2 ngày" 
            expireType="incoming"
          />
          <div className="t-kanban-item-view-more text-center border-b border-solid border-primary-border pl-3 pr-3 pb-10 pt-4">
            <button className="text-primary font-bold">Xem thêm</button>
          </div>
        </div>
        {/* kanban board column */}
        <div className="t-kanban-col w-1/6 border-l border-solid border-primary-border">
          {/* kanban board item - header */}
          <div className="t-kanban-col-header border-b border-solid border-primary-border pl-3 pr-3 pb-3 pt-2">
            <div className="t-kanban-col-header-title flex justify-between">
              <span className="text-lg font-bold block">Bước 4: Tổ chức ký kết hợp đồng</span>
              <button className="relative w-6 h-6 bg-lighter-gray hover:bg-secondary-light transition duration-150 rounded focus:outline-none ml-1 text-center">
                <img src={iconFilter} alt="Filter" className="w-4 h-4 object-contain inline-block" />
              </button>
            </div>
            <div className="t-kanban-col-header-progress flex overflow-hidden">
              <div className="t-kanban-col-header-progress-red" style={{ width: "20%" }}>20</div>
              <div className="t-kanban-col-header-progress-orange" style={{ width: "60%" }}>20</div>
              <div className="t-kanban-col-header-progress-green" style={{ width: "20%" }}>20</div>
            </div>
          </div>
          {/* kanban board item messageList */}
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Biên soạn HĐ Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Tới hạn trong 2 ngày" 
            expireType="incoming"
          />
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Quá hạn 6 ngày" 
            expireType="expired"
          />
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Biên soạn HĐ Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Tới hạn trong 2 ngày" 
            expireType="incoming"
          />
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Tới hạn trong 12 ngày" 
            expireType="good"
          />
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Biên soạn HĐ Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Tới hạn trong 2 ngày" 
            expireType="incoming"
          />
          <div className="t-kanban-item-view-more text-center border-b border-solid border-primary-border pl-3 pr-3 pb-10 pt-4">
            <button className="text-primary font-bold">Xem thêm</button>
          </div>
        </div>
        {/* kanban board column */}
        <div className="t-kanban-col w-1/6 border-l border-solid border-primary-border">
          {/* kanban board item - header */}
          <div className="t-kanban-col-header border-b border-solid border-primary-border pl-3 pr-3 pb-3 pt-2">
            <div className="t-kanban-col-header-title flex justify-between">
              <span className="text-lg font-bold block">Bước 5: Lưu trữ hồ sơ văn bản lên hệ thống Trixgo</span>
              <button className="relative w-6 h-6 bg-lighter-gray hover:bg-secondary-light transition duration-150 rounded focus:outline-none ml-1 text-center">
                <img src={iconFilter} alt="Filter" className="w-4 h-4 object-contain inline-block" />
              </button>
            </div>
            <div className="t-kanban-col-header-progress flex overflow-hidden">
              <div className="t-kanban-col-header-progress-red" style={{ width: "20%" }}>20</div>
              <div className="t-kanban-col-header-progress-orange" style={{ width: "60%" }}>20</div>
              <div className="t-kanban-col-header-progress-green" style={{ width: "20%" }}>20</div>
            </div>
          </div>
          {/* kanban board item messageList */}
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Biên soạn HĐ Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Tới hạn trong 2 ngày" 
            expireType="incoming"
          />
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Quá hạn 6 ngày" 
            expireType="expired"
          />
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Biên soạn HĐ Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Tới hạn trong 2 ngày" 
            expireType="incoming"
          />
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Tới hạn trong 12 ngày" 
            expireType="good"
          />
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Biên soạn HĐ Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Tới hạn trong 2 ngày" 
            expireType="incoming"
          />
          <div className="t-kanban-item-view-more text-center border-b border-solid border-primary-border pl-3 pr-3 pb-10 pt-4">
            <button className="text-primary font-bold">Xem thêm</button>
          </div>
        </div>
        {/* kanban board column */}
        <div className="t-kanban-col w-1/6 border-l border-solid border-primary-border">
          {/* kanban board item - header */}
          <div className="t-kanban-col-header t-kanban-col-header-complete border-b border-solid border-primary-border pl-3 pr-3 pb-3 pt-2">
            <div className="t-kanban-col-header-title flex justify-between">
              <span className="text-lg font-bold block">Việc đã hoàn thành</span>
              <button className="relative w-6 h-6 bg-lighter-gray hover:bg-secondary-light transition duration-150 rounded focus:outline-none ml-1 text-center">
                <img src={iconFilter} alt="Filter" className="w-4 h-4 object-contain inline-block" />
              </button>
            </div>
            <p className="mt-3 text-primary">Tổng số: 138 công việc</p>
          </div>
          {/* kanban board item messageList */}
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Biên soạn HĐ Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Cách đây 6 ngày" 
            expireType="success"
          />
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Cách đây 6 ngày" 
            expireType="success"
          />
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Biên soạn HĐ Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Cách đây 6 ngày" 
            expireType="success"
          />
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Cách đây 6 ngày" 
            expireType="success"
          />
          <KanbanBoardItem
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            title="Biên soạn HĐ Tư vấn giám sát thi công xây dựng và lắp đặt thiết bị" 
            description="CHG.THT | Ưu tiên triển khai sớm các hợp đồng tư vấn để đẩy nhanh công tác chuẩn bị..." 
            author="Hương-PGI" 
            expiredDate="Cách đây 6 ngày" 
            expireType="success"
          />
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
