export const STACK_LAYERS = [
  "Applications",
  "Data",
  "Runtime",
  "Middleware",
  "OS",
  "Virtualization",
  "Servers",
  "Storage",
  "Networking"
];

export const SERVICE_MODELS = {
  OnPrem: {
    name: "On-Premises",
    summary: "Complete control and responsibility over the entire hardware and software stack.",
    examples: "Local Data Centers, VMware vSphere",
    layers: {
      Applications: "customer", Data: "customer", Runtime: "customer",
      Middleware: "customer", OS: "customer", Virtualization: "customer",
      Servers: "customer", Storage: "customer", Networking: "customer"
    },
    specs: { cost: "High CapEx", maintenance: "Very High", customization: "Total", timeToMarket: "Slow" }
  },
  IaaS: {
    name: "IaaS (Infrastructure)",
    summary: "Rent virtualized computing resources over the internet.",
    examples: "AWS EC2, Amazon S3, Azure VMs",
    layers: {
      Applications: "customer", Data: "customer", Runtime: "customer",
      Middleware: "customer", OS: "customer", Virtualization: "provider",
      Servers: "provider", Storage: "provider", Networking: "provider"
    },
    specs: { cost: "Pay-as-you-go OpEx", maintenance: "Medium", customization: "High", timeToMarket: "Moderate" }
  },
  PaaS: {
    name: "PaaS (Platform)",
    summary: "Deploy code without managing underlying servers or operating systems.",
    examples: "AWS Elastic Beanstalk, Heroku, Google App Engine",
    layers: {
      Applications: "customer", Data: "shared", Runtime: "provider",
      Middleware: "provider", OS: "provider", Virtualization: "provider",
      Servers: "provider", Storage: "provider", Networking: "provider"
    },
    specs: { cost: "Usage-based OpEx", maintenance: "Low", customization: "Moderate", timeToMarket: "Fast" }
  },
  SaaS: {
    name: "SaaS (Software)",
    summary: "Ready-to-use applications accessed via browser; provider manages everything.",
    examples: "Salesforce, Google Workspace, Slack",
    layers: {
      Applications: "provider", Data: "shared", Runtime: "provider",
      Middleware: "provider", OS: "provider", Virtualization: "provider",
      Servers: "provider", Storage: "provider", Networking: "provider"
    },
    specs: { cost: "Subscription OpEx", maintenance: "Minimal", customization: "Low", timeToMarket: "Instant" }
  }
};

export const DEPLOYMENT_MODELS = [
  {
    id: "public",
    name: "Public Cloud",
    ownership: "Third-Party Cloud Provider",
    security: "Shared Responsibility (Multi-tenant)",
    scalability: "Elastic & Near-Infinite",
    useCase: "Web apps, startups, variable workloads"
  },
  {
    id: "private",
    name: "Private Cloud",
    ownership: "Single Organization (On-Prem or Hosted)",
    security: "Dedicated & Isolated",
    scalability: "Limited by Hardware Capacity",
    useCase: "Banking, healthcare, strict compliance"
  },
  {
    id: "hybrid",
    name: "Hybrid Cloud",
    ownership: "Combined On-Premises + Public Cloud",
    security: "Tiered (Sensitive data local, burst cloud)",
    scalability: "High (Cloud bursting supported)",
    useCase: "Legacy modernization, seasonal traffic spikes"
  },
  {
    id: "multicloud",
    name: "Multi-Cloud",
    ownership: "Multiple Public Cloud Providers",
    security: "Federated across vendors",
    scalability: "Maximum global redundancy",
    useCase: "Avoiding vendor lock-in, best-of-breed AI/data tools"
  }
];
