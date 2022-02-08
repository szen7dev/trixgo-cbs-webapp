import { FC, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

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
import AttachIcon from "assets/images/icons8-attach-50.png";

/**
 * Hooks, typings
 */
import { useTask } from 'services/hooks/useTask';
import { Task } from 'typings/task';

enum RelatedResponseTab {
  ALL = "ALL",
  MARKED = "MARKED",
}

type Props = {
  task: Task
}

const RelatedResponse: FC<Props> = ({ task }) => {
  const { id } = useParams<{ id: string }>();
  const { addResponse, listResponses, totalRecordResponse } = useTask({ taskID: id });
	const { state, dispatch } = useContext(CommentContext);

  const [isExpand, setIsExpand] = useState(false);
  const [visibleForm, setVisibleForm] = useState(false);
  const [content, setContent] = useState('');
  const [amountComment, setAmountComment] = useState(totalRecordResponse);

  const [currentTab, setCurrentTab] = useState(RelatedResponseTab.ALL);

  useEffect(() => {
		dispatch({ type: 'SET_COMMENTS', payload: listResponses });
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

    if(error || !data.listRecords.length) return;

		setAmountComment(amountComment - LIMIT);
    dispatch({ type: 'VIEW_MORE_COMMENTS', payload: data.listRecords });
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
                className={`${
                  isExpand ? "transform rotate-180" : "transform rotate-0"
                } w-3`}
              />
              <img
                src={ChevronUpIcon}
                alt="Cheveron Icon"
                className={`${
                  isExpand ? "transform rotate-0" : "transform rotate-180"
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
          <div className="flex justify-between mt-3">
            <label className="w-10 h-10">
              <img
                src={AttachIcon}
                alt="Icon attach"
                className="h-6 w-6 transform -rotate-45"
              />
              <input
                type="file"
                name="files"
                id="file"
                className="hidden"
                accept="image/*"
                multiple
              />
            </label>

            <div>
              <button
                className="px-3 py-2 rounded bg-gray-300 text-primary-gray"
                onClick={() => setVisibleForm(false)}
              >
                Bỏ qua
              </button>
              <button
                className="mx-3 px-3 py-2 rounded bg-primary text-white"
                onClick={handleAddResponse}
              >
                Xác nhận
              </button>
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
