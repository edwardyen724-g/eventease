# EventEase

> Effortlessly streamline your event bookings with intuitive design.

**Status:** 🚧 In Development

## Problem
Current booking systems are too complex and inflexible, leading to frustration for event coordinators. EventEase simplifies the scheduling and rescheduling process with a visually appealing interface.

## MVP Features
- User-friendly calendar interface with drag-and-drop scheduling
- Customizable themes to match brand identity
- Simple rescheduling functionality with one click
- Integration with popular event management platforms like Eventbrite and Zoom
- Automated email notifications for confirmations and reminders

## Tech Stack
- **Frontend:** Next.js 14 (App Router)
- **Backend:** Next.js API Routes
- **Database:** MongoDB
- **Auth:** Auth0
- **Payments:** Stripe
- **Hosting:** Vercel

## Architecture Notes
Using Next.js allows for an integrated frontend and backend experience, leveraging API routes for backend logic. MongoDB is utilized for its flexibility, while Vercel provides seamless deployment for the Next.js application.

## User Stories
- User can schedule an event
- User can customize themes
- User can reschedule an event
- User can integrate with Eventbrite
- User can integrate with Zoom
- User receives automated notifications

## Launch Checklist
- [ ] Create landing page for early access sign-ups
- [ ] Set up hosting for backend and frontend applications
- [ ] Configure databases and environment variables
- [ ] Implement email service for notifications

## Setup
```bash
cp .env.example .env.local
# Fill in your environment variables
npm install
npm run dev
```