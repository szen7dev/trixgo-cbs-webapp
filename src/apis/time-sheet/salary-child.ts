import {
    fetchListSalary,
    insertSalary,
    updateSalary,
    deleteSalary,
} from './salary-parent';

import type {
    QueryListSalaryChildPayload,
    QuerySalaryChildResponse,
    InsertSalaryChildPayload,
    InsertSalaryChildResponse,
    UpdateSalaryChildPayload,
    UpdateSalaryChildResponse,
    DeleteSalaryChildPayload,
    DeleteSalaryChildResponse,
} from 'typings/salary';

interface SalaryChildRepository {
    fetchListSalary: (params: QueryListSalaryChildPayload) => Promise<QuerySalaryChildResponse>;
    insertSalary: (payload: InsertSalaryChildPayload) => Promise<InsertSalaryChildResponse>;
    updateSalary: (payload: UpdateSalaryChildPayload) => Promise<UpdateSalaryChildResponse>;
    deleteSalary: (payload: DeleteSalaryChildPayload) => Promise<DeleteSalaryChildResponse>;
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
    deleteSalary: async (payload) => {
        return deleteSalary(payload)
    },
}
