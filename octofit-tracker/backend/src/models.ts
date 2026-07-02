import mongoose, { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: Number,
    fitnessGoal: String,
    city: String,
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    sport: String,
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    captain: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, required: true },
    durationMinutes: Number,
    distanceKm: Number,
    caloriesBurned: Number,
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    score: { type: Number, required: true },
    category: String,
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    category: String,
    difficulty: String,
    durationMinutes: Number,
    description: String,
  },
  { timestamps: true },
);

export const User = models.User || model('User', userSchema);
export const Team = models.Team || model('Team', teamSchema);
export const Activity = models.Activity || model('Activity', activitySchema);
export const LeaderboardEntry = models.LeaderboardEntry || model('LeaderboardEntry', leaderboardSchema);
export const Workout = models.Workout || model('Workout', workoutSchema);
