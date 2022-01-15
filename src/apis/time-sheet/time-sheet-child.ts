import {
    fetchListTimeSheet,
    // insertTimeSheet,
    // updateTimeSheet,
    // deleteTimeSheet
} from './time-sheet-parent';

import type {
    QueryListTimeSheetChildPayload,
    QueryTimeSheetChildResponse,
} from 'typings/time-sheet';

interface TimeSheetChildRepository {
    fetchListTimeSheet: (params: QueryListTimeSheetChildPayload) => Promise<QueryTimeSheetChildResponse>;
}

export const timeSheetChildRepository: TimeSheetChildRepository = {
    fetchListTimeSheet: async (params) => {
        return fetchListTimeSheet(params)
    },
}