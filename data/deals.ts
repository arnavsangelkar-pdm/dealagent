export interface DealStage {
  stage: string;
  date: string;
}

export interface Stakeholder {
  name: string;
  title: string;
  role: string;
}

export interface Metric {
  name: string;
  before?: string | number;
  after?: string | number;
  lift?: string;
  description?: string;
}

export interface Deal {
  id: string;
  clientName: string;
  clientAlias?: string;
  industry: string;
  subIndustry: string;
  region: string;
  companySize: string;
  annualRevenueRange: string;
  services: string[];
  channels: string[];
  techStack: string[];
  dealStageHistory: DealStage[];
  contractValueRange: string;
  contractTermMonths: number;
  marginNotes: string;
  objectives: string[];
  challenges: string[];
  objections: string[];
  competitors: string[];
  differentiators: string[];
  keyStakeholders: Stakeholder[];
  timelineNotes: string;
  implementationPlan: string[];
  results: Metric[];
  renewalLikelihood: 'Low' | 'Med' | 'High';
  renewalRationale: string;
  tags: string[];
}

export const deals: Deal[] = [
  {
    id: 'deal-001',
    clientName: 'ApexCommerce',
    clientAlias: 'Apex',
    industry: 'eCommerce DTC',
    subIndustry: 'Fashion & Apparel',
    region: 'North America',
    companySize: 'Mid-Market (200-500 employees)',
    annualRevenueRange: '$50M - $100M',
    services: ['E-commerce Platform', 'Inventory Management', 'Customer Analytics', 'Payment Processing'],
    channels: ['Direct Sales', 'Partner Referral'],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    dealStageHistory: [
      { stage: 'Discovery', date: '2024-01-15' },
      { stage: 'Proposal', date: '2024-02-20' },
      { stage: 'Negotiation', date: '2024-03-10' },
      { stage: 'Closed Won', date: '2024-04-05' },
      { stage: 'Implementation', date: '2024-04-15' },
      { stage: 'Live', date: '2024-06-01' }
    ],
    contractValueRange: '$800K - $1.2M',
    contractTermMonths: 24,
    marginNotes: 'Strong margin due to platform licensing model. Upsell potential on analytics add-ons.',
    objectives: [
      'Scale to 10x traffic during peak seasons',
      'Reduce cart abandonment by 25%',
      'Improve mobile conversion rates',
      'Integrate with 5+ fulfillment partners'
    ],
    challenges: [
      'Legacy system migration complexity',
      'Peak traffic handling (Black Friday spikes)',
      'Multi-warehouse inventory sync',
      'Payment gateway compliance across regions'
    ],
    objections: [
      'Initial cost concerns',
      'Migration timeline uncertainty',
      'Team training requirements',
      'Integration with existing tools'
    ],
    competitors: ['Shopify Plus', 'BigCommerce', 'Magento'],
    differentiators: [
      'Real-time inventory sync across warehouses',
      'AI-powered demand forecasting',
      'Built-in A/B testing framework',
      '24/7 dedicated support team'
    ],
    keyStakeholders: [
      { name: 'Sarah Chen', title: 'CTO', role: 'Technical Decision Maker' },
      { name: 'Marcus Rodriguez', title: 'VP of Operations', role: 'Business Owner' },
      { name: 'Emily Park', title: 'Head of E-commerce', role: 'End User Champion' }
    ],
    timelineNotes: 'Fast-tracked implementation due to Q4 seasonality. Phased rollout with core features first, advanced analytics in Phase 2.',
    implementationPlan: [
      'Week 1-2: Infrastructure setup and data migration prep',
      'Week 3-4: Core platform deployment and testing',
      'Week 5-6: Integration with fulfillment partners',
      'Week 7-8: User training and go-live',
      'Week 9-12: Analytics module rollout and optimization'
    ],
    results: [
      { name: 'Traffic Capacity', before: '500K visits/month', after: '5M visits/month', lift: '10x', description: 'Peak season handling' },
      { name: 'Cart Abandonment', before: '68%', after: '42%', lift: '38% reduction', description: 'Improved checkout flow' },
      { name: 'Mobile Conversion', before: '1.8%', after: '3.2%', lift: '78% increase', description: 'Mobile-first redesign' }
    ],
    renewalLikelihood: 'High',
    renewalRationale: 'Strong ROI demonstrated, excellent relationship with stakeholders, clear expansion roadmap for analytics and international markets.',
    tags: ['ecommerce', 'high-value', 'enterprise', 'renewal-strong', 'north-america']
  },
  {
    id: 'deal-002',
    clientName: 'CloudSync Solutions',
    clientAlias: 'CloudSync',
    industry: 'B2B SaaS',
    subIndustry: 'Productivity Software',
    region: 'North America',
    companySize: 'SMB (50-200 employees)',
    annualRevenueRange: '$10M - $25M',
    services: ['API Integration', 'Data Synchronization', 'Workflow Automation'],
    channels: ['Self-Service', 'Inside Sales'],
    techStack: ['Python', 'REST APIs', 'MongoDB', 'Docker'],
    dealStageHistory: [
      { stage: 'Discovery', date: '2024-03-01' },
      { stage: 'Trial', date: '2024-03-15' },
      { stage: 'Proposal', date: '2024-04-10' },
      { stage: 'Closed Won', date: '2024-05-01' },
      { stage: 'Implementation', date: '2024-05-15' },
      { stage: 'Live', date: '2024-06-15' }
    ],
    contractValueRange: '$120K - $180K',
    contractTermMonths: 12,
    marginNotes: 'Standard SaaS margin. Low touch model with self-service onboarding.',
    objectives: [
      'Connect 15+ third-party tools',
      'Automate data sync workflows',
      'Reduce manual data entry by 80%',
      'Improve team collaboration efficiency'
    ],
    challenges: [
      'API rate limits from third-party providers',
      'Data mapping complexity across tools',
      'User adoption across distributed teams',
      'Real-time sync reliability'
    ],
    objections: [
      'Pricing per integration',
      'Learning curve for non-technical users',
      'Security and compliance concerns',
      'Dependency on third-party APIs'
    ],
    competitors: ['Zapier', 'Make.com', 'Tray.io'],
    differentiators: [
      'Native integrations with enterprise SSO',
      'Visual workflow builder (no-code)',
      'Advanced error handling and retry logic',
      'Dedicated Slack support channel'
    ],
    keyStakeholders: [
      { name: 'David Kim', title: 'Founder & CEO', role: 'Decision Maker' },
      { name: 'Lisa Thompson', title: 'Head of Operations', role: 'Champion' }
    ],
    timelineNotes: 'Quick implementation due to self-service model. Most integrations completed within 2 weeks.',
    implementationPlan: [
      'Week 1: Account setup and initial integrations',
      'Week 2: Workflow configuration and testing',
      'Week 3: Team training and rollout',
      'Week 4: Optimization and support'
    ],
    results: [
      { name: 'Manual Data Entry', before: '15 hours/week', after: '2 hours/week', lift: '87% reduction', description: 'Automated workflows' },
      { name: 'Integration Count', before: '3 tools', after: '18 tools', lift: '6x increase', description: 'Expanded connectivity' },
      { name: 'Team Efficiency', before: 'Baseline', after: '+35%', lift: '35% improvement', description: 'Time saved on manual tasks' }
    ],
    renewalLikelihood: 'Med',
    renewalRationale: 'Good product fit but price-sensitive. May explore alternatives if pricing increases. Strong usage indicates value.',
    tags: ['saas', 'smb', 'self-service', 'automation', 'north-america']
  },
  {
    id: 'deal-003',
    clientName: 'MediCare Network',
    clientAlias: 'MediCare',
    industry: 'Healthcare Provider',
    subIndustry: 'Hospital System',
    region: 'North America',
    companySize: 'Enterprise (5000+ employees)',
    annualRevenueRange: '$500M+',
    services: ['HIPAA-Compliant Platform', 'Patient Portal', 'Telemedicine Integration', 'EHR Integration'],
    channels: ['Enterprise Sales', 'RFP Process'],
    techStack: ['Java', 'HL7/FHIR', 'HIPAA-compliant infrastructure', 'Azure'],
    dealStageHistory: [
      { stage: 'RFP', date: '2023-11-01' },
      { stage: 'Discovery', date: '2023-12-15' },
      { stage: 'Pilot', date: '2024-01-20' },
      { stage: 'Negotiation', date: '2024-03-10' },
      { stage: 'Closed Won', date: '2024-04-20' },
      { stage: 'Implementation', date: '2024-05-01' },
      { stage: 'Live', date: '2024-08-15' }
    ],
    contractValueRange: '$2.5M - $3.5M',
    contractTermMonths: 36,
    marginNotes: 'Lower margin due to compliance overhead and extended implementation. High strategic value.',
    objectives: [
      'Improve patient engagement scores',
      'Reduce no-show rates by 30%',
      'Enable telemedicine across 12 locations',
      'Ensure 100% HIPAA compliance',
      'Integrate with Epic EHR system'
    ],
    challenges: [
      'Complex HIPAA compliance requirements',
      'EHR integration complexity (Epic)',
      'Multi-location rollout coordination',
      'Staff training across 500+ users',
      'Regulatory approval processes'
    ],
    objections: [
      'Security and compliance concerns',
      'Integration timeline with Epic',
      'Change management for clinical staff',
      'Total cost of ownership',
      'Vendor lock-in concerns'
    ],
    competitors: ['Epic MyChart', 'Cerner HealtheLife', 'athenahealth'],
    differentiators: [
      'Pre-built Epic integration (certified)',
      'Dedicated compliance officer assigned',
      'White-glove implementation and training',
      '24/7 clinical support hotline',
      'Proven track record with 50+ health systems'
    ],
    keyStakeholders: [
      { name: 'Dr. Patricia Williams', title: 'CMO', role: 'Executive Sponsor' },
      { name: 'Robert Martinez', title: 'CIO', role: 'Technical Decision Maker' },
      { name: 'Jennifer Lee', title: 'VP of Patient Services', role: 'Business Owner' },
      { name: 'Michael Brown', title: 'Compliance Officer', role: 'Gatekeeper' }
    ],
    timelineNotes: 'Extended timeline due to compliance reviews and Epic integration certification. Phased rollout across locations.',
    implementationPlan: [
      'Month 1-2: Compliance review and Epic integration setup',
      'Month 3-4: Pilot at 2 locations',
      'Month 5-6: Staff training and certification',
      'Month 7-9: Rollout to remaining 10 locations',
      'Month 10-12: Optimization and support'
    ],
    results: [
      { name: 'Patient Engagement Score', before: '6.2/10', after: '8.7/10', lift: '40% increase', description: 'Portal usage and satisfaction' },
      { name: 'No-Show Rate', before: '18%', after: '11%', lift: '39% reduction', description: 'Automated reminders' },
      { name: 'Telemedicine Adoption', before: '0%', after: '42%', lift: 'New capability', description: 'Virtual visit enablement' }
    ],
    renewalLikelihood: 'High',
    renewalRationale: 'Strategic partnership with strong compliance track record. Multi-year contract with expansion opportunities.',
    tags: ['healthcare', 'enterprise', 'compliance', 'high-value', 'north-america', 'epic-integration']
  },
  {
    id: 'deal-004',
    clientName: 'PayFlow Financial',
    clientAlias: 'PayFlow',
    industry: 'FinTech',
    subIndustry: 'Payment Processing',
    region: 'North America',
    companySize: 'Mid-Market (500-1000 employees)',
    annualRevenueRange: '$100M - $250M',
    services: ['Fraud Detection', 'Payment Gateway', 'Compliance Monitoring', 'Risk Analytics'],
    channels: ['Direct Sales', 'Industry Conference'],
    techStack: ['Python', 'Machine Learning', 'PostgreSQL', 'AWS'],
    dealStageHistory: [
      { stage: 'Discovery', date: '2024-02-10' },
      { stage: 'POC', date: '2024-03-01' },
      { stage: 'Proposal', date: '2024-04-15' },
      { stage: 'Negotiation', date: '2024-05-20' },
      { stage: 'Closed Won', date: '2024-06-10' },
      { stage: 'Implementation', date: '2024-06-25' },
      { stage: 'Live', date: '2024-08-01' }
    ],
    contractValueRange: '$1.5M - $2M',
    contractTermMonths: 24,
    marginNotes: 'Strong margin on ML-based fraud detection. High transaction volume drives recurring revenue.',
    objectives: [
      'Reduce false positive fraud alerts by 40%',
      'Improve fraud detection accuracy to 99.5%',
      'Comply with PCI-DSS Level 1',
      'Process 10M+ transactions/month',
      'Reduce chargeback rates'
    ],
    challenges: [
      'Balancing fraud detection vs user experience',
      'PCI-DSS compliance requirements',
      'Real-time processing at scale',
      'Integration with multiple payment processors',
      'Regulatory changes (state-by-state)'
    ],
    objections: [
      'ML model explainability',
      'Integration complexity',
      'Cost per transaction concerns',
      'Vendor dependency risk',
      'Compliance certification timeline'
    ],
    competitors: ['Stripe Radar', 'Kount', 'Sift'],
    differentiators: [
      'Explainable AI for fraud decisions',
      'Real-time model updates (no retraining delays)',
      'PCI-DSS Level 1 certified infrastructure',
      'Custom rule engine for business logic',
      'Dedicated fraud analyst support'
    ],
    keyStakeholders: [
      { name: 'Amanda Foster', title: 'VP of Risk Management', role: 'Decision Maker' },
      { name: 'James Wilson', title: 'CTO', role: 'Technical Sponsor' },
      { name: 'Rachel Green', title: 'Head of Payments', role: 'Champion' }
    ],
    timelineNotes: 'Fast implementation due to pre-built PCI infrastructure. ML models tuned during first month.',
    implementationPlan: [
      'Week 1-2: Infrastructure setup and PCI certification',
      'Week 3-4: Payment gateway integrations',
      'Week 5-6: ML model deployment and tuning',
      'Week 7-8: Testing and go-live',
      'Month 3: Optimization and monitoring'
    ],
    results: [
      { name: 'False Positive Rate', before: '12%', after: '6.8%', lift: '43% reduction', description: 'Improved ML accuracy' },
      { name: 'Fraud Detection Accuracy', before: '97.2%', after: '99.6%', description: 'ML model performance' },
      { name: 'Chargeback Rate', before: '0.8%', after: '0.3%', lift: '63% reduction', description: 'Better fraud prevention' }
    ],
    renewalLikelihood: 'High',
    renewalRationale: 'Critical infrastructure component with proven ROI. Strong technical partnership and expansion opportunities.',
    tags: ['fintech', 'ml-ai', 'compliance', 'high-value', 'north-america', 'fraud-detection']
  },
  {
    id: 'deal-005',
    clientName: 'HomeService Pro',
    clientAlias: 'HomeService',
    industry: 'Local Multi-Location Services',
    subIndustry: 'Home Services (Plumbing, HVAC, Electrical)',
    region: 'North America',
    companySize: 'Mid-Market (300-500 employees)',
    annualRevenueRange: '$25M - $50M',
    services: ['Field Service Management', 'Scheduling System', 'Customer Portal', 'Mobile App'],
    channels: ['Direct Sales', 'Trade Show'],
    techStack: ['React Native', 'Node.js', 'PostgreSQL', 'Google Maps API'],
    dealStageHistory: [
      { stage: 'Discovery', date: '2024-01-20' },
      { stage: 'Demo', date: '2024-02-05' },
      { stage: 'Proposal', date: '2024-03-01' },
      { stage: 'Negotiation', date: '2024-03-20' },
      { stage: 'Closed Won', date: '2024-04-10' },
      { stage: 'Implementation', date: '2024-04-25' },
      { stage: 'Live', date: '2024-06-15' }
    ],
    contractValueRange: '$400K - $600K',
    contractTermMonths: 24,
    marginNotes: 'Standard margin. High volume of users (200+ field technicians) drives support costs.',
    objectives: [
      'Optimize technician routing and scheduling',
      'Reduce customer wait times by 30%',
      'Improve first-time fix rate',
      'Enable customer self-scheduling',
      'Track service history across locations'
    ],
    challenges: [
      'Coordinating 200+ field technicians',
      'Real-time GPS tracking and routing',
      'Multi-location inventory management',
      'Customer communication across channels',
      'Legacy system data migration'
    ],
    objections: [
      'Mobile app adoption by technicians',
      'GPS tracking privacy concerns',
      'Integration with existing accounting system',
      'Training time for dispatchers',
      'Cost per technician seat'
    ],
    competitors: ['ServiceTitan', 'Housecall Pro', 'Jobber'],
    differentiators: [
      'AI-powered route optimization',
      'Offline-first mobile app for technicians',
      'Integrated customer communication (SMS, email, app)',
      'Real-time inventory tracking across locations',
      'Customizable workflows per service type'
    ],
    keyStakeholders: [
      { name: 'Tom Anderson', title: 'Operations Manager', role: 'Champion' },
      { name: 'Susan Martinez', title: 'CEO', role: 'Decision Maker' },
      { name: 'Carlos Rodriguez', title: 'IT Director', role: 'Technical Owner' }
    ],
    timelineNotes: 'Smooth implementation with phased rollout. Mobile app adoption exceeded expectations.',
    implementationPlan: [
      'Week 1-2: Data migration and system setup',
      'Week 3-4: Dispatcher training and configuration',
      'Week 5-6: Mobile app rollout to technicians',
      'Week 7-8: Customer portal launch',
      'Month 3: Optimization and feedback integration'
    ],
    results: [
      { name: 'Average Wait Time', before: '4.2 days', after: '2.1 days', lift: '50% reduction', description: 'Better scheduling' },
      { name: 'First-Time Fix Rate', before: '72%', after: '89%', lift: '24% increase', description: 'Better routing and prep' },
      { name: 'Customer Satisfaction', before: '7.1/10', after: '8.9/10', lift: '25% increase', description: 'Improved experience' }
    ],
    renewalLikelihood: 'Med',
    renewalRationale: 'Good product fit and results, but price-sensitive. May negotiate on renewal. Strong usage indicates value.',
    tags: ['field-service', 'multi-location', 'mobile', 'north-america', 'mid-market']
  },
  {
    id: 'deal-006',
    clientName: 'MarketPlace Hub',
    clientAlias: 'MarketPlace',
    industry: 'Marketplace',
    subIndustry: 'B2B Marketplace',
    region: 'Europe',
    companySize: 'Mid-Market (200-400 employees)',
    annualRevenueRange: '$30M - $60M',
    services: ['Marketplace Platform', 'Payment Processing', 'Seller Analytics', 'Buyer Matching'],
    channels: ['Direct Sales', 'Partner Channel'],
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe Connect'],
    dealStageHistory: [
      { stage: 'Discovery', date: '2023-12-01' },
      { stage: 'Proposal', date: '2024-01-15' },
      { stage: 'Negotiation', date: '2024-02-20' },
      { stage: 'Stalled', date: '2024-03-15' },
      { stage: 'Negotiation', date: '2024-05-01' },
      { stage: 'Closed Won', date: '2024-06-05' },
      { stage: 'Implementation', date: '2024-06-20' },
      { stage: 'Live', date: '2024-08-10' }
    ],
    contractValueRange: '$600K - $900K',
    contractTermMonths: 18,
    marginNotes: 'Deal stalled for 2 months due to funding concerns. Eventually closed with modified terms.',
    objectives: [
      'Scale to 10,000+ active sellers',
      'Process $50M+ in GMV annually',
      'Improve buyer-seller matching',
      'Reduce payment processing fees',
      'Enable multi-currency transactions'
    ],
    challenges: [
      'Two-sided marketplace dynamics',
      'Payment processing across EU countries',
      'Seller onboarding and verification',
      'Fraud prevention on both sides',
      'Multi-currency and tax compliance'
    ],
    objections: [
      'Platform fees structure',
      'Payment processing timeline',
      'Seller verification process',
      'Dispute resolution mechanism',
      'International expansion complexity'
    ],
    competitors: ['Faire', 'Alibaba', 'Amazon Business'],
    differentiators: [
      'AI-powered buyer-seller matching',
      'Built-in multi-currency support',
      'Automated seller verification',
      'Integrated dispute resolution',
      'White-label options for enterprise buyers'
    ],
    keyStakeholders: [
      { name: 'Emma Thompson', title: 'CEO', role: 'Decision Maker' },
      { name: 'Oliver Schmidt', title: 'CTO', role: 'Technical Sponsor' },
      { name: 'Sophie Laurent', title: 'Head of Operations', role: 'Champion' }
    ],
    timelineNotes: 'Deal stalled in March due to funding round delays. Resumed in May with revised payment terms. Implementation delayed by 2 months.',
    implementationPlan: [
      'Month 1: Platform setup and seller onboarding system',
      'Month 2: Payment processing integration (Stripe Connect)',
      'Month 3: Buyer matching algorithm deployment',
      'Month 4: Multi-currency and tax compliance',
      'Month 5: Testing and go-live'
    ],
    results: [
      { name: 'Active Sellers', before: '2,500', after: '8,200', lift: '228% increase', description: 'Platform growth' },
      { name: 'GMV', before: '$12M/year', after: '$38M/year', lift: '217% increase', description: 'Transaction volume' },
      { name: 'Buyer Match Rate', before: '45%', after: '78%', lift: '73% increase', description: 'AI matching improvement' }
    ],
    renewalLikelihood: 'Med',
    renewalRationale: 'Deal was stalled previously, indicating some risk. Good results but may explore alternatives. Monitor closely.',
    tags: ['marketplace', 'b2b', 'europe', 'stalled-deal', 'multi-currency']
  },
  {
    id: 'deal-007',
    clientName: 'FitTrack App',
    clientAlias: 'FitTrack',
    industry: 'Consumer App',
    subIndustry: 'Health & Fitness',
    region: 'Global',
    companySize: 'Startup (20-50 employees)',
    annualRevenueRange: '$1M - $5M',
    services: ['Mobile App Development', 'Backend Infrastructure', 'Analytics Dashboard', 'Push Notifications'],
    channels: ['Self-Service', 'Inside Sales'],
    techStack: ['React Native', 'Firebase', 'Node.js', 'MongoDB'],
    dealStageHistory: [
      { stage: 'Discovery', date: '2024-03-15' },
      { stage: 'Trial', date: '2024-04-01' },
      { stage: 'Proposal', date: '2024-04-20' },
      { stage: 'Closed Won', date: '2024-05-10' },
      { stage: 'Implementation', date: '2024-05-25' },
      { stage: 'Live', date: '2024-07-01' }
    ],
    contractValueRange: '$80K - $120K',
    contractTermMonths: 12,
    marginNotes: 'Lower margin due to startup pricing. Potential for growth if app succeeds.',
    objectives: [
      'Launch iOS and Android apps',
      'Support 100K+ active users',
      'Implement social features',
      'Add premium subscription tier',
      'Integrate with wearables (Fitbit, Apple Watch)'
    ],
    challenges: [
      'Limited budget and resources',
      'Rapid user growth scalability',
      'Cross-platform consistency',
      'Wearable device integration complexity',
      'User retention and engagement'
    ],
    objections: [
      'Pricing for startup',
      'Feature roadmap alignment',
      'Support response time',
      'Scalability guarantees',
      'Data privacy concerns'
    ],
    competitors: ['MyFitnessPal', 'Strava', 'Nike Run Club'],
    differentiators: [
      'Startup-friendly pricing tiers',
      'Rapid development and deployment',
      'Built-in social features',
      'Comprehensive analytics dashboard',
      'Flexible contract terms'
    ],
    keyStakeholders: [
      { name: 'Alex Chen', title: 'Founder & CEO', role: 'Decision Maker' },
      { name: 'Jordan Taylor', title: 'CTO', role: 'Technical Owner' }
    ],
    timelineNotes: 'Fast implementation due to startup urgency. Phased feature rollout with core features first.',
    implementationPlan: [
      'Week 1-2: Core app development and backend setup',
      'Week 3-4: Social features and user profiles',
      'Week 5-6: Premium subscription integration',
      'Week 7-8: Wearable integrations and testing',
      'Week 9-10: Launch and optimization'
    ],
    results: [
      { name: 'Active Users', before: '0', after: '85K', lift: 'New launch', description: 'User acquisition' },
      { name: 'Premium Conversion', before: '0%', after: '12%', description: 'Subscription revenue' },
      { name: 'Daily Active Users', before: '0', after: '28K', description: 'Engagement metric' }
    ],
    renewalLikelihood: 'Low',
    renewalRationale: 'Startup with uncertain funding. Good product fit but may churn if funding doesn\'t come through or if they pivot.',
    tags: ['consumer-app', 'startup', 'mobile', 'global', 'pilot', 'low-renewal']
  },
  {
    id: 'deal-008',
    clientName: 'Precision Manufacturing Co',
    clientAlias: 'Precision Mfg',
    industry: 'Manufacturing',
    subIndustry: 'Industrial Equipment',
    region: 'North America',
    companySize: 'Enterprise (2000+ employees)',
    annualRevenueRange: '$200M - $500M',
    services: ['IoT Platform', 'Predictive Maintenance', 'Quality Control System', 'Supply Chain Analytics'],
    channels: ['Enterprise Sales', 'Industry Partnership'],
    techStack: ['Python', 'IoT Sensors', 'Time Series DB', 'Azure IoT Hub'],
    dealStageHistory: [
      { stage: 'Discovery', date: '2023-10-01' },
      { stage: 'POC', date: '2023-11-15' },
      { stage: 'Proposal', date: '2024-01-10' },
      { stage: 'Negotiation', date: '2024-02-20' },
      { stage: 'Closed Won', date: '2024-03-15' },
      { stage: 'Implementation', date: '2024-04-01' },
      { stage: 'Live', date: '2024-07-01' }
    ],
    contractValueRange: '$1.8M - $2.5M',
    contractTermMonths: 36,
    marginNotes: 'Strong margin on IoT hardware and platform licensing. Long-term strategic partnership.',
    objectives: [
      'Reduce unplanned downtime by 40%',
      'Improve equipment efficiency by 15%',
      'Predict maintenance needs 30 days in advance',
      'Reduce quality defects by 25%',
      'Optimize supply chain inventory levels'
    ],
    challenges: [
      'Legacy equipment integration',
      'IoT sensor deployment across 8 facilities',
      'Data connectivity in industrial environments',
      'Change management with factory workers',
      'Integration with existing ERP system'
    ],
    objections: [
      'IoT infrastructure investment',
      'Data security in industrial settings',
      'ROI timeline uncertainty',
      'Integration with legacy systems',
      'Training requirements for staff'
    ],
    competitors: ['Siemens MindSphere', 'GE Predix', 'PTC ThingWorx'],
    differentiators: [
      'Pre-built connectors for common industrial equipment',
      'Edge computing for low-latency decisions',
      'Proven ROI calculator with industry benchmarks',
      'Dedicated industrial IoT support team',
      'White-label options for customer-facing dashboards'
    ],
    keyStakeholders: [
      { name: 'Richard Johnson', title: 'VP of Operations', role: 'Executive Sponsor' },
      { name: 'Maria Garcia', title: 'Director of Manufacturing', role: 'Business Owner' },
      { name: 'Kevin Lee', title: 'CIO', role: 'Technical Decision Maker' }
    ],
    timelineNotes: 'Extended implementation due to multi-facility rollout and legacy system integration. Phased approach by facility.',
    implementationPlan: [
      'Month 1-2: IoT infrastructure design and sensor deployment plan',
      'Month 3-4: Pilot at 2 facilities',
      'Month 5-6: ERP integration and data pipeline setup',
      'Month 7-9: Rollout to remaining 6 facilities',
      'Month 10-12: Optimization and advanced analytics'
    ],
    results: [
      { name: 'Unplanned Downtime', before: '12%', after: '6.8%', lift: '43% reduction', description: 'Predictive maintenance' },
      { name: 'Equipment Efficiency', before: '78%', after: '91%', lift: '17% increase', description: 'Optimization improvements' },
      { name: 'Quality Defect Rate', before: '3.2%', after: '2.1%', lift: '34% reduction', description: 'Quality control system' }
    ],
    renewalLikelihood: 'High',
    renewalRationale: 'Strong ROI demonstrated with clear operational improvements. Strategic partnership with expansion opportunities to other facilities.',
    tags: ['manufacturing', 'iot', 'enterprise', 'high-value', 'north-america', 'predictive-maintenance']
  },
  {
    id: 'deal-009',
    clientName: 'EduLearn Academy',
    clientAlias: 'EduLearn',
    industry: 'Education',
    subIndustry: 'Online Learning Platform',
    region: 'North America',
    companySize: 'Mid-Market (100-300 employees)',
    annualRevenueRange: '$15M - $30M',
    services: ['LMS Platform', 'Video Streaming', 'Assessment Tools', 'Student Analytics'],
    channels: ['Direct Sales', 'Education Conference'],
    techStack: ['React', 'Video.js', 'Node.js', 'PostgreSQL'],
    dealStageHistory: [
      { stage: 'Discovery', date: '2024-02-01' },
      { stage: 'Demo', date: '2024-02-20' },
      { stage: 'Proposal', date: '2024-03-15' },
      { stage: 'Negotiation', date: '2024-04-10' },
      { stage: 'Closed Lost', date: '2024-05-05' }
    ],
    contractValueRange: 'N/A - Lost',
    contractTermMonths: 0,
    marginNotes: 'Deal lost to competitor. Price was primary factor.',
    objectives: [
      'Support 50K+ students',
      'Deliver HD video streaming',
      'Track student progress and engagement',
      'Enable peer collaboration features',
      'Integrate with SIS systems'
    ],
    challenges: [
      'Video streaming at scale',
      'Student data privacy (FERPA)',
      'Integration with multiple SIS platforms',
      'Mobile app performance',
      'Assessment proctoring'
    ],
    objections: [
      'Pricing too high',
      'Competitor offering lower cost',
      'Feature gaps vs competitor',
      'Implementation timeline',
      'Support model concerns'
    ],
    competitors: ['Canvas', 'Blackboard', 'Moodle'],
    differentiators: [
      'Modern UI/UX',
      'Built-in video streaming (no third-party)',
      'Advanced analytics dashboard',
      'Mobile-first design',
      'Flexible pricing models'
    ],
    keyStakeholders: [
      { name: 'Dr. Sarah Mitchell', title: 'VP of Academic Technology', role: 'Decision Maker' },
      { name: 'Robert Chen', title: 'IT Director', role: 'Technical Evaluator' }
    ],
    timelineNotes: 'Deal lost in final negotiation. Competitor offered 30% lower pricing with similar features. Client chose cost over differentiation.',
    implementationPlan: [],
    results: [],
    renewalLikelihood: 'Low',
    renewalRationale: 'Deal lost. May re-engage if competitor fails to deliver or if budget increases. Maintain relationship for future opportunities.',
    tags: ['education', 'lms', 'lost-deal', 'north-america', 'mid-market']
  },
  {
    id: 'deal-010',
    clientName: 'GrandStay Hotels',
    clientAlias: 'GrandStay',
    industry: 'Hospitality',
    subIndustry: 'Hotel Chain',
    region: 'North America',
    companySize: 'Mid-Market (400-600 employees)',
    annualRevenueRange: '$40M - $80M',
    services: ['Property Management System', 'Guest Portal', 'Revenue Management', 'Integration Hub'],
    channels: ['Direct Sales', 'Hospitality Trade Show'],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    dealStageHistory: [
      { stage: 'Discovery', date: '2023-09-15' },
      { stage: 'Rebrand Discussion', date: '2023-11-01' },
      { stage: 'Proposal', date: '2024-01-10' },
      { stage: 'Negotiation', date: '2024-02-15' },
      { stage: 'Closed Won', date: '2024-03-20' },
      { stage: 'Rebrand Implementation', date: '2024-04-01' },
      { stage: 'Implementation', date: '2024-05-15' },
      { stage: 'Live', date: '2024-07-20' }
    ],
    contractValueRange: '$700K - $950K',
    contractTermMonths: 24,
    marginNotes: 'Deal included rebranding services which added complexity but increased contract value. Standard margin on core platform.',
    objectives: [
      'Modernize guest experience across 25 properties',
      'Improve revenue per available room (RevPAR)',
      'Integrate with 10+ third-party systems (OTAs, POS, etc.)',
      'Enable mobile check-in and keyless entry',
      'Rebrand digital presence to match new corporate identity'
    ],
    challenges: [
      'Multi-property rollout coordination',
      'Integration with legacy PMS systems',
      'Rebranding during implementation (timing complexity)',
      'Staff training across properties',
      'OTA integration (Booking.com, Expedia, etc.)',
      'Mobile keyless entry hardware deployment'
    ],
    objections: [
      'Rebranding timeline concerns',
      'Integration complexity with existing systems',
      'Cost per property',
      'Staff training time',
      'Mobile app adoption by guests',
      'Data migration from legacy system'
    ],
    competitors: ['Opera PMS', 'Cloudbeds', 'Mews'],
    differentiators: [
      'Built-in rebranding services',
      'Pre-built OTA integrations',
      'Mobile-first guest experience',
      'Revenue management AI',
      'White-glove implementation',
      'Dedicated property support teams'
    ],
    keyStakeholders: [
      { name: 'Victoria Adams', title: 'VP of Operations', role: 'Executive Sponsor' },
      { name: 'Daniel Kim', title: 'Director of Technology', role: 'Technical Decision Maker' },
      { name: 'Laura Martinez', title: 'Marketing Director', role: 'Rebranding Owner' }
    ],
    timelineNotes: 'Unique deal with rebranding component. Implementation delayed by 1 month to accommodate rebrand timeline. Phased rollout by property cluster.',
    implementationPlan: [
      'Month 1: Rebranding design and approval',
      'Month 2: Core platform setup and data migration',
      'Month 3: OTA integrations and mobile app development',
      'Month 4: Pilot at 5 properties',
      'Month 5-6: Rollout to remaining 20 properties',
      'Month 7: Optimization and support'
    ],
    results: [
      { name: 'RevPAR', before: '$85', after: '$112', lift: '32% increase', description: 'Revenue optimization' },
      { name: 'Guest Satisfaction', before: '7.5/10', after: '8.8/10', lift: '17% increase', description: 'Improved experience' },
      { name: 'Mobile Check-in Adoption', before: '0%', after: '68%', lift: 'New capability', description: 'Digital transformation' }
    ],
    renewalLikelihood: 'High',
    renewalRationale: 'Strong results with clear ROI. Rebranding partnership created deeper relationship. Expansion opportunities to additional properties.',
    tags: ['hospitality', 'multi-location', 'rebrand', 'north-america', 'mid-market', 'renewal-strong']
  }
];
