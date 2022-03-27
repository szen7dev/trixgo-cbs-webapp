/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import API from "../repository";

// Convert Object sang URL query => khi client truyền lên
// import { convertObToUrl } from "utils";

// Khai báo chính xác kiểu trả về nếu biết
import { ResponseCreate, ResponseCreateSuccess, ResponseList } from "typings/apis/response";
import { DatahubPrams } from "typings/datahub/api";
import { CreateSubjectBody, RequireAtLeastOne, Subject, Lesson, SubjectQueryParams } from "typings/workshop";

type GetSubject<T extends SubjectQueryParams = {}> = T["subjectID"] extends string
  ? ResponseCreateSuccess<Subject | Lesson>
  : ResponseList<T["parentID"] extends string ? Lesson : Subject>;

// Đường dẫn Endpoint
const url = "/api/training/subjects";
const SubjectRepositories = {
  // ==== GET Subjest ====
  async get<T extends SubjectQueryParams>(params: T & DatahubPrams) {
    const { data } = await API.get<GetSubject<T>>(url, { params });
    return data;
  },
  // ==== CREATE Subjest ====
  async create(body: CreateSubjectBody & { parent?: string }) {
    // Create new item
    const { data } = await API.post<ResponseCreate<Subject>>(url, body);
    return data;
  },
  // ==== UPDATE Subjest ====
  async update(body: Partial<CreateSubjectBody> & { subjectID: string }) {
    const { data } = await API.put<ResponseCreate<Subject | Lesson>>(url, body);
    return data;
  },
  // ==== DELETE Subjest ====
  async delete(params: RequireAtLeastOne<SubjectQueryParams>) {
    const { data } = await API.delete<ResponseCreate<Subject>>(url, { params });
    return data;
  },
};

export default SubjectRepositories;
