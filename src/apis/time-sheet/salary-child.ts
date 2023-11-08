import {
    fetchListSalary,
    insertSalary,
    updateSalary
} from './salary-parent';

import type {
    QueryListSalaryChildPayload,
    QuerySalaryChildResponse,
    InsertSalaryChildPayload,
    InsertSalaryChildResponse,
    UpdateSalaryChildPayload,
    UpdateSalaryChildResponse
} from 'typings/salary';

interface SalaryChildRepository {
    fetchListSalary: (params: QueryListSalaryChildPayload) => Promise<QuerySalaryChildResponse>;
    insertSalary: (payload: InsertSalaryChildPayload) => Promise<InsertSalaryChildResponse>;
    updateSalary: (payload: UpdateSalaryChildPayload) => Promise<UpdateSalaryChildResponse>;
}

export const salaryChildRepository: SalaryChildRepository = {
    fetchListSalary: async (params) => {
        return fetchListSalary(params)
    },
    insertSalary: async (payload) => {
        return insertSalary(payload)
    },
    updateSalary: async (payload) => {
        return updateSalary(payload)
    },
}