"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountAllocator = exports.DEFAULT_CONFIG = void 0;
const normalize_1 = require("../utils/normalize");
const justificationService_1 = require("./justificationService");
exports.DEFAULT_CONFIG = {
    totalKitty: 10000,
    baseAllocationPercentage: 0.10,
    minAllocationMultiplier: 0.5,
    maxAllocationMultiplier: 2.0,
    weights: {
        performanceScore: 0.2,
        seniorityMonths: 0.05,
        targetAchieved: 0.15,
        activeClients: 0.05,
        revenueGenerated: 0.3,
        clientFeedbackScore: 0.25,
    }
};
class DiscountAllocator {
    constructor(config = exports.DEFAULT_CONFIG) {
        this.config = config;
    }
    allocate(agents) {
        const n = agents.length;
        const { totalKitty, baseAllocationPercentage, minAllocationMultiplier, maxAllocationMultiplier, weights } = this.config;
        const basePool = totalKitty * baseAllocationPercentage;
        const basePer = basePool / n;
        const perfPool = totalKitty - basePool;
        const normalized = normalize_1.MetricNormalizer.normalizeAllMetrics(agents);
        const scored = agents.map(a => {
            const score = Object.entries(weights)
                .reduce((sum, [m, w]) => sum + (normalized[m][a.id] ?? 0) * w, 0);
            return { agent: a, score };
        });
        const totalScore = scored.reduce((s, x) => s + x.score, 0);
        let allocations = scored.map(({ agent, score }) => {
            const perfAlloc = totalScore
                ? (score / totalScore) * perfPool
                : perfPool / n;
            const total = basePer + perfAlloc;
            const { level, justification } = justificationService_1.JustificationService.analyzeAgentPerformance(agent, {}, score);
            return {
                agent,
                baseAllocation: basePer,
                performanceAllocation: perfAlloc,
                totalAllocation: total,
                allocationPercentage: (total / totalKitty) * 100,
                compositeScore: score,
                normalizedMetrics: normalized[agent.id],
                performanceLevel: level,
                justification,
            };
        });
        // Enforce min/max
        const avg = totalKitty / n;
        const minAmt = avg * minAllocationMultiplier;
        const maxAmt = avg * maxAllocationMultiplier;
        let surplus = 0;
        allocations.forEach(a => {
            if (a.totalAllocation > maxAmt) {
                surplus += a.totalAllocation - maxAmt;
                a.totalAllocation = maxAmt;
            }
            if (a.totalAllocation < minAmt) {
                surplus -= minAmt - a.totalAllocation;
                a.totalAllocation = minAmt;
            }
        });
        const eligible = allocations.filter(a => a.totalAllocation > minAmt && a.totalAllocation < maxAmt);
        eligible.forEach(a => a.totalAllocation += surplus / eligible.length);
        const totalAllocated = allocations.reduce((s, a) => s + a.totalAllocation, 0);
        const summary = {
            totalKitty,
            totalBasePool: basePool,
            totalPerformancePool: perfPool,
            totalAllocated,
            remainingAmount: totalKitty - totalAllocated,
            averageAllocation: avg,
            redistributedAmount: surplus
        };
        return { agents: allocations, summary, justification: allocations.map(a => a.justification) };
    }
}
exports.DiscountAllocator = DiscountAllocator;
