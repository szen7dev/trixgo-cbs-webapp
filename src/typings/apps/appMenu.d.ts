import { Company } from 'typings/items/commons';
import { User } from 'typings/user';
import type { QueryParam, APIResponse } from '../common';

/**
 * SCHEMA APP MENU
 */
export type AppMenu = {
    _id: string;
    name: string;
    read: number;
    create: number;
    update: number;
    delete: number;
    company: Company | string;
    userCreate: User | string;
    modifyAt: string;
    createAt: string;
}

/**
 * SCHEMA RESPONSE LIST COMPANY
 */
export type AppMenuListCompany = {
    _id: {
        company: {
            _id: string;
            name: string;
            sign: string;
            image: string;
        }
    }
}

/**
 * PARAMS LIST COMPANY
 */
export type AppMenuListCompanyParams = {
    menuID?: string;
    appID?: string;
    type?: string;
}

/**
 * RESPONSE LIST COMPANY
 */
export interface AppMenuListCompanyResponse extends APIResponse {
    data: AppMenuListCompany[];
}