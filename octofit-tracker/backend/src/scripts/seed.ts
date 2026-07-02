import dotenv from 'dotenv';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';
import { connectToDatabase, disconnectFromDatabase } from '../config/database';

dotenv.config();

// Seed the octofit_db database with test data
async function seedDatabase() {
  await connectToDatabase();
  console.log('Connected to MongoDB for seeding');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    {
      name: 'Ava Martinez',
      email: 'ava@example.com',
      age: 29,
      fitnessGoal: 'Improve endurance',
      city: 'Seattle',
    },
    {
      name: 'Noah Chen',
      email: 'noah@example.com',
      age: 34,
      fitnessGoal: 'Build strength',
      city: 'Austin',
    },
    {
      name: 'Mia Johnson',
      email: 'mia@example.com',
      age: 27,
      fitnessGoal: 'Stay active',
      city: 'Denver',
    },
  ]);

  const teams = await Team.insertMany([
    {
      name: 'North Stars',
      sport: 'Running',
      members: [users[0]._id, users[1]._id],
      captain: users[0]._id,
    },
    {
      name: 'Peak Power',
      sport: 'CrossFit',
      members: [users[2]._id],
      captain: users[2]._id,
    },
  ]);

  await Activity.insertMany([
    {
      user: users[0]._id,
      type: 'Run',
      durationMinutes: 45,
      distanceKm: 8.2,
      caloriesBurned: 540,
      date: new Date('2026-01-15'),
    },
    {
      user: users[1]._id,
      type: 'Strength',
      durationMinutes: 60,
      distanceKm: 0,
      caloriesBurned: 480,
      date: new Date('2026-01-16'),
    },
    {
      user: users[2]._id,
      type: 'Yoga',
      durationMinutes: 35,
      distanceKm: 0,
      caloriesBurned: 220,
      date: new Date('2026-01-17'),
    },
  ]);

  await LeaderboardEntry.insertMany([
    { user: users[0]._id, score: 1420, category: 'weekly' },
    { user: users[1]._id, score: 1380, category: 'weekly' },
    { user: users[2]._id, score: 1310, category: 'weekly' },
  ]);

  await Workout.insertMany([
    {
      title: 'Tempo Run',
      category: 'Cardio',
      difficulty: 'Intermediate',
      durationMinutes: 40,
      description: 'A steady run with short bursts of speed.',
    },
    {
      title: 'Full Body Strength',
      category: 'Strength',
      difficulty: 'Advanced',
      durationMinutes: 50,
      description: 'Compound lifts and core work.',
    },
    {
      title: 'Mobility Flow',
      category: 'Recovery',
      difficulty: 'Beginner',
      durationMinutes: 25,
      description: 'Gentle stretches to improve flexibility.',
    },
  ]);

  console.log('Seeded users, teams, activities, leaderboard, and workouts');
  await disconnectFromDatabase();
}

seedDatabase().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
