import API from "apis/repository";
import { Contact, DropdownOption, Funda, SubType } from "./types";

export type DropdownType = "contacts" | "subtypes" | "fundas";

interface FetchDropdownDataParams {
  type: DropdownType;
  companyId: string;
  keyword?: string;
  lastestId?: string;
}

interface DropdownDataResponse<T> {
  options: DropdownOption[];
  nextCursor: string | null;
  rawData: T[];
}

/**
 * Generic function to fetch dropdown data from API
 */
export const fetchDropdownData = async <T = any>({
  type,
  companyId,
  keyword,
  lastestId,
}: FetchDropdownDataParams): Promise<DropdownDataResponse<T>> => {
  try {
    let url = "";
    let mapper: (item: any) => DropdownOption = () => ({ id: "", text: "" });

    switch (type) {
      case "contacts":
        url = `/api/item/contacts?companyID=${companyId}`;
        mapper = (contact: Contact) => ({
          id: contact._id,
          text: contact.phone
            ? `${contact.name} - ${contact.phone}`
            : contact.name,
        });
        break;

      case "subtypes":
        url = `/api/item/doctypes?type=23&companyID=${companyId}`;
        mapper = (subType: SubType) => ({
          id: subType._id,
          text: subType.name,
        });
        break;

      case "fundas":
        url = `/api/item/fundas?companyID=${companyId}`;
        mapper = (funda: Funda) => ({
          id: funda._id,
          text: funda.phone ? `${funda.name} - ${funda.phone}` : funda.name,
        });
        break;
    }

    // Add optional parameters
    if (keyword) {
      url += `&keyword=${encodeURIComponent(keyword)}`;
    }
    if (lastestId) {
      url += `&lastestID=${lastestId}`;
    }

    const { data: { data: responseData } } = await API.get(url);

    if (responseData?.listRecords && Array.isArray(responseData.listRecords)) {
      const options = responseData.listRecords.map(mapper);
      return {
        options,
        nextCursor: responseData.nextCursor || null,
        rawData: responseData.listRecords,
      };
    }

    return {
      options: [],
      nextCursor: null,
      rawData: [],
    };
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    return {
      options: [],
      nextCursor: null,
      rawData: [],
    };
  }
};
