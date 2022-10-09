import API from "../../repository";

import {
    PackageQueryPayload,
    PackageQueryListResponse
} from 'typings/document/package';
import { convertObToUrl } from "utils";

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

// Danh sách document package
async function fetchListPackage(params: any) {
    const { data } = await API.get(`${PACKAGE_URL}/document_packages`, {
        params: {
            select: 'name sign project numberOfDocs members author createAt modifyAt userCreate userUpdate',
            populates: {
                "path":"members author userCreate userUpdate",
                "select": "fullname bizfullname image"
            },
            ...params
        }
    });
    return data;
}

// KHU VỰC NÀY ĐỆ VIẾT
const DocumentPackageRepository = {
    // Danh sách gói thầu
    async listPackage(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${PACKAGE_URL}/document_packages?${convertObToUrl({
                select: 'id project name sign type packagePrice startTime finishTime form contractType duration status bidder note percentOfCompletedPackage members createAt modifyAt userCreate userUpdate',
                // populates: {
                //     "path":"userCreate userUpdate",
                //     "select": "fullname bizfullname image"
                // },
                ...payload,
            })}`
        );
        return data;
    },

    // insert package
    async insertPackage(payload: any): Promise<any> {
        const { data } = await API.post<any>(
            `${PACKAGE_URL}/document_packages`, payload
        );
        return data;
    },

    // update package
    async updatePackage(payload: any): Promise<any> {
        const { data } = await API.put<any>(
            `${PACKAGE_URL}/document_packages`, payload
        );
        return data;
    },
    
    // remove many package
    async removeManyPackage(payload: any): Promise<any> {
        const { data } = await API.delete<any>(
            `${PACKAGE_URL}/document_packages/remove-many`, { params: payload }
        );
        return data;
    },

    // info package
    async infoPackage(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${PACKAGE_URL}/document_packages?${convertObToUrl({
                // select: "name sign members userUpdate project",
                populates: JSON.stringify({
                    path: "members",
                    select: "_id bizfullname email level image"
                }),
                ...payload,
            })}`
        );
        return data;
    },

};

export default DocumentPackageRepository;
