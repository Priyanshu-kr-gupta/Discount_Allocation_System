# Discount Allocation System

This project is a performance-based system designed to fairly distribute a fixed discount pool (or "kitty") among sales agents. It leverages a multi-metric scoring model and includes robust safeguards to prevent extreme allocations, ensuring a balanced and equitable outcome.

***

## ✅ Approach

The bonus **kitty** is divided into two parts to ensure a mix of equal and merit-based compensation.

-   **Base Allocation (10%):** This portion is distributed equally among all agents, providing a guaranteed minimum.
-   **Performance Allocation (90%):** This is the main part of the discount, distributed based on each agent's **composite performance score**.

***

## 📊 Scoring Metrics

Each agent's performance is evaluated using the following metrics. Before their weight is applied, each metric is normalized to ensure fair comparison.

-   **Revenue Generated** (30%)
-   **Client Feedback Score** (25%)
-   **Performance Score** (20%)
-   **Target Achieved** (15%)
-   **Seniority in Months** (5%)
-   **Active Clients** (5%)

***

## 🛡️ Safeguards

To prevent any single agent from receiving an excessively high or low allocation, the system includes the following safeguards:

-   **Minimum Allocation:** No agent can receive less than **0.5 × average** allocation.
-   **Maximum Allocation:** No agent can receive more than **2 × average** allocation.

If any allocations are "clamped" by these rules, the surplus or deficit is redistributed fairly among other eligible agents.

***

## 📝 Justification

Each agent receives a personalized, human-readable justification for their bonus amount based on their top two contributing metrics.

-   **High Performers:** "Excellent performance overall, with **Revenue** and **Feedback** leading the way."
-   **Medium Performers:** "Strong results driven by **Performance** and **Clients**."
-   **Low Performers:** "Needs improvement, though **Feedback** and **Targets** were relative strengths."

***

## 📌 Assumptions Made

The system is built on the following assumptions:

-   All agent metrics (scores, revenue, etc.) are non-negative.
-   The total kitty amount is a fixed value provided at runtime.
-   Rounding is handled in cents to minimize residual errors.
-   The base allocation is distributed equally among all agents.
-   The justification text is automatically generated and metric-based.

***

## ▶️ How to Run the Program

**1. Install Dependencies**

Make sure you have Node.js and npm installed. Then, run the following command in your terminal at the project root:

```bash
npm install
```

**2. Run the Program**

To execute the test suite and see the allocation logic in action, use the following command:

```bash

npm test


```


```bash
project-root/
├── src/
│   ├── index.ts                 # Main entry point (runs the tests)
│   ├── types.ts                 # Shared types and interfaces
│   └── services/
│       ├── allocator.ts         # Core allocation logic
│       └── justificationService.ts # Generates dynamic justifications
├── tests/
│   ├── testCases.ts             # Sample agent test cases
│   └── testRunner.ts            # Orchestrates all test execution
├── package.json
├── tsconfig.json
└── README.md 



```