import { useQuery } from "@tanstack/react-query";
import { ErrorCode, SearchFilters } from "@/lib/types";

export function useErrorCodes() {
  return useQuery<ErrorCode[]>({
    queryKey: ["/api/error-codes"],
  });
}

export function useSearchErrorCodes(query: string, filters?: SearchFilters) {
  const searchParams = new URLSearchParams();
  
  if (query) {
    searchParams.append("query", query);
  }
  
  if (filters?.system && filters.system !== "all") {
    searchParams.append("system", filters.system);
  }
  
  if (filters?.severity && filters.severity !== "all") {
    searchParams.append("severity", filters.severity);
  }
  
  const searchUrl = `/api/error-codes/search?${searchParams.toString()}`;
  
  return useQuery<ErrorCode[]>({
    queryKey: ["/api/error-codes/search", query, filters?.system, filters?.severity],
    enabled: query !== undefined,
  });
}

export function useErrorCodeByCode(code: string) {
  return useQuery<ErrorCode>({
    queryKey: [`/api/error-codes/code/${code}`],
    enabled: !!code,
  });
}
