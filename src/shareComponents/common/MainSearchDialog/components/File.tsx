import { UIEvent, FC, useEffect, useMemo, useState, ChangeEvent } from "react";
import { useTable, useRowSelect, TableOptions, usePagination } from "react-table";
import ReactDatePicker from "react-datepicker";
import classnames from "classnames";

/**
 * Components, Assets
 */
import CustomAutoComplete from "../../Form/CustomForm/CustomAutoComplete";
import { SelectionColumn } from "shareComponents/common/Table/components/SelectionColumn";
import { TableWithoutContext } from "shareComponents/common/Table";
import iconChevronRight from "assets/images/icon-chevron-right.png";

/**
 * Hooks, Typings
 */
import { usePcmFile } from "services/hooks/pcm/usePcm";
import { Project } from "typings/items/project";
import moment from "moment";
import { PcmFile } from "typings/pcm";
import { humanFileSize } from 'utils/converter';
import { UserSystemProps } from "typings/users/userSystem";

type FileProps = {
  users: UserSystemProps[];
  projects: Project[];
  onScrollUser: (e: UIEvent<HTMLDivElement>) => void;
  onScrollProject: (e: UIEvent<HTMLDivElement>) => void;
  onSearchUser: (keyword: string | ChangeEvent<HTMLInputElement>) => void;
  onSearchProject: (keyword: string | ChangeEvent<HTMLInputElement>) => void;
};

function getColumnsFile(): TableOptions<PcmFile>["columns"] {
  return [
    SelectionColumn({
      tableHeadSelectorProps: {
        className: "px-4 py-2.5 font-normal border-b border-cbs-border w-1",
      },
      tableHeadSelectorInputProps: { className: "cbs-checkbox" },
      tableCellSelectorProps: {
        className: "pt-2.5 pb-3 px-2 border-b border-cbs-border text-center",
      },
      tableCellSelectorInputProps: { className: "cbs-checkbox" },
    }),
    {
      accessor: "_id",
      Header({ currentPage, currentTotalPage, totalPage, fetchNextPage, fetchPreviousPage }) {
        const isDisablePrevButton = (currentTotalPage === 2 && currentPage === 1) || totalPage === 0;
        const isDisableNextButton = (currentPage === totalPage) || totalPage === 0;

        return (
          <div className="flex justify-between pb-1">
            <span className="bg-[#F6F7F8] bg-opacity-60 rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </span>
            <div className="flex items-center">
              {/* <span className="mr-4">10-{length} trong số rất nhiều</span> */}
              <span className="mr-4">Trang {currentPage} trong {totalPage}</span>
              <button className="rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-100 border border-transparent hover:border-cbs-border" onClick={fetchPreviousPage} disabled={isDisablePrevButton}>
                <img
                  alt="Previous"
                  src={iconChevronRight}
                  className="w-4 filter-primary-gray rotate-180"
                />
              </button>
              <button className="rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-100 border border-transparent hover:border-cbs-border" onClick={fetchNextPage} disabled={isDisableNextButton}>
                <img alt="Next" src={iconChevronRight} className="w-4 filter-primary-gray" />
              </button>
            </div>
          </div>
        );
      },
      headCellProps: {
        colSpan: 2,
        className: "border-b border-cbs-border pl-2 pr-8"
      },
      cellProps: {
        className: "pt-2.5 pb-3 px-2 border-b border-cbs-border",
      },
      Cell({ row }) {
        const { nameOrg, size, path, project, task, author, createAt } = row.original;

        return (
          <div>
            <a href={`${process.env.REACT_APP_URL_S3}${path}`} target="_blank" rel="noopener noreferrer" className="text-cbs-highlight-color">
              {nameOrg} ({humanFileSize(size)})
            </a>
            <p className="text-cbs-subtext">
              {project.sign}.{task.name}
            </p>
            <p className="text-cbs-subtext">
              <span>{author.bizfullname}</span>
              <span className="text-cbs-primary ml-1">
                {moment(createAt).format('DD/MM/YYYY HH:mm')} ({moment(createAt).fromNow()})
              </span>
            </p>
          </div>
        );
      },
    },
    {
      accessor: "_id",
      id: "he",
      headCellProps: { className: "hidden" },
      cellProps: {
        className: "pt-2.5 pb-3 px-2 border-b border-cbs-border",
      },
      Cell({ row }) {
        return (
          <div className={classnames({ hidden: row.original?.type !== 1 })}>
            <img src={`${process.env.REACT_APP_URL_S3}${row.original?.path}`} className="h-[60px] w-[60px]" alt="Preview" />
          </div>
        );
      },
    },
  ];
}

interface SearchParams{
  isSearchFile: boolean,
  projectID: string,
  authorID: string,
  fromDate: string,
  toDate: string,
  lastestID: string | undefined
}

const File: FC<FileProps> = ({
  users, projects, onScrollUser, onScrollProject, onSearchUser, onSearchProject
}) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [userSelected, setUserSelected] = useState('');
  const [projectSelected, setProjectSelected] = useState('');
  const [count, setCount] = useState(1);

  const [pagesCursor, setPagesCursor] = useState<(string | undefined)[]>([undefined]);
  const [dataFilesPcm, setDataFilesPcm] = useState<PcmFile[]>([]);

  const [paramsSearch, setParamsSearch] = useState<SearchParams>({
    isSearchFile: true,
    projectID: '',
    authorID: '',
    fromDate: '',
    toDate: '',
    lastestID: ''
  });

  const { listFilesPcm, isLoading, totalRecord, totalPage, nextCursor } = usePcmFile({
    params: paramsSearch,
    isFetch: true
  })

  const columns = useMemo(getColumnsFile, []);
  const instance = useTable({ columns, data: dataFilesPcm, getRowId: (row) => row._id }, usePagination, useRowSelect);

  useEffect(() => {
    if(!listFilesPcm) return;

    setDataFilesPcm(listFilesPcm);
  }, [JSON.stringify(listFilesPcm)])

  useEffect(() => {
    const checkExistsPage = pagesCursor.find(page => page === nextCursor);

    if(checkExistsPage || !totalPage) return;
    if(!nextCursor && count > 1) return;

    const cursors = [...pagesCursor, nextCursor];
    setPagesCursor(cursors);
  }, [nextCursor, count, totalPage])

  const handleNextPageButton = () => {
    setCount(count + 1);
    setParamsSearch(preValue => ({
      ...preValue,
      lastestID: pagesCursor[pagesCursor.length - 1]
    }));
  };

  const handlePrevPageButton = () => {
    if(pagesCursor.length === 2) return;

    let prevCursor: string | undefined = '';

    if(count === totalPage) {
      prevCursor = pagesCursor[pagesCursor.length - 2];
    } else{
      prevCursor = pagesCursor[pagesCursor.length - 3];
    }

    pagesCursor.splice(-1, 1);

    setPagesCursor(pagesCursor);
    setCount(count - 1);
    setParamsSearch(preValue => ({
      ...preValue,
      lastestID: prevCursor
    }));
  };

  const handleSearch = () => {
    setCount(1);
    setPagesCursor([undefined]);
    setParamsSearch(preValue => ({
      ...preValue,
      projectID: projectSelected,
      authorID: userSelected,
      fromDate: startDate ? moment(startDate).format('YYYY-MM-DD') : '',
      toDate: endDate ? moment(endDate).format('YYYY-MM-DD') : '',
      lastestID: ''
    }))
  }

  return (
    <div>
      <div className="pt-4 pl-8 pr-8 pb-3 relative flex space-x-3">
        <CustomAutoComplete
          data={users}
          onScroll={onScrollUser}
          onChange={(keyword: string | ChangeEvent<HTMLInputElement>) => {
            if(!keyword) {
              setUserSelected('');
            }

            onSearchUser(keyword)
          }}
          onChangeValue={value => setUserSelected(value._id)}
          attribute="bizfullname"
          wrapperClassName="w-4/12"
          className="w-full h-full py-2.5 px-3 focus:outline-none"
          placeholder="Người tạo"
        />
        <CustomAutoComplete
          data={projects}
          renderValue={project => `${project.sign}.${project.name}`}
          onScroll={onScrollProject}
          onChange={(keyword: string | ChangeEvent<HTMLInputElement>) => {
            if(!keyword) {
              setProjectSelected('');
            }

            onSearchProject(keyword);
          }}
          onChangeValue={value => setProjectSelected(value._id)}
          wrapperClassName="w-4/12"
          className="w-full h-full py-2.5 px-3 focus:outline-none"
          placeholder="Dự án"
        />
        <div className="w-2/12 border-cbs-border pl-4 pr-1.5 border-0.5 relative flex items-center focus-within:text-cbs-primary">
          <ReactDatePicker
            onChange={(date: Date) => setStartDate(date)}
            selected={startDate}
            className="text-small leading-[19.5px] py-2.5 w-full focus:outline-none"
          />
          <div className="w-6 h-6">
            <img src="/images/common/icons8-calendar-100.svg" alt="icon calendar" />
          </div>
          <label className="absolute top-0 left-2 -translate-y-1/2 bg-white py-0">Từ ngày</label>
        </div>
        <div className="w-2/12 border-cbs-border pl-4 pr-1.5 border-0.5 relative flex items-center focus-within:text-cbs-primary">
          <ReactDatePicker
            onChange={(date: Date) => setEndDate(date)}
            selected={endDate}
            className="text-small leading-[19.5px] py-2.5 w-full focus:outline-none"
          />
          <div className="w-6 h-6">
            <img src="/images/common/icons8-calendar-100.svg" alt="icon calendar" />
          </div>
          <label className="absolute top-0 left-2 -translate-y-1/2 bg-white py-0">Đến ngày</label>
        </div>
      </div>
      {/* Content */}
      <div className="h-[480px] overflow-auto">
        <TableWithoutContext
          instance={instance}
          tableProps={{ className: "w-full" }}
          props={{
            length: totalRecord,
            currentPage: count,
            currentTotalPage: pagesCursor.length,
            totalPage: totalPage,
            fetchNextPage: handleNextPageButton,
            fetchPreviousPage: handlePrevPageButton
          }}
          isLoading={isLoading}
        />
      </div>
      <div className="flex justify-end pt-3 px-10">
        <button className="text-cbs-subtext px-7 py-3.5 font-bold rounded-cbs-sm">Bỏ qua</button>
        <button className="bg-cbs-primary text-white px-7 py-3.5 font-bold rounded-cbs-sm" onClick={handleSearch}>
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default File;
