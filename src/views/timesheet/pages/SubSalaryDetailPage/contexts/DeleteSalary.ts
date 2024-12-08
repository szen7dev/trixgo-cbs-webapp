import { createContext } from "react";

export type DeleteSalaryContextType = {
  salaryIds: string[];
  setSalaryIds: React.Dispatch<React.SetStateAction<string[]>>
};

export const DeleteSalaryContext = createContext<DeleteSalaryContextType | null>(null)
