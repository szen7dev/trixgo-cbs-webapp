import API from "../repository";
import type { 
    QueryParam,
    CompaniesResponse
} from 'typings/companies';

const CompanyRepository = {
    async companyList(payload: QueryParam): Promise<CompaniesResponse> {
        const { data } = await API.get<CompaniesResponse>(
            "/api/auth/companies", {
                params: {
                    ...payload,
                }
            }
        );
        return data;
    },
};

export default CompanyRepository;