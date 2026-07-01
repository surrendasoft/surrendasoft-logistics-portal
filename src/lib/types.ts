export type ProjectFreightStatus =
  | "Draft"
  | "Pending"
  | "In Progress"
  | "Waiting on Supplier"
  | "Completed"
  | "Cancelled";

export type GeneralFreightStatus =
  | "Draft"
  | "Booked"
  | "In Transit"
  | "Delivered"
  | "Cancelled";

export type SyncState =
  | "Synced"
  | "Pending"
  | "Syncing"
  | "Error"
  | "Needs Review";

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Proposal"
  | "Follow Up"
  | "Won"
  | "Lost";

export type ComplianceStatus =
  | "Valid"
  | "Expiring Soon"
  | "Expired"
  | "Missing";

export type DocumentType =
  | "Insurance"
  | "Public Liability"
  | "Police Check"
  | "Licence"
  | "Contractor Agreement"
  | "Other"
  | "Job Document"
  | "Customer Document"
  | "Proof of Delivery"
  | "Signature"
  | "Delivery Photo"
  | "Supplier Document";

export type ExternalSystem =
  | "Transvirtual"
  | "Transmate"
  | "Internet Courier"
  | "Other Supplier System";

export type IntegrationStatus =
  | "Connected"
  | "Not connected"
  | "Needs API credentials"
  | "Sync error";

export type FreightType = "Project Freight" | "General Freight";

export interface ProjectFreightTask {
  id: string;
  taskName: string;
  status: string;
  dueDate: string;
  assignedPerson: string;
  notes: string;
  completed: boolean;
}

export interface ProjectFreightJob {
  id: string;
  jobNumber: string;
  customerId: string;
  customerName: string;
  contactPerson: string;
  senderName: string;
  senderAddress: string;
  receiverName: string;
  receiverAddress: string;
  pickupDetails: string;
  deliveryDetails: string;
  jobDescription: string;
  status: ProjectFreightStatus;
  dueDate: string;
  assignedSupplierId: string;
  assignedSupplierName: string;
  internalNotes: string;
  xeroContactRef: string;
  xeroInvoiceRef: string;
  paymentStatusRef: string;
  proofOfDelivery: string;
  tasks: ProjectFreightTask[];
}

export interface GeneralFreightJob {
  id: string;
  jobNumber: string;
  externalSystem: ExternalSystem;
  externalJobId: string;
  customerId: string;
  customerName: string;
  supplierId: string;
  supplierName: string;
  senderName: string;
  senderAddress: string;
  receiverName: string;
  receiverAddress: string;
  receiverSuburb: string;
  pickupDetails: string;
  deliveryDetails: string;
  quantity: string;
  weight: string;
  cubic: string;
  notes: string;
  status: GeneralFreightStatus;
  lastSynced: string;
  syncState: SyncState;
  errorMessage?: string;
}

export interface Lead {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  leadSource: string;
  status: LeadStatus;
  notes: string;
  followUpDate: string;
  freightType: FreightType;
}

export interface Customer {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  xeroContactRef: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  serviceType: string;
  relatedSystem: string;
  notes: string;
  complianceStatus: ComplianceStatus;
}

export interface ComplianceRecord {
  id: string;
  supplierId: string;
  supplierName: string;
  documentType: DocumentType;
  documentName: string;
  expiryDate: string;
  status: ComplianceStatus;
  notes: string;
}

export interface DocumentRecord {
  id: string;
  fileName: string;
  relatedRecord: string;
  relatedType: string;
  type: DocumentType;
  uploadedBy: string;
  uploadedDate: string;
  status: string;
}

export interface Consignment {
  id: string;
  consignmentId: string;
  externalSystem: ExternalSystem;
  customerId: string;
  customerName: string;
  supplierId: string;
  supplierName: string;
  senderName: string;
  receiverName: string;
  receiverSuburb: string;
  quantity: string;
  weight: string;
  cubic: string;
  notes: string;
  bookingDate: string;
  status: string;
  lastSynced: string;
  generalFreightJobId: string;
  generalFreightJobNumber: string;
}

export interface ActivityItem {
  id: string;
  message: string;
  timestamp: string;
  type: string;
}

export interface IntegrationSetting {
  id: string;
  name: string;
  status: IntegrationStatus;
  description: string;
}
