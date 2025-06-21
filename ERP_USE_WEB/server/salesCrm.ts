import { Express, Request, Response } from "express";
import { storage } from "./storage";
import { insertLeadSchema, insertOpportunitySchema, insertContractSchema } from "@shared/schema";

export function registerSalesCrmRoutes(app: Express) {
  // Leads
  app.get("/api/leads", async (req: Request, res: Response) => {
    try {
      const leads = await storage.getAllLeads();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ message: "Erro ao carregar leads" });
    }
  });

  app.post("/api/leads", async (req: Request, res: Response) => {
    try {
      const leadData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(leadData);
      res.status(201).json(lead);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos para lead" });
    }
  });

  app.put("/api/leads/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const leadData = insertLeadSchema.partial().parse(req.body);
      const lead = await storage.updateLead(id, leadData);
      if (!lead) {
        return res.status(404).json({ message: "Lead não encontrado" });
      }
      res.json(lead);
    } catch (error) {
      res.status(400).json({ message: "Erro ao atualizar lead" });
    }
  });

  // Opportunities
  app.get("/api/opportunities", async (req: Request, res: Response) => {
    try {
      const opportunities = await storage.getAllOpportunities();
      res.json(opportunities);
    } catch (error) {
      res.status(500).json({ message: "Erro ao carregar oportunidades" });
    }
  });

  app.post("/api/opportunities", async (req: Request, res: Response) => {
    try {
      const opportunityData = insertOpportunitySchema.parse(req.body);
      const opportunity = await storage.createOpportunity(opportunityData);
      res.status(201).json(opportunity);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos para oportunidade" });
    }
  });

  app.put("/api/opportunities/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const opportunityData = insertOpportunitySchema.partial().parse(req.body);
      const opportunity = await storage.updateOpportunity(id, opportunityData);
      if (!opportunity) {
        return res.status(404).json({ message: "Oportunidade não encontrada" });
      }
      res.json(opportunity);
    } catch (error) {
      res.status(400).json({ message: "Erro ao atualizar oportunidade" });
    }
  });

  // Contracts
  app.get("/api/contracts", async (req: Request, res: Response) => {
    try {
      const contracts = await storage.getAllContracts();
      res.json(contracts);
    } catch (error) {
      res.status(500).json({ message: "Erro ao carregar contratos" });
    }
  });

  app.post("/api/contracts", async (req: Request, res: Response) => {
    try {
      const contractData = insertContractSchema.parse(req.body);
      const contract = await storage.createContract(contractData);
      res.status(201).json(contract);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos para contrato" });
    }
  });

  app.put("/api/contracts/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const contractData = insertContractSchema.partial().parse(req.body);
      const contract = await storage.updateContract(id, contractData);
      if (!contract) {
        return res.status(404).json({ message: "Contrato não encontrado" });
      }
      res.json(contract);
    } catch (error) {
      res.status(400).json({ message: "Erro ao atualizar contrato" });
    }
  });
}
