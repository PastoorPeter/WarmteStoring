import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to get all error codes
  app.get("/api/error-codes", async (req, res) => {
    try {
      const errorCodes = await storage.getAllErrorCodes();
      res.json(errorCodes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch error codes" });
    }
  });

  // API route to search error codes
  app.get("/api/error-codes/search", async (req, res) => {
    try {
      const { query, system, severity } = req.query;
      const searchQuery = query ? String(query) : "";
      const systemFilter = system ? String(system) : undefined;
      const severityFilter = severity ? String(severity) : undefined;
      
      const results = await storage.searchErrorCodes(searchQuery, systemFilter, severityFilter);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to search error codes" });
    }
  });

  // API route to get a specific error code by its code
  app.get("/api/error-codes/code/:code", async (req, res) => {
    try {
      const { code } = req.params;
      const errorCode = await storage.getErrorCodeByCode(code);
      
      if (!errorCode) {
        return res.status(404).json({ message: "Error code not found" });
      }
      
      res.json(errorCode);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch error code" });
    }
  });

  // API route to get a specific error code by id
  app.get("/api/error-codes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const errorCode = await storage.getErrorCodeById(id);
      
      if (!errorCode) {
        return res.status(404).json({ message: "Error code not found" });
      }
      
      res.json(errorCode);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch error code" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
