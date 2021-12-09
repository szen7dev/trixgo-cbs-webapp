import { APIResponse } from "./response";
import {Item} from "../../components/common/DropdownSearch";

export type GetSearchSelectResponse = APIResponse & {
  result: Item[];
};
