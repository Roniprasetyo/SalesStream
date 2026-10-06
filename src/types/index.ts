export type Stage = 
  | 'Opportunity' 
  | 'Qualification' 
  | 'Proposal' 
  | 'Negotiation' 
  | 'Closing' 
  | 'Won' 
  | 'Lost';

export type Portfolio = 
  | 'Cloud & Infrastructure' 
  | 'Application Modernization' 
  | 'Managed Services' 
  | 'Cyber Security' 
  | 'Smart Campus & IoT' 
  | 'Data Analytics & AI';

export type WorkingArea = 
  | 'DKI Jakarta & Head Office' 
  | 'West Java (Bandung & Cikarang)' 
  | 'Central Java & DIY' 
  | 'East Java (Surabaya)' 
  | 'Sumatra & Outer Islands';

export type ActivityType = 'Visit' | 'Phone Call' | 'Desk Work' | 'Correspondence';

export type ActivityCategory = 
  | 'Initial Meeting' 
  | 'Requirement Gathering' 
  | 'Technical Presentation' 
  | 'Proposal Defense' 
  | 'Commercial Negotiation' 
  | 'Contract Review'
  | 'Follow-up';

export interface CustomerContact {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  isKeyDecisionMaker: boolean;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  code: string;
  type: 'Higher Education' | 'Corporate' | 'Manufacturing' | 'State Enterprise' | 'Healthcare';
  industry: string;
  workingArea: WorkingArea;
  group: string;
  website: string;
  address: string;
  contactsCount: number;
  activePipelinesCount: number;
  totalPipelineValue: number;
  status: 'Active' | 'Prospect' | 'Inactive';
  contacts: CustomerContact[];
}

export interface SolutionOfferingItem {
  id: string;
  portfolio: Portfolio;
  productName: string;
  partner: string; // e.g. Cisco, SAP, Microsoft, AWS, Oracle, HPE
  sellingPrice: number;
  quantity: number;
  totalValue: number;
  description?: string;
}

export interface RevenuePlanPeriod {
  period: string; // e.g. "2026-Q1", "Jan 2026", etc.
  month: string;
  year: number;
  contract: number;
  revenue: number;
  gp: number; // Gross profit
  probability: number; // percentage
  weightedRevenue: number;
}

export interface CompetitorItem {
  id: string;
  name: string;
  strengths: string;
  weaknesses: string;
  ourStrategy: string;
  threatLevel: 'Low' | 'Medium' | 'High';
}

export interface SalesActivity {
  id: string;
  date: string;
  type: ActivityType;
  category: ActivityCategory;
  customerId: string;
  customerName: string;
  pipelineId?: string;
  pipelineName?: string;
  contactPerson: string;
  salesPerson: string;
  durationMinutes: number;
  description: string;
  nextAction: string;
  status: 'Planned' | 'Completed' | 'Cancelled';
}

export interface CommentItem {
  id: string;
  author: string;
  avatar: string;
  role: string;
  timestamp: string;
  text: string;
}

export interface RepositoryItem {
  id: string;
  fileName: string;
  fileSize: string;
  uploadedBy: string;
  uploadedAt: string;
  category: 'RFP / Proposal' | 'Technical Architecture' | 'Commercial Quotation' | 'Contract Draft' | 'Minutes of Meeting';
  fileType: 'pdf' | 'docx' | 'xlsx' | 'pptx';
}

export interface Pipeline {
  id: string; // e.g. PL-2026-0891
  customerCode: string;
  customerId: string;
  customerName: string;
  projectName: string;
  projectDescription: string;
  portfolio: Portfolio;
  workingArea: WorkingArea;
  opportunityType: 'New Logo' | 'Upsell / Expansion' | 'Renewal' | 'Managed Contract';
  salesPerson: string;
  salesTeam: string;
  projectValue: number;
  probability: number; // 0-100%
  weightedValue: number;
  stage: Stage;
  startDate: string;
  expectedCloseDate: string;
  lastActivityDate: string;
  lastActivitySummary: string;
  status: 'Active' | 'Won' | 'Lost' | 'Archived';
  lossReason?: string;
  competitorWon?: string;
  
  // Detailed sub-tabs data
  solutionOfferings: SolutionOfferingItem[];
  revenuePlans: RevenuePlanPeriod[];
  competitors: CompetitorItem[];
  activities: SalesActivity[];
  comments: CommentItem[];
  repository: RepositoryItem[];
  contacts: CustomerContact[];
}

export interface GlobalFilterState {
  year: string;
  quarter: string;
  month: string;
  workingArea: string;
  salesPerson: string;
  customer: string;
  portfolio: string;
  stage: string;
}

export interface DashboardMetrics {
  totalPipeline: number;
  contractValue: number;
  revenuePlan: number;
  grossProfit: number;
  weightedPipeline: number;
  winRate: number;
  totalDealsCount: number;
}
