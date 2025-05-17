import { useState } from "react";
import { useSearchErrorCodes } from "@/hooks/use-error-codes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SearchResults } from "@/components/SearchResults";
import { SearchFilters } from "@/lib/types";

type TechnicianPanelProps = {
  searchQuery: string;
  resetSearch: () => void;
};

export function TechnicianPanel({ searchQuery, resetSearch }: TechnicianPanelProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    system: "all",
    severity: "all",
  });

  const { data: searchResults, isLoading } = useSearchErrorCodes(searchQuery, filters);

  const handleSystemChange = (value: string) => {
    setFilters((prev) => ({ ...prev, system: value }));
  };

  const handleSeverityChange = (value: string) => {
    setFilters((prev) => ({ ...prev, severity: value }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-[#1D3557] text-white rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
          <div>
            <h3 className="font-medium">Monteur modus</h3>
            <p className="text-sm text-white/80">Gedetailleerde informatie voor professionele diagnose</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="font-medium text-secondary mb-4">Geavanceerde diagnostiek</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="system-select">
              Selecteer systeem
            </label>
            <Select value={filters.system} onValueChange={handleSystemChange}>
              <SelectTrigger id="system-select" className="w-full">
                <SelectValue placeholder="Alle systemen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle systemen</SelectItem>
                <SelectItem value="Remeha">Remeha</SelectItem>
                <SelectItem value="Intergas">Intergas</SelectItem>
                <SelectItem value="Nefit">Nefit</SelectItem>
                <SelectItem value="Agpo Ferroli">Agpo Ferroli</SelectItem>
                <SelectItem value="Vaillant">Vaillant</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="code-type">
              Codetype
            </label>
            <Select value={filters.severity} onValueChange={handleSeverityChange}>
              <SelectTrigger id="code-type" className="w-full">
                <SelectValue placeholder="Alle types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle types</SelectItem>
                <SelectItem value="critical">Kritieke fouten</SelectItem>
                <SelectItem value="warning">Waarschuwingen</SelectItem>
                <SelectItem value="info">Informatie</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <TechnicalGuideDialog />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <SearchResults
          isLoading={isLoading}
          searchQuery={searchQuery}
          searchResults={searchResults}
          userType="technician"
          resetSearch={resetSearch}
        />
      </div>
    </div>
  );
}

function TechnicalGuideDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-secondary hover:bg-secondary-dark text-white font-medium w-full">
          Volledig technisch handboek raadplegen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Technisch Handboek</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <p className="text-sm text-muted-foreground">
            Dit technisch handboek biedt gedetailleerde informatie over verwarmingssystemen en storingscodes. 
            Het is bedoeld voor professionele monteurs en technici.
          </p>

          <div>
            <h4 className="font-medium text-secondary mb-2">Inhoud</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Storingscodes interpretatie en diagnose</li>
              <li>Systeemspecifieke oplossingsprocedures</li>
              <li>Testprocedures en meetwaardes</li>
              <li>Onderdelen en vervangingsprocedures</li>
              <li>Kalibratie en afstelprocedures</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-secondary mb-2">Beschikbare documenten</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2 text-red-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                  <path d="M10 9H8" />
                </svg>
                <span>Remeha Avanta Service Manual (PDF)</span>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2 text-red-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                  <path d="M10 9H8" />
                </svg>
                <span>Intergas Technical Reference (PDF)</span>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2 text-red-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                  <path d="M10 9H8" />
                </svg>
                <span>Nefit Service Procedures (PDF)</span>
              </li>
            </ul>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            Voor het downloaden van deze documenten is een professioneel account nodig. 
            Neem contact op met de supportafdeling voor meer informatie.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
