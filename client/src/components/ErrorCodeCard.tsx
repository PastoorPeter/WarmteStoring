import { useState } from "react";
import { ErrorCode, UserType } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

type ErrorCodeCardProps = {
  errorCode: ErrorCode;
  userType: UserType;
};

export function ErrorCodeCard({ errorCode, userType }: ErrorCodeCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return (
          <Badge variant="destructive" className="ml-2">
            Kritieke fout
          </Badge>
        );
      case "warning":
        return (
          <Badge variant="secondary" className="bg-yellow-500 text-white ml-2">
            Waarschuwing
          </Badge>
        );
      case "info":
        return (
          <Badge variant="secondary" className="bg-blue-500 text-white ml-2">
            Informatie
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatSolution = (solution: string) => {
    if (!solution) return [];
    return solution.split('\n').filter(item => item.trim() !== '');
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="bg-white rounded-lg shadow-sm overflow-hidden w-full"
    >
      <CollapsibleTrigger className="w-full text-left">
        <div className="p-4 cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center">
                <span className="font-mono text-lg font-bold text-primary">
                  {errorCode.code}
                </span>
                {getSeverityBadge(errorCode.severity)}
              </div>
              <h3 className="font-medium mt-1">{errorCode.title}</h3>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="mb-4">
            <h4 className="font-medium text-secondary mb-2">Beschrijving</h4>
            <p className="text-foreground">{errorCode.description}</p>
          </div>

          <div className="mb-4">
            <h4 className="font-medium text-secondary mb-2">
              Oplossing
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-foreground">
              {formatSolution(errorCode.solution).map((step, index) => (
                <li key={index}>{step.replace(/^\d+\.\s*/, '')}</li>
              ))}
            </ol>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-secondary">Systeem</h4>
              <span className="text-sm text-muted-foreground">{errorCode.system}</span>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
