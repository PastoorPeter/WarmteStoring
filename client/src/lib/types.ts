export type ErrorCodeSeverity = "critical" | "warning" | "info";

export type ErrorCode = {
  id: number;
  code: string;
  severity: ErrorCodeSeverity;
  title: string;
  description: string;
  solutionForResidents: string;
  solutionForTechnicians?: string;
  system: string;
  tags?: string[];
};

export type UserType = "resident" | "technician";

export type SearchFilters = {
  system?: string;
  severity?: string;
};
