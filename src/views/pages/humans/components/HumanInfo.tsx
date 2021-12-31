import { FC, useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import GeneralInfo from "./views/GeneralInfo";
import WorkHistory from "./views/WorkHistory";
import WorkExperience from "./views/WorkExperience";
import ExperienceAppointment from "./views/ExperienceAppointment";
import Education from "./views/Education";
import { useOnClickOutside } from "services/hooks/useOnclickOutside";

import BackIcon from "assets/images/icon-back.svg";
import ThreeDotVerticalIcon from "assets/images/icon-3dots-vertical.svg";
// import Avatar from "assets/images/avatar.jpg";
import PrintIcon from "assets/images/icons8-print-96.png";
import CopyIcon from "assets/images/icons8-copy-96.png";
import PencilIcon from "assets/images/icons8-pencil.svg";
import DeleteIcon from "assets/images/icons8-remove.svg";
import DownloadIcon from "assets/images/icons8-download-96.svg";
import BookmarkIcon from "assets/images/icons8-bookmark-96.svg";
import Loader from "components/shared/Loader";
import { useFetchDetailHuman } from "services/hooks/useHuman";

import Certificate from "./views/Certificate";

const HumanInfo: FC = () => {
  const [openHumanOption, setOpenHumanOption] = useState(false);
  const refMenuDropdown = useRef<HTMLDivElement>(null);

  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { t: i18n } = useTranslation(["human"]);

  useOnClickOutside(refMenuDropdown, () =>
    setOpenHumanOption(!openHumanOption)
  );

  const { detailHuman, loading } = useFetchDetailHuman(id);

  if (loading) {
    return <Loader className="border-primary" />
  }
  // console.log({
  //   detailHuman,
  //   name: detailHuman.taxid
  // });

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
              ref={refMenuDropdown}
              className="
                absolute
                w-64
                bg-primary-light
                top-12
                right-11
                border
                border-gray-200
                rounded-bl-md
                rounded-br-md
              "
            >
              <div className="py-2 h-1/4 flex items-center gap-5 pl-8 hover:bg-accent-light">
                <img src={DownloadIcon} alt="Download" className="w-[22px]" />
                <span className="text-[13px]">
                  {i18n("menu-dropdown.download")}
                </span>
              </div>
              <div className="py-2 h-1/4 flex items-center gap-5 pl-8 hover:bg-accent-light">
                <img src={BookmarkIcon} alt="Bookmark" className="w-[22px]" />
                <span className="text-[13px]">
                  {i18n("menu-dropdown.bookmark")}
                </span>
              </div>
              <div className="py-2 h-1/4 flex items-center gap-5 pl-8 hover:bg-accent-light">
                <img src={PrintIcon} alt="Print" className="w-[22px]" />
                <span className="text-[13px]">
                  {i18n("menu-dropdown.print")}
                </span>
              </div>
              <div className="py-2 h-1/4 flex items-center gap-5 pl-8 hover:bg-accent-light">
                <img src={CopyIcon} alt="Copy" className="w-[22px]" />
                <span className="text-[13px]">
                  {i18n("menu-dropdown.copy")}
                </span>
              </div>
              <div className="py-2 h-1/4 flex items-center gap-5 pl-8 hover:bg-accent-light">
                <img src={PencilIcon} alt="Pencil" className="w-[22px]" />
                <span className="text-[13px]">
                  {i18n("menu-dropdown.update")}
                </span>
              </div>
              <div className="py-2 h-1/4 flex items-center gap-5 pl-8 hover:bg-accent-light">
                <img src={DeleteIcon} alt="Delete" className="w-[22px]" />
                <span className="text-[13px]">
                  {i18n("menu-dropdown.delete")}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center h-40 border border-gray-200 bg-cbs-secondary pl-20">
        <img
          src={`${process.env.REACT_APP_URL_S3_CONTACT}/${detailHuman.image}`}
          alt="Avartar"
          className="rounded-full w-24 h-24 mr-8"
        />
        <div>
          <p className="text-bold text-2xl text-primary-light">
            {detailHuman.name}
          </p>
          <p className="text-primary-light text-lg">{detailHuman?.position?.name}</p>
        </div>
      </div>

      <section>
        <GeneralInfo
          info={{
            _id: detailHuman?._id,
            phone: detailHuman?.phone,
            sign: detailHuman.sign,
            email: detailHuman.email,
            gender: detailHuman.gender || -1,
            department: detailHuman.department,
            birthday: detailHuman.birthday,
            position: detailHuman?.position,
            identity: detailHuman.identity,
            address: detailHuman.address,
            dateProvice: detailHuman.dateProvice,
            description: detailHuman.description,
            place: detailHuman.place,
            area2: detailHuman.area2,
            area1: detailHuman.area2,
            workplace: detailHuman.workplace || [],
            taxid: detailHuman.taxid,
            major: detailHuman.major || [],
            educationalBackground: detailHuman.educationalBackground || [],
            insuranceDate: detailHuman.insuanceDate,
            insuranceNumber: detailHuman.insuranceNumber,
            insuranceStatus: detailHuman.insuranceStatus,
            sallarySubFactor: detailHuman.sallarySubFactor,
            sallaryFactor: detailHuman.sallaryFactor,
            contractType: detailHuman.contractType,
            workStartDate: detailHuman.workStartDate,
            contractSign: detailHuman.contractSign,
            dayOff: detailHuman.dayOff,
            contractDate: detailHuman.contractDate,
            workingStatus: detailHuman.workingStatus,
            contractValid: detailHuman.contractValid,
            other: detailHuman.other,
            contractExpire: detailHuman.contractExpire,
            appointDate: detailHuman.appointDate,
            changeSallaryDate: detailHuman.changeSallaryDate,
            familyPolicy: detailHuman.familyPolicy,
            family: detailHuman.family,
            signerIn: detailHuman.signerIn,
            signerOut: detailHuman.signerOut,
          }}
        />
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
