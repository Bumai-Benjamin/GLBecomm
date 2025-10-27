# RSVP System Documentation

## Overview
The RSVP system is now fully integrated with MongoDB to capture event registrations.

## Features
- ✅ MongoDB database integration
- ✅ Form validation
- ✅ Beautiful modal UI with animations
- ✅ Real-time submission feedback
- ✅ Guest count tracking
- ✅ Optional phone and message fields

## Database Schema

### RSVP Collection
```javascript
{
  name: String (required, max 100 chars),
  email: String (required, validated email format),
  phone: String (optional),
  eventTitle: String (required),
  eventDate: String (required),
  guests: Number (1-10, default: 1),
  message: String (optional, max 500 chars),
  status: String (pending | confirmed | cancelled),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## API Endpoints

### POST /api/rsvp
Submit a new RSVP

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "123-456-7890",
  "eventTitle": "Midnight Rooftop Session",
  "eventDate": "October 24",
  "guests": 2,
  "message": "Looking forward to it!"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "eventTitle": "Midnight Rooftop Session",
    "eventDate": "October 24"
  },
  "message": "RSVP submitted successfully"
}
```

**Error Response (400/409/500):**
```json
{
  "success": false,
  "error": "Error message here"
}
```

### GET /api/rsvp
Retrieve all RSVPs (consider adding authentication)

**Success Response (200):**
```json
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb+srv://lee38667:glbSite2025@cluster0rsvp.r5ofrsa.mongodb.net/?appName=Cluster0rsvp
```

## File Structure

```
GLBecomm/
├── .env.local                    # Environment variables (not committed)
├── lib/
│   └── mongodb.js                # MongoDB connection utility
├── src/
│   ├── models/
│   │   └── Rsvp.js              # Mongoose schema
│   └── components/
│       └── RsvpModal.jsx         # RSVP form modal component
├── app/
│   ├── api/
│   │   └── rsvp/
│   │       └── route.js          # API endpoint
│   └── events/
│       └── page.js               # Events page with RSVP integration
```

## Usage

1. Users click "RSVP Now" or "Request Invite" on any event
2. A modal appears with the RSVP form
3. Form validates required fields (name, email)
4. On submit, data is sent to `/api/rsvp`
5. API validates and saves to MongoDB
6. Success/error message displays to user
7. On success, modal closes after 2 seconds

## Testing

Start the dev server:
```bash
npm run dev
```

Navigate to `/events` and click any "RSVP Now" button to test the flow.

## Viewing RSVPs

You can view all RSVPs by:
1. Visiting `/api/rsvp` in your browser (currently public - consider adding auth)
2. Using MongoDB Compass or Atlas to view the database directly
3. Creating an admin dashboard (future enhancement)

## Security Considerations

⚠️ **Important:** The GET endpoint at `/api/rsvp` currently returns all RSVPs without authentication. Consider:
- Adding authentication middleware
- Creating a separate admin route
- Implementing rate limiting
- Adding CORS protection

## Future Enhancements

- [ ] Email confirmation to users
- [ ] Admin dashboard to manage RSVPs
- [ ] Export RSVPs to CSV
- [ ] Email reminders before events
- [ ] QR code generation for check-in
- [ ] Calendar integration (.ics download)
- [ ] Waitlist functionality when events are full
