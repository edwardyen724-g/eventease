# EventEase

> Simple booking and scheduling for local event planners and service providers.

**Status:** 🚧 In Development

## Problem
Users struggle with complicated booking processes and extensive rescheduling options. EventEase streamlines appointment management, making it easier for event planners to organize and manage their schedules efficiently.

## MVP Features
- Customizable event types tailored to specific local needs.
- Intuitive calendar interface for easy booking and rescheduling.
- Local venue suggestion feature based on event type.
- Integration with local payment options to simplify transactions.
- Automated email and SMS reminders for upcoming events.

## Tech Stack
- **Frontend:** Next.js 14 (App Router)
- **Backend:** Next.js API Routes
- **Database:** FaunaDB
- **Auth:** Firebase Authentication
- **Payments:** Stripe
- **Hosting:** Vercel

## Architecture Notes
This architecture leverages Next.js for a seamless frontend experience with built-in API routing for the backend. Firebase Authentication ensures secure user login, while Stripe handles payment processing. The choice of Vercel for hosting streamlines deployment and optimizes performance.

## User Stories
- Define Custom Event Types
- Intuitive Calendar Interface
- Local Venue Suggestions
- Payment Integration
- Automated Email Reminders
- User Account Management

## Launch Checklist
- [ ] Create a landing page with early access sign-up
- [ ] Set up Firebase Authentication and Firestore database
- [ ] Implement user interface for event management
- [ ] Integrate Stripe for payment processing
- [ ] Conduct user testing for the MVP functionalities

## Setup
```bash
cp .env.example .env.local
# Fill in your environment variables
npm install
npm run dev
```