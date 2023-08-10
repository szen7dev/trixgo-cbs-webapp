/**
 * Libraries
 */
import { FC, ClipboardEvent, useState, useContext, useEffect, useRef } from "react";
import { captureException } from "@sentry/react";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import { toast } from "react-toastify";
import { toArray } from "lodash";

/**
 * Context
 */
import ResponseContext from 'views/pcm/contexts/response/comment.context';

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
import { useAuth } from 'services/hooks/auth/useAuth';
import { useRelatedResponse } from 'services/hooks/useTask';
import { useUpload } from 'services/hooks/useUpload';
import useUploadFile, { modifyUploadedFilesV2, QueueUpload } from "services/hooks/useUploadFile";
import { validateFiles } from 'validation/file';
import { APP_ID } from "apis/localdb";

/**
 * Typings, apis
 */
import TaskRepository from "apis/task";
import { FileProps, FilePropsUpload, ImageProps } from "typings/common";
import { Project } from 'typings/items/project';

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
  project: Project
}

const queue = new QueueUpload();
const LIMIT_PER_PAGE_RESPONSE = 5;

export const RelatedResponse: FC<Props> = ({ project }) => {
  const location = useLocation();
  const divRef = useRef<HTMLDivElement>(null);

  const { current: socket }: any = useSocket();
  const { user } = useAuth();

  const { addResponseAsync, listResponses, totalRecord: totalRecordResponse } = useRelatedResponse({
    params: {
      projectID: project._id,
      switchType: 'PROJECT',
      isGetReaction: false
    },
    isFetch: true
  });

  const { state, dispatch } = useContext(ResponseContext);
  const { addFileToUpload } = useUpload({
    appID: APP_ID.PCM.id,
    companyID: project.company as string,
    projectID: project._id,
    typeUpload: 'in-project',
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

  const [isUploading, setIsUploading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [collapsed] = useState(false);
  const [amountResponse, setAmountResponse] = useState(project.numberOfComment ?? 0);

  const [content, setContent] = useState('');
  const [amountComment, setAmountComment] = useState(totalRecordResponse);
  const [amountCommentBack, setAmountCommentBack] = useState(0);

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
        projectID: project._id,
        switchType: 'PROJECT',
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

  useEffect(() => {
    const dropZone = document.getElementById("response-form");

    const handleDragOver = (e: any) => {
      e.stopPropagation();
      e.preventDefault();
    }

    const handleDrop = (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      if (e.dataTransfer) {
          handleSetFiles(e.dataTransfer.files);
      }
    }

    if (dropZone) {
      dropZone.addEventListener('dragover', handleDragOver);

      // Get file data on drop
      dropZone.addEventListener('drop', handleDrop);
    }

    return () => {
      if(dropZone) {
        dropZone.removeEventListener('dragover', handleDragOver);
        dropZone.removeEventListener('drop', handleDrop);
      }
    }
  }, [])

  const handleSkip = () => {
    queue.abord();
    setContent('');
    removeAllFiles();
  }

  const handleAddResponse = async () => {
    if(!content) {
      return toast.warning('Bạn chưa nhập nội dung cho phản hồi');
    }

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
        projectID: project._id,
        switchType: 'PROJECT',
        type: 2,
        content,
        files,
        images,
      });

      if(error) {
        return toast.warning(message ?? data.message);
      }

      setAmountResponse(amountResponse + 1);
      setContent('');

      dispatch({ type: 'ADD_COMMENT', payload: data });
      toast.success('Tạo phản hồi thành công');

      // socket?.emit('COMMENT_CSS_ADD_COMMENT', {
      //   app: APP_KEY.PCM_PLAN_TASK,
      //   objectID: project._id,
      //   infoComment: data,
      //   commentType: 'RESPONSE',
      //   populates: JSON.stringify({
      //     path: 'project author'
      //   })
      // })

      socket.emit('NOTIFICATION_CSS_RECEIVE_NEW_NOTIFICATION', {
          receivers: data.receivers
      });
    } catch (error: unknown) {
			captureException(error);
      if (typeof error === "string") {
          toast.error(error);
      } else if (error instanceof Error) {
          toast.error(error.message);
      }
    } finally {
      handleSkip();
    }
  }

  const handleViewPrevious = async () => {
    const { error, data } = await TaskRepository.listResponse({
      lastestID: state.comments[0]._id,
      projectID: project._id,
      switchType: 'PROJECT',
      isGetReaction: false,
      limit: LIMIT_PER_PAGE_RESPONSE,
      official: false,
    });

    if (error || !data.listRecords?.length) return;

    setAmountComment(amountComment - LIMIT_PER_PAGE_RESPONSE);
    dispatch({ type: 'VIEW_PREVIOUS_COMMENTS', payload: data.listRecords.reverse() });
  }

  const handleViewNext = async () => {
    const { error, data } = await TaskRepository.listResponse({
      lastestID: state.comments[state.comments.length - 1]._id,
      projectID: project._id,
      switchType: 'PROJECT',
      isGetReaction: false,
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

  const handleSetFiles = async (filesSelected: FileList | null) => {
    if (!filesSelected || !filesSelected.length) return;

    const validation = await validateFiles(filesSelected);
    if(validation.error) return toast.warn(validation.message);

    // Modify file to with key with each file;
    const [files, images] = modifyUploadedFilesV2({
      imgLastKey: Object.keys(uploads.images).length ? Object.keys(uploads.images)[Object.keys(uploads.images).length - 1] : null,
      fileLastKey: Object.keys(uploads.files).length ? Object.keys(uploads.files)[Object.keys(uploads.files).length - 1] : null,
    }, filesSelected);

    setUploadImage(images);
    setUploadFile(files);
    setIsUploading(true);

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

        if(queue.queueLength === 0) {
          setIsUploading(false);
        }
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

        if(queue.queueLength === 0) {
          setIsUploading(false);
        }
        setIDFileUploaded(key, _id);
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

  const handlePasteFile = (event: ClipboardEvent<HTMLTextAreaElement>) => {
    if(event.clipboardData?.files?.length) {
      handleSetFiles(event.clipboardData.files)
    }
  }

  const hashLocation = location.hash.substring(1);

  return (
    <>
      <div className="px-5">
        <div id="response-form">
          <div className="w-full border-2 rounded my-2">
            <textarea
              className="w-full focus:outline-none p-3"
              placeholder="Biên soạn nội dung"
              rows={10}
              onPaste={handlePasteFile}
              value={content}
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
                  {/* accept="application/*" */}
                  <input type="file" name="files" className="hidden" multiple onChange={e => handleSetFiles(e.target.files)} />
                </label>
                <label className="w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-300 flex justify-center items-center cursor-pointer">
                  <IconImage />
                  <input type="file" name="images" className="hidden" accept="image/*" multiple onChange={e => handleSetFiles(e.target.files)} />
                </label>
              </div>
              <div>
                <button type="button" className="mx-3 px-3 py-2 rounded bg-gray-300 text-primary-gray" onClick={handleSkip}>Reset</button>
                <button
                  type="button"
                  className={classNames('mx-3 px-3 py-2 rounded bg-primary text-white', {
                    'disabled:opacity-60': isUploading
                  })}
                  disabled={isUploading}
                  onClick={handleAddResponse}>
                    Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
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
              author={user}
              companyID={project.company as string}
              projectID={project?._id}
              expanded={true}
              isHighlight={hashLocation?.split('_')[1] === response._id}
              divRef={hashLocation?.split('_')[1] === response._id ? divRef : null}
              onClickImage={(images, index) => {
                if (images.length) {
                  setDefaultState({ mediaID: project._id, images, index, createAt: response.createAt })};
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
      </div>
      <ModalZoomView isShow={isShow} toggle={() => setIsShow(!isShow)} initialData={defaultState} />
    </>
  );
};