import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";

type QuickFiltersProps = {
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

export function QuickFilters({ setSearchQuery }: QuickFiltersProps) {
  const handleQuickFilter = (filter: string) => {
    setSearchQuery(filter);
  };

  const filters = [
    "Geen warm water",
    "F1",
    "E01",
    "Klikkend geluid"
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
      <span className="text-sm text-muted-foreground">Veel gezocht:</span>
      {filters.map((filter) => (
        <Button
          key={filter}
          variant="outline"
          size="sm"
          className="text-sm px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          onClick={() => handleQuickFilter(filter)}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
}
