import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';
import { connectToDatabase, mongoUri } from './config/database';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME ?? '';
const codespaceUrlSuffix = '-8000.app.github.dev';
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}${codespaceUrlSuffix}`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker API is running' });
});

app.get('/api/config', (_req, res) => {
  res.json({ apiBaseUrl });
});

app.get('/api/users', async (_req, res) => {
  const users = await User.find().lean();
  res.json(users);
});

app.get('/api/teams', async (_req, res) => {
  const teams = await Team.find().populate('members').populate('captain').lean();
  res.json(teams);
});

app.get('/api/activities', async (_req, res) => {
  const activities = await Activity.find().populate('user').lean();
  res.json(activities);
});

app.get('/api/leaderboard', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().populate('user').lean();
  res.json(leaderboard);
});

app.get('/api/workouts', async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json(workouts);
});

connectToDatabase()
  .then(() => {
    console.log(`Connected to MongoDB at ${mongoUri}`);
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
  });

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});
