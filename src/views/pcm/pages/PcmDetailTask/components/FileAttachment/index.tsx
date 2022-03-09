import { FC } from "react";
import moment from 'moment';

import PDFIcon from "assets/images/icons8-pdf-48 1.png";
import ImageIcon from "assets/images/icons8-image-48.png";
import WordIcon from "assets/images/icons8-microsoft-word-96.png";
import ExcelIcon from "assets/images/icons8-microsoft-excel-2019-48.png";

type Props = {
  files: any[]
}

export const FileAttachment: FC<Props> = ({ files }) => {
  if(files && !files.length) return <></>;

  return (
    <div className="grid grid-cols-2 gap-1">
      {files?.map(file => {
        // let iconFile = '';

        return (
          <div key={file._id} className="flex justify-between items-center bg-gray-100 p-2 rounded-sm border border-slate-400">
            <a href={`${process.env.REACT_APP_URL_S3}${file.path}`} target="__blank">
              <div className="flex">
                <div>
                  <img src={PDFIcon} className="w-8" alt="PDF" />
                </div>
                <div className="ml-2">
                  <p>
                    {file.nameOrg}
                  </p>
                  <div className="flex justify-between">
                    <span className="text-primary-gray text-xs">
                      {file?.author?.bizfullname}
                    </span>
                    <span className="text-primary-gray text-xs">
                      {moment(file?.createAt).fromNow()}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        )
      })}
      
      <div className="flex justify-between items-center bg-gray-100 p-2 rounded-sm border border-slate-400 hidden">
        <a href="/">
          <div className="flex">
            <div>
              <img src={ExcelIcon} className="w-8" alt="xlsx" />
            </div>
            <div className="ml-2">
              <p>
                2021.15.12-CBS.BLD.HiepNH-BaoCaoDanhGia TacDongMoiTruong.xlsx
              </p>
              <div className="flex justify-between">
                <span className="text-primary-gray text-xs">
                  Nguyễn Thanh Hương-CDC
                </span>
                <span className="text-primary-gray text-xs">8h ago</span>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div className="flex justify-between items-center bg-gray-100 p-2 rounded-sm border border-slate-400 hidden">
        <a href="/">
          <div className="flex">
            <div>
              <img src={WordIcon} className="w-8" alt="docx" />
            </div>
            <div className="ml-2">
              <p>
                2021.15.12-CBS.BLD.HiepNH-BaoCaoDanhGia TacDongMoiTruong.docx
              </p>
              <div className="flex justify-between">
                <span className="text-primary-gray text-xs">
                  Nguyễn Thanh Hương-CDC
                </span>
                <span className="text-primary-gray text-xs">8h ago</span>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div className="flex justify-between items-center bg-gray-100 p-2 rounded-sm border border-slate-400 hidden">
        <a href="/">
          <div className="flex">
            <div>
              <img src={ImageIcon} className="w-8" alt="jpg" />
            </div>
            <div className="ml-2">
              <p>
                2021.15.12-CBS.BLD.HiepNH-BaoCaoDanhGia TacDongMoiTruong.jpg
              </p>
              <div className="flex justify-between">
                <span className="text-primary-gray text-xs">
                  Nguyễn Thanh Hương-CDC
                </span>
                <span className="text-primary-gray text-xs">8h ago</span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};
