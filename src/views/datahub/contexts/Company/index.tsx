/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useParams } from "react-router-dom";
import { createContext, FC, useContext } from "react";
import { useDatahubCompany } from "services/hooks/datahub";
import { DatahubCompanies } from "typings/datahub/company";
import { UseQueryResult } from "react-query";
import { ResponseCreateSuccess } from "typings/datahub/api";

const ContractorContext = createContext<UseQueryResult<ResponseCreateSuccess<DatahubCompanies>, unknown>>({} as any);

const ContractorProvider: FC = ({ children }) => {
	const params = useParams<{ id: string }>();
	const data = useDatahubCompany(params.id);

	return <ContractorContext.Provider value={data || {}}>
		{children}
	</ContractorContext.Provider>;
};

const useContractorCompany = () => useContext(ContractorContext);

export { ContractorContext, ContractorProvider, useContractorCompany };