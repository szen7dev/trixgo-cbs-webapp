import React, { UIEvent, FC, useState, useEffect } from "react";
import cn from "classnames";
import moment from "moment";
import debounce from 'lodash/debounce';
import { useHistory, useLocation } from "react-router-dom";

import { DropdownSearchable, ModalContainer } from "shareComponents/common";
import { ModalCreateOrUpdateAppCompany } from 'views/support/shareComponents/common';
import PolygonIcon from "assets/images/icon-polygon.svg";
import { APP_INFO } from "shareComponents/common";

import styles from "views/support/styles/support.module.css";
import { Link } from "react-router-dom";
import { useQueryListCompany } from 'services/hooks/useCompanies';
import { useAppCompany } from 'services/hooks/apps/useAppCompany';

export const SupportGrantPage: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [keywordCompany, setKeywordCompany] = useState('');
  const [companySelected, setCompanySelected] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [modalCreateOrUpdateAppCompany, setModalCreateOrUpdateAppCompany] = useState<boolean>(false);
  const [listAppsCompany, setListAppsCompany] = useState<any[]>([]);
  const [listChecked, setListChecked] = useState<any[]>([]);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState({
    appCompanyID: "",
    company: "",
    app: "",
    maxCount: 0,
    maxData: 0,
    startTime: "",
    endTime: ""
  });

  const { data: dataAppsCompany } = useAppCompany({ 
    companyID: companySelected
  });
  const { data: listCompanies, fetchNextPage } = useQueryListCompany({ keyword: keywordCompany });

  const toggleModalCreateOrUpdateAppCompany = () => setModalCreateOrUpdateAppCompany(!modalCreateOrUpdateAppCompany);

  const handleChangeCompany = (value: any) => {
    const nameCompany = `${value.name} - ${value.sign}`;
    const idCompany = value._id;

    setCompanyName(nameCompany);
    setCompanySelected(idCompany);
    history.push(`#${idCompany}`);
    window.sessionStorage.setItem('companyName', nameCompany);
  }

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const isBottom = scrollHeight - scrollTop === clientHeight;
    isBottom && fetchNextPage();
  }

  const handleChangeCheckBox = (appCompany: any, event: React.ChangeEvent<HTMLInputElement>) => {
    // App đã tồn tại trong công ty
    const hasCheckedAppUpdate = listChecked.filter(item => item._id);

    if(event.currentTarget.checked) {
      setListChecked(previousValue => ([...previousValue, appCompany]));

      if(appCompany._id || hasCheckedAppUpdate.length) {
        setIsUpdate(true);
      }
    } else{
      const listCheckedNew = listChecked.filter(item => item.app?._id !== appCompany.app?._id);
      setListChecked(listCheckedNew);

      if(hasCheckedAppUpdate.length === 1 && appCompany._id) {
        setIsUpdate(false);
      }
    }
  }

  const handleSearch = debounce((value) => setKeywordCompany(value), 500);

  const handleConfirmCreateOrUpdateAppCompany = (values: any) => {
    const { _id, app, company, maxCount, maxData, startTime, endTime } = values;

    const listAppsCompanyRefresh = listAppsCompany.map(appCompany => {
      if(appCompany.app._id === app) {
        appCompany._id        = _id;
        appCompany.maxCount   = maxCount;
        appCompany.maxData    = maxData;
        appCompany.startTime  = startTime;
        appCompany.endTime    = endTime;
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
    if(!companySelected) return;

    const appsCompany: any[] = [];

    Array.from(APP_INFO.entries()).map(app => {
      const appCompany = dataAppsCompany.find(appCompany => appCompany?.app?._id === app[0]);

      if(appCompany) {
        appsCompany[appsCompany.length] = appCompany;
      } else{
        appsCompany[appsCompany.length] = {
          app: {
            _id: app[0],
            name: app[1].name
          }
        }
      }
    })
    
    setListAppsCompany(appsCompany);
  }, [dataAppsCompany.length, companySelected])

  useEffect(() => {
    if(listChecked.length === 1) {

      if(listChecked[0]._id) {
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
      } else{
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

  useEffect(() => {
    if(!location.hash) return;

    try {
      const companyID = location.hash.substring(1);
      const companyName = window.sessionStorage.getItem('companyName');
      
      companyID && setCompanySelected(companyID);
      companyName && setCompanyName(companyName);
    } catch (error) {console.error(error)}
  }, [location.hash])

  return (
    <main className="relative h-full">
      <header className="h-10 border border-primary-border flex items-center justify-between px-5">
        <p className="text-lg">
          {companyName}
        </p>

        <div className="flex items-center justify-between">
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
          <DropdownSearchable
            placeholder="Chọn phân vùng để thực hiện"
            className="w-[322px] pl-0 bg-cbs-table-header"
            classNameInput="h-[28px] bg-cbs-table-header"
            isMultiple={false}
            allowClearValueSingleInput={false}
            showTriangle={true}
            maxWidthInput="max-w-none"
            renderSelectedItem={(item) => <span>{item.text}</span>}
            classNameItem="p-0"
            data={listCompanies}
            formatItem={{
              id: "_id",
              text: "name",
            }}
            inlineSearch={false}
            disableSearch={false}
            searchInputClassName="h-[40px] w-[322px] px-[46px]"
            onScroll={handleScroll}
            onchangeValue={handleChangeCompany}
            onSearchInputChange={handleSearch}
          />
        </div>

      </header>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-10 border-b border-primary-border">
          <tr className="text-left text-sm">
            <th className={cn("py-1 text-center", styles.theadInput)}>
              <div className="border-r-2 border-gray-300 flex items-center justify-center">
                <input
                  className="form-check-input mr-2"
                  type="checkbox"
                  defaultChecked
                />
                <img src={PolygonIcon} alt="Polygon" />
              </div>
            </th>
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
            if(appCompany._id) {
              return (
                <tr key={appCompany._id} className="border-b border-primary-border h-10">
                  <td className="py-1 px-2 text-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      style={{ marginLeft: "-23px" }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeCheckBox(appCompany, e)}
                    />
                  </td>
                  <td className="py-1 px-2">
                    <Link to={`/support/grant/documents-management/${appCompany.app._id}/${appCompany?.company?._id || appCompany.company}/${appCompany.app.name}`}>
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
                <td className="py-1 px-2 text-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    style={{ marginLeft: "-23px" }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeCheckBox(appCompany, e)}
                  />
                </td>
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