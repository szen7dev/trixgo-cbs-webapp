import { useMutation } from 'react-query';

import { DocumentChildRepository } from 'apis/document';

import type {
    DocumentChildInserPayload,
    DocumentChildInserResponse,
    DocumentChildUpdatePayload,
    DocumentChildUpdateResponse,
} from 'typings/document/document-child';

interface UseMutationDocumentChild {
    inserDocumentChildAsync: (payload: DocumentChildInserPayload) => Promise<DocumentChildInserResponse>;
    updateDocumentChildAsync: (payload: DocumentChildUpdatePayload) => Promise<DocumentChildUpdateResponse>;
}

export const useMutationDocumentChild = (): UseMutationDocumentChild => {
    const {mutateAsync: inserDocumentChildAsync} = useMutation((payload: any) => DocumentChildRepository.insert(payload));

    const {mutateAsync: updateDocumentChildAsync} = useMutation((payload: any) => DocumentChildRepository.update(payload));

    return {
        inserDocumentChildAsync,
        updateDocumentChildAsync
    }
}
