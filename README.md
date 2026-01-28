# Job Board React Application

A modern, feature-rich React-based job board application with advanced filtering, searching, sorting, and bookmarking capabilities.

## Features

- **Advanced Job Listings**: Display jobs in grid or list view with toggle buttons
- **Comprehensive Filtering**:
  - Filter by job type (Remote, Hybrid, Onsite)
  - Filter by experience level
  - Filter by multiple skills using multi-select component
  - Filter by salary range using range slider
  - Display active filter count
- **Search Functionality**: Real-time search with debouncing for job titles and company names
- **Sorting**: Sort jobs by salary (high to low), post date, or relevance
- **Pagination**: Client-side pagination with 10 jobs per page
- **Bookmarking**: Save favorite jobs with persistent localStorage storage
- **Application Tracker**: Dedicated `/tracker` page to view all bookmarked jobs
- **Clear Filters**: One-click button to reset all filters and search
- **Responsive Design**: Mobile-friendly layout that works across all devices
- **Docker Support**: Fully containerized with Docker and docker-compose

## Tech Stack

- **Frontend Framework**: React 18
- **Routing**: React Router v6
- **State Management**: React Hooks + Context API
- **UI Components**:
  - `react-select`: Multi-select filtering component
  - `rc-slider`: Range slider for salary filtering
- **Utilities**: Lodash for debouncing
- **Build Tool**: Vite
- **Containerization**: Docker & docker-compose
- **Styling**: Tailwind CSS (or custom CSS)

## Project Structure

```
job-board-react/
├── src/
│   ├── components/
│   │   ├── JobCard.jsx
│   │   ├── JobList.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SortDropdown.jsx
│   │   └── Pagination.jsx
│   ├── pages/
│   │   ├── JobListingsPage.jsx
│   │   ├── ApplicationTracker.jsx
│   │   └── NotFound.jsx
│   ├── hooks/
│   │   └── useJobFilters.js
│   ├── data/
│   │   └── mock-data.json
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── public/
│   └── index.html
├── package.json
├── Dockerfile
├── docker-compose.yml
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/KvPradeepthi/job-board-react.git
cd job-board-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (Vite default) or `http://localhost:3000` (if using different config).

## Docker Setup

### Build and Run with Docker Compose

```bash
docker-compose up --build -d
```

The application will be accessible at `http://localhost:3000`.

### Using Docker Directly

1. Build the image:
```bash
docker build -t job-board-react .
```

2. Run the container:
```bash
docker run -p 3000:3000 job-board-react
```

## Core Requirements Met

✅ **Docker Containerization**: Full Docker and docker-compose setup with healthcheck
✅ **Mock Data**: Local JSON file with 20+ job listings
✅ **Grid/List View Toggle**: Switch between card and list layouts
✅ **Job Type Filtering**: Filter by Remote, Hybrid, Onsite
✅ **Skills Multi-Select**: Filter by multiple skills simultaneously
✅ **Salary Range Slider**: Adjust min/max salary range
✅ **Search Functionality**: Real-time search with debouncing
✅ **Sort by Salary**: High to low sorting capability
✅ **Client-Side Pagination**: Navigate through paginated results
✅ **Bookmarking**: Save jobs with localStorage persistence
✅ **Visual Indicators**: Bookmarked jobs show distinct visual state
✅ **Clear All Filters**: Reset all filters with single button
✅ **Application Tracker**: Dedicated page for bookmarked jobs
✅ **Responsive Design**: Works on desktop and mobile devices

## Key Implementation Details

### State Management

The application uses React Hooks for state management:
- `useState`: For local component state (filters, view mode, pagination)
- `useContext`: For sharing job data across components
- `useCallback`: For optimized filter and search functions

### Data Fetching

Jobs are loaded from a local JSON file (`src/data/mock-data.json`) on component mount using dynamic imports.

### Filtering Logic

All filtering is done client-side:
1. Load all jobs from mock data
2. Apply filters sequentially
3. Update visible jobs state
4. Trigger re-render

### LocalStorage Usage

Bookmarked jobs are stored in localStorage with the key `bookmarkedJobs` as a JSON array of job IDs.

## Testing

You can test the application by:

1. Loading the job listings page
2. Applying various filters
3. Searching for specific keywords
4. Bookmarking/unbookmarking jobs
5. Navigating to the Application Tracker
6. Clearing all filters
7. Testing pagination

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Performance Optimizations

- Debounced search input (300ms delay)
- Memoized components using `React.memo`
- Efficient filtering algorithms
- Lazy loading of components with React.lazy

## Known Limitations

- Mock data is static and not updated dynamically
- No backend API integration (client-side only)
- Bookmarks are stored locally (not synced across devices)

## Future Enhancements

- Backend API integration for dynamic job listings
- User authentication and accounts
- Save multiple job boards/categories
- Export bookmarked jobs as PDF
- Email notifications for new jobs
- Advanced analytics dashboard

## License

MIT License - Feel free to use this project for your own purposes.

## Support

For issues or questions, please open an issue on GitHub.

---

**Last Updated**: January 2026
**Author**: KvPradeepthi
