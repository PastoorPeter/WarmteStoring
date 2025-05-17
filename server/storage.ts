import { errorCodes, type ErrorCode, type InsertErrorCode } from "@shared/schema";
import { users, type User, type InsertUser } from "@shared/schema";

// Initial error codes data
const initialErrorCodes: InsertErrorCode[] = [
  {
    code: "F1",
    severity: "critical",
    title: "Storing aanvoersensor",
    description: "De aanvoersensor detecteert een onjuiste temperatuur of krijgt geen signaal. De ketel gaat in storing om oververhitting te voorkomen.",
    solutionForResidents: "1. Controleer of de keteldruk tussen 1,5 en 2 bar staat\n2. Reset de ketel door de reset-knop 5 seconden in te drukken\n3. Wacht 30 minuten en kijk of de fout terugkomt\n4. Indien de fout aanhoudt, neem contact op met een installateur",
    solutionForTechnicians: "1. Controleer de weerstandswaarde van de sensor (bij 25°C ca. 10kΩ)\n2. Controleer de bekabeling en aansluitingen\n3. Vervang de sensor indien defect\n4. Controleer de printplaat bij correcte sensorwaarden",
    system: "Agpo Ferroli",
    tags: ["temperatuur", "sensor", "storing"]
  },
  {
    code: "E01",
    severity: "critical",
    title: "Geen vlam gedetecteerd",
    description: "De ketel detecteert geen vlam bij opstart. Dit kan komen door een ontstekingsprobleem, gasproblemen of een defecte vlamsensor.",
    solutionForResidents: "1. Controleer of de gaskraan open staat\n2. Controleer of er andere gastoestellen werken (zoals fornuis)\n3. Reset de ketel door de reset-knop 5 seconden in te drukken\n4. Indien de fout aanhoudt, neem contact op met een installateur",
    solutionForTechnicians: "1. Controleer de gasdruk bij de inlaat\n2. Controleer de ontstekingselektrode op vervuiling of schade\n3. Controleer de ionisatiestroom tijdens opstart\n4. Controleer de gasklep en de bekabeling",
    system: "Remeha Avanta",
    tags: ["vlam", "gas", "ontsteking"]
  },
  {
    code: "A03",
    severity: "warning",
    title: "Lage waterdruk",
    description: "De waterdruk in het verwarmingssysteem is te laag. Dit kan komen door een lek in het systeem of normale waterverdamping.",
    solutionForResidents: "1. Lees de waterdruk af op de manometer (moet tussen 1,5 en 2 bar zijn)\n2. Indien nodig, vul het systeem bij via de vulkraan\n3. Als de druk vaak daalt, controleer op lekkages of neem contact op met een installateur",
    solutionForTechnicians: "1. Controleer het systeem op lekkages\n2. Controleer het expansievat en de druk (ca. 1 bar)\n3. Controleer de werking van de druksensor\n4. Controleer het overdrukventiel op lekkage",
    system: "Intergas",
    tags: ["waterdruk", "druk", "vullen"]
  },
  {
    code: "EA",
    severity: "critical",
    title: "Geen ionisatie",
    description: "De ketel detecteert geen ionisatiestroom. Dit wijst op problemen met de verbranding of vlamsignaaldetectie.",
    solutionForResidents: "1. Reset de ketel door de reset-knop in te drukken\n2. Controleer of de gaskraan volledig open staat\n3. Als de fout blijft optreden, schakel een erkend installateur in",
    solutionForTechnicians: "1. Controleer de ionisatiepen op vervuiling of oxidatie\n2. Meet de ionisatiestroom (min. 3μA)\n3. Controleer de gasdruk en CO2-instellingen\n4. Controleer de aarde-aansluiting van de ketel",
    system: "Vaillant",
    tags: ["ionisatie", "vlam", "verbranding"]
  },
  {
    code: "E118",
    severity: "critical",
    title: "Lage gasdruk",
    description: "De gasdruk is te laag, waardoor de ketel niet veilig kan functioneren. Dit kan komen door problemen met de gastoevoer.",
    solutionForResidents: "1. Controleer of andere gastoestellen werken\n2. Reset de ketel na 10 minuten wachten\n3. Neem contact op met uw gasleverancier als het probleem aanhoudt",
    solutionForTechnicians: "1. Meet de dynamische gasdruk tijdens bedrijf (min. 17 mbar voor aardgas)\n2. Controleer de gasmeter en eventuele reduceer\n3. Controleer de gasleiding op verstopping of onderbreking\n4. Controleer de gasdrukschakelaar indien aanwezig",
    system: "Nefit",
    tags: ["gasdruk", "gas", "toevoer"]
  },
  {
    code: "C02",
    severity: "info",
    title: "Service-indicatie",
    description: "De ketel geeft aan dat onderhoud gewenst is. Dit is een preventieve melding, geen storing.",
    solutionForResidents: "1. Plan een onderhoudsbeurt bij een erkend installateur\n2. De ketel blijft normaal functioneren",
    solutionForTechnicians: "1. Voer een volledige onderhoudsbeurt uit\n2. Reinig de warmtewisselaar en branderkamer\n3. Controleer de branderinstellingen\n4. Reset de serviceteller na onderhoud",
    system: "Remeha",
    tags: ["onderhoud", "service", "preventief"]
  },
  {
    code: "F5",
    severity: "warning",
    title: "Oververhitting",
    description: "De ketel heeft een te hoge temperatuur gedetecteerd en is in beveiliging gegaan om schade te voorkomen.",
    solutionForResidents: "1. Controleer of alle radiatoren open staan\n2. Controleer of er voldoende doorstroming is\n3. Reset de ketel nadat deze is afgekoeld\n4. Neem contact op met een installateur als de fout terugkeert",
    solutionForTechnicians: "1. Controleer de werking van de pomp\n2. Controleer op verstopping in het systeem\n3. Controleer de werking van het overstortventiel\n4. Controleer de maximaalthermostaat en aansluitingen",
    system: "Agpo Ferroli",
    tags: ["temperatuur", "oververhitting", "doorstroming"]
  },
  {
    code: "F7",
    severity: "warning",
    title: "Klikkend geluid",
    description: "Een klikkend geluid kan wijzen op gas-aanstekingsproblemen waarbij de ketel meerdere pogingen doet om op te starten.",
    solutionForResidents: "1. Luister of het geluid afkomstig is van de ketel zelf of van het systeem\n2. Controleer of het geluid ritmisch is (kan wijzen op start/stoppogingen)\n3. Reset de ketel bij storing\n4. Neem contact op met een installateur als het geluid aanhoudt",
    solutionForTechnicians: "1. Controleer de gasklep op juiste werking\n2. Controleer de ontstekingselektrode en -kabel\n3. Controleer CO2-instellingen en gasdruk\n4. Controleer op lucht in het systeem",
    system: "Intergas",
    tags: ["geluid", "klikken", "gasklep", "ontsteking"]
  },
  {
    code: "H03",
    severity: "info",
    title: "Geen warm water",
    description: "Er is een probleem met de warmwatervoorziening, terwijl de verwarming wel functioneert.",
    solutionForResidents: "1. Controleer of de warmwaterkraan volledig geopend is\n2. Controleer of andere warmwaterkranen wel werken\n3. Reset de ketel\n4. Indien het probleem aanhoudt, neem contact op met een installateur",
    solutionForTechnicians: "1. Controleer de warmwatersensor (NTC)\n2. Controleer de werking van de driewegklep\n3. Controleer de doorstroomsensor op vervuiling\n4. Controleer de platenwisselaar op verstopping of kalkvorming",
    system: "Nefit",
    tags: ["warm water", "tapwater", "boiler"]
  },
  {
    code: "E04",
    severity: "critical",
    title: "Foutieve sensor feedback",
    description: "De ketel ontvangt onjuiste of tegenstrijdige informatie van de temperatuursensoren.",
    solutionForResidents: "1. Reset de ketel\n2. Indien het probleem blijft bestaan, schakel een installateur in\n3. De ketel kan in veilige modus werken met beperkte functionaliteit",
    solutionForTechnicians: "1. Controleer alle sensoren (aanvoer, retour, warmwater)\n2. Meet de weerstandswaarden van de sensoren\n3. Controleer de bekabeling op kortsluiting\n4. Vervang defecte sensoren of printplaat indien nodig",
    system: "Vaillant",
    tags: ["sensor", "temperatuur", "feedback"]
  }
];

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Error code methods
  getAllErrorCodes(): Promise<ErrorCode[]>;
  getErrorCodeById(id: number): Promise<ErrorCode | undefined>;
  getErrorCodeByCode(code: string): Promise<ErrorCode | undefined>;
  searchErrorCodes(query: string, system?: string, severity?: string): Promise<ErrorCode[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private errorCodes: Map<number, ErrorCode>;
  currentUserId: number;
  currentErrorCodeId: number;

  constructor() {
    this.users = new Map();
    this.errorCodes = new Map();
    this.currentUserId = 1;
    this.currentErrorCodeId = 1;
    
    // Initialize with error codes
    this.initializeErrorCodes();
  }

  private initializeErrorCodes() {
    initialErrorCodes.forEach(errorCode => {
      const id = this.currentErrorCodeId++;
      const newErrorCode: ErrorCode = { ...errorCode, id };
      this.errorCodes.set(id, newErrorCode);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllErrorCodes(): Promise<ErrorCode[]> {
    return Array.from(this.errorCodes.values());
  }

  async getErrorCodeById(id: number): Promise<ErrorCode | undefined> {
    return this.errorCodes.get(id);
  }

  async getErrorCodeByCode(code: string): Promise<ErrorCode | undefined> {
    return Array.from(this.errorCodes.values()).find(
      (errorCode) => errorCode.code.toLowerCase() === code.toLowerCase()
    );
  }

  async searchErrorCodes(query: string, system?: string, severity?: string): Promise<ErrorCode[]> {
    if (!query && !system && !severity) {
      return this.getAllErrorCodes();
    }

    return Array.from(this.errorCodes.values()).filter(errorCode => {
      const matchesQuery = !query || 
        errorCode.code.toLowerCase().includes(query.toLowerCase()) ||
        errorCode.title.toLowerCase().includes(query.toLowerCase()) ||
        errorCode.description.toLowerCase().includes(query.toLowerCase()) ||
        (errorCode.tags && errorCode.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())));
      
      const matchesSystem = !system || system === "all" || 
        errorCode.system.toLowerCase().includes(system.toLowerCase());
      
      const matchesSeverity = !severity || severity === "all" || 
        errorCode.severity.toLowerCase() === severity.toLowerCase();
      
      return matchesQuery && matchesSystem && matchesSeverity;
    });
  }
}

export const storage = new MemStorage();
