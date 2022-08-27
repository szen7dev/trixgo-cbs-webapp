/*=====DEFINE URL=====*/
import API from "../../repository";
import { ITEM_URL } from '..';

/*=====TYPING=====*/
import { DepartmentDirectory } from 'typings/items';

/*=====INTERFACE DEFINE=====*/
interface DepartmentDirectoryRepository {
    addDepartmentDirectory: (params: any) => Promise<any>;
    updateDepartmentDirectory: (params: any) => Promise<any>;
    deleteDepartmentDirectory: (ids: Array<string>) => Promise<any>;
    fetchListDepartmentDirectory: (params: DepartmentDirectory.DepartmentDirectoryQueryPayload) => Promise<DepartmentDirectory.DepartmentDirectoryQueryResponse>;
    fetchDetailDepartmentDirectory: ( params?: DepartmentDirectory.DepartmentDirectoryQueryPayload) => Promise<DepartmentDirectory.DepartmentDirectoryQueryDetailResponse>;
}

export const departmentDirectoryRepository: DepartmentDirectoryRepository = {
    addDepartmentDirectory: (params: any) => addDepartmentDirectory(params),
    updateDepartmentDirectory: (params: any) => updateDepartmentDirectory(params),
    deleteDepartmentDirectory: (ids: Array<string>) => deleteDepartmentDirectory(ids),
    fetchListDepartmentDirectory: async (params) => fetchListDepartmentDirectory(params),
    fetchDetailDepartmentDirectory: async (params) => fetchListDepartmentDirectory(params),
}

/*=====APIS=====*/
// Get List|Info
async function fetchListDepartmentDirectory(params: any) {
    const { data } = await API.get(
        `${ITEM_URL}/department_directories`, {
        params: {
            select: 'member type name description lock order',
            populates: {
                path: 'member company',
                select: 'fullname name phone email image'
            },
            ...params
        }
    }
    )
    return data;
}

// Create
async function addDepartmentDirectory(params: any) {
    const { data } = await API.post(
        `${ITEM_URL}/department_directories`, params);
        
    return data;
}

// Update
async function updateDepartmentDirectory(params: any) {
    const { data } = await API.put(
        `${ITEM_URL}/department_directories`, params);

    return data;
}

// Delete
async function deleteDepartmentDirectory(ids: Array<string>) {
    const { data } = await API.delete(
        `${ITEM_URL}/department_directories`, {
            params: {
                departmentDirectoryID: ids
            }
        });

    return data;
}