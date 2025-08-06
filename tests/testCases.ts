import { SalesAgent } from "../src/types";

export const TEST_CASES: Record<string, { name: string; description: string; agents: SalesAgent[] }> = {
  standard: {
    name: "Standard Mixed Performance",
    description: "Varied score, revenue, feedback",
    agents: [
      {
        id: "SA001",
        name: "Rajesh Kumar",
        performanceScore: 85,
        seniorityMonths: 24,
        targetAchieved: 120,
        activeClients: 45,
        revenueGenerated: 850000,
        clientFeedbackScore: 8.5
      },
      {
        id: "SA002",
        name: "Priya Sharma",
        performanceScore: 92,
        seniorityMonths: 18,
        targetAchieved: 135,
        activeClients: 38,
        revenueGenerated: 920000,
        clientFeedbackScore: 9.2
      },
      {
        id: "SA003",
        name: "Amit Patel",
        performanceScore: 78,
        seniorityMonths: 36,
        targetAchieved: 95,
        activeClients: 52,
        revenueGenerated: 680000,
        clientFeedbackScore: 7.8
      }
    ]
  },
  identical: {
    name: "Identical Performance",
    description: "All agents have same metrics",
    agents: [
      {
        id: "A1",
        name: "Agent Alpha",
        performanceScore: 85,
        seniorityMonths: 24,
        targetAchieved: 120,
        activeClients: 40,
        revenueGenerated: 800000,
        clientFeedbackScore: 8.5
      },
      {
        id: "A2",
        name: "Agent Beta",
        performanceScore: 85,
        seniorityMonths: 24,
        targetAchieved: 120,
        activeClients: 40,
        revenueGenerated: 800000,
        clientFeedbackScore: 8.5
      }
    ]
  },
  extreme: {
    name: "Extreme Performance Gaps",
    description: "High vs. low performer",
    agents: [
      {
        id: "E1",
        name: "Top Performer",
        performanceScore: 100,
        seniorityMonths: 60,
        targetAchieved: 200,
        activeClients: 100,
        revenueGenerated: 2000000,
        clientFeedbackScore: 10.0
      },
      {
        id: "E2",
        name: "Low Performer",
        performanceScore: 40,
        seniorityMonths: 6,
        targetAchieved: 60,
        activeClients: 15,
        revenueGenerated: 300000,
        clientFeedbackScore: 6.0
      }
    ]
  },
  
  complexMix: {
    name: "Complex Mixed Scenario with Duplicates",
    description: "Zeros, extremes, duplicates, and varied spans across 14 agents",
    agents: [
      // Zero-performer duplicates
      {
        id: "C1a",
        name: "Newbie Joe",
        performanceScore: 0,
        seniorityMonths: 0,
        targetAchieved: 0,
        activeClients: 0,
        revenueGenerated: 0,
        clientFeedbackScore: 0
      },
      {
        id: "C1b",
        name: "Newbie Joe Clone",
        performanceScore: 0,
        seniorityMonths: 0,
        targetAchieved: 0,
        activeClients: 0,
        revenueGenerated: 0,
        clientFeedbackScore: 0
      },

      // Standard mid-level duplicate
      {
        id: "C2a",
        name: "Rajesh Kumar Clone",
        performanceScore: 85,
        seniorityMonths: 24,
        targetAchieved: 120,
        activeClients: 45,
        revenueGenerated: 850000,
        clientFeedbackScore: 8.5
      },
      {
        id: "C2b",
        name: "Rajesh Kumar Clone 2",
        performanceScore: 85,
        seniorityMonths: 24,
        targetAchieved: 120,
        activeClients: 45,
        revenueGenerated: 850000,
        clientFeedbackScore: 8.5
      },

      // Top performer duplicates
      {
        id: "C3a",
        name: "Superstar",
        performanceScore: 100,
        seniorityMonths: 120,
        targetAchieved: 300,
        activeClients: 150,
        revenueGenerated: 5000000,
        clientFeedbackScore: 10.0
      },
      {
        id: "C3b",
        name: "Superstar Clone",
        performanceScore: 100,
        seniorityMonths: 120,
        targetAchieved: 300,
        activeClients: 150,
        revenueGenerated: 5000000,
        clientFeedbackScore: 10.0
      },

      // Low performer duplicates
      {
        id: "C4a",
        name: "Struggling Sam",
        performanceScore: 30,
        seniorityMonths: 3,
        targetAchieved: 50,
        activeClients: 10,
        revenueGenerated: 200000,
        clientFeedbackScore: 5.5
      },
      {
        id: "C4b",
        name: "Struggling Sam Clone",
        performanceScore: 30,
        seniorityMonths: 3,
        targetAchieved: 50,
        activeClients: 10,
        revenueGenerated: 200000,
        clientFeedbackScore: 5.5
      },

      // Balanced performer duplicates
      {
        id: "C5a",
        name: "Balanced Blake",
        performanceScore: 70,
        seniorityMonths: 36,
        targetAchieved: 110,
        activeClients: 40,
        revenueGenerated: 750000,
        clientFeedbackScore: 7.0
      },
      {
        id: "C5b",
        name: "Balanced Blake Clone",
        performanceScore: 70,
        seniorityMonths: 36,
        targetAchieved: 110,
        activeClients: 40,
        revenueGenerated: 750000,
        clientFeedbackScore: 7.0
      },

      // Senior veteran duplicates
      {
        id: "C6a",
        name: "Veteran Vicky",
        performanceScore: 65,
        seniorityMonths: 84,
        targetAchieved: 100,
        activeClients: 30,
        revenueGenerated: 900000,
        clientFeedbackScore: 6.5
      },
      {
        id: "C6b",
        name: "Veteran Vicky Clone",
        performanceScore: 65,
        seniorityMonths: 84,
        targetAchieved: 100,
        activeClients: 30,
        revenueGenerated: 900000,
        clientFeedbackScore: 6.5
      }
    ]
  }
};
