import API from "../repository";

import { TIME_SHEET_URL } from '.';

import type {
    ListTimeSheetPayload,
    QueryTimeSheetParentResponse,
    InsertTimeSheetParentPayload,
    InsertTimeSheetParentResponse,
    UpdateTimeSheetParentPayload,
    UpdateTimeSheetParentResponse,
    DeleteTimeSheetParentPayload,
    DeleteTimeSheetParentResponse
} from 'typings/time-sheet';

export async function fetchListTimeSheet<T>(params?: ListTimeSheetPayload): Promise<T> {
    const { data } = await API.get(
        `${TIME_SHEET_URL}/expert_timesheets`, {
        params: {
            populates: {
                "path": "assignee project",
                "select": "fullname name"
            },
            ...params,
        }
    }
    )
    return data;
}

export async function insertTimeSheet<P, R>(payload: P): Promise<R> {
    const { data } = await API.post(`${TIME_SHEET_URL}/expert_timesheets`, payload);
    return data;
}

export async function updateTimeSheet<P, R>(payload: P): Promise<R> {
    const { data } = await API.put(`${TIME_SHEET_URL}/expert_timesheets`, payload);
    return data;
}

export async function deleteTimeSheet<P, R>(payload: P): Promise<R> {
    const { data } = await API.delete(`${TIME_SHEET_URL}/expert_timesheets`, payload);
    return data;
}

interface TimeSheetParentRepository {
    fetchListTimeSheet: (params: ListTimeSheetPayload) => Promise<QueryTimeSheetParentResponse>;
    insertTimeSheet: (payload: InsertTimeSheetParentPayload) => Promise<InsertTimeSheetParentResponse>;
    updateTimeSheet: (payload: UpdateTimeSheetParentPayload) => Promise<UpdateTimeSheetParentResponse>;
    deleteTimeSheet: (payload: DeleteTimeSheetParentPayload) => Promise<DeleteTimeSheetParentResponse>;
}

export const timeSheetParentRepository: TimeSheetParentRepository = {
    fetchListTimeSheet: async (params) => {
        return fetchListTimeSheet(params)
    },
    insertTimeSheet: async (payload) => {
        return insertTimeSheet(payload)
    },
    updateTimeSheet: (payload) => {
        return updateTimeSheet(payload);
    },
    deleteTimeSheet: (payload) => {
        return deleteTimeSheet(payload);
    }
}
