/*=====1.LIBRARY=====*/
import { FC, useState, useRef, useCallback, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
import BackIcon from "assets/images/icon-back.svg";
import ThreeDotVerticalIcon from "assets/images/icon-3dots-vertical.svg";
import PencilIcon from "assets/images/icons8-pencil.svg";

/*=====4.PAGES/COMPONENTS=====*/
import { GeneralInfo, WorkHistory, WorkExperience, ExperienceAppointment, Education, Certificate, Review, Onleave } from "./components";
import { Loader } from "shareComponents/common";
import { NewHumanModal } from "views/human/shareComponents/common";

/*=====5.TYPINGS=====*/
import type { Human } from "typings/human";
import { APP_ID } from "apis/localdb";

/*=====6.HOOKS/APIS=====*/
import { useFetchDetailHuman, useUpdateContactMutation } from "services/hooks/useHuman";
import { useModal } from "services/hooks/useModal";
import { useAuth } from "services/hooks/auth/useAuth";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";

/*=====7.OTHER=====*/
export const HumanInfo: FC = () => {
  const [openHumanOption, setOpenHumanOption] = useState(false);
  const refMenuDropdown = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { t: i18n } = useTranslation(["human"]);
  const { user } = useAuth();
  const { openModal } = useModal();
  const { updateContactMutateAsync } = useUpdateContactMutation();
  const { dataUserAccess } = useCheckPerAccessApp({ appID: APP_ID.HUMAN.id });
  const { detailHuman, loading, refetch: refreshDetailHuman } = useFetchDetailHuman(id);
  // console.log(detailHuman)

  const handleFinishForm = async (values: any) => {
    const res = await updateContactMutateAsync({
      ...values,
      contactID: detailHuman._id,
      province: values?.province?.toString(),
    });

    if (res.error) {
      toast.error(res.data?.message ?? "Bad request");
      return false
    }

    toast.success("Cập nhật thành công");
    refreshDetailHuman();
    return true
  }

  const handleClickUpdateButton = useCallback(
    (defaultValues: Human) => () => {
      openModal(
        <div
          className={
            "inline-block w-screen h-screen overflow-hidden transition-all transform bg-primary-light shadow-xl rounded absolute left-0 right-0 top-0"
          }
        >
          <NewHumanModal
            title='Cập nhật nhân sự'
            initialValues={{
              department: defaultValues?.department && {
                value: defaultValues.department._id,
                label: defaultValues.department.name
              },
              position: defaultValues?.position && {
                value: defaultValues?.position?._id,
                label: defaultValues?.position?.name
              },
              field: defaultValues?.field && {
                value: defaultValues?.field?._id,
                label: defaultValues?.field?.name
              },
              area: defaultValues?.area && {
                value: defaultValues?.area?._id,
                label: defaultValues?.area?.name
              },
              area1: defaultValues?.area1 && {
                value: defaultValues?.area1?._id,
                label: defaultValues?.area1?.name
              },
              area2: defaultValues?.area2 && {
                value: defaultValues?.area2?._id,
                label: defaultValues?.area2?.name
              },
              workingStatus: defaultValues?.workingStatus && {
                value: defaultValues?.workingStatus?._id,
                label: defaultValues?.workingStatus?.name
              },
              linkUser: defaultValues?.linkUser && {
                value: defaultValues?.linkUser?._id,
                label: defaultValues?.linkUser?.fullname
              },
              dataSource: defaultValues?.dataSource && {
                value: defaultValues?.dataSource?._id,
                label: defaultValues?.dataSource?.name
              },
              parent: defaultValues?.parent && {
                value: defaultValues?.parent?._id,
                label: defaultValues?.parent?.name
              },
              contractType: defaultValues?.contractType && {
                value: defaultValues?.contractType?._id,
                label: defaultValues?.contractType?.name
              },
              type: defaultValues.type,
              gender: defaultValues.gender,
              realStatus: defaultValues.realStatus,
              insuranceStatus: defaultValues.insuranceStatus,
              familyPolicy: defaultValues.familyPolicy,
              contractSign: defaultValues.contractSign,
              family: defaultValues.family,
              description: defaultValues.description,
              name: defaultValues.name,
              sign: defaultValues.sign,
              note: defaultValues.note,
              phone: defaultValues.phone,
              email: defaultValues.email,
              birthday: defaultValues.birthday,
              identity: defaultValues.identity,
              dateProvice: defaultValues.dateProvice,
              place: defaultValues.place,
              address: defaultValues.address,
              taxid: defaultValues.taxid,
              insuranceSign: defaultValues.insuranceSign,
              insuranceDate: defaultValues.insuranceDate,
              sallaryFactor: defaultValues.sallaryFactor?.toString(),
              sallary: defaultValues.sallary?.toString(),
              nods: defaultValues.nods?.toString(),
              sallaryBasic: defaultValues.sallaryBasic?.toString(),
              numberOnLeave: defaultValues.numberOnLeave?.toString(),
              numberOnLeavePlus: defaultValues.numberOnLeavePlus?.toString(),
              union: defaultValues.union?.toString(),
              share: defaultValues.share?.toString(),
              signerIn: defaultValues.signerIn,
              signerOut: defaultValues.signerOut,
              workStartDate: defaultValues.workStartDate,
              dayOff: defaultValues.dayOff,
              appointDate: defaultValues.appointDate,
              changeSallaryDate: defaultValues.changeSallaryDate,
              contractDate: defaultValues.contractDate,
              contractValid: defaultValues.contractValid,
              contractExpire: defaultValues.contractExpire,
              bankAccount: defaultValues.bankAccount,
              bank: defaultValues.bank,
              insuranceFee: defaultValues.insuranceFee,
              annualWorkingHours: defaultValues.annualWorkingHours,
            }}
            onFinish={handleFinishForm}
          />
        </div>
      );
    },
    [handleFinishForm, openModal]
  )
  
  if (loading) {
    return <Loader className="border-primary" />;
  }

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
              <div
                className="py-2 h-1/4 flex items-center gap-5 pl-8 hover:bg-accent-light"
                onClick={handleClickUpdateButton(detailHuman)}
              >
                <img
                  src={PencilIcon}
                  alt="Pencil"
                  className="w-[22px] select-none"
                />
                <span className="text-[13px] select-none">
                  {i18n("menu-dropdown.update")}
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
          <p className="text-primary-light text-lg">
            {detailHuman?.position?.name}
          </p>
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
            field: detailHuman?.field,
            identity: detailHuman.identity,
            address: detailHuman.address,
            dateProvice: detailHuman.dateProvice,
            description: detailHuman.description,
            note: detailHuman.note,
            place: detailHuman.place,
            area2: detailHuman.area2,
            area1: detailHuman.area1,
            workplace: detailHuman.workplace || [],
            taxid: detailHuman.taxid,
            major: detailHuman.major || [],
            educationalBackground: detailHuman.educationalBackground || [],
            insuranceDate: detailHuman.insuranceDate,
            insuranceNumber: detailHuman.insuranceNumber,
            insuranceSign: detailHuman.insuranceSign,
            insuranceStatus: detailHuman.insuranceStatus,
            sallary: detailHuman.sallary,
            nods: detailHuman.nods,
            sallarySubFactor: detailHuman.sallarySubFactor,
            sallaryFactor: detailHuman.sallaryFactor,
            contractType: detailHuman.contractType,
            workStartDate: detailHuman.workStartDate,
            contractSign: detailHuman.contractSign,
            dayOff: detailHuman.dayOff,
            contractDate: detailHuman.contractDate,
            workingStatus: detailHuman.workingStatus,
            linkUser: detailHuman.linkUser,
            dataSource: detailHuman.dataSource,
            parent: detailHuman.parent,
            userCreate: detailHuman.userCreate,
            userUpdate: detailHuman.userUpdate,
            contractValid: detailHuman.contractValid,
            other: detailHuman.other,
            contractExpire: detailHuman.contractExpire,
            appointDate: detailHuman.appointDate,
            changeSallaryDate: detailHuman.changeSallaryDate,
            familyPolicy: detailHuman.familyPolicy,
            family: detailHuman.family,
            signerIn: detailHuman.signerIn,
            signerOut: detailHuman.signerOut,
            sallaryBasic: detailHuman.sallaryBasic,
            numberOnLeave: detailHuman.numberOnLeave,
            numberOnLeavePlus: detailHuman.numberOnLeavePlus,
            documents: detailHuman.documents,
            modifyAt: detailHuman.modifyAt,
            bankAccount: detailHuman.bankAccount,
            bank: detailHuman.bank,
            insuranceFee: detailHuman.insuranceFee,
            annualWorkingHours: detailHuman.annualWorkingHours,
            union: detailHuman.union,
            share: detailHuman.share,
          }}
        />
        <WorkHistory humanId={id} companyID={detailHuman?.company?._id}/>
        <WorkExperience
          humanId={id}
          humanInfo={detailHuman}
          companyID={detailHuman?.company?._id}
        />
        <ExperienceAppointment humanId={id} humanInfo={detailHuman} companyID={detailHuman?.company?._id}/>
        <Education humanId={id} companyID={detailHuman?.company?._id} />
        <Certificate humanId={id} companyID={detailHuman?.company?._id}/>
        <Review humanId={id} companyID={detailHuman?.company?._id} />
        <Onleave humanId={id} companyID={detailHuman?.company?._id} linkUserID = {detailHuman?.linkUser?._id} />
      </section>
    </main>
  )
}