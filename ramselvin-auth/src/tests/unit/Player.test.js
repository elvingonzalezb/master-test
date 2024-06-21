const assert = require('assert');
const Player = require('../../domain/entities/Player');
const CalculateStatisticsService = require('../../domain/services/CalculateStatisticsService');

describe('Player Statistics', function () {
    it('should calculate batting average correctly', function () {
        const player = new Player(1, 'John Doe', 'Pitcher', 1, 50, 200, 10);
        const statsService = new CalculateStatisticsService();
        const stats = statsService.calculate(player);
        assert.strictEqual(stats.average, '0.250');
    });
});
