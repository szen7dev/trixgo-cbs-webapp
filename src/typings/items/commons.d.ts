export interface APIResponse {
    error?: boolean;
    status?: number;
}

export interface Populate {
    path?: string;
    select?: string;
    populate?: Populate
}

export interface QueryParam {
    limit?: number;
    lastestID?: string;
    keyword?: string;
    select?: string;
    populates?: Populate;
}

export interface Company {
    name: string;
    sign: string;
    _id: string;
}

export interface Human {
    _id: string;
    fullname?: string;
    bizfullname?: string;
    image?: string;
}

export interface EducationBackground {
    name: string;
    _id: string;
}

export interface CertificateType {
    name: string;
    _id: string;
}
export interface CertificateName {
    name: string;
    _id: string;
}

export interface Position {
    _id: string;
    name: string;
    description?: string;
    parent?: {
        _id: string;
        level: number;
        name: string;
    };
}

export interface ContractType {
    name: string;
    _id: string;
    sign?: string;
    project?: {
        projectType: number;
        buildingGrade: number;
    };
}
export interface File {
    name: string;
    nameOrg: string;
    size: number;
    _id: string;
    url: string;
    createAt: string;
    userCreate: {
        fullname: string;
    }
}

/**
 * Lĩnh vực chuyên môn
 * Chuyên ngành đào tạo
*/
export interface Field2 {
    name: string;
    _id: string;
}
