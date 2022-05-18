/*=====DEFINE URL=====*/
import API from "../../repository";
import { BIDDING_URL } from '..';

/*=====TYPING=====*/
import BiddingPlan from 'typings/bidding/biddingPlan';

/*=====INTERFACE DEFINE=====*/
interface BiddingPlanRepository {
    addBiddingPlan: (params: any) => Promise<any>;
    updateBiddingPlan: (params: any) => Promise<any>;
    deleteBiddingPlan: (ids: Array<string>) => Promise<any>;
    fetchListBiddingPlan: (params: BiddingPlan.BiddingPlanQueryPayload) => Promise<BiddingPlan.BiddingPlanQueryResponse>;
    fetchDetailBiddingPlan: (params?: BiddingPlan.BiddingPlanQueryPayload) => Promise<BiddingPlan.BiddingPlanQueryDetailResponse>;
    fetchContractorSelection: (params: any) => Promise<any>;
}

export const BiddingPlanRepository: BiddingPlanRepository = {
    addBiddingPlan: (params: any) => addBiddingPlan(params),
    updateBiddingPlan: (params: any) => updateBiddingPlan(params),
    deleteBiddingPlan: (ids: Array<string>) => deleteBiddingPlan(ids),
    fetchListBiddingPlan: async (params) => fetchListBiddingPlan(params),
    fetchDetailBiddingPlan: async (params) => fetchListBiddingPlan(params),
    fetchContractorSelection: async (params) => contractorSelection(params),
}

/*=====APIS=====*/
// Get List|Info
async function fetchListBiddingPlan(params: any) {
    const { data } = await API.get(
        `${BIDDING_URL}/bidding_plans`, {
        params: {
            select: '_id project name sign type packagePrice startTime finishTime form contractType duration status bidder note userCreate percentOfCompletedPackage',
            populates: {
                path: 'project userCreate bidder',
                select: '_id name sign bizfullname',
            },
            limit: 20,
            ...params
        }
    }
    )
    return data;
}

// Create
async function addBiddingPlan(params: any) {
    const { data } = await API.post(
        `${BIDDING_URL}/bidding_plans`, params);

    return data;
}

// Update
async function updateBiddingPlan(params: any) {
    const { data } = await API.put(
        `${BIDDING_URL}/bidding_plans`, params);

    return data;
}

// Delete
async function deleteBiddingPlan(params: any) {
    const { data } = await API.delete(
        `${BIDDING_URL}/bidding_plans`, { params }
    );

    return data;
}

// Báo cáo lựa chọn nhà thầu
async function contractorSelection(params: any) {
    const { data } = await API.get(
        `${BIDDING_URL}/bidding_plans/contractor-selection`, { params }
    );
    return data;
}