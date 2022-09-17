import API from "../repository";
import type { 
    QueryParam,
    CompaniesResponse,
    CompanyPayload
} from 'typings/companies';

const companyURL = `/api/auth/companies`;

const CompanyRepository = {
    async companyList(payload: QueryParam): Promise<CompaniesResponse> {
        const { data } = await API.get<CompaniesResponse>(
            companyURL, {
                params: {
                    select: '_id name sign taxid email phone cover image address area scale createAt description birthDay website',
                    populates: JSON.stringify({
                        path: "area",
                        select: "_id name"
                    }),
                    ...payload,
                }
            }
        );
        return data;
    },
    async createCompany(payload: CompanyPayload): Promise<any> {
        const { data } = await API.post<any>(
            companyURL,
            payload
        );
        return data;
    },
    async updateCompany(payload: CompanyPayload): Promise<any> {
        const { data } = await API.put<any>(
            companyURL,
            payload
        );
        return data;
    },
};

export default CompanyRepository;