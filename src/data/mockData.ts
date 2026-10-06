import { Pipeline, Customer, SalesActivity, DashboardMetrics, WorkingArea, Portfolio } from '../types';

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'CUST-001',
    code: 'AST-POLI',
    name: 'Politeknik Astra (Cikarang Campus)',
    type: 'Higher Education',
    industry: 'Vocational Education & Technology',
    workingArea: 'West Java (Bandung & Cikarang)',
    group: 'Astra Education Ecosystem',
    website: 'www.polytechnic.astra.ac.id',
    address: 'Kawasan Industri Delta Silicon 6, Cikarang Central City, West Java',
    contactsCount: 4,
    activePipelinesCount: 5,
    totalPipelineValue: 28500000000,
    status: 'Active',
    contacts: [
      {
        id: 'CON-001',
        name: 'Dr. Ir. H. Bambang Widjaja, M.T.',
        title: 'Director of Academic & Information Technology',
        department: 'Executive Board',
        email: 'bambang.widjaja@polytechnic.astra.ac.id',
        phone: '+62 811-9876-5432',
        isKeyDecisionMaker: true,
        notes: 'Sponsor for Smart Campus Initiative'
      },
      {
        id: 'CON-002',
        name: 'Hendra Gunawan, S.Kom., M.Kom.',
        title: 'Head of IT Infrastructure & Systems',
        department: 'ICT Services',
        email: 'hendra.gunawan@polytechnic.astra.ac.id',
        phone: '+62 812-3456-7890',
        isKeyDecisionMaker: true,
        notes: 'Technical evaluator for Network & Cloud RFPs'
      },
      {
        id: 'CON-003',
        name: 'Siti Rahmawati, S.E.',
        title: 'Procurement & Vendor Relations Manager',
        department: 'Finance & Procurement',
        email: 'siti.rahmawati@polytechnic.astra.ac.id',
        phone: '+62 813-1122-3344',
        isKeyDecisionMaker: false,
        notes: 'Commercial terms negotiation lead'
      }
    ]
  },
  {
    id: 'CUST-002',
    code: 'AST-YAY',
    name: 'Yayasan Astra Bina Ilmu (Astra Education Foundation)',
    type: 'Corporate',
    industry: 'Education & Philanthropy',
    workingArea: 'DKI Jakarta & Head Office',
    group: 'Astra Ecosystem',
    website: 'www.yabi-astra.or.id',
    address: 'Menara Astra Lt. 18, Jl. Jend. Sudirman Kav. 5-6, Jakarta',
    contactsCount: 3,
    activePipelinesCount: 2,
    totalPipelineValue: 14200000000,
    status: 'Active',
    contacts: [
      {
        id: 'CON-004',
        name: 'Budi Santoso, MBA',
        title: 'Chief Information Officer',
        department: 'Digital Transformation',
        email: 'budi.santoso@yabi-astra.or.id',
        phone: '+62 815-4433-2211',
        isKeyDecisionMaker: true,
        notes: 'Leads digital modernization strategy'
      }
    ]
  },
  {
    id: 'CUST-003',
    code: 'AST-MFG',
    name: 'Astra Component & Manufacturing Center',
    type: 'Manufacturing',
    industry: 'Automotive Component Manufacturing',
    workingArea: 'West Java (Bandung & Cikarang)',
    group: 'Astra Industrial Group',
    website: 'www.astra-component.co.id',
    address: 'Kawasan Industri KIIC Karawang, West Java',
    contactsCount: 3,
    activePipelinesCount: 2,
    totalPipelineValue: 18700000000,
    status: 'Active',
    contacts: [
      {
        id: 'CON-005',
        name: 'Rudi Hermawan, ST.',
        title: 'Plant Digitalization Lead',
        department: 'Smart Manufacturing',
        email: 'rudi.hermawan@astra-component.co.id',
        phone: '+62 818-8877-6655',
        isKeyDecisionMaker: true
      }
    ]
  },
  {
    id: 'CUST-004',
    code: 'AST-TECH',
    name: 'Astra Tech Research & Innovation Hub',
    type: 'Corporate',
    industry: 'Research & Applied Engineering',
    workingArea: 'DKI Jakarta & Head Office',
    group: 'Astra Ecosystem',
    website: 'www.astratech-hub.id',
    address: 'Suntech Innovation Building, Sunter, Jakarta Utara',
    contactsCount: 2,
    activePipelinesCount: 1,
    totalPipelineValue: 9800000000,
    status: 'Active',
    contacts: [
      {
        id: 'CON-006',
        name: 'Dr. Anita Wijaya',
        title: 'Head of Applied AI Laboratory',
        department: 'R&D',
        email: 'anita.wijaya@astratech-hub.id',
        phone: '+62 817-2233-4455',
        isKeyDecisionMaker: true
      }
    ]
  }
];

export const INITIAL_PIPELINES: Pipeline[] = [
  {
    id: 'PL-2026-0891',
    customerCode: 'AST-POLI',
    customerId: 'CUST-001',
    customerName: 'Politeknik Astra (Cikarang Campus)',
    projectName: 'Smart Campus IoT & Industry 4.0 Laboratory Modernization',
    projectDescription: 'Turnkey deployment of IoT Edge Gateway, Private 5G Industrial Network, and Smart Campus Cloud Analytics for Student Practical Labs in Cikarang.',
    portfolio: 'Smart Campus & IoT',
    workingArea: 'West Java (Bandung & Cikarang)',
    opportunityType: 'New Logo',
    salesPerson: 'Dwi Prasetyo',
    salesTeam: 'Enterprise Education Division',
    projectValue: 12500000000,
    probability: 80,
    weightedValue: 10000000000,
    stage: 'Negotiation',
    startDate: '2026-01-15',
    expectedCloseDate: '2026-11-15',
    lastActivityDate: '2026-10-04',
    lastActivitySummary: 'Finalized commercial proposal review with Procurement Team & Dr. Bambang.',
    status: 'Active',
    solutionOfferings: [
      {
        id: 'SOL-101',
        portfolio: 'Smart Campus & IoT',
        productName: 'AGIT IoT Edge Controller Platform & Gateway',
        partner: 'AGIT Proprietary',
        sellingPrice: 3500000000,
        quantity: 1,
        totalValue: 3500000000,
        description: 'Industrial Grade IoT Controller with Edge Analytics'
      },
      {
        id: 'SOL-102',
        portfolio: 'Cloud & Infrastructure',
        productName: 'Cisco Industrial Private Wi-Fi 6 & Sensor Infrastructure',
        partner: 'Cisco Systems',
        sellingPrice: 4200000000,
        quantity: 1,
        totalValue: 4200000000,
        description: 'Enterprise grade wireless campus backbone'
      },
      {
        id: 'SOL-103',
        portfolio: 'Application Modernization',
        productName: 'Smart Campus Central Management Portal',
        partner: 'Microsoft Azure',
        sellingPrice: 4800000000,
        quantity: 1,
        totalValue: 4800000000,
        description: 'Cloud portal dashboard & student lab booking'
      }
    ],
    revenuePlans: [
      { period: '2026-Q1', month: 'Mar 2026', year: 2026, contract: 12500000000, revenue: 1500000000, gp: 450000000, probability: 80, weightedRevenue: 1200000000 },
      { period: '2026-Q2', month: 'Jun 2026', year: 2026, contract: 0, revenue: 4000000000, gp: 1200000000, probability: 80, weightedRevenue: 3200000000 },
      { period: '2026-Q3', month: 'Sep 2026', year: 2026, contract: 0, revenue: 4500000000, gp: 1350000000, probability: 80, weightedRevenue: 3600000000 },
      { period: '2026-Q4', month: 'Dec 2026', year: 2026, contract: 0, revenue: 2500000000, gp: 750000000, probability: 80, weightedRevenue: 2000000000 }
    ],
    competitors: [
      {
        id: 'COMP-1',
        name: 'TelkomSigma',
        strengths: 'Strong network infrastructure presence in West Java',
        weaknesses: 'Higher pricing on custom IoT software development',
        ourStrategy: 'Highlight AGIT deep integration capability with Astra Ecosystem & ready-to-use IoT templates',
        threatLevel: 'Medium'
      },
      {
        id: 'COMP-2',
        name: 'Lintasarta',
        strengths: 'Cloud hosting bundle option',
        weaknesses: 'Lack of vocational education domain experience',
        ourStrategy: 'Demonstrate pre-built student lab management module',
        threatLevel: 'Low'
      }
    ],
    activities: [
      {
        id: 'ACT-501',
        date: '2026-10-04',
        type: 'Visit',
        category: 'Commercial Negotiation',
        customerId: 'CUST-001',
        customerName: 'Politeknik Astra',
        pipelineId: 'PL-2026-0891',
        pipelineName: 'Smart Campus IoT Modernization',
        contactPerson: 'Siti Rahmawati, S.E.',
        salesPerson: 'Dwi Prasetyo',
        durationMinutes: 120,
        description: 'Met with procurement team to discuss payment milestones and SLA penalty terms.',
        nextAction: 'Submit revised contract appendix draft by Oct 10.',
        status: 'Completed'
      },
      {
        id: 'ACT-502',
        date: '2026-09-22',
        type: 'Visit',
        category: 'Proposal Defense',
        customerId: 'CUST-001',
        customerName: 'Politeknik Astra',
        pipelineId: 'PL-2026-0891',
        pipelineName: 'Smart Campus IoT Modernization',
        contactPerson: 'Dr. Ir. H. Bambang Widjaja',
        salesPerson: 'Dwi Prasetyo',
        durationMinutes: 180,
        description: 'Defended architecture layout and hardware specifications in front of IT steering committee.',
        nextAction: 'Incorporate Cisco Wi-Fi 6 redundancy options into proposal.',
        status: 'Completed'
      }
    ],
    comments: [
      {
        id: 'COM-1',
        author: 'Dwi Prasetyo',
        avatar: 'DP',
        role: 'Account Executive',
        timestamp: '2026-10-04 15:30',
        text: 'Procurement requested discount on implementation service fee by 3%. Approved by VP Sales.'
      },
      {
        id: 'COM-2',
        author: 'Suryanto Tan',
        avatar: 'ST',
        role: 'Solution Architect',
        timestamp: '2026-09-23 10:15',
        text: 'Hardware BoM updated to include 24x Cisco Wi-Fi 6 industrial access points.'
      }
    ],
    repository: [
      {
        id: 'REP-1',
        fileName: 'AGIT_SmartCampus_Proposal_v3.2.pdf',
        fileSize: '14.2 MB',
        uploadedBy: 'Dwi Prasetyo',
        uploadedAt: '2026-09-20',
        category: 'RFP / Proposal',
        fileType: 'pdf'
      },
      {
        id: 'REP-2',
        fileName: 'Solution_Offering_BoM_Commercial.xlsx',
        fileSize: '3.8 MB',
        uploadedBy: 'Suryanto Tan',
        uploadedAt: '2026-09-22',
        category: 'Commercial Quotation',
        fileType: 'xlsx'
      }
    ],
    contacts: [
      {
        id: 'CON-001',
        name: 'Dr. Ir. H. Bambang Widjaja, M.T.',
        title: 'Director of Academic & Information Technology',
        department: 'Executive Board',
        email: 'bambang.widjaja@polytechnic.astra.ac.id',
        phone: '+62 811-9876-5432',
        isKeyDecisionMaker: true
      },
      {
        id: 'CON-002',
        name: 'Hendra Gunawan, S.Kom., M.Kom.',
        title: 'Head of IT Infrastructure & Systems',
        department: 'ICT Services',
        email: 'hendra.gunawan@polytechnic.astra.ac.id',
        phone: '+62 812-3456-7890',
        isKeyDecisionMaker: true
      }
    ]
  },
  {
    id: 'PL-2026-0892',
    customerCode: 'AST-POLI',
    customerId: 'CUST-001',
    customerName: 'Politeknik Astra (Cikarang Campus)',
    projectName: 'Enterprise SAP & Academic Information System Integration',
    projectDescription: 'Core redevelopment of academic management platform and real-time API connector to SAP S/4HANA for tuition billing & financial reconciliation.',
    portfolio: 'Application Modernization',
    workingArea: 'West Java (Bandung & Cikarang)',
    opportunityType: 'Upsell / Expansion',
    salesPerson: 'Ratna Sari',
    salesTeam: 'Enterprise Education Division',
    projectValue: 8800000000,
    probability: 60,
    weightedValue: 5280000000,
    stage: 'Proposal',
    startDate: '2026-02-01',
    expectedCloseDate: '2026-12-01',
    lastActivityDate: '2026-10-02',
    lastActivitySummary: 'Submitted revised Scope of Work document to Hendra Gunawan.',
    status: 'Active',
    solutionOfferings: [
      {
        id: 'SOL-201',
        portfolio: 'Application Modernization',
        productName: 'Custom Academic ERP Core Portal (React / Node Microservices)',
        partner: 'AGIT Application Practice',
        sellingPrice: 5200000000,
        quantity: 1,
        totalValue: 5200000000
      },
      {
        id: 'SOL-202',
        portfolio: 'Managed Services',
        productName: 'SAP Integration Middleware & Annual Managed Support',
        partner: 'SAP SE / AGIT',
        sellingPrice: 3600000000,
        quantity: 1,
        totalValue: 3600000000
      }
    ],
    revenuePlans: [
      { period: '2026-Q2', month: 'May 2026', year: 2026, contract: 8800000000, revenue: 2000000000, gp: 600000000, probability: 60, weightedRevenue: 1200000000 },
      { period: '2026-Q3', month: 'Aug 2026', year: 2026, contract: 0, revenue: 4000000000, gp: 1200000000, probability: 60, weightedRevenue: 2400000000 },
      { period: '2026-Q4', month: 'Nov 2026', year: 2026, contract: 0, revenue: 2800000000, gp: 840000000, probability: 60, weightedRevenue: 1680000000 }
    ],
    competitors: [
      {
        id: 'COMP-3',
        name: 'Metrodata',
        strengths: 'Strong SAP consulting history',
        weaknesses: 'Higher pricing for custom portal development',
        ourStrategy: 'Offer turnkey single SLA bundle covering both SAP & custom web portal',
        threatLevel: 'Medium'
      }
    ],
    activities: [
      {
        id: 'ACT-503',
        date: '2026-10-02',
        type: 'Correspondence',
        category: 'Requirement Gathering',
        customerId: 'CUST-001',
        customerName: 'Politeknik Astra',
        pipelineId: 'PL-2026-0892',
        pipelineName: 'Enterprise SAP Integration',
        contactPerson: 'Hendra Gunawan',
        salesPerson: 'Ratna Sari',
        durationMinutes: 45,
        description: 'Emailed technical API architecture document for SAP connector.',
        nextAction: 'Schedule technical deep-dive workshop next week.',
        status: 'Completed'
      }
    ],
    comments: [],
    repository: [],
    contacts: [
      {
        id: 'CON-002',
        name: 'Hendra Gunawan, S.Kom., M.Kom.',
        title: 'Head of IT Infrastructure & Systems',
        department: 'ICT Services',
        email: 'hendra.gunawan@polytechnic.astra.ac.id',
        phone: '+62 812-3456-7890',
        isKeyDecisionMaker: true
      }
    ]
  },
  {
    id: 'PL-2026-0893',
    customerCode: 'AST-YAY',
    customerId: 'CUST-002',
    customerName: 'Yayasan Astra Bina Ilmu',
    projectName: 'Astra Education Multi-Tenant Cloud Migration & Security Upgrade',
    projectDescription: 'Migration of 14 vocational school servers to AGIT Hybrid Cloud (AWS/Azure) with Palo Alto Next-Gen Firewall & SOC Monitoring.',
    portfolio: 'Cloud & Infrastructure',
    workingArea: 'DKI Jakarta & Head Office',
    opportunityType: 'New Logo',
    salesPerson: 'Agus Setiawan',
    salesTeam: 'Cloud & Enterprise Solutions',
    projectValue: 9500000000,
    probability: 90,
    weightedValue: 8550000000,
    stage: 'Closing',
    startDate: '2026-01-10',
    expectedCloseDate: '2026-10-30',
    lastActivityDate: '2026-10-05',
    lastActivitySummary: 'Final legal agreement sign-off pending CIO approval.',
    status: 'Active',
    solutionOfferings: [
      {
        id: 'SOL-301',
        portfolio: 'Cloud & Infrastructure',
        productName: 'AGIT Cloud Landing Zone & Migration Services',
        partner: 'AWS / AGIT Cloud',
        sellingPrice: 4500000000,
        quantity: 1,
        totalValue: 4500000000
      },
      {
        id: 'SOL-302',
        portfolio: 'Cyber Security',
        productName: 'Palo Alto Virtual Firewall & Managed SOC 24/7',
        partner: 'Palo Alto Networks',
        sellingPrice: 5000000000,
        quantity: 1,
        totalValue: 5000000000
      }
    ],
    revenuePlans: [
      { period: '2026-Q4', month: 'Oct 2026', year: 2026, contract: 9500000000, revenue: 3000000000, gp: 900000000, probability: 90, weightedRevenue: 2700000000 },
      { period: '2027-Q1', month: 'Jan 2027', year: 2027, contract: 0, revenue: 6500000000, gp: 1950000000, probability: 90, weightedRevenue: 5850000000 }
    ],
    competitors: [],
    activities: [],
    comments: [],
    repository: [],
    contacts: []
  },
  {
    id: 'PL-2026-0894',
    customerCode: 'AST-MFG',
    customerId: 'CUST-003',
    customerName: 'Astra Component & Manufacturing Center',
    projectName: 'AI Computer Vision Inspection System for Automotive Assembly',
    projectDescription: 'Automated defect detection system using high-resolution industrial cameras, edge GPU servers, and custom deep-learning models.',
    portfolio: 'Data Analytics & AI',
    workingArea: 'West Java (Bandung & Cikarang)',
    opportunityType: 'New Logo',
    salesPerson: 'Dwi Prasetyo',
    salesTeam: 'Industrial IoT & AI Team',
    projectValue: 14500000000,
    probability: 40,
    weightedValue: 5800000000,
    stage: 'Qualification',
    startDate: '2026-03-01',
    expectedCloseDate: '2026-12-20',
    lastActivityDate: '2026-09-28',
    lastActivitySummary: 'Completed Proof of Concept (PoC) demonstration at Karawang assembly line.',
    status: 'Active',
    solutionOfferings: [
      {
        id: 'SOL-401',
        portfolio: 'Data Analytics & AI',
        productName: 'AGIT Vision AI Edge Workstation & Camera Suite',
        partner: 'NVIDIA / AGIT AI Labs',
        sellingPrice: 8500000000,
        quantity: 1,
        totalValue: 8500000000
      },
      {
        id: 'SOL-402',
        portfolio: 'Application Modernization',
        productName: 'Defect Analytics & MES Connector Software',
        partner: 'AGIT Software',
        sellingPrice: 6000000000,
        quantity: 1,
        totalValue: 6000000000
      }
    ],
    revenuePlans: [],
    competitors: [],
    activities: [],
    comments: [],
    repository: [],
    contacts: []
  },
  {
    id: 'PL-2026-0895',
    customerCode: 'AST-TECH',
    customerId: 'CUST-004',
    customerName: 'Astra Tech Research & Innovation Hub',
    projectName: 'HPC AI Supercomputing Cluster & Storage Expansion',
    projectDescription: 'High Performance Computing cluster powered by NVIDIA H100 GPU nodes for AI model training and engineering simulations.',
    portfolio: 'Cloud & Infrastructure',
    workingArea: 'DKI Jakarta & Head Office',
    opportunityType: 'New Logo',
    salesPerson: 'Agus Setiawan',
    salesTeam: 'Enterprise Infrastructure',
    projectValue: 9800000000,
    probability: 100,
    weightedValue: 9800000000,
    stage: 'Won',
    startDate: '2026-01-05',
    expectedCloseDate: '2026-08-30',
    lastActivityDate: '2026-08-30',
    lastActivitySummary: 'Contract signed. Project handed over to AGIT Delivery Team.',
    status: 'Won',
    solutionOfferings: [
      {
        id: 'SOL-501',
        portfolio: 'Cloud & Infrastructure',
        productName: 'NVIDIA H100 AI Compute Node & NetApp SAN Storage',
        partner: 'NVIDIA / NetApp',
        sellingPrice: 9800000000,
        quantity: 1,
        totalValue: 9800000000
      }
    ],
    revenuePlans: [
      { period: '2026-Q3', month: 'Aug 2026', year: 2026, contract: 9800000000, revenue: 9800000000, gp: 2450000000, probability: 100, weightedRevenue: 9800000000 }
    ],
    competitors: [],
    activities: [],
    comments: [],
    repository: [],
    contacts: []
  },
  {
    id: 'PL-2026-0896',
    customerCode: 'AST-POLI',
    customerId: 'CUST-001',
    customerName: 'Politeknik Astra (Cikarang Campus)',
    projectName: 'Automated Digital Library & Campus Asset RFID System',
    projectDescription: 'RFID tagging and automatic kiosk system for book borrowing and lab equipment inventory tracking.',
    portfolio: 'Application Modernization',
    workingArea: 'West Java (Bandung & Cikarang)',
    opportunityType: 'New Logo',
    salesPerson: 'Ratna Sari',
    salesTeam: 'Enterprise Education Division',
    projectValue: 3200000000,
    probability: 0,
    weightedValue: 0,
    stage: 'Lost',
    startDate: '2026-02-10',
    expectedCloseDate: '2026-07-15',
    lastActivityDate: '2026-07-15',
    lastActivitySummary: 'Customer chose local niche hardware vendor due to budget constraints.',
    status: 'Lost',
    lossReason: 'Price / Budget Constraint',
    competitorWon: 'PT Solusi Edukasi Mandiri',
    solutionOfferings: [],
    revenuePlans: [],
    competitors: [],
    activities: [],
    comments: [],
    repository: [],
    contacts: []
  }
];

export const INITIAL_ACTIVITIES: SalesActivity[] = [
  {
    id: 'ACT-101',
    date: '2026-10-06',
    type: 'Visit',
    category: 'Commercial Negotiation',
    customerId: 'CUST-001',
    customerName: 'Politeknik Astra',
    pipelineId: 'PL-2026-0891',
    pipelineName: 'Smart Campus IoT Modernization',
    contactPerson: 'Dr. Ir. H. Bambang Widjaja',
    salesPerson: 'Dwi Prasetyo',
    durationMinutes: 90,
    description: 'Executive alignment meeting for Q4 rollout schedule and payment terms approval.',
    nextAction: 'Prepare final Master Services Agreement (MSA) draft.',
    status: 'Completed'
  },
  {
    id: 'ACT-102',
    date: '2026-10-06',
    type: 'Phone Call',
    category: 'Follow-up',
    customerId: 'CUST-002',
    customerName: 'Yayasan Astra Bina Ilmu',
    pipelineId: 'PL-2026-0893',
    pipelineName: 'Astra Education Multi-Tenant Cloud Migration',
    contactPerson: 'Budi Santoso, MBA',
    salesPerson: 'Agus Setiawan',
    durationMinutes: 30,
    description: 'Confirmed receipt of signed legal approval for Palo Alto firewall license.',
    nextAction: 'Trigger procurement order in SAP.',
    status: 'Completed'
  },
  {
    id: 'ACT-103',
    date: '2026-10-07',
    type: 'Desk Work',
    category: 'Proposal Defense',
    customerId: 'CUST-001',
    customerName: 'Politeknik Astra',
    pipelineId: 'PL-2026-0892',
    pipelineName: 'Enterprise SAP Integration',
    contactPerson: 'Hendra Gunawan',
    salesPerson: 'Ratna Sari',
    durationMinutes: 120,
    description: 'Finalizing technical presentation deck for SAP API Gateway architecture.',
    nextAction: 'Deliver presentation to ICT steering committee on Thursday.',
    status: 'Planned'
  },
  {
    id: 'ACT-104',
    date: '2026-10-08',
    type: 'Visit',
    category: 'Requirement Gathering',
    customerId: 'CUST-003',
    customerName: 'Astra Component & Manufacturing Center',
    pipelineId: 'PL-2026-0894',
    pipelineName: 'AI Computer Vision Inspection System',
    contactPerson: 'Rudi Hermawan, ST.',
    salesPerson: 'Dwi Prasetyo',
    durationMinutes: 180,
    description: 'On-site factory walkthrough at Karawang Plant 2 to inspect camera mounting locations.',
    nextAction: 'Calculate required lighting and lens specifications.',
    status: 'Planned'
  },
  {
    id: 'ACT-105',
    date: '2026-10-10',
    type: 'Correspondence',
    category: 'Contract Review',
    customerId: 'CUST-004',
    customerName: 'Astra Tech Research Hub',
    pipelineId: 'PL-2026-0895',
    pipelineName: 'HPC AI Supercomputing Cluster',
    contactPerson: 'Dr. Anita Wijaya',
    salesPerson: 'Agus Setiawan',
    durationMinutes: 45,
    description: 'Emailing milestone sign-off certificate for Phase 1 hardware delivery.',
    nextAction: 'Initiate invoice billing #1.',
    status: 'Planned'
  }
];

export const INITIAL_METRICS: DashboardMetrics = {
  totalPipeline: 68300000000,
  contractValue: 45300000000,
  revenuePlan: 38900000000,
  grossProfit: 11670000000,
  weightedPipeline: 39430000000,
  winRate: 71.4,
  totalDealsCount: 6
};
