import type { APIResponse } from './commons';

export interface MutationInspectionDocsPayload {
    areaID: string;
    assigneeID: string;
    authorAttachs: string[],
    contractID: string;
    description: string;
    expiredHour: string;
    expiredTime: string;
    groupID: string;
    name: string;
    projectID: string;
    relatedIDs: string[];
    startTime: string;
    templateID: string;
}

export type CreateInspectionDocsResponse = APIResponse;