import { useState } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { QuickFilters } from "@/components/QuickFilters";
import { SearchResults } from "@/components/SearchResults";
import { Footer } from "@/components/Footer";
import { useSearchErrorCodes } from "@/hooks/use-error-codes";
import { UserType } from "@/lib/types";

export default function Home() {
  const userType: UserType = "resident";
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: searchResults, isLoading } = useSearchErrorCodes(searchQuery);
  
  const resetSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <section className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-secondary mb-2">
              Vind snel uw verwarmingsfout
            </h2>
            <p className="text-muted-foreground">
              Voer uw foutcode in of zoek op symptoom
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <QuickFilters setSearchQuery={setSearchQuery} />
          </div>
        </section>

        <div className="max-w-3xl mx-auto space-y-4">
          <SearchResults
            isLoading={isLoading}
            searchQuery={searchQuery}
            searchResults={searchResults}
            userType={userType}
            resetSearch={resetSearch}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
