import { DiscountAllocator } from "../src/services/allocator";
import { TEST_CASES } from "./testCases";

export class TestRunner {
  static runAllTests() {
    console.log("\n=== Discount Allocation Tests ===\n");
    for (const { name, description, agents } of Object.values(TEST_CASES)) {
      console.log(`\n── Test: ${name} — ${description}\n`);
      const result = new DiscountAllocator().allocate(agents);

      // Agent details
      result.agents
        .sort((a, b) => b.totalAllocation - a.totalAllocation)
        .forEach((a, i) => {
          console.log(`${i + 1}. ${a.agent.name}`);
          console.log(`   Base:        ₹${a.baseAllocation.toFixed(2)}`);
          console.log(`   Performance: ₹${a.performanceAllocation.toFixed(2)}`);
          console.log(`   Total:       ₹${a.totalAllocation.toFixed(2)} (${a.allocationPercentage.toFixed(1)}%)`);
          console.log(`   Score:       ${a.compositeScore.toFixed(3)}`);
          console.log(`   Level:       ${a.performanceLevel}`);
          console.log(`   Justification: ${a.justification}`);
          console.log("   Normalized Metrics:");
          Object.entries(a.normalizedMetrics).forEach(([m, v]) => {
            console.log(`     • ${m}: ${v.toFixed(3)}`);
          });
          console.log("");
        });

      // Summary
      const s = result.summary;
      console.log("── Summary ────────────────────────────────────");
      console.log(`  Kitty:       ₹${s.totalKitty}`);
      console.log(`  Base Pool:   ₹${s.totalBasePool}`);
      console.log(`  Perf Pool:   ₹${s.totalPerformancePool}`);
      console.log(`  Allocated:   ₹${s.totalAllocated}`);
      console.log(`  Remaining:   ₹${s.remainingAmount}`);
      console.log(`  Avg per Ag:  ₹${s.averageAllocation}`);
      console.log(`  Redistributed: ₹${s.redistributedAmount}`);
      console.log("\n" + "=".repeat(60));
    }
  }
}

// allow direct run
if (require.main === module) {
  TestRunner.runAllTests();
}
