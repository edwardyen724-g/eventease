# EventEase

> Streamlined booking management tools tailored for cultural and community events.

**Status:** 🚧 In Development

## Problem
Event planners struggle with complicated booking processes and need an intuitive tool that simplifies scheduling while supporting multiple languages for local engagement.

## MVP Features
- Simple event creation workflow with customizable date, time, and location fields.
- Multilingual booking interface to cater to diverse event attendees.
- Event rescheduling functionality with notifications for changed dates/times.
- Basic attendance tracking with RSVP functionality.
- User-friendly dashboard for managing events, attendees, and bookings.

## Tech Stack
- **Frontend:** Next.js 14 (App Router)
- **Backend:** Next.js API Routes
- **Database:** Supabase Postgres
- **Auth:** Supabase Auth
- **Payments:** Stripe
- **Hosting:** Vercel

## Architecture Notes
This architecture leverages Next.js for the frontend and API routes, enabling a seamless full-stack experience. Supabase provides built-in authentication and a Postgres database, simplifying setup while maintaining battle-tested reliability. Vercel offers optimal hosting optimized for Next.js, ensuring performant deployment.

## User Stories
- Event Creation
- Multilingual Booking Interface
- Event Rescheduling
- RSVP Functionality
- User-Friendly Dashboard
- Basic Attendance Tracking

## Launch Checklist
- [ ] Develop landing page with email capture
- [ ] Implement event creation workflow
- [ ] Build multilingual interface support
- [ ] Set up user authentication with Firebase
- [ ] Develop dashboard functionality

## Setup
```bash
cp .env.example .env.local
# Fill in your environment variables
npm install
npm run dev
```