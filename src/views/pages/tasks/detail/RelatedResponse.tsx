import { FC, useState, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

/** 
 * Icon
 */
import IconImage from "views/pages/media/components/Icon/IconImage";
import IconFile from "views/pages/media/components/Icon/IconFile";

/**
 * Context
 */
import CommentProvider from '../context/response/comment.provider';
import CommentContext from '../context/response/comment.context';
import RelatedResponseItem from "./RelatedResponseItem";
import TaskRepository from "apis/task";

/**
 * Assets
 */
import IconDownload from "assets/images/icons8-reply-arrow-96.svg";
import ChevronUpIcon from "assets/images/icon-chevron-up.png";

/**
 * Hooks, typings
 */
import { useTask } from 'services/hooks/useTask';
import { Task } from 'typings/task';
import useUploadFile from "services/hooks/ppt/useUploadFile";
import { modifyUploadedFilesV2, uploadImageWithProgressPromise, QueueUpload } from "services/hooks/ppt/useUploadFile/upload.utils";
import classNames from "classnames";
import { toArray } from "lodash";
import PostFile from 'views/pages/media/components/post/PostFile';
import PostImage from "views/pages/media/components/post/PostImage";
import ChevronDownIcon from "assets/icons/ChevronDown";
import IconPaperClip from "views/pages/media/components/Icon/IconPaperClip";
import PostImageV2 from "views/pages/media/components/post/PostImageV2";
import FileUploadRow from "views/pages/document/components/common/FileUploadRow";
import { FileProps, FilePropsUpload } from "typings/social";

enum RelatedResponseTab {
  ALL = "ALL",
  MARKED = "MARKED",
}

type Props = {
  task: Task
}

const timer: Record<string | number, NodeJS.Timeout> = {};
const queue = new QueueUpload();

const RelatedResponse: FC<Props> = ({ task }) => {
  const { id } = useParams<{ id: string }>();
  const { addResponse, listResponses, totalRecordResponse } = useTask({ taskID: id });
  const { state, dispatch } = useContext(CommentContext);
  const [uploads,
    {
      setUploadImageProgress,
      setUploadFileProgress,
      setIDImageUploaded,
      setIDFileUploaded,
      setUploadImage,
      setUploadFile,
      removeUploadedImage,
      removeUploadedFile,
      removeAllFiles,
    }] = useUploadFile();

  const [isExpand, setIsExpand] = useState(false);
  const [visibleForm, setVisibleForm] = useState(false);
  const [content, setContent] = useState('');
  const [amountComment, setAmountComment] = useState(totalRecordResponse);

  const [currentTab, setCurrentTab] = useState(RelatedResponseTab.ALL);
  const [collapsed, setCollapsed] = useState(false);

  // const timer = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    dispatch({ type: 'SET_COMMENTS', payload: listResponses });
    return () => {
      Object.values(timer).forEach(t => clearInterval(t));
    }
  }, [listResponses.length])

  useEffect(() => {
    setAmountComment(totalRecordResponse);
  }, [totalRecordResponse])

  const getClassTab = (tab: RelatedResponseTab) => {
    return currentTab === tab
      ? "border-b-2 border-primary font-bold"
      : "text-primary-gray";
  };

  const handleAddResponse = async () => {
    setVisibleForm(false);

    const infoAfterCreate: any = await addResponse({
      taskID: id,
      type: 2,
      content
    });

    dispatch({ type: 'ADD_COMMENT', payload: infoAfterCreate });
  }

  const handleViewPrevious = async () => {
    const LIMIT = 3;
    const { error, data } = await TaskRepository.listResponse({
      lastestID: state.comments[0]._id,
      taskID: id,
      limit: LIMIT,
      select: "comment isMarked type task userCreate createAt",
      populates: JSON.stringify({
        path: "comment userCreate",
        select: "_id bizfullname fullname image files images content",
      }),
    });

    if (error || !data.listRecords.length) return;

    setAmountComment(amountComment - LIMIT);
    dispatch({ type: 'VIEW_MORE_COMMENTS', payload: data.listRecords });
  }

  // HandleSetFileUpload
  const handleSetFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return;

    // Modify file to with key with each file;
    const [files, images] = modifyUploadedFilesV2({
      imgLastKey: Object.keys(uploads.images).length ? Object.keys(uploads.images)[Object.keys(uploads.images).length - 1] : null,
      fileLastKey: Object.keys(uploads.files).length ? Object.keys(uploads.files)[Object.keys(uploads.files).length - 1] : null,
    }, event.target.files);

    setUploadImage(images);
    setUploadFile(files);
    // Upload images
    queue.add(Object.entries(images).map(([key, { file }]) => ({
      key: 'FILE' + key,
      promise: async () => {
        // Function fake upload
        const { _id } = await uploadImageWithProgressPromise(file, {
          id: 'IMAGE' + key,
          timer,
          onUploadProgress(progress) {
            setUploadImageProgress(key, progress);
          }
        })

        // const { _id } = await addFileToUpload({
        // 	files: file,
        // 	progress: percentCompleted => {
        // 		console.log(`${percentCompleted}%`, key);
        // 		setUploadImageProgress(key, percentCompleted)
        // 	},
        // 	// compressConfig: {
        // 	// 	useCompress: false
        // 	// }
        // })
        delete timer['IMAGE' + key];
        setIDImageUploaded(key, _id);
      }
    })));

    // Upload files
    queue.add(Object.entries(files).map(([key, { file }]) => ({
      key: 'FILE' + key,
      promise: async () => {
        const { _id } = await uploadImageWithProgressPromise(file, {
          id: 'FILE' + key,
          timer,
          speed: 300,
          onUploadProgress(progress) {
            setUploadFileProgress(key, progress);
          }
        })
        // const { _id } = await addFileToUpload({
        //   files: file,
        //   progress: percentCompleted => {
        //     console.log(`${percentCompleted}%`, key);
        //     setUploadFileProgress(key, percentCompleted)
        //   }
        // })
        delete timer['FILE' + key];
        setIDFileUploaded(key, _id);
        return false;
      }
    })));

    if (!queue.isRunning) queue.run();
    return;
  }

  const handleRemoveUpload = (file: FileProps | FilePropsUpload, type: 'FILE' | 'IMAGE') => {
    if ('id' in file) {
      type === 'IMAGE' ? removeUploadedImage(file.id) : removeUploadedFile(file.id);

      queue.cancel(String(type + file.id));
      if (timer[type + file.id]) {
        clearInterval(timer[type + file.id]);
      }
      delete timer[type + file.id];
    } else {
      type === 'IMAGE' ? removeUploadedImage(file._id) : removeUploadedFile(file._id);
    }
  }

  const handleSkip = () => {
    queue.abord();
    Object.values(timer).forEach(t => clearInterval(t));
    removeAllFiles();
    setVisibleForm(true);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-end my-5 space-x-8">
          <div>
            <p className="text-x-large">Phản hồi liên quan</p>
          </div>
          <button
            className={getClassTab(RelatedResponseTab.ALL)}
            onClick={() => setCurrentTab(RelatedResponseTab.ALL)}
          >
            <span className="text-[13px]">Tất cả ({task.amountResponse})</span>
          </button>
          <button
            className={getClassTab(RelatedResponseTab.MARKED)}
            onClick={() => setCurrentTab(RelatedResponseTab.MARKED)}
          >
            <span className="text-[13px]">Đã đánh dấu ({task.amountResponseMarked})</span>
          </button>
        </div>
        <div className="flex justify-center w-10 h-10 rounded-full bg-gray-200">
          <button onClick={() => setIsExpand(!isExpand)}>
            <div className="flex flex-col space-y-1">
              <img
                src={ChevronUpIcon}
                alt="Cheveron Icon"
                className={`${isExpand ? "transform rotate-180" : "transform rotate-0"
                  } w-3`}
              />
              <img
                src={ChevronUpIcon}
                alt="Cheveron Icon"
                className={`${isExpand ? "transform rotate-0" : "transform rotate-180"
                  } w-3`}
              />
            </div>
          </button>
        </div>
      </div>
      {(amountComment && amountComment > 3) ? (
        <p className="mb-5 text-sm text-primary">
          <button onClick={handleViewPrevious}>Xem {amountComment - 3} phản hồi trước</button>
        </p>
      ) : ''}
      <div>
        {state.comments.length ? state.comments.map(response => (
          <RelatedResponseItem key={response._id} expanded={isExpand} response={response} />
        )) : ''}
        {/* <RelatedResponseItem expanded={isExpand} showImageTest={true} /> */}
      </div>

      {visibleForm ? (
        <div className="ml-16">
          <div className="w-full border-2 rounded my-2">
            <textarea
              className="w-full focus: outline-none p-3"
              placeholder="Biên soạn nội dung (sẽ sử dụng thư viện Editor đổ vào khung này-sử dụng Tiny)"
              rows={10}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="mt-3">
            {
              toArray(uploads.files).map((_, index) => <FileUploadRow key={index} index={index} onRemove={handleRemoveUpload} data={_} />)
            }
            <div
              className={
                classNames("flex flex-wrap border custom-scroll overflow-x-hidden relative rounded-md",
                  !Object.keys(uploads.images).length ? "h-0 border-none" : "max-h-[232px] overflow-y-auto border-cbs-border py-3.5 px-4",
                  collapsed ? 'overflow-y-hidden max-h-0' : 'overflow-y-auto'
                )
              }
            >
              <PostImageV2
                images={toArray(uploads.images)}
                onRemove={handleRemoveUpload}
                itemClassName="aspect-ratio-1 relative"
                imageClassName="h-full w-full object-cover"
                className={classNames("grid grid-cols-4 pt-2 pb-3 text-black gap-2 flex-wrap transition-opacity", { 'opacity-0': collapsed })}
              />
            </div>
            <div className="flex justify-between w-full pt-5 pb-6 mb-0.5">
              <div className="flex">
                <label className="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-300 flex justify-center items-center cursor-pointer mr-4">
                  <IconPaperClip className="-rotate-45" />
                  <input type="file" name="files" id="file" className="hidden" accept="application/*" multiple onChange={event => handleSetFiles(event)} />
                </label>
                <label className="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-300 flex justify-center items-center cursor-pointer">
                  <IconImage />
                  <input type="file" name="files" id="file" className="hidden" accept="image/*" multiple onChange={event => handleSetFiles(event)} />
                </label>
              </div>
              <div>
                <button type="button" className="mx-3 px-3 py-2 rounded bg-gray-300 text-primary-gray" onClick={handleSkip}>Bỏ qua</button>
                <button type="button" className="mx-3 px-3 py-2 rounded bg-primary text-white" onClick={handleAddResponse}>Xác nhận</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <button
            className="flex items-center px-3 py-1 rounded-t-sm border-2 hover:bg-gray-200"
            onClick={() => setVisibleForm(true)}
          >
            <img src={IconDownload} alt="Rely" className="w-6" />
            <span className="mx-1 text-[13px]">Phản hồi</span>
          </button>
        </div>
      )}
    </div>
  );
};

const RelatedResponsePage: FC<Props> = ({ task }) => {
  return (
    <CommentProvider>
      <RelatedResponse task={task} />
    </CommentProvider>
  )
}

export default RelatedResponsePage;
