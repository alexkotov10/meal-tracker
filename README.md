# Meal Tracker

A simple, intuitive application for tracking your daily meals, calories, and protein intake.

## 🔗 Live Demo

[Visit Sportboxd App](meal-tracker-gules-iota.vercel.app/)

## 🌟 Features

- **Add Meals**: Record what you ate with calories and protein information
- **Daily Log**: View your meals organized by date
- **Calendar Navigation**: Easily browse through your meal history
- **Update & Delete**: Modify or remove meal entries as needed
- **Daily Totals**: Automatically calculates daily calorie and protein totals

## 🚀 Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Supabase** - Backend database
- **React Router** - Navigation
- **shadcn/ui** - UI components

## 📋 Prerequisites

- Node.js (v16+)
- npm or yarn
- Supabase account

## ⚙️ Installation

1. Clone the repository

   ```bash
   git clone https://github.com/alexkotov10/MealTracker.git
   cd meal-tracker
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory based on `.env.example`

   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_KEY=your_supabase_anon_key
   ```

4. Set up your Supabase database with a table named `meals` with the following structure:

   - `id` (integer, primary key, auto-increment)
   - `date` (date)
   - `meal` (text)
   - `calories` (integer)
   - `protein` (integer)
   - `created_at` (timestamp with timezone, default: now())

5. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:5173](http://localhost:5173) to view the application in your browser
