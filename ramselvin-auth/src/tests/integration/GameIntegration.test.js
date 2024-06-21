const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const GameController = require('../../application/controllers/GameController');
const MongoGameRepository = require('../../infrastructure/repositories/MongoGameRepository');
const MongoTeamRepository = require('../../infrastructure/repositories/MongoTeamRepository');

const app = express();
app.use(bodyParser.json());

const gameRepository = new MongoGameRepository();
const teamRepository = new MongoTeamRepository();
const gameController = new GameController(gameRepository, teamRepository);

app.post('/games', (req, res) => gameController.createGame(req, res));

describe('Game Integration', function () {
    before(async function () {
        await mongoose.connect('mongodb://localhost:27017/baseball_test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
        });
    });

    after(async function () {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    it('should create a game', function (done) {
        const teamData = [
        { teamId: '1', name: 'Team A' },
        { teamId: '2', name: 'Team B' }
        ];

        Promise.all(teamData.map(team => new teamRepository.save(new Team(team.teamId, team.name))))
        .then(() => {
            request(app)
            .post('/games')
            .send({
                gameId: '1',
                homeTeamId: '1',
                awayTeamId: '2',
                date: new Date()
            })
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
        });
    });
});
