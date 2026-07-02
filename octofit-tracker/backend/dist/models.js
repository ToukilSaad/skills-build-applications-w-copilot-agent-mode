"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: Number,
    fitnessGoal: String,
    city: String,
}, { timestamps: true });
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    sport: String,
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    captain: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
const activitySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, required: true },
    durationMinutes: Number,
    distanceKm: Number,
    caloriesBurned: Number,
    date: { type: Date, default: Date.now },
}, { timestamps: true });
const leaderboardSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    score: { type: Number, required: true },
    category: String,
}, { timestamps: true });
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    category: String,
    difficulty: String,
    durationMinutes: Number,
    description: String,
}, { timestamps: true });
exports.User = mongoose_1.models.User || (0, mongoose_1.model)('User', userSchema);
exports.Team = mongoose_1.models.Team || (0, mongoose_1.model)('Team', teamSchema);
exports.Activity = mongoose_1.models.Activity || (0, mongoose_1.model)('Activity', activitySchema);
exports.LeaderboardEntry = mongoose_1.models.LeaderboardEntry || (0, mongoose_1.model)('LeaderboardEntry', leaderboardSchema);
exports.Workout = mongoose_1.models.Workout || (0, mongoose_1.model)('Workout', workoutSchema);
