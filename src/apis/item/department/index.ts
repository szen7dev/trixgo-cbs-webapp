import API from "../../repository";

import { ITEM_URL } from '../';

import type { Department } from 'typings/items';

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

async function fetchDetailDepartment(params: any) {
    const { data } = await API.get(
        `${ITEM_URL}/departments`, {
            params: {
                select: 'name sign description contracts company admins',
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

interface DepartmentRepository {
    fetchListDepartment: (params: Department.DepartmentPayload) =>
        Promise<Department.DepartmentResponse>;
    fetchDetailDepartment: (data: Department.DepartmentDetailPayload) => Promise<Department.DepartmentDetailResponse>,
}

export const departmentRepository: DepartmentRepository = {
    fetchListDepartment: async (params) =>
        fetchListDepartment(params),
    fetchDetailDepartment: async (data) => fetchDetailDepartment(data),
}