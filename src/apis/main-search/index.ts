import API from "../repository";
// import { convertObToUrl } from "utils";

import {
    SearchResultResponse,
    SearchPayload
} from "typings/main-search";

const searchURL = "/api/subject_pcm/pcm_plan_tasks/filter";

const MainSearchRepository = {
    // async mainSearch(payload: SearchPayload): Promise<SearchResultResponse> {
    //     const { data } = await API.get<SearchResultResponse>(
    //         `${searchURL}?${convertObToUrl(payload)}`
    //     );
    //     return data;
    // },
    async mainSearch(payload: SearchPayload): Promise<SearchResultResponse> {
        const { data } = await API.post<SearchResultResponse>(
            searchURL, payload
        );
        return data;
    },
};

export default MainSearchRepository;
