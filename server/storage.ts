import { errorCodes, type ErrorCode, type InsertErrorCode } from "@shared/schema";
import { users, type User, type InsertUser } from "@shared/schema";

// Initial error codes data
const initialErrorCodes: InsertErrorCode[] = [
  {
    code: "F1",
    severity: "critical",
    title: "Storing aanvoersensor",
    description: "De aanvoersensor detecteert een onjuiste temperatuur of krijgt geen signaal. De ketel gaat in storing om oververhitting te voorkomen.",
    solution: "1. Controleer of de keteldruk tussen 1,5 en 2 bar staat\n2. Reset de ketel door de reset-knop 5 seconden in te drukken\n3. Wacht 30 minuten en kijk of de fout terugkomt\n4. Indien de fout aanhoudt, neem contact op met een installateur",
    system: "Agpo Ferroli",
    tags: ["temperatuur", "sensor", "storing"]
  },
  {
    code: "E01",
    severity: "critical",
    title: "Geen vlam gedetecteerd",
    description: "De ketel detecteert geen vlam bij opstart. Dit kan komen door een ontstekingsprobleem, gasproblemen of een defecte vlamsensor.",
    solution: "1. Controleer of de gaskraan open staat\n2. Controleer of er andere gastoestellen werken (zoals fornuis)\n3. Reset de ketel door de reset-knop 5 seconden in te drukken\n4. Indien de fout aanhoudt, neem contact op met een installateur",
    system: "Remeha Avanta",
    tags: ["vlam", "gas", "ontsteking"]
  },
  {
    code: "A03",
    severity: "warning",
    title: "Lage waterdruk",
    description: "De waterdruk in het verwarmingssysteem is te laag. Dit kan komen door een lek in het systeem of normale waterverdamping.",
    solution: "1. Lees de waterdruk af op de manometer (moet tussen 1,5 en 2 bar zijn)\n2. Indien nodig, vul het systeem bij via de vulkraan\n3. Als de druk vaak daalt, controleer op lekkages of neem contact op met een installateur",
    system: "Intergas",
    tags: ["waterdruk", "druk", "vullen"]
  },
  {
    code: "EA",
    severity: "critical",
    title: "Geen ionisatie",
    description: "De ketel detecteert geen ionisatiestroom. Dit wijst op problemen met de verbranding of vlamsignaaldetectie.",
    solution: "1. Reset de ketel door de reset-knop in te drukken\n2. Controleer of de gaskraan volledig open staat\n3. Als de fout blijft optreden, schakel een erkend installateur in",
    system: "Vaillant",
    tags: ["ionisatie", "vlam", "verbranding"]
  },
  {
    code: "E118",
    severity: "critical",
    title: "Lage gasdruk",
    description: "De gasdruk is te laag, waardoor de ketel niet veilig kan functioneren. Dit kan komen door problemen met de gastoevoer.",
    solution: "1. Controleer of andere gastoestellen werken\n2. Reset de ketel na 10 minuten wachten\n3. Neem contact op met uw gasleverancier als het probleem aanhoudt",
    system: "Nefit",
    tags: ["gasdruk", "gas", "toevoer"]
  },
  {
    code: "C02",
    severity: "info",
    title: "Service-indicatie",
    description: "De ketel geeft aan dat onderhoud gewenst is. Dit is een preventieve melding, geen storing.",
    solution: "1. Plan een onderhoudsbeurt bij een erkend installateur\n2. De ketel blijft normaal functioneren",
    system: "Remeha",
    tags: ["onderhoud", "service", "preventief"]
  },
  {
    code: "F5",
    severity: "warning",
    title: "Oververhitting",
    description: "De ketel heeft een te hoge temperatuur gedetecteerd en is in beveiliging gegaan om schade te voorkomen.",
    solution: "1. Controleer of alle radiatoren open staan\n2. Controleer of er voldoende doorstroming is\n3. Reset de ketel nadat deze is afgekoeld\n4. Neem contact op met een installateur als de fout terugkeert",
    system: "Agpo Ferroli",
    tags: ["temperatuur", "oververhitting", "doorstroming"]
  },
  {
    code: "F7",
    severity: "warning",
    title: "Klikkend geluid",
    description: "Een klikkend geluid kan wijzen op gas-aanstekingsproblemen waarbij de ketel meerdere pogingen doet om op te starten.",
    solution: "1. Luister of het geluid afkomstig is van de ketel zelf of van het systeem\n2. Controleer of het geluid ritmisch is (kan wijzen op start/stoppogingen)\n3. Reset de ketel bij storing\n4. Neem contact op met een installateur als het geluid aanhoudt",
    system: "Intergas",
    tags: ["geluid", "klikken", "gasklep", "ontsteking"]
  },
  {
    code: "H03",
    severity: "info",
    title: "Geen warm water",
    description: "Er is een probleem met de warmwatervoorziening, terwijl de verwarming wel functioneert.",
    solution: "1. Controleer of de warmwaterkraan volledig geopend is\n2. Controleer of andere warmwaterkranen wel werken\n3. Reset de ketel\n4. Indien het probleem aanhoudt, neem contact op met een installateur",
    system: "Nefit",
    tags: ["warm water", "tapwater", "boiler"]
  },
  {
    code: "E04",
    severity: "critical",
    title: "Foutieve sensor feedback",
    description: "De ketel ontvangt onjuiste of tegenstrijdige informatie van de temperatuursensoren.",
    solution: "1. Reset de ketel\n2. Indien het probleem blijft bestaan, schakel een installateur in\n3. De ketel kan in veilige modus werken met beperkte functionaliteit",
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

import { db } from "./db";
import { eq, like, or, and, desc, sql } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getAllErrorCodes(): Promise<ErrorCode[]> {
    return db.select().from(errorCodes).orderBy(desc(errorCodes.id));
  }

  async getErrorCodeById(id: number): Promise<ErrorCode | undefined> {
    const [errorCode] = await db.select().from(errorCodes).where(eq(errorCodes.id, id));
    return errorCode;
  }

  async getErrorCodeByCode(code: string): Promise<ErrorCode | undefined> {
    const [errorCode] = await db.select().from(errorCodes).where(
      eq(sql`LOWER(${errorCodes.code})`, code.toLowerCase())
    );
    return errorCode;
  }

  async searchErrorCodes(query: string, system?: string, severity?: string): Promise<ErrorCode[]> {
    let conditions = [];
    
    if (query) {
      conditions.push(
        or(
          like(sql`LOWER(${errorCodes.code})`, `%${query.toLowerCase()}%`),
          like(sql`LOWER(${errorCodes.title})`, `%${query.toLowerCase()}%`),
          like(sql`LOWER(${errorCodes.description})`, `%${query.toLowerCase()}%`)
          // Note: tags are an array so we'll handle them differently in the future
          // For now this basic search should work well
        )
      );
    }
    
    if (system && system !== "all") {
      conditions.push(like(sql`LOWER(${errorCodes.system})`, `%${system.toLowerCase()}%`));
    }
    
    if (severity && severity !== "all") {
      conditions.push(eq(errorCodes.severity, severity));
    }
    
    if (conditions.length === 0) {
      return this.getAllErrorCodes();
    }
    
    const results = await db.select()
      .from(errorCodes)
      .where(and(...conditions))
      .orderBy(desc(errorCodes.id));
      
    return results;
  }
}

// For database seeding
export async function seedDatabase() {
  // Check if we already have data
  const count = await db.select({ count: sql`COUNT(*)` }).from(errorCodes);
  
  if (Number(count[0].count) === 0) {
    console.log("Seeding database with initial error codes...");
    await db.insert(errorCodes).values(initialErrorCodes);
  }
}

export const storage = new DatabaseStorage();
