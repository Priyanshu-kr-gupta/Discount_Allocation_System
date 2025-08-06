import { SalesAgent, AllocationConfig } from "../types";

export class JustificationService {
  static analyze(
    agent: SalesAgent,
    normalized: Record<string, number>,
    compositeScore: number,
    config: AllocationConfig
  ): { level: string; justification: string } {
    const level =
      compositeScore >= 0.75 ? "High" :
      compositeScore >= 0.4  ? "Medium" :
                               "Low";

    // compute contributions
    const contributions = Object.entries(config.weights)
      .map(([metric, weight]) => ({
        metric,
        weight,
        contrib: (normalized[metric] || 0) * weight
      }))
      .sort((a, b) => b.contrib - a.contrib)
      .slice(0, 2)
      .map(c => {
        const pretty = ({
          revenueGenerated: "Revenue",
          clientFeedbackScore: "Feedback",
          performanceScore: "Performance",
          targetAchieved: "Targets",
          seniorityMonths: "Seniority",
          activeClients: "Clients"
        }[c.metric] || c.metric);
        return `${pretty} (${Math.round(c.weight * 100)}%)`;
      });

    let justification = `Strong results driven by ${contributions.join(" and ")}.`;
    if (level === "High")
      justification = `Excellent performance overall, with ${contributions.join(" and ")} leading the way.`;
    else if (level === "Low")
      justification = `Needs improvement, though ${contributions.join(" and ")} were relative strengths.`;

    return { level, justification };
  }
}
