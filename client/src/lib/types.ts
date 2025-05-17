export type ErrorCodeSeverity = "critical" | "warning" | "info";

export type ErrorCode = {
  id: number;
  code: string;
  severity: ErrorCodeSeverity;
  title: string;
  description: string;
  solution: string;
  system: string;
  tags?: string[];
};

export type UserType = "resident";

export type SearchFilters = {
  system?: string;
  severity?: string;
};
