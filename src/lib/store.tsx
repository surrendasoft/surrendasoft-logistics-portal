"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  activities as initialActivities,
  complianceRecords as initialCompliance,
  consignments as initialConsignments,
  customers as initialCustomers,
  documents as initialDocuments,
  generalFreightJobs as initialGF,
  integrations as initialIntegrations,
  leads as initialLeads,
  projectFreightJobs as initialPF,
  suppliers as initialSuppliers,
} from "./mock-data";
import type {
  ComplianceRecord,
  Consignment,
  Customer,
  DocumentRecord,
  GeneralFreightJob,
  IntegrationSetting,
  Lead,
  ProjectFreightJob,
  Supplier,
  ActivityItem,
} from "./types";

interface Toast {
  id: string;
  message: string;
  type: "success" | "info" | "error";
}

interface AppState {
  projectFreightJobs: ProjectFreightJob[];
  generalFreightJobs: GeneralFreightJob[];
  leads: Lead[];
  customers: Customer[];
  suppliers: Supplier[];
  complianceRecords: ComplianceRecord[];
  documents: DocumentRecord[];
  consignments: Consignment[];
  activities: ActivityItem[];
  integrations: IntegrationSetting[];
  toasts: Toast[];
  showToast: (message: string, type?: Toast["type"]) => void;
  removeToast: (id: string) => void;
  addLead: (lead: Lead) => void;
  updateLead: (lead: Lead) => void;
  addCustomer: (customer: Customer) => void;
  updateCustomer: (customer: Customer) => void;
  addSupplier: (supplier: Supplier) => void;
  updateSupplier: (supplier: Supplier) => void;
  addProjectFreight: (job: ProjectFreightJob) => void;
  updateProjectFreight: (job: ProjectFreightJob) => void;
  addGeneralFreight: (job: GeneralFreightJob) => void;
  updateGeneralFreight: (job: GeneralFreightJob) => void;
  syncGeneralFreight: (id: string) => void;
  addCompliance: (record: ComplianceRecord) => void;
  updateCompliance: (record: ComplianceRecord) => void;
  addActivity: (message: string, type: string) => void;
  convertLeadToCustomer: (leadId: string) => Customer | null;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [projectFreightJobs, setProjectFreightJobs] = useState(initialPF);
  const [generalFreightJobs, setGeneralFreightJobs] = useState(initialGF);
  const [leads, setLeads] = useState(initialLeads);
  const [customers, setCustomers] = useState(initialCustomers);
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [complianceRecords, setComplianceRecords] = useState(initialCompliance);
  const [documents, setDocuments] = useState(initialDocuments);
  const [consignments, setConsignments] = useState(initialConsignments);
  const [activities, setActivities] = useState(initialActivities);
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addActivity = useCallback((message: string, type: string) => {
    const item: ActivityItem = {
      id: `act-${Date.now()}`,
      message,
      timestamp: new Date().toISOString(),
      type,
    };
    setActivities((prev) => [item, ...prev]);
  }, []);

  const addLead = useCallback((lead: Lead) => {
    setLeads((prev) => [lead, ...prev]);
    addActivity(`New lead added: ${lead.companyName}`, "lead");
  }, [addActivity]);

  const updateLead = useCallback((lead: Lead) => {
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? lead : l)));
    showToast("Lead updated successfully");
  }, [showToast]);

  const addCustomer = useCallback((customer: Customer) => {
    setCustomers((prev) => [customer, ...prev]);
    addActivity(`New customer added: ${customer.companyName}`, "customer");
    showToast("Customer created successfully");
  }, [addActivity, showToast]);

  const updateCustomer = useCallback((customer: Customer) => {
    setCustomers((prev) => prev.map((c) => (c.id === customer.id ? customer : c)));
    showToast("Customer updated successfully");
  }, [showToast]);

  const addSupplier = useCallback((supplier: Supplier) => {
    setSuppliers((prev) => [supplier, ...prev]);
    addActivity(`New supplier added: ${supplier.name}`, "supplier");
    showToast("Supplier created successfully");
  }, [addActivity, showToast]);

  const updateSupplier = useCallback((supplier: Supplier) => {
    setSuppliers((prev) => prev.map((s) => (s.id === supplier.id ? supplier : s)));
    showToast("Supplier updated successfully");
  }, [showToast]);

  const addProjectFreight = useCallback((job: ProjectFreightJob) => {
    setProjectFreightJobs((prev) => [job, ...prev]);
    addActivity(`New project freight job: ${job.jobNumber}`, "job");
    showToast("Project freight job created");
  }, [addActivity, showToast]);

  const updateProjectFreight = useCallback((job: ProjectFreightJob) => {
    setProjectFreightJobs((prev) => prev.map((j) => (j.id === job.id ? job : j)));
    showToast("Project freight job updated");
  }, [showToast]);

  const addGeneralFreight = useCallback((job: GeneralFreightJob) => {
    setGeneralFreightJobs((prev) => [job, ...prev]);
    addActivity(`New general freight request: ${job.jobNumber}`, "job");
    showToast("General freight request created");
  }, [addActivity, showToast]);

  const updateGeneralFreight = useCallback((job: GeneralFreightJob) => {
    setGeneralFreightJobs((prev) => prev.map((j) => (j.id === job.id ? job : j)));
    showToast("General freight job updated");
  }, [showToast]);

  const syncGeneralFreight = useCallback((id: string) => {
    setGeneralFreightJobs((prev) =>
      prev.map((j) => {
        if (j.id !== id) return j;
        return {
          ...j,
          syncState: "Syncing" as const,
          lastSynced: new Date().toISOString(),
        };
      })
    );
    setTimeout(() => {
      setGeneralFreightJobs((prev) =>
        prev.map((j) => {
          if (j.id !== id) return j;
          const synced = {
            ...j,
            syncState: "Synced" as const,
            lastSynced: new Date().toISOString(),
            errorMessage: undefined,
          };
          addActivity(`${j.jobNumber} synced successfully`, "sync");
          return synced;
        })
      );
      showToast("Sync completed successfully");
    }, 1500);
  }, [addActivity, showToast]);

  const addCompliance = useCallback((record: ComplianceRecord) => {
    setComplianceRecords((prev) => [record, ...prev]);
    showToast("Compliance record added");
  }, [showToast]);

  const updateCompliance = useCallback((record: ComplianceRecord) => {
    setComplianceRecords((prev) => prev.map((r) => (r.id === record.id ? record : r)));
    showToast("Compliance record updated");
  }, [showToast]);

  const convertLeadToCustomer = useCallback((leadId: string): Customer | null => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return null;
    const customer: Customer = {
      id: `cust-${Date.now()}`,
      companyName: lead.companyName,
      contactPerson: lead.contactPerson,
      phone: lead.phone,
      email: lead.email,
      address: "",
      notes: lead.notes,
      xeroContactRef: "",
    };
    setCustomers((prev) => [customer, ...prev]);
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: "Won" as const } : l))
    );
    addActivity(`Lead converted to customer: ${lead.companyName}`, "customer");
    showToast("Lead converted to customer");
    return customer;
  }, [leads, addActivity, showToast]);

  return (
    <AppContext.Provider
      value={{
        projectFreightJobs,
        generalFreightJobs,
        leads,
        customers,
        suppliers,
        complianceRecords,
        documents,
        consignments,
        activities,
        integrations,
        toasts,
        showToast,
        removeToast,
        addLead,
        updateLead,
        addCustomer,
        updateCustomer,
        addSupplier,
        updateSupplier,
        addProjectFreight,
        updateProjectFreight,
        addGeneralFreight,
        updateGeneralFreight,
        syncGeneralFreight,
        addCompliance,
        updateCompliance,
        addActivity,
        convertLeadToCustomer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
