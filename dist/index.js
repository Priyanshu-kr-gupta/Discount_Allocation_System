"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testRunner_1 = require("../tests/testRunner");
async function main() {
    testRunner_1.TestRunner.runAllTests();
}
main().catch(console.error);
