import React, { FC, useState, useEffect } from "react";
import cn from "classnames";
import moment from "moment";

import { ModalContainer } from "shareComponents/common";
import { ModalCreateOrUpdateAppCompany } from 'views/support/shareComponents/common';

import styles from "views/support/styles/support.module.css";
import { Link } from "react-router-dom";
import { useAppCompany } from 'services/hooks/apps/useAppCompany';
import { useApp } from 'services/hooks/apps/useApp';

export const OwnerGrantPage: FC = () => {
  const currentUser = localStorage.getItem("currentUser") ?? "{}";
  const profile = JSON.parse(currentUser);
  const [companySelected, setCompanySelected] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [modalCreateOrUpdateAppCompany, setModalCreateOrUpdateAppCompany] = useState<boolean>(false);
  const [listAppsCompany, setListAppsCompany] = useState<any[]>([]);
  const [listChecked, setListChecked] = useState<any[]>([]);
  const [initialValues, setInitialValues] = useState({
    appCompanyID: "",
    company: "",
    app: "",
    maxCount: 0,
    maxData: 0,
    startTime: "",
    endTime: ""
  });

  const { data: listApps, loading: loadingApp } = useApp();
  const { data: dataAppsCompany } = useAppCompany({
    limit: 100,
    companyID: companySelected
  });

  const toggleModalCreateOrUpdateAppCompany = () => setModalCreateOrUpdateAppCompany(!modalCreateOrUpdateAppCompany);

  const handleConfirmCreateOrUpdateAppCompany = (values: any) => {
    const { _id, app, company, maxCount, maxData, startTime, endTime } = values;

    const listAppsCompanyRefresh = listAppsCompany.map(appCompany => {
      if (appCompany.app._id === app) {
        appCompany._id = _id;
        appCompany.maxCount = maxCount;
        appCompany.maxData = maxData;
        appCompany.startTime = startTime;
        appCompany.endTime = endTime;
      }

      return appCompany;
    });

    setListChecked([]);
    setListAppsCompany(listAppsCompanyRefresh);
    setInitialValues({
      appCompanyID: _id || '',
      company: company,
      app: app,
      maxCount: maxCount,
      maxData: maxData,
      startTime: startTime,
      endTime: endTime
    })
  }

  useEffect(() => {
    setCompanySelected(profile?.company?._id);
    setCompanyName(`${profile?.company?.name} - ${profile?.company?.sign}`);
  }, [profile]);

  useEffect(() => {
    if (!companySelected) return;

    const appsCompany: any[] = [];

    // Array.from(APP_INFO.entries()).map(app => {
    listApps.map(app => {
      const appCompany = dataAppsCompany.find(appCompany => appCompany?.app?._id === app._id);

      if (appCompany) {
        appsCompany[appsCompany.length] = appCompany;
      } else {
        appsCompany[appsCompany.length] = {
          app: {
            _id: app._id,
            name: app.name
          }
        }
      }
    })

    setListAppsCompany(appsCompany);
  }, [dataAppsCompany.length, companySelected, loadingApp])

  useEffect(() => {
    if (listChecked.length === 1) {

      if (listChecked[0]._id) {
        const { _id, app, company, maxCount, maxData, startTime, endTime } = listChecked[0];

        setInitialValues({
          appCompanyID: _id,
          company: company?._id,
          app: app?._id,
          maxCount,
          maxData,
          startTime: moment(startTime).format("MM/DD/YYYY"),
          endTime: moment(endTime).format("MM/DD/YYYY")
        })
      } else {
        const { app } = listChecked[0];

        setInitialValues({
          appCompanyID: "",
          company: companySelected,
          app: app?._id,
          maxCount: 0,
          maxData: 0,
          startTime: "",
          endTime: ""
        })
      }
    }
  }, [listChecked.length])

  // useEffect(() => {
  //   if (!location.hash) return;

  //   try {
  //     const companyID = location.hash.substring(1);
  //     const companyName = window.sessionStorage.getItem('companyName');

  //     companyID && setCompanySelected(companyID);
  //     companyName && setCompanyName(companyName);
  //   } catch (error) { console.error(error) }
  // }, [location.hash])

  return (
    <main className="relative h-full">
      <header className="h-10 border border-primary-border flex items-center justify-between px-5">
        <p className="text-lg">
          {companyName}
        </p>

        {/* <div className="flex items-center justify-between">
          <button
            className={
              cn("flex items-center justify-center text-primary-light bg-cbs-green px-2 h-8 rounded font-bold mr-2",
                (listChecked.length === 1 && !isUpdate) ? "" : "hidden")
            }
            onClick={toggleModalCreateOrUpdateAppCompany}
          >
            Tạo mới
          </button>
          <button
            className={
              cn("flex items-center justify-center text-primary-light bg-cbs-green px-2 h-8 rounded font-bold mr-2",
                (listChecked.length === 1 && isUpdate) ? "" : "hidden")
            }
            onClick={toggleModalCreateOrUpdateAppCompany}
          >
            Cập nhật
          </button>
        </div> */}

      </header>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-10 border-b border-primary-border">
          <tr className="text-left text-sm">
            <th className={cn("py-1 text-center", styles.theadInput)}></th>
            <th className="w-1/5 py-1">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Ứng dụng
              </div>
            </th>
            <th className="w-1/6 py-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Hạn mức tài khoản
              </div>
            </th>
            <th className="w-1/6 py-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Hạn mức dung lượng
              </div>
            </th>
            <th className="w-1/6 py-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Ngày bắt đầu
              </div>
            </th>
            <th className="w-1/6 py-1 font-normal">
              <div className="font-normal pl-2">Hạn sử dụng</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {listAppsCompany.length ? listAppsCompany.map(appCompany => {
            if (appCompany._id) {
              return (
                <tr key={appCompany._id} className="border-b border-primary-border h-10">
                  <td className="py-1 px-2 text-center"></td>
                  <td className="py-1 px-2">
                    <Link to={`/owner/grant/documents-management/${appCompany.app._id}/${appCompany?.company?._id || appCompany.company}/${appCompany.app.name}`}>
                      {appCompany.app?.name}
                    </Link>
                  </td>
                  <td className="py-1 px-2">{appCompany.maxCount}</td>
                  <td className="py-1 px-2">{appCompany.maxData}</td>
                  <td className="py-1 px-2">{moment(appCompany.startTime).format('DD/MM/YYYY')}</td>
                  <td className="py-1 px-2">{moment(appCompany.endTime).format('DD/MM/YYYY')}</td>
                </tr>
              )
            }

            return (
              <tr key={appCompany.app?._id} className="border-b border-primary-border h-10">
                <td className="py-1 px-2 text-center"></td>
                <td className="py-1 px-2">
                  {appCompany.app?.name}
                </td>
                <td className="py-1 px-2"></td>
                <td className="py-1 px-2"></td>
                <td className="py-1 px-2"></td>
                <td className="py-1 px-2"></td>
              </tr>
            )
          }) : <></>}
        </tbody>
      </table>

      <ModalContainer isModalOpen={modalCreateOrUpdateAppCompany} toggle={toggleModalCreateOrUpdateAppCompany}>
        <div className="inline-flex flex-col text-black w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl">
          <ModalCreateOrUpdateAppCompany
            modalType={initialValues.appCompanyID ? 'update' : 'create'}
            show={modalCreateOrUpdateAppCompany}
            toggle={toggleModalCreateOrUpdateAppCompany}
            initialValues={initialValues}
            onConfirm={handleConfirmCreateOrUpdateAppCompany}
          />
        </div>
      </ModalContainer>
    </main>
  );
};