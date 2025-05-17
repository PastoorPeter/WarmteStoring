import { useState } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { QuickFilters } from "@/components/QuickFilters";
import { SearchResults } from "@/components/SearchResults";
import { Footer } from "@/components/Footer";
import { BoilerMenu } from "@/components/BoilerMenu";
import { useSearchErrorCodes } from "@/hooks/use-error-codes";
import { UserType } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const userType: UserType = "resident";
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"search" | "browse">("search");
  
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
              Zoek via foutcode, symptoom of bekijk per keteltype
            </p>
          </div>
          
          <Tabs 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as "search" | "browse")}
            className="max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <TabsList>
                <TabsTrigger value="search" className="px-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
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
                  Zoeken
                </TabsTrigger>
                <TabsTrigger value="browse" className="px-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                    <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                    <path d="M13 13h4" />
                    <path d="M13 17h4" />
                    <path d="M8 13h.01" />
                    <path d="M8 17h.01" />
                  </svg>
                  Keteltypes
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="search">
              <div className="max-w-2xl mx-auto">
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
                <QuickFilters setSearchQuery={setSearchQuery} />
              </div>
              
              <div className="max-w-3xl mx-auto space-y-4 mt-6">
                <SearchResults
                  isLoading={isLoading}
                  searchQuery={searchQuery}
                  searchResults={searchResults}
                  userType={userType}
                  resetSearch={resetSearch}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="browse">
              <BoilerMenu />
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <Footer />
    </div>
  );
}
