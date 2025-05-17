import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

export function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="relative">
      <div className="flex items-center relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-3 h-5 w-5 text-muted-foreground"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Zoek op foutcode (bijv. F1, E45) of beschrijving..."
          className="w-full pl-10 pr-14 py-6 rounded-lg border focus:border-primary"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-3 text-muted-foreground hover:text-primary transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
