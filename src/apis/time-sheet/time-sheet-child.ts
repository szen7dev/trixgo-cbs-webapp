import {
    fetchListTimeSheet,
    insertTimeSheet,
    updateTimeSheet
} from './time-sheet-parent';

import type {
    QueryListTimeSheetChildPayload,
    QueryTimeSheetChildResponse,
    InsertTimeSheetChildPayload,
    InsertTimeSheetChildResponse,
    UpdateTimeSheetChildPayload,
    UpdateTimeSheetChildResponse
} from 'typings/time-sheet';

interface TimeSheetChildRepository {
    fetchListTimeSheet: (params: QueryListTimeSheetChildPayload) => Promise<QueryTimeSheetChildResponse>;
    insertTimeSheet: (payload: InsertTimeSheetChildPayload) => Promise<InsertTimeSheetChildResponse>;
    updateTimeSheet: (payload: UpdateTimeSheetChildPayload) => Promise<UpdateTimeSheetChildResponse>;
}

export const timeSheetChildRepository: TimeSheetChildRepository = {
    fetchListTimeSheet: async (params) => {
        return fetchListTimeSheet(params)
    },
    insertTimeSheet: async (payload) => {
        return insertTimeSheet(payload)
    },
    updateTimeSheet: async (payload) => {
        return updateTimeSheet(payload)
    },
}
