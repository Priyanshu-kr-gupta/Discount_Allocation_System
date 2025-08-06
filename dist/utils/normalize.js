"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricNormalizer = void 0;
class MetricNormalizer {
    static normalizeAllMetrics(agents) {
        const metrics = Object.keys(agents[0]).filter(k => k !== 'id' && k !== 'name');
        const normalized = {};
        metrics.forEach(metric => {
            const values = agents.map(a => a[metric]);
            const min = Math.min(...values);
            const max = Math.max(...values);
            normalized[metric] = {};
            agents.forEach(a => {
                normalized[metric][a.id] = max > min ? (a[metric] - min) / (max - min) : 1;
            });
        });
        return normalized;
    }
}
exports.MetricNormalizer = MetricNormalizer;
