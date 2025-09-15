import { createContext, useContext } from "react";

interface ExamsContextType {
  exams: any[];
  refetchExams: () => Promise<void>;
}

export const ExamsContext = createContext<ExamsContextType | undefined>(undefined);

export const useExams = () => {
  const context = useContext(ExamsContext);
  if (!context) throw new Error("useExams must be used within ExamsProvider");
  return context;
};
