"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("../models");
dotenv_1.default.config();
// Seed the octofit_db database with test data
async function seedDatabase() {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
    await mongoose_1.default.connect(mongoUri);
    console.log('Connected to MongoDB for seeding');
    await Promise.all([
        models_1.User.deleteMany({}),
        models_1.Team.deleteMany({}),
        models_1.Activity.deleteMany({}),
        models_1.LeaderboardEntry.deleteMany({}),
        models_1.Workout.deleteMany({}),
    ]);
    const users = await models_1.User.insertMany([
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
    const teams = await models_1.Team.insertMany([
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
    await models_1.Activity.insertMany([
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
    await models_1.LeaderboardEntry.insertMany([
        { user: users[0]._id, score: 1420, category: 'weekly' },
        { user: users[1]._id, score: 1380, category: 'weekly' },
        { user: users[2]._id, score: 1310, category: 'weekly' },
    ]);
    await models_1.Workout.insertMany([
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
    await mongoose_1.default.disconnect();
}
seedDatabase().catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
});
