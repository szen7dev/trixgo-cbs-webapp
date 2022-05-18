/*=====DEFINE URL=====*/
import API from "../../repository";
import { BIDDING_URL } from '..';

/*=====TYPING=====*/
import BiddingDoc from 'typings/bidding/biddingDoc';

/*=====INTERFACE DEFINE=====*/
interface BiddingDocRepository {
    addBiddingDoc: (params: any) => Promise<any>;
    updateBiddingDoc: (params: any) => Promise<any>;
    deleteBiddingDoc: (ids: Array<string>) => Promise<any>;
    fetchListBiddingDoc: (params: BiddingDoc.BiddingDocQueryPayload) => Promise<BiddingDoc.BiddingDocQueryResponse>;
    fetchDetailBiddingDoc: (params?: BiddingDoc.BiddingDocQueryPayload) => Promise<BiddingDoc.BiddingDocQueryDetailResponse>;
}

export const BiddingDocRepository: BiddingDocRepository = {
    addBiddingDoc: (params: any) => addBiddingDoc(params),
    updateBiddingDoc: (params: any) => updateBiddingDoc(params),
    deleteBiddingDoc: (ids: Array<string>) => deleteBiddingDoc(ids),
    fetchListBiddingDoc: async (params) => fetchListBiddingDoc(params),
    fetchDetailBiddingDoc: async (params) => fetchListBiddingDoc(params),
}

/*=====APIS=====*/
// Get List|Info
async function fetchListBiddingDoc(params: any) {
    const { data } = await API.get(
        `${BIDDING_URL}/bidding_docs`, {
        params: {
            select: '_id name sign note releaseTime closingTime amount factor1 factor2 factor3 factor4 factor5 vatValue userCreate' ,
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
async function addBiddingDoc(params: any) {
    const { data } = await API.post(
        `${BIDDING_URL}/bidding_docs`, params);

    return data;
}

// Update
async function updateBiddingDoc(params: any) {
    const { data } = await API.put(
        `${BIDDING_URL}/bidding_docs`, params);

    return data;
}

// Delete
async function deleteBiddingDoc(params: any) {
    const { data } = await API.delete(
        `${BIDDING_URL}/bidding_docs`, { params }
    );

    return data;
}