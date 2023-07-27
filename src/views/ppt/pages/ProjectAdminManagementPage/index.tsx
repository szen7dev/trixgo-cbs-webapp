import { FC, useState, useEffect } from "react";
import {  useParams, useHistory } from 'react-router-dom';
import { DepartmentRepository } from 'apis/item';

// import { validateFiles } from 'validation/file';
import { read, utils } from 'xlsx';

import AppAdminTab from "./tabs/AppAdminTab";
import { useAuth } from "services/hooks/auth/useAuth";
import { toast } from "react-toastify";

import { usePcmPlanGroup } from 'services/hooks/pcm/usePcmGroup';

/*=====7.OTHER=====*/
import { createLinkAndClick } from "utils";

const ProjectAdminManagementPage: FC = (): any => {
	const { id: projectID, tab } = useParams<{ id: string, tab: string }>();
  const { user } = useAuth();
  const history = useHistory();

  // Call trực tiếp api
	useEffect(() => {
		if (projectID) {
        (async () =>  {
          const infoDepartment = await DepartmentRepository.fetchDetailDepartment({ departmentID: projectID });
          if(!infoDepartment?.data?.admins?.includes(user?._id || "")){
            toast.error("Không có quyền truy cập. Bạn không phải là quản trị viên!");
            return history.push("/");
          }
        })();
		}
	}, [projectID]);

  const onClickTab = (tab?: string) => history.push(`/pm/project/${projectID}/admin/${tab}`)

  /**
   * LÀM VIỆC VỚI EXCEL
   */
  //_____Import, export excel
  const [dataImport, setDataImport] = useState([]);
  const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
      isExporting: false,
  });
  const { downloadTemplateExcelAsync, importExcelAsync, exportExcelAsync } = usePcmPlanGroup({});

  // console.log({projectID})
  const handleDownloadTemplateImportExcel = async () => {
      try {
          setStateExport({ isExporting: true });
          const { error, data } = await downloadTemplateExcelAsync({
            projectID: projectID
          });

          if(error) {
              return toast.warn(data?.message);
          }

          data && createLinkAndClick(data, '_self');
      } catch (error: any) {
          toast.error(error.message)
      } finally {
          setStateExport({ isExporting: false });
    }
}

//_____Xử lý import excel (đọc file)
  const handleImport = ($event: any) => {
      const files = $event.target.files;
      if (files.length) {
          const file = files[0];
          const reader = new FileReader();
          reader.onload = (event: any) => {
              const wb = read(event.target.result);
              const sheets = wb.SheetNames;

              if (sheets.length) {
                  const rows: any = utils.sheet_to_json(wb.Sheets[sheets[0]]); // Index=1 (tức Sheet số 2 từ trái sang)
                  
                  // Set data để Import
                  setDataImport(rows)
              }
          }
          
          reader.readAsArrayBuffer(file);
      }

      // Đọc xong thì xóa value trong Input đi
      $event.target.value = null;
  }

//_____Gọi tới API để đẩy data lên
  useEffect(() => {
      if(dataImport.length){
          const fetchData = async () => {
              const data = await importExcelAsync({ projectID: projectID, dataImport: JSON.stringify(dataImport) });
              setDataImport([]);
              // refetchTaskInfo?.()
              // console.log(data)

              if(!data.error){
                  return toast.success("Import thành công");
              }
              return toast.error(data.message);
          }
          fetchData();
      }
  }, [dataImport])

  return (
    <main className="h-full">
      <header className="sticky flex justify-between items-center top-0 bg-primary-light z-10 h-10 px-6 border-gray-300">
        <div className="h-full">
          <button
            className={
              tab === 'members'
                ? "w-auto h-full p-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full p-2 text-sm text-primary-gray"
            }
            onClick={() => onClickTab('members')}
          >
            Thành viên Dự án/Phòng ban
          </button>
          <button
            className={
              tab === "groups"
                ? "w-auto h-full p-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full p-2 text-sm text-primary-gray"
            }
            onClick={() => onClickTab('groups')}
          >
            Nhóm dữ liệu Công việc
          </button>
          <button
            className={
              tab === "packages"
                ? "w-auto h-full p-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full p-2 text-sm text-primary-gray"
            }
            onClick={() => onClickTab('packages')}
          >
            Gói dữ liệu Hồ sơ
          </button>
          <button className={"w-auto h-full p-2 text-sm text-primary"}
						onClick={handleDownloadTemplateImportExcel}
					>
						Tải mẫu Excel
          </button> 
          <button className={"w-auto h-full p-2 text-sm text-primary"}>
              <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required hidden onChange={handleImport}
              accept=".xlsx, .xlsm, .xls, .csv"/>
              <label className="custom-file-label" htmlFor="inputGroupFile">Phân quyền Dự án/Phòng ban</label>
          </button>
        </div>
      </header>

      <AppAdminTab />
    </main>
  );
};

export default ProjectAdminManagementPage;