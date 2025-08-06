export interface SalesAgent {
  id: string;
  name: string;
  performanceScore: number;
  seniorityMonths: number;
  targetAchieved: number;
  activeClients: number;
  revenueGenerated: number;
  clientFeedbackScore: number;
}

export interface AllocationConfig {
  totalKitty: number;                      // total budget
  baseAllocationPercentage: number;        // e.g. 0.10 = 10%
  minAllocationMultiplier: number;         // e.g. 0.5 = 50% of avg
  maxAllocationMultiplier: number;         // e.g. 2.0 = 200% of avg
  weights: Record<keyof Omit<SalesAgent, "id" | "name">, number>;
}

export interface AgentAllocation {
  agent: SalesAgent;
  baseAllocation: number;
  performanceAllocation: number;
  totalAllocation: number;
  allocationPercentage: number;
  compositeScore: number;
  normalizedMetrics: Record<string, number>;
  performanceLevel: string;
  justification: string;
}

export interface AllocationResult {
  agents: AgentAllocation[];
  summary: {
    totalKitty: number;
    totalBasePool: number;
    totalPerformancePool: number;
    totalAllocated: number;
    remainingAmount: number;
    averageAllocation: number;
    redistributedAmount: number;
  };
}
