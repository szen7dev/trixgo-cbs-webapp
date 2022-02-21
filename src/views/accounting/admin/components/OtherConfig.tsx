import { FC, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import DropdownSearchable from "components/common/DropdownSearch";

const OtherConfig: FC = () => {
  const [fromDate, setFromDate] = useState<Date | null>(new Date());

  return (
    <main className="h-full bg-cbs-gray p-4">
      <section className="px-8 py-6 bg-primary-light mb-4">
        <p className="text-lg font-bold text-primary-gray">Khóa dữ liệu</p>

        <div className="mt-4 flex items-end gap-3">
          <div>
            <p className="text-sm mb-2">
              Chọn loại hàng hóa/thành phẩm/nguyên vật liệu
            </p>
            <DropdownSearchable
              placeholder="Tìm kiếm"
              className="w-[322px] border border-primary-border rounded"
              classNameInput="h-[36px]"
              isMultiple={false}
              allowClearValueSingleInput={false}
              showTriangle={true}
              maxWidthInput="max-w-none"
              renderSelectedItem={(item) => <span>{item.text}</span>}
              classNameItem="p-0"
              data={[
                {
                  _id: 1,
                  content: "Công ty Cổ phần PGI Partners",
                },
                {
                  _id: 2,
                  content: "Công ty Cổ phần PGI Partners",
                },
                {
                  _id: 3,
                  content: "Công ty Cổ phần PGI Partners",
                },
              ]}
              formatItem={{
                id: "_id",
                text: "content",
              }}
              inlineSearch={true}
            />
          </div>
          <div>
            <p className="text-sm mb-2"> Dữ liệu bị khóa tới trước thời điểm</p>
            <DatePicker
              selected={fromDate}
              onChange={(date: Date | null) => setFromDate(date)}
              dateFormat="dd/MM/yyyy"
              customInput={
                <input
                  type="text"
                  placeholder="	Dữ liệu bị khóa tới trước thời điểm"
                  className="w-[322px] h-[38px] px-2 border border-primary-border rounded"
                />
              }
            />
          </div>
          <button className="bg-primary text-[15px] rounded w-[105px] h-[38px] text-primary-light hover:opacity-90">
            Cập nhật
          </button>
        </div>
      </section>

      <section className="px-8 py-6 bg-primary-light mb-4">
        <p className="text-lg font-bold text-primary-gray">
          Cập nhật lại số phiếu
        </p>

        <div className="mt-4 flex items-end gap-3">
          <div>
            <p className="text-sm mb-2">Chọn đơn vị cần cập nhật</p>
            <DropdownSearchable
              placeholder="Tìm kiếm"
              className="w-[322px] border border-primary-border rounded"
              classNameInput="h-[36px]"
              isMultiple={false}
              allowClearValueSingleInput={false}
              showTriangle={true}
              maxWidthInput="max-w-none"
              renderSelectedItem={(item) => <span>{item.text}</span>}
              classNameItem="p-0"
              data={[
                {
                  _id: 1,
                  content: "Công ty Cổ phần PGI Partners",
                },
                {
                  _id: 2,
                  content: "Công ty Cổ phần PGI Partners",
                },
                {
                  _id: 3,
                  content: "Công ty Cổ phần PGI Partners",
                },
              ]}
              formatItem={{
                id: "_id",
                text: "content",
              }}
              inlineSearch={true}
            />
          </div>
          <button className="bg-primary text-[15px] rounded w-[105px] h-[38px] text-primary-light hover:opacity-90">
            Cập nhật
          </button>
        </div>
      </section>

      <section className="px-8 py-6 bg-primary-light mb-4">
        <p className="text-lg font-bold text-primary-gray">
          {
            "I. Kết chuyển kết quả kinh doanh cuối kỳ (tài khoản 5, 6, 7, 8 => 911 => 4212)"
          }
        </p>

        <div className="mt-4 flex items-end gap-3">
          <div>
            <p className="text-sm mb-2">Năm kết chuyển</p>
            <input
              type="text"
              className="w-[322px] h-[38px] border border-primary-border rounded px-3 outline-none"
            />
          </div>
          <div>
            <p className="text-sm mb-2">Đơn vị cơ sở</p>
            <DropdownSearchable
              placeholder="Tìm kiếm"
              className="w-[322px] border border-primary-border rounded"
              classNameInput="h-[36px]"
              isMultiple={false}
              allowClearValueSingleInput={false}
              showTriangle={true}
              maxWidthInput="max-w-none"
              renderSelectedItem={(item) => <span>{item.text}</span>}
              classNameItem="p-0"
              data={[
                {
                  _id: 1,
                  content: "Công ty Cổ phần PGI Partners",
                },
                {
                  _id: 2,
                  content: "Công ty Cổ phần PGI Partners",
                },
                {
                  _id: 3,
                  content: "Công ty Cổ phần PGI Partners",
                },
              ]}
              formatItem={{
                id: "_id",
                text: "content",
              }}
              inlineSearch={true}
            />
          </div>
          <div>
            <p className="text-sm mb-2">Mã khách</p>
            <DropdownSearchable
              placeholder="Tìm kiếm"
              className="w-[322px] border border-primary-border rounded"
              classNameInput="h-[36px]"
              isMultiple={false}
              allowClearValueSingleInput={false}
              showTriangle={true}
              maxWidthInput="max-w-none"
              renderSelectedItem={(item) => <span>{item.text}</span>}
              classNameItem="p-0"
              data={[
                {
                  _id: 1,
                  content: "Công ty Cổ phần PGI Partners",
                },
                {
                  _id: 2,
                  content: "Công ty Cổ phần PGI Partners",
                },
                {
                  _id: 3,
                  content: "Công ty Cổ phần PGI Partners",
                },
              ]}
              formatItem={{
                id: "_id",
                text: "content",
              }}
              inlineSearch={true}
            />
          </div>
          <button className="bg-primary text-[15px] rounded w-[105px] h-[38px] text-primary-light hover:opacity-90">
            Cập nhật
          </button>
        </div>
      </section>

      <section className="px-8 py-6 bg-primary-light mb-4">
        <p className="text-lg font-bold text-primary-gray">
          {
            "II.1. Số dư cuối kỳ | Kết chuyển hàng hoá, nguyên vật liệu, thành phẩm"
          }
        </p>

        <div className="mt-4 flex items-end gap-3">
          <div>
            <p className="text-sm mb-2">Năm kết chuyển</p>
            <input
              type="text"
              className="w-[322px] h-[38px] border border-primary-border rounded px-3 outline-none"
            />
          </div>
          <div>
            <p className="text-sm mb-2">Đơn vị cơ sở</p>
            <DropdownSearchable
              placeholder="Tìm kiếm"
              className="w-[322px] border border-primary-border rounded"
              classNameInput="h-[36px]"
              isMultiple={false}
              allowClearValueSingleInput={false}
              showTriangle={true}
              maxWidthInput="max-w-none"
              renderSelectedItem={(item) => <span>{item.text}</span>}
              classNameItem="p-0"
              data={[
                {
                  _id: 1,
                  content: "Công ty Cổ phần PGI Partners",
                },
                {
                  _id: 2,
                  content: "Công ty Cổ phần PGI Partners",
                },
                {
                  _id: 3,
                  content: "Công ty Cổ phần PGI Partners",
                },
              ]}
              formatItem={{
                id: "_id",
                text: "content",
              }}
              inlineSearch={true}
            />
          </div>
          <div>
            <p className="text-sm mb-2">Mã khách</p>
            <DropdownSearchable
              placeholder="Tìm kiếm"
              className="w-[322px] border border-primary-border rounded"
              classNameInput="h-[36px]"
              isMultiple={false}
              allowClearValueSingleInput={false}
              showTriangle={true}
              maxWidthInput="max-w-none"
              renderSelectedItem={(item) => <span>{item.text}</span>}
              classNameItem="p-0"
              data={[
                {
                  _id: 1,
                  content: "Công ty Cổ phần PGI Partners",
                },
                {
                  _id: 2,
                  content: "Công ty Cổ phần PGI Partners",
                },
                {
                  _id: 3,
                  content: "Công ty Cổ phần PGI Partners",
                },
              ]}
              formatItem={{
                id: "_id",
                text: "content",
              }}
              inlineSearch={true}
            />
          </div>
          <button className="bg-primary text-[15px] rounded w-[105px] h-[38px] text-primary-light hover:opacity-90">
            Cập nhật
          </button>
        </div>
      </section>

      <section className="px-8 py-6 bg-primary-light mb-4">
        <p className="text-lg font-bold text-primary-gray">
          {"II.2. Số dư cuối kỳ | Kết chuyển Tài khoản-Mã khách-Hợp đồng"}
        </p>

        <div className="mt-4 flex items-end gap-3">
          <div>
            <p className="text-sm mb-2">Năm kết chuyển</p>
            <input
              type="text"
              className="w-[322px] h-[38px] border border-primary-border rounded px-3 outline-none"
            />
          </div>
          <div>
            <p className="text-sm mb-2">Đơn vị cơ sở</p>
            <DropdownSearchable
              placeholder="Tìm kiếm"
              className="w-[322px] border border-primary-border rounded"
              classNameInput="h-[36px]"
              isMultiple={false}
              allowClearValueSingleInput={false}
              showTriangle={true}
              maxWidthInput="max-w-none"
              renderSelectedItem={(item) => <span>{item.text}</span>}
              classNameItem="p-0"
              data={[
                {
                  _id: 1,
                  content: "Công ty Cổ phần PGI Partners",
                },
                {
                  _id: 2,
                  content: "Công ty Cổ phần PGI Partners",
                },
                {
                  _id: 3,
                  content: "Công ty Cổ phần PGI Partners",
                },
              ]}
              formatItem={{
                id: "_id",
                text: "content",
              }}
              inlineSearch={true}
            />
          </div>
          <div>
            <p className="text-sm mb-2">Mã khách</p>
            <DropdownSearchable
              placeholder="Tìm kiếm"
              className="w-[322px] border border-primary-border rounded"
              classNameInput="h-[36px]"
              isMultiple={false}
              allowClearValueSingleInput={false}
              showTriangle={true}
              maxWidthInput="max-w-none"
              renderSelectedItem={(item) => <span>{item.text}</span>}
              classNameItem="p-0"
              data={[
                {
                  _id: 1,
                  content: "Công ty Cổ phần PGI Partners",
                },
                {
                  _id: 2,
                  content: "Công ty Cổ phần PGI Partners",
                },
                {
                  _id: 3,
                  content: "Công ty Cổ phần PGI Partners",
                },
              ]}
              formatItem={{
                id: "_id",
                text: "content",
              }}
              inlineSearch={true}
            />
          </div>
          <button className="bg-primary text-[15px] rounded w-[105px] h-[38px] text-primary-light hover:opacity-90">
            Cập nhật
          </button>
        </div>
      </section>

      <section className="px-8 py-6 bg-primary-light mb-4">
        <p className="text-lg font-bold text-primary-gray">
          {
            "II.3. Số dư cuối kỳ | Kết chuyển công nợ tài khoản khác (không gồm các tài khoản ở II.1 và II.2 đã thực hiện kết chuyển)"
          }
        </p>

        <div className="mt-4 flex items-end gap-3">
          <div>
            <p className="text-sm mb-2">Năm kết chuyển</p>
            <input
              type="text"
              className="w-[322px] h-[38px] border border-primary-border rounded px-3 outline-none"
            />
          </div>
          <div>
            <p className="text-sm mb-2">Đơn vị cơ sở</p>
            <DropdownSearchable
              placeholder="Tìm kiếm"
              className="w-[322px] border border-primary-border rounded"
              classNameInput="h-[36px]"
              isMultiple={false}
              allowClearValueSingleInput={false}
              showTriangle={true}
              maxWidthInput="max-w-none"
              renderSelectedItem={(item) => <span>{item.text}</span>}
              classNameItem="p-0"
              data={[
                {
                  _id: 1,
                  content: "Công ty Cổ phần PGI Partners",
                },
                {
                  _id: 2,
                  content: "Công ty Cổ phần PGI Partners",
                },
                {
                  _id: 3,
                  content: "Công ty Cổ phần PGI Partners",
                },
              ]}
              formatItem={{
                id: "_id",
                text: "content",
              }}
              inlineSearch={true}
            />
          </div>
          <div>
            <p className="text-sm mb-2">Mã khách</p>
            <DropdownSearchable
              placeholder="Tìm kiếm"
              className="w-[322px] border border-primary-border rounded"
              classNameInput="h-[36px]"
              isMultiple={false}
              allowClearValueSingleInput={false}
              showTriangle={true}
              maxWidthInput="max-w-none"
              renderSelectedItem={(item) => <span>{item.text}</span>}
              classNameItem="p-0"
              data={[
                {
                  _id: 1,
                  content: "Công ty Cổ phần PGI Partners",
                },
                {
                  _id: 2,
                  content: "Công ty Cổ phần PGI Partners",
                },
                {
                  _id: 3,
                  content: "Công ty Cổ phần PGI Partners",
                },
              ]}
              formatItem={{
                id: "_id",
                text: "content",
              }}
              inlineSearch={true}
            />
          </div>
          <button className="bg-primary text-[15px] rounded w-[105px] h-[38px] text-primary-light hover:opacity-90">
            Cập nhật
          </button>
        </div>
      </section>

      <section className="px-8 py-6 bg-primary-light mb-4">
        <p className="text-lg font-bold text-primary-gray">
          III. Hỗ trợ kết chuyển khác
        </p>
        <div className="mt-4 flex items-end">
          <div className="w-1/2 grid grid-cols-2 gap-y-4">
            <div>
              <p className="text-sm mb-2">Năm kết chuyển</p>
              <input
                type="text"
                className="w-[322px] h-[38px] border border-primary-border rounded px-3 outline-none"
              />
            </div>
            <div>
              <p className="text-sm mb-2">Năm kết chuyển</p>
              <input
                type="text"
                className="w-[322px] h-[38px] border border-primary-border rounded px-3 outline-none"
              />
            </div>
            <div>
              <p className="text-sm mb-2">Đơn vị cơ sở</p>
              <DropdownSearchable
                placeholder="Tìm kiếm"
                className="w-[322px] border border-primary-border rounded"
                classNameInput="h-[36px]"
                isMultiple={false}
                allowClearValueSingleInput={false}
                showTriangle={true}
                maxWidthInput="max-w-none"
                renderSelectedItem={(item) => <span>{item.text}</span>}
                classNameItem="p-0"
                data={[
                  {
                    _id: 1,
                    content: "Công ty Cổ phần PGI Partners",
                  },
                  {
                    _id: 2,
                    content: "Công ty Cổ phần PGI Partners",
                  },
                  {
                    _id: 3,
                    content: "Công ty Cổ phần PGI Partners",
                  },
                ]}
                formatItem={{
                  id: "_id",
                  text: "content",
                }}
                inlineSearch={true}
              />
            </div>
            <div>
              <p className="text-sm mb-2">Mã khách</p>
              <DropdownSearchable
                placeholder="Tìm kiếm"
                className="w-[322px] border border-primary-border rounded"
                classNameInput="h-[36px]"
                isMultiple={false}
                allowClearValueSingleInput={false}
                showTriangle={true}
                maxWidthInput="max-w-none"
                renderSelectedItem={(item) => <span>{item.text}</span>}
                classNameItem="p-0"
                data={[
                  {
                    _id: 1,
                    content: "Công ty Cổ phần PGI Partners",
                  },
                  {
                    _id: 2,
                    content: "Công ty Cổ phần PGI Partners",
                  },
                  {
                    _id: 3,
                    content: "Công ty Cổ phần PGI Partners",
                  },
                ]}
                formatItem={{
                  id: "_id",
                  text: "content",
                }}
                inlineSearch={true}
              />
            </div>
            <div>
              <p className="text-sm mb-2">Tài khoản 1 (*)</p>
              <DropdownSearchable
                placeholder="Tìm kiếm"
                className="w-[322px] border border-primary-border rounded"
                classNameInput="h-[36px]"
                isMultiple={false}
                allowClearValueSingleInput={false}
                showTriangle={true}
                maxWidthInput="max-w-none"
                renderSelectedItem={(item) => <span>{item.text}</span>}
                classNameItem="p-0"
                data={[
                  {
                    _id: 1,
                    content: "111-Tiền mặt",
                  },
                  {
                    _id: 2,
                    content: "111-Tiền mặt",
                  },
                  {
                    _id: 3,
                    content: "111-Tiền mặt",
                  },
                ]}
                formatItem={{
                  id: "_id",
                  text: "content",
                }}
                inlineSearch={true}
              />
            </div>
            <div>
              <p className="text-sm mb-2">Tài khoản 2 (*)</p>
              <DropdownSearchable
                placeholder="Tìm kiếm"
                className="w-[322px] border border-primary-border rounded"
                classNameInput="h-[36px]"
                isMultiple={false}
                allowClearValueSingleInput={false}
                showTriangle={true}
                maxWidthInput="max-w-none"
                renderSelectedItem={(item) => <span>{item.text}</span>}
                classNameItem="p-0"
                data={[
                  {
                    _id: 1,
                    content: "112-Tiền gửi ngân hàng",
                  },
                  {
                    _id: 2,
                    content: "112-Tiền gửi ngân hàng",
                  },
                  {
                    _id: 3,
                    content: "112-Tiền gửi ngân hàng",
                  },
                ]}
                formatItem={{
                  id: "_id",
                  text: "content",
                }}
                inlineSearch={true}
              />
            </div>
          </div>
          <div className="w-1/2">
            <button className="bg-primary text-[15px] rounded w-[105px] h-[38px] text-primary-light hover:opacity-90">
              Cập nhật
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OtherConfig;
