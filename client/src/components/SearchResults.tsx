import { ErrorCode, UserType } from "@/lib/types";
import { ErrorCodeCard } from "@/components/ErrorCodeCard";
import { Button } from "@/components/ui/button";

type SearchResultsProps = {
  isLoading: boolean;
  searchQuery: string;
  searchResults: ErrorCode[] | undefined;
  userType: UserType;
  resetSearch: () => void;
};

export function SearchResults({
  isLoading,
  searchQuery,
  searchResults,
  userType,
  resetSearch,
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-2 text-muted-foreground">Aan het zoeken...</p>
      </div>
    );
  }

  // Initial state (no search yet)
  if (!searchQuery) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto mb-2 text-primary-light"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
        <h3 className="text-lg font-medium mb-1">Zoek naar uw storingscode</h3>
        <p className="text-muted-foreground">
          Voer een foutcode (zoals F1 of E45) of een beschrijving van het probleem in
        </p>
      </div>
    );
  }

  // No results
  if (!searchResults || searchResults.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto mb-2 text-muted-foreground"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
          <path d="M8 11h6" />
        </svg>
        <h3 className="text-lg font-medium mb-1">Geen resultaten gevonden</h3>
        <p className="text-muted-foreground mb-4">
          Probeer andere zoektermen of verbreed uw zoekopdracht
        </p>
        <Button
          variant="link"
          className="text-primary hover:text-primary-dark font-medium transition-colors"
          onClick={resetSearch}
        >
          Bekijk alle storingscodes
        </Button>
      </div>
    );
  }

  // Results found
  return (
    <div className="space-y-4">
      {searchResults.map((errorCode) => (
        <ErrorCodeCard key={errorCode.id} errorCode={errorCode} userType={userType} />
      ))}
    </div>
  );
}
