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

async function fetchListDepartmentIsMember(params: any) {
    const { data } = await API.get(
        `${ITEM_URL}/list-department-is-members`, {
        params: {
            select: "name description sign company startTime expiredTime milestones completedMilestones stage createAt members",
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