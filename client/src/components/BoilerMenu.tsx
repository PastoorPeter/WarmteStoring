import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useErrorCodes } from "@/hooks/use-error-codes";
import { ErrorCodeCard } from "./ErrorCodeCard";
import { UserType } from "@/lib/types";
import { Separator } from "@/components/ui/separator";

export function BoilerMenu() {
  const { data: errorCodes, isLoading } = useErrorCodes();
  const [activeTab, setActiveTab] = useState("all");
  const userType: UserType = "resident";

  // Extract unique boiler systems
  const getUniqueSystems = () => {
    if (!errorCodes) return ["all"];
    
    const systems = new Set<string>();
    errorCodes.forEach(code => {
      systems.add(code.system);
    });
    
    return ["all", ...Array.from(systems)];
  };
  
  const boilerSystems = getUniqueSystems();

  // Group error codes by system
  const getErrorCodesBySystem = (system: string) => {
    if (!errorCodes) return [];
    if (system === "all") return errorCodes;
    return errorCodes.filter(code => code.system === system);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto mt-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Storingen per keteltype</h2>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4 flex flex-wrap gap-2 h-auto">
              {boilerSystems.map(system => (
                <TabsTrigger 
                  key={system} 
                  value={system}
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  {system === "all" ? "Alle ketels" : system}
                </TabsTrigger>
              ))}
            </TabsList>

            {boilerSystems.map(system => (
              <TabsContent key={system} value={system} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-medium text-lg">
                    {system === "all" 
                      ? "Alle storingsmeldingen" 
                      : `Storingsmeldingen voor ${system}`}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {system === "all" 
                      ? "Een overzicht van alle storingscodes voor alle ketels"
                      : `Bekijk alle storingscodes specifiek voor ${system} ketels`}
                  </p>
                </div>
                
                <Separator className="my-4" />
                
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="mt-2 text-muted-foreground">Storingscodes laden...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {getErrorCodesBySystem(system).map(errorCode => (
                      <ErrorCodeCard
                        key={errorCode.id}
                        errorCode={errorCode}
                        userType={userType}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}