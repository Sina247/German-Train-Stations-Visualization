# German Train Stations Visualization

A React-based web application that visualizes train stations across Germany on an interactive Leaflet map. Filter stations by city, view detailed information, and interact seamlessly between the list and map views.

## Features

- **Interactive Map**: Displays all train stations across Germany using Leaflet
- **City Filtering**: Filter stations by city using a dropdown menu
- **Synchronized Views**: Click on stations in the list to zoom and highlight them on the map
- **Loading States**: Proper loading and error handling for data fetching
- **Responsive Design**: Clean and modern UI built with Tailwind CSS
- **Type Safety**: Full TypeScript implementation

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Leaflet.js** - Interactive maps
- **React-Leaflet** - React components for Leaflet
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Vitest** - Testing framework
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building

Build for production:

```bash
npm run build
```

### Testing

Run tests:

```bash
npm test
```

## Project Structure

```
src/
├── components/          # React components
│   ├── CityFilter.tsx   # City filtering dropdown
│   ├── StationMap.tsx   # Leaflet map component
│   └── StationsList.tsx # Stations list sidebar
├── hooks/               # Custom React hooks
│   └── useStations.ts   # Data fetching hook
├── types/               # TypeScript interfaces
│   └── station.ts       # Station data types
├── test/                # Test setup
└── App.tsx              # Main application component
```

## Features Detail

### Data Fetching
- Fetches station data from GitHub Gist API
- Implements proper loading and error states
- Type-safe data handling with TypeScript

### Map Visualization
- Centered on Germany by default
- Interactive markers for each station
- Popups showing station details
- Smooth zoom animation when clicking stations

### Filtering
- Filter by city using dropdown
- Shows filtered count in header
- Clear filter button for easy reset
- Resets selection when filter changes

### Interaction
- Click stations in list to zoom on map
- Visual feedback for selected station
- Synchronized state between list and map

## Deployment

This application is ready to be deployed to:
- **Vercel**: `vercel --prod`
- **Netlify**: Connect your repository and deploy
- **GitHub Pages**: Build and deploy dist folder

### Build Output

The production build is optimized and outputs to the `dist/` directory.

## API

Station data is fetched from:
```
https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw/fc7dc242f41393845d90edaa99e32e28f1ddfe24/train-stations.json
```

Each station contains:
- `id`: Unique identifier
- `name`: Station name
- `city`: City location
- `lat`: Latitude coordinate
- `lng`: Longitude coordinate

## License

MIT
