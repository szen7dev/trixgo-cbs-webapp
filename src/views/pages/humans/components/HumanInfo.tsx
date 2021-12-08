import { FC, useState, useRef } from "react";

import { useHistory } from "react-router-dom";

import GeneralInfo from "./views/GeneralInfo";
import WorkHistory from "./views/WorkHistory";
import WorkExperience from "./views/WorkExperience";
import ExperienceAppointment from "./views/ExperienceAppointment";
import Education from "./views/Education";
import { useOnClickOutside } from "services/hooks/useOnclickOutside";

import BackIcon from "assets/images/icon-back.svg";
import ThreeDotVerticalIcon from "assets/images/icon-3dots-vertical.svg";
import Avatar from "assets/images/avatar.jpg";
import PrintIcon from "assets/images/icons8-print-96.png";
import CopyIcon from "assets/images/icons8-copy-96.png";
import PencilIcon from "assets/images/icons8-pencil-96.png";
import DeleteIcon from "assets/images/icons8-remove-96.png";
import Certificate from "./views/Certificate";

const HumanInfo: FC = () => {
  const [openHumanOption, setOpenHumanOption] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const history = useHistory();

  useOnClickOutside(ref, () => setOpenHumanOption(!openHumanOption));

  return (
    <main className="mb-4">
      <div className="flex items-center justify-between px-4 h-12 border border-gray-200">
        <img
          src={BackIcon}
          alt="Back"
          onClick={() => history.goBack()}
          className="cursor-pointer"
        />
        <div
          className="w-10 h-10 bg-accent-light rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => setOpenHumanOption(!openHumanOption)}
        >
          <img
            src={ThreeDotVerticalIcon}
            alt="Three Dot"
            className="relative select-none"
          />
          {openHumanOption && (
            <div
              ref={ref}
              className="absolute w-64 h-40 bg-primary-light top-28 right-24 border border-gray-200 rounded-md"
            >
              <div className="h-1/4 flex items-center gap-5 pl-8 hover:bg-accent-light">
                <img src={PrintIcon} alt="Print" />
                <span className="text-[13px]">In CV</span>
              </div>
              <div className="h-1/4 flex items-center gap-5 pl-8 hover:bg-accent-light">
                <img src={CopyIcon} alt="Copy" />
                <span className="text-[13px]">Copy link</span>
              </div>
              <div className="h-1/4 flex items-center gap-5 pl-8 hover:bg-accent-light">
                <img src={PencilIcon} alt="Pencil" />
                <span className="text-[13px]">Cập nhật</span>
              </div>
              <div className="h-1/4 flex items-center gap-5 pl-8 hover:bg-accent-light">
                <img src={DeleteIcon} alt="Delete" />
                <span className="text-[13px]">Xóa</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center h-40 border border-gray-200 bg-secondary pl-20">
        <img
          src={Avatar}
          alt="Avartar"
          className="rounded-full w-24 h-24 mr-8"
        />
        <div>
          <p className="text-bold text-2xl text-primary-light">
            Phan Văn Trường-PGI
          </p>
          <p className="text-primary-light text-lg">
            Phòng giá - Phó tổng giám đốc
          </p>
        </div>
      </div>

      <section>
        <GeneralInfo />
        <WorkHistory />
        <WorkExperience />
        <ExperienceAppointment />
        <Education />
        <Certificate />
      </section>
    </main>
  );
};

export default HumanInfo;
