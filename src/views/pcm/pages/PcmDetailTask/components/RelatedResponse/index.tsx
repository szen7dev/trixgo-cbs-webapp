/**
 * Libraries
 */
import { FC, useState, useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import { toast } from "react-toastify";
import { toArray } from "lodash";

/**
 * Context
 */
import CommentProvider from 'views/pcm/contexts/response/comment.provider';
import CommentContext from 'views/pcm/contexts/response/comment.context';

/**
 * Assets
 */
import IconDownload from "assets/images/icons8-reply-arrow-96.svg";
import ChevronUpIcon from "assets/images/icon-chevron-up.png";
import { IconPaperClip, IconImage } from "shareComponents/common/Icon";

/**
 * Hooks, custom
 */
import { useSocket } from "services/hooks/useSocket";
import { useAuth } from 'services/hooks/useAuth';
import { useTask } from 'services/hooks/useTask';
import { useUpload } from 'services/hooks/useUpload';
import useUploadFile, { modifyUploadedFilesV2, QueueUpload } from "services/hooks/useUploadFile";
import { APP_KEY } from "utils/constants";

/**
 * Typings, apis
 */
import TaskRepository from "apis/task";
import { FileProps, FilePropsUpload, ImageProps } from "typings/common";
import { Task } from 'typings/task';

/** 
 * Component
 */
import { RelatedResponseItem } from "../RelatedResponseItem";
import { LoadImage } from "views/pcm/shareComponents/common";
import { FileUploadRow } from "views/pcm/shareComponents/common";
import { ModalZoomView } from "shareComponents/common";

enum RelatedResponseTab {
  ALL = "ALL",
  MARKED = "MARKED",
}

type Props = {
  task: Task
}

const queue = new QueueUpload();
const LIMIT_PER_PAGE_RESPONSE = 5;
 
const Response: FC<Props> = ({ task }) => {
  const location = useLocation();
  const divRef = useRef<HTMLDivElement>(null);

  const [isUpload, setIsUpload] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [collapsed] = useState(false);
  const [currentTab, setCurrentTab] = useState(RelatedResponseTab.ALL);

  const [amountResponse, setAmountResponse] = useState(task.amountResponse ?? 0);
  const [amountMarkedResponse, setAmountMarkedResponse] = useState(task.amountMarkedResponse ?? 0);

  const { user } = useAuth();
  const { addResponseAsync, listResponses, refetchListResponse, totalRecordResponse } = useTask({ taskID: task._id, isFetch: true });
  const { listResponses: listResponsesMarked, refetchListResponse: refetchListResponseMarked, totalRecordResponse: totalRecordResponseMarked } = useTask({ 
    taskID: task._id, official: true, isFetch: false
  });

  const { state, dispatch } = useContext(CommentContext);
  const { addFileToUpload } = useUpload({
    appID: APP_KEY.PCM_PLAN_TASK,
    companyID: task?.company?._id,
    projectID: task?.project?._id,
    groupID: task?.group?._id
  });

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
  const [amountCommentBack, setAmountCommentBack] = useState(0);
  const { current: socket }: any = useSocket();

  // State manage image comments
  const [defaultState, setDefaultState] = useState({ 
    mediaID: '', 
    images: [] as ImageProps[], 
    index: 0,
    createAt: ""
  });

  useEffect(() => {
    listResponses && dispatch({ type: 'SET_COMMENTS', payload: listResponses.reverse() });
  }, [listResponses.length])

  useEffect(() => {
    setAmountComment(totalRecordResponse);
  }, [totalRecordResponse])

  useEffect(() => {
    if(!location.hash) return;

    (async () => {
      const hash = location.hash.substring(1);
      const [prefix, commentID] = hash.split('_');

      if(prefix !== 'response') return;

      const response = await TaskRepository.searchResponseById({
        taskID: task._id,
        commentID: commentID
      });

      if(response.status === 200) {
        const { listRecords, totalRecordBack, totalRecordFront } = response.data;
        setAmountComment(totalRecordFront);
        setAmountCommentBack(totalRecordBack);
        dispatch({ type: 'SET_COMMENTS', payload: listRecords });

        divRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    })();
  }, [location.hash])

  const listenEventAddResponse = (result: any) => {
    const { data, error } = result;

    if(error || amountCommentBack) return;

    const { infoObject, infoComment } = data;

    if(infoObject?._id !== task._id) return;
    if(user?._id === infoComment?.author?._id) return;

    dispatch({ type: 'ADD_COMMENT', payload: infoComment });
  }

  useEffect(() => {
    if(!socket) return;

    // socket.off("COMMENT_SSC_ADD_COMMENT", listenEventAddResponse);
		socket.on("COMMENT_SSC_ADD_COMMENT", listenEventAddResponse);
  }, [socket])

  const getClassTab = (tab: RelatedResponseTab) => {
    return currentTab === tab
      ? "border-b-2 border-primary font-bold"
      : "text-primary-gray";
  };

  const handleAddResponse = async () => {
    if(!content) {
      return toast.warning('Bạn chưa nhập nội dung cho phản hồi');
    }

    setVisibleForm(false);

    let images: string[] = [];
    let files: string[] = [];

    // Get messageList file uploaded
    for (const [, { _id }] of Object.entries(uploads.images)) {
        _id && (images = [...images, _id]);
    }

    for (const [, { _id }] of Object.entries(uploads.files)) {
        _id && (files = [...files, _id]);
    }

    try {
      const { error, data, message } = await addResponseAsync({
        taskID: task._id,
        type: 2,
        content,
        files,
        images,
      });

      if(error) {
        return toast.warning(message)
      }

      setAmountResponse(amountResponse + 1);
      dispatch({ type: 'ADD_COMMENT', payload: data });
      toast.success('Tạo phản hồi thành công');

      socket?.emit('COMMENT_CSS_ADD_COMMENT', {
        app: APP_KEY.PCM_PLAN_TASK,
        objectID: task._id,
        infoComment: data
      })

      socket.emit('NOTIFICATION_CSS_RECEIVE_NEW_NOTIFICATION', {
          receivers: data.receivers
      });
    } catch (error: unknown) {
      if (typeof error === "string") {
          toast.error(error);
      } else if (error instanceof Error) {
          toast.error(error.message);
      }
    }
  }

  const handleViewPrevious = async () => {
    const { error, data } = await TaskRepository.listResponse({
      lastestID: state.comments[0]._id,
      taskID: task._id,
      limit: LIMIT_PER_PAGE_RESPONSE,
      official: currentTab === 'MARKED' ? true : false,
    });

    if (error || !data.listRecords.length) return;

    setAmountComment(amountComment - LIMIT_PER_PAGE_RESPONSE);
    dispatch({ type: 'VIEW_PREVIOUS_COMMENTS', payload: data.listRecords.reverse() });
  }

  const handleViewNext = async () => {
    const { error, data } = await TaskRepository.listResponse({
      lastestID: state.comments[state.comments.length - 1]._id,
      taskID: task._id,
      limit: LIMIT_PER_PAGE_RESPONSE,
      official: false,
      sortKey: JSON.stringify({
        keys: ['createAt__1', '_id__1']
      })
    });

    if (error || !data.listRecords.length) return;

    setAmountCommentBack(amountCommentBack - LIMIT_PER_PAGE_RESPONSE);
    dispatch({ type: 'VIEW_MORE_COMMENTS', payload: data.listRecords.reverse() });
  }

  const handleSetFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return;

    // Modify file to with key with each file;
    const [files, images] = modifyUploadedFilesV2({
      imgLastKey: Object.keys(uploads.images).length ? Object.keys(uploads.images)[Object.keys(uploads.images).length - 1] : null,
      fileLastKey: Object.keys(uploads.files).length ? Object.keys(uploads.files)[Object.keys(uploads.files).length - 1] : null,
    }, event.target.files);

    setUploadImage(images);
    setUploadFile(files);
    setIsUpload(true);

    const filesLength = Object.entries(images).length + Object.entries(files).length;

    // Upload images
    queue.add(Object.entries(images).map(([key, { file }]) => ({
      key: 'FILE' + key,
      promise: async () => {
        const { _id } = await addFileToUpload({
          files: file,
          fileType: 1,
          useCompress: true,
          progress: percentCompleted => {
              console.log(`${percentCompleted}%`, key);
              setUploadImageProgress(key, percentCompleted)
          },
        })

        console.log({ tasks: queue.tasksDone, filesLength, running: queue.isRunning })
        // if(queue.tasksDone.length === Object.entries(images).length) {
        //   setIsUpload(false);
        // }

        setIDImageUploaded(key, _id);
      }
    })));

    // Upload files
    queue.add(Object.entries(files).map(([key, { file }]) => ({
      key: 'FILE' + key,
      promise: async () => {
        const { _id } = await addFileToUpload({
          files: file,
          fileType: 2,
          useCompress: true,
          progress: percentCompleted => {
            console.log(`${percentCompleted}%`, key);
            setUploadFileProgress(key, percentCompleted)
          }
        })

        console.log({ tasks: queue.tasksDone, filesLength, running: queue.isRunning })
        // if(queue.tasksDone.length === Object.entries(files).length) {
        //   setIsUpload(false);
        // }

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
    } else {
      type === 'IMAGE' ? removeUploadedImage(file._id) : removeUploadedFile(file._id);
    }
  }

  const handleSkip = () => {
    queue.abord();
    removeAllFiles();
    setVisibleForm(false);
  }

  const onClickTabAll = () => {
    setCurrentTab(RelatedResponseTab.ALL);
    dispatch({ type: 'SET_COMMENTS', payload: listResponses.reverse() });
    refetchListResponse();
    setAmountComment(totalRecordResponse);
    setAmountCommentBack(0);
  }

  // const onClickTabMarked = () => {
  //   setCurrentTab(RelatedResponseTab.MARKED);
  //   dispatch({ type: 'SET_COMMENTS', payload: listResponsesMarked.reverse() });
  //   refetchListResponseMarked();
  //   setAmountComment(totalRecordResponseMarked);
  //   setAmountCommentBack(0);
  // }

  const hashLocation = location.hash.substring(1);

  return (
    <>
      <div>
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-end my-5 space-x-8">
            <div>
              <p className="text-x-large">Phản hồi liên quan</p>
            </div>
            <button
              className={getClassTab(RelatedResponseTab.ALL)}
              onClick={onClickTabAll}
            >
              <span className="text-[13px]">Tất cả ({amountResponse})</span>
            </button>
            {/* <button
              className={getClassTab(RelatedResponseTab.MARKED)}
              onClick={onClickTabMarked}
            >
              <span className="text-[13px]">Đã đánh dấu ({amountMarkedResponse})</span>
            </button> */}
          </div>
          <div className="flex justify-center w-10 h-10 rounded-full bg-gray-200">
            <button className="w-full" onClick={() => setIsExpand(!isExpand)}>
              <div className="flex flex-col items-center space-y-1">
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
        {(amountComment && amountComment > LIMIT_PER_PAGE_RESPONSE) ? (
          <p className="mb-5 text-sm text-primary">
            <button onClick={handleViewPrevious}>Xem {amountComment - LIMIT_PER_PAGE_RESPONSE} phản hồi trước</button>
          </p>
        ) : ''}
        <div>
          {state.comments.length ? state.comments.map(response => (
            <RelatedResponseItem 
              key={response._id}
              response={response}
              expanded={isExpand}
              isHighlight={hashLocation?.split('_')[1] === response._id}
              divRef={hashLocation?.split('_')[1] === response._id ? divRef : null}
              setAmountMarkedResponse={setAmountMarkedResponse}
              refetchListResponseMarked={refetchListResponseMarked}
              onClickImage={(images, index) => {
                if (images.length) {
                  setDefaultState({ mediaID: task._id, images, index, createAt: response.createAt })};
                  setIsShow(true);
                }
              }
            />
          )) : ''}
        </div>
        {(amountCommentBack && amountCommentBack > LIMIT_PER_PAGE_RESPONSE) ? (
          <p className="mb-5 text-sm text-primary">
            <button onClick={handleViewNext}>Xem {amountCommentBack - LIMIT_PER_PAGE_RESPONSE} phản hồi sau</button>
          </p>
        ) : ''}
        {visibleForm ? (
          <div className="ml-16">
            <div className="w-full border-2 rounded my-2">
              <textarea
                className="w-full focus: outline-none p-3"
                placeholder="Biên soạn nội dung"
                rows={10}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="mt-3">
              {toArray(uploads.files).map((_, index) => <FileUploadRow key={index} index={index} onRemove={handleRemoveUpload} data={_} />)}
              <div
                className={
                  classNames("flex flex-wrap border custom-scroll overflow-x-hidden relative rounded-md",
                    !Object.keys(uploads.images).length ? "h-0 border-none" : "max-h-[232px] overflow-y-auto border-cbs-border py-3.5 px-4",
                    collapsed ? 'overflow-y-hidden max-h-0' : 'overflow-y-auto'
                  )
                }
              >
                <LoadImage
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
                  <button 
                    type="button" 
                    className="mx-3 px-3 py-2 rounded bg-primary text-white" 
                    onClick={handleAddResponse} 
                    disabled={isUpload}>
                      Xác nhận
                  </button>
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
      <ModalZoomView isShow={isShow} toggle={()=> setIsShow(!isShow)} initialData={defaultState} />
    </>
  );
};
 
export const RelatedResponse: FC<Props> = ({ task }) => {
  return (
    <CommentProvider>
      <Response task={task} />
    </CommentProvider>
  )
}