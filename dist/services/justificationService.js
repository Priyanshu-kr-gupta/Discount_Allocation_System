"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JustificationService = void 0;
class JustificationService {
    static analyzeAgentPerformance(agent, metrics, score) {
        const level = score > 0.75 ? 'High' : score > 0.4 ? 'Medium' : 'Low';
        const justification = `Agent ${agent.name} scored ${score.toFixed(2)}, level: ${level}`;
        return { level, justification };
    }
}
exports.JustificationService = JustificationService;
