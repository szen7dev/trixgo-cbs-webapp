import API from "../../repository";

import {
    PackageQueryPayload,
    PackageQueryListResponse
} from 'typings/document/package';

const PACKAGE_URL = "/api/document";

interface PackageRepository {
    fetchListPackage: (params: PackageQueryPayload) => Promise<PackageQueryListResponse>;
}

export const packageRepository: PackageRepository = {
    fetchListPackage: async (params) => {
        if (!params.departmentID) {
            return {};
        }
        return fetchListPackage(params)
    },
}

async function fetchListPackage(params: any) {
    const { data } = await API.get(`${PACKAGE_URL}/document_packages`, {
        params: {
            select: 'name sign project numberOfDocs members author createAt modifyAt',
            populates: {
                "path":"members author",
                "select": "fullname image"
            },
            ...params
        }
    });
    return data;
}