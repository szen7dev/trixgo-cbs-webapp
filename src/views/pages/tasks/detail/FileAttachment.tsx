import { FC } from "react";

import PDFIcon from "assets/images/icons8-pdf-48 1.png";
import ImageIcon from "assets/images/icons8-image-48.png";
import WordIcon from "assets/images/icons8-microsoft-word-96.png";
import ExcelIcon from "assets/images/icons8-microsoft-excel-2019-48.png";

const FileAttachment: FC = () => {
  return (
    <div className="grid grid-cols-2 gap-1">
      <div className="flex justify-between items-center bg-gray-100 p-2 rounded-sm border-2 border-slate-400">
        <div className="flex">
          <div>
            <img src={PDFIcon} className="w-8" alt="PDF" />
          </div>
          <div className="ml-2">
            <p>2021.15.12-CBS.BLD.HiepNH-BaoCaoDanhGia TacDongMoiTruong.pdf</p>
            <div className="flex justify-between">
              <span className="text-primary-gray text-xs">
                Nguyễn Thanh Hương-CDC
              </span>
              <span className="text-primary-gray text-xs">8h ago</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center bg-gray-100 p-2 rounded-sm border-2 border-slate-400">
        <div className="flex">
          <div>
            <img src={ExcelIcon} className="w-8" alt="xlsx" />
          </div>
          <div className="ml-2">
            <p>2021.15.12-CBS.BLD.HiepNH-BaoCaoDanhGia TacDongMoiTruong.xlsx</p>
            <div className="flex justify-between">
              <span className="text-primary-gray text-xs">
                Nguyễn Thanh Hương-CDC
              </span>
              <span className="text-primary-gray text-xs">8h ago</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center bg-gray-100 p-2 rounded-sm border-2 border-slate-400">
        <div className="flex">
          <div>
            <img src={WordIcon} className="w-8" alt="docx" />
          </div>
          <div className="ml-2">
            <p>2021.15.12-CBS.BLD.HiepNH-BaoCaoDanhGia TacDongMoiTruong.docx</p>
            <div className="flex justify-between">
              <span className="text-primary-gray text-xs">
                Nguyễn Thanh Hương-CDC
              </span>
              <span className="text-primary-gray text-xs">8h ago</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center bg-gray-100 p-2 rounded-sm border-2 border-slate-400">
        <div className="flex">
          <div>
            <img src={ImageIcon} className="w-8" alt="jpg" />
          </div>
          <div className="ml-2">
            <p>2021.15.12-CBS.BLD.HiepNH-BaoCaoDanhGia TacDongMoiTruong.jpg</p>
            <div className="flex justify-between">
              <span className="text-primary-gray text-xs">
                Nguyễn Thanh Hương-CDC
              </span>
              <span className="text-primary-gray text-xs">8h ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileAttachment;
