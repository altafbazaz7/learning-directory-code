# Learning Support Provider Directory - Habot Connect

A React-based learning support provider directory helping parents find specialized support for children with learning difficulties.

## Features

- **Provider Listing**: Browse all available learning support providers
- **Search & Filter**: Search by name or specialization with real-time filtering
- **Provider Details**: Comprehensive provider profiles with contact information
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Professional UI**: Modern design using shadcn/ui components and Tailwind CSS

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Backend**: Node.js, Express
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter
- **Database**: In-memory storage (for demo purposes)

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd learning-support-directory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000` to view the application.

## Project Structure

```
learning-support-directory/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and API client
│   │   └── data/          # Sample data
│   └── index.html
├── server/                 # Backend Express server
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   └── storage.ts         # In-memory data storage
├── shared/                 # Shared types and schemas
│   └── schema.ts
└── package.json
```

## API Endpoints

- `GET /api/providers` - Get all providers with optional search and filter
- `GET /api/providers/:id` - Get specific provider by ID

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Sample Providers

The application includes 6 sample learning support providers:

1. **Sarah Thompson** - Dyslexia Support Specialist
2. **Dr. Michael Chen** - ADHD Coaching & Behavioral Support
3. **Lisa Rodriguez** - Speech & Language Therapy
4. **Ahmed Al-Mansouri** - Autism Support Specialist
5. **Rachel Johnson** - Learning Disabilities Coach
6. **Dr. Elena Popov** - Educational Psychologist

## Key Features Implemented

### Provider Listing Page (`/` or `/providers`)
- Displays all learning support providers
- Shows name, specialization, location, and rating for each provider
- Clickable provider cards that navigate to detail view
- Responsive grid layout
- Search functionality by name or specialization
- Filter dropdown for specializations
- Sort options (by rating, name, location)
- Loading states and error handling

### Provider Detail Page (`/providers/:id`)
- Comprehensive provider information
- Services offered based on specialization
- Qualifications and experience
- Contact information (email and phone)
- Professional avatar with gradient backgrounds
- "Back to List" navigation
- Error handling for invalid/missing providers

### UI/UX Features
- Clean, professional design
- Mobile-responsive layout
- Loading skeletons during data fetch
- Error states with retry functionality
- Empty states for no search results
- Professional color scheme with Habot Connect branding
- Accessibility-friendly design

## Development Notes

- Uses TypeScript for type safety
- Implements proper error boundaries
- Follows React best practices with hooks
- Uses modern CSS with Tailwind utilities
- Implements proper loading and error states
- Responsive design for all screen sizes

## Future Enhancements

- User authentication and profiles
- Provider booking system
- Reviews and ratings functionality
- Advanced filtering options
- Geographic mapping integration
- Real database integration
- Payment processing