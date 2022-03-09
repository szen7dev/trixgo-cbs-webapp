import API from "../../repository";

import { ITEM_URL } from '../';
import { convertObToUrl } from "utils";

import type { Department } from 'typings/items';
import { ParamsApi, ResponseData, ResponseList } from "typings/apis/response";
import { UserInCompanyContract } from "typings/auth";

async function fetchListDepartment(params: any) {
    const { data } = await API.get(
        `${ITEM_URL}/departments`, {
        params: {
            populates: {
                "path": "members",
                "select": "fullname bizfullname name sign image"
            },
            filter: { "name": 1, "description": 1, "sign": 1, "members": 0 },
            ...params
        }
    }
    )
    return data;
}

async function fetchListDepartmentIsMember(params: any) {
    const { data } = await API.get(
        `${ITEM_URL}/list-department-is-members`, {
        params: {
            select: "name description sign company startTime expiredTime milestones numberOfDocs completedMilestones stage createAt members",
            populates: {
                "path": "members",
                "select": "fullname bizfullname name sign image"
            },
            ...params
        }
    }
    )
    return data;
}

async function fetchDetailDepartment(params: any) {
    const { data } = await API.get(
        `${ITEM_URL}/departments`, {
        params: {
            select: 'name sign description contracts company admins members',
            populates: {
                path: 'company',
                select: '_id name sign',
            },
            ...params,
        }
    }
    )
    return data;
}

async function insertDepartments(payload: any) {
    const { data } = await API.post<any>(
        `${ITEM_URL}/departments`,
        payload
    );
    return data;
};

async function updateDepartments(payload: any) {
    const { data } = await API.put<any>(
        `${ITEM_URL}/departments`,
        payload
    );
    return data;
};

interface DepartmentRepository {
    fetchListDepartment: (params: any) => Promise<any>;
    fetchListDepartmentIsMember: (params: any) => Promise<any>;
    fetchDetailDepartment: (data: Department.DepartmentDetailPayload) => Promise<Department.DepartmentDetailResponse>,
    insertDepartments: (data: any) => Promise<any>,
    updateDepartments: (data: any) => Promise<any>,
}

export const departmentRepository: DepartmentRepository = {
    fetchListDepartment: async (params) => fetchListDepartment(params),
    fetchListDepartmentIsMember: async (params) => fetchListDepartmentIsMember(params),
    fetchDetailDepartment: async (data) => fetchDetailDepartment(data),
    insertDepartments: async (payload) => insertDepartments(payload),
    updateDepartments: async (payload) => updateDepartments(payload),
}

export const DepartmentRepositories = {

	// 10. DANH SÁCH DANH BẠ CÓ LINK_USER TRONG CÔNG TY
	async getListUserInCompanyContract(params: { companyID: string, isLinkUser?: number } & ParamsApi) {
		const { data } = await API.get<ResponseList<UserInCompanyContract>>('/api/item/contacts', { params });
		return data;
	},
	// THÔNG TIN DỰ ÁN
	async getInfoDepartment(params: { departmentID: string } & ParamsApi) {
		const { data } = await API.get<ResponseData<Department.Department>>('/api/item/departments', { params });
		return data;
	},
	// 8. THÊM THÀNH VIÊN VÀO DỰ ÁN
	async addOrRemoveMemberToDepartment(body:{ departmentID: string, members?: string[], admins?: string[], adminsRemove?: string[],membersRemove?: string[] }) {
		const { data } = await API.put<ResponseData<Department.Department>>('/api/item/departments', body);
		return data;
	},

    // DANH SÁCH THÀNH VIÊN TRONG DỰ ÁN
    async getListUserInProject(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `/api/auth/users?${convertObToUrl({
                select: "bizfullname email image",
                limit: 20,
                ...payload,
            })}`
        );
        return data;
    },
}