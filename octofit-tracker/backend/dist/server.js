"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("./models");
const database_1 = require("./config/database");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'OctoFit Tracker API is running' });
});
app.get('/api/config', (_req, res) => {
    res.json({ apiBaseUrl });
});
app.get('/api/users', async (_req, res) => {
    const users = await models_1.User.find().lean();
    res.json(users);
});
app.get('/api/teams', async (_req, res) => {
    const teams = await models_1.Team.find().populate('members').populate('captain').lean();
    res.json(teams);
});
app.get('/api/activities', async (_req, res) => {
    const activities = await models_1.Activity.find().populate('user').lean();
    res.json(activities);
});
app.get('/api/leaderboard', async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find().populate('user').lean();
    res.json(leaderboard);
});
app.get('/api/workouts', async (_req, res) => {
    const workouts = await models_1.Workout.find().lean();
    res.json(workouts);
});
(0, database_1.connectToDatabase)()
    .then(() => {
    console.log(`Connected to MongoDB at ${database_1.mongoUri}`);
})
    .catch((error) => {
    console.error('MongoDB connection failed:', error);
});
app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API base URL: ${apiBaseUrl}`);
});
