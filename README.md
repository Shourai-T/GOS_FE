# G-Scores Frontend

Frontend application for G-Scores System, built with **React**, **Vite**, and **Tailwind CSS**.

## Features

- **Tra Cứu Điểm**: Search student scores by SBD.
- **Báo Cáo Phổ Điểm**: View score distribution charts for all subjects.
- **Top 10 Khối A**: List of top students in Group A (Math, Physics, Chemistry).

## Prerequisites

- Node.js (v18+)
- Backend server running at `http://localhost:8000`

## Setup & Run

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Access at `http://localhost:5173`

## Project Structure

- `src/api`: Axios client setup
- `src/components`: Reusable UI components (Charts, Tables)
- `src/pages`: Main page views
- `src/App.tsx`: Routing configuration

## Tech Stack

- React 18
- Tailwind CSS v3
- Recharts (Visualization)
- Lucide React (Icons)
- React Router DOM v6
