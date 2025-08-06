import {
  SalesAgent,
  AllocationConfig,
  AgentAllocation,
  AllocationResult
} from "../types";
import { MetricNormalizer } from "../utils/normalize";
import { JustificationService } from "./justificationService";

export const DEFAULT_CONFIG: AllocationConfig = {
  totalKitty: 10000,
  baseAllocationPercentage: 0.10,
  minAllocationMultiplier: 0.5,
  maxAllocationMultiplier: 2.0,
  weights: {
    revenueGenerated: 0.30,
    clientFeedbackScore: 0.25,
    performanceScore: 0.20,
    targetAchieved: 0.15,
    seniorityMonths: 0.05,
    activeClients: 0.05
  }
};

export class DiscountAllocator {
  constructor(private cfg: AllocationConfig = DEFAULT_CONFIG) {}

  allocate(agents: SalesAgent[]): AllocationResult {
    if (agents.length === 0) throw new Error("No agents provided");
    const n = agents.length;
    const { totalKitty, baseAllocationPercentage, minAllocationMultiplier, maxAllocationMultiplier, weights } = this.cfg;

    // 1) Pools
    const basePool = this.round(totalKitty * baseAllocationPercentage);
    const perfPool = this.round(totalKitty - basePool);
    const basePerAgent = this.round(basePool / n);

    // 2) Normalize & score
    const norm = MetricNormalizer.normalizeAllMetrics(agents);
    const scored = agents.map(a => {
      const score = this.round(
        Object.entries(weights)
          .reduce((sum, [m, w]) => sum + (norm[m]?.[a.id] || 0) * w, 0)
      );
      return { agent: a, score };
    });
    const totalScore = this.round(scored.reduce((s, x) => s + x.score, 0));

    // 3) Initial allocations
    let allocations: AgentAllocation[] = scored.map(({ agent, score }) => {
      const perfAlloc = totalScore > 0
        ? this.round((score / totalScore) * perfPool)
        : this.round(perfPool / n);
      const totalAlloc = this.round(basePerAgent + perfAlloc);
      const pct = this.round((totalAlloc / totalKitty) * 100);

      const { level, justification } = JustificationService.analyze(
        agent,
        norm[agent.id] || {}, // type-cast workaround
        score,
        this.cfg
      );

      return {
        agent,
        baseAllocation: basePerAgent,
        performanceAllocation: perfAlloc,
        totalAllocation: totalAlloc,
        allocationPercentage: pct,
        compositeScore: score,
        normalizedMetrics: Object.entries(weights).reduce(
          (m, [k]) => ({ ...m, [k]: norm[k]?.[agent.id] ?? 0 }),
          {} as Record<string, number>
        ),
        performanceLevel: level,
        justification
      };
    });

    // 4) Enforce min/max around avg
    const avg = totalKitty / n;
    const minAmt = this.round(avg * minAllocationMultiplier);
    const maxAmt = this.round(avg * maxAllocationMultiplier);
    let surplus = 0;

    allocations.forEach(a => {
      if (a.totalAllocation > maxAmt) {
        surplus += a.totalAllocation - maxAmt;
        a.totalAllocation = maxAmt;
      }
      if (a.totalAllocation < minAmt) {
        surplus -= (minAmt - a.totalAllocation);
        a.totalAllocation = minAmt;
      }
    });

    const candidates = allocations.filter(a => a.totalAllocation > minAmt && a.totalAllocation < maxAmt);
    if (candidates.length && surplus) {
      const per = this.round(surplus / candidates.length);
      candidates.forEach(a => a.totalAllocation = this.round(a.totalAllocation + per));
    }

    // 5) Recompute percentages
    const finalTotal = this.round(allocations.reduce((s, a) => s + a.totalAllocation, 0));
    allocations.forEach(a => a.allocationPercentage = this.round((a.totalAllocation / finalTotal) * 100));

    // 6) Build summary
    const totalAllocated = this.round(allocations.reduce((s, a) => s + a.totalAllocation, 0));
    const summary = {
      totalKitty,
      totalBasePool: basePool,
      totalPerformancePool: perfPool,
      totalAllocated,
      remainingAmount: this.round(totalKitty - totalAllocated),
      averageAllocation: this.round(avg),
      redistributedAmount: this.round(surplus)
    };

    return { agents: allocations, summary };
  }

  private round(v: number): number {
    return Math.round(v * 100) / 100;
  }
}
