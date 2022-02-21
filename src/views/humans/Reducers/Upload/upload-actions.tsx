/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { uploadFileTypes } from "./upload-reducer";

import { DispatchAction } from "typings/ppt/reducer";

export const actionsFiles = {
	setUploadFile: (dispatch: DispatchAction) => (payload: any, ...props: any) => dispatch({
		type: uploadFileTypes.SET_UPLOAD_FILE,
		payload: {
			...payload
		},
	}),
	setUploadFileProgress: (dispatch: DispatchAction) => (id: number | string, progress: number) =>
		dispatch({
			type: uploadFileTypes.SET_UPLOAD_FILE_PROGRESS,
			payload: {
				id,
				progress,
			},
		}),
	setIDFileUploaded: (dispatch: DispatchAction) => (id: number | string, key: string, contactDocumentID: string) =>
		dispatch({
			type: uploadFileTypes.SET_ID_FILE_UPLOADED,
			payload: { id, key, contactDocumentID },
		}),
	successUploadFile: (dispatch: DispatchAction) => (id: number) =>
		dispatch({
			type: uploadFileTypes.SUCCESS_UPLOAD_FILE,
			payload: id,
		}),
	failureUploadFile: (dispatch: DispatchAction) => (id: number) =>
		dispatch({
			type: uploadFileTypes.FAILURE_UPLOAD_FILE,
			payload: id,
		}),
	removeUploadedFile: (dispatch: DispatchAction) => (id: number | string) => {
		dispatch({
			type: uploadFileTypes.REMOVE_UPLOADED_FILE,
			payload: id,
		});
		return true;
	},
	removeAllFiles: (dispatch: DispatchAction) => (id?: string) =>
		dispatch({
			type: uploadFileTypes.REMOVE_ALL_FILES,
			payload: id,
		}),
};
