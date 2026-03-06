import { test, expect } from '@playwright/test';

test.describe('User Account Management', () => {
  test('User can register, log in, and update account details', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Registration
    await page.click('text=Register');
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button:has-text("Sign Up")');
    await expect(page.locator('text=Registration successful')).toBeVisible();

    // Login
    await page.goto('http://localhost:3000/');
    await page.click('text=Login');
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button:has-text("Log In")');
    await expect(page.locator('text=Welcome, testuser@example.com')).toBeVisible();

    // Update account details
    await page.click('text=Account Settings');
    await page.fill('input[name="name"]', 'Test User');
    await page.click('button:has-text("Update")');
    await expect(page.locator('text=Account updated successfully')).toBeVisible();
  });
});

test.describe('Define Custom Event Types', () => {
  test('User can create, edit, delete, and view custom event types', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    
    // Create Event Type
    await page.click('text=Create Event Type');
    await page.fill('input[name="name"]', 'Wedding');
    await page.fill('input[name="duration"]', '5 hours');
    await page.fill('input[name="price"]', '2000');
    await page.fill('textarea[name="description"]', 'A beautiful wedding ceremony');
    await page.click('button:has-text("Save Event Type")');
    await expect(page.locator('text=Event type created successfully')).toBeVisible();
    
    // View Event Types
    await page.click('text=View Event Types');
    await expect(page.locator('text=Wedding')).toBeVisible();
    
    // Edit Event Type
    await page.click('text=Edit Wedding');
    await page.fill('input[name="price"]', '2500');
    await page.click('button:has-text("Update Event Type")');
    await expect(page.locator('text=Event type updated successfully')).toBeVisible();
    
    // Delete Event Type
    await page.click('text=Delete Wedding');
    await page.click('button:has-text("Confirm")');
    await expect(page.locator('text=Event type deleted successfully')).toBeVisible();
  });
});

test.describe('Intuitive Calendar Interface', () => {
  test('User can view calendar, create, and reschedule events', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    
    // View Calendar
    await page.click('text=Calendar');
    await expect(page.locator('text=Daily View')).toBeVisible();
    
    // Create Appointment
    await page.click('text=Add Appointment');
    await page.fill('input[name="title"]', 'Meeting');
    await page.fill('input[name="date"]', '2023-10-05');
    await page.fill('input[name="time"]', '10:00');
    await page.click('button:has-text("Create")');
    await expect(page.locator('text=Appointment created successfully')).toBeVisible();
    
    // Reschedule Appointment
    await page.dragAndDrop('text=Meeting', 'text=New Time Slot');
    await expect(page.locator('text=Appointment rescheduled successfully')).toBeVisible();
  });
});

test.describe('Local Venue Suggestions', () => {
  test('User can view and save venue suggestions based on event types', async ({ page }) => {
    await page.goto('http://localhost:3000/venues');

    // Select Event Type
    await page.selectOption('select[name="eventType"]', 'Wedding');
    await page.click('button:has-text("Get Venues")');
    await expect(page.locator('text=Venue List')).toBeVisible();
    
    // Save Preferred Venue
    await page.click('text=Save Venue');
    await expect(page.locator('text=Venue saved successfully')).toBeVisible();
  });
});

test.describe('Payment Integration', () => {
  test('User can add payment method and process payments', async ({ page }) => {
    await page.goto('http://localhost:3000/payment');

    // Add Payment Method
    await page.fill('input[name="cardNumber"]', '4111111111111111');
    await page.fill('input[name="expiry"]', '12/25');
    await page.fill('input[name="cvc"]', '123');
    await page.click('button:has-text("Add Payment Method")');
    await expect(page.locator('text=Payment method added successfully')).toBeVisible();

    // Process Payment
    await page.click('text=Pay for Booking');
    await expect(page.locator('text=Payment successful')).toBeVisible();
  });
});

test.describe('Automated Email Reminders', () => {
  test('User can set reminder preferences and view reminders', async ({ page }) => {
    await page.goto('http://localhost:3000/reminders');

    // Set Reminder Preferences
    await page.check('input[name="email"]');
    await page.check('input[name="sms"]');
    await page.click('button:has-text("Save Preferences")');
    await expect(page.locator('text=Preferences saved successfully')).toBeVisible();

    // View Reminder Settings
    await expect(page.locator('text=Email reminders enabled')).toBeVisible();
    await expect(page.locator('text=SMS reminders enabled')).toBeVisible();
  });
});