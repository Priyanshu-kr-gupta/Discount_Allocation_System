import { SalesAgent } from "../types";

export class MetricNormalizer {
  // produce an object: { metricName: { [agentId]: normalizedValue } }
  static normalizeAllMetrics(agents: SalesAgent[]) {
    const metrics: (keyof Omit<SalesAgent, "id" | "name">)[] = [
      "revenueGenerated",
      "clientFeedbackScore",
      "performanceScore",
      "targetAchieved",
      "seniorityMonths",
      "activeClients"
    ];
    const result: Record<string, Record<string, number>> = {};
    
    for (const metric of metrics) {
      const values = agents.map(a => a[metric] as number);
      const max = Math.max(...values);
      result[metric] = {};
      for (const a of agents) {
        result[metric][a.id] = max > 0 ? a[metric] / max : 0;
      }
    }
    return result;
  }
}
