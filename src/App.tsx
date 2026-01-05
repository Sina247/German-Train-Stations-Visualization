import { useState, useMemo } from "react";
import { useStations } from "./hooks/useStations";
import { StationMap } from "./components/StationMap";
import { CityFilter } from "./components/CityFilter";
import { StationsList } from "./components/StationsList";
import { Train, AlertCircle, Loader2, X, Filter } from "lucide-react";

function App() {
	const { stations, loading, error } = useStations();

	const [selectedCity, setSelectedCity] = useState<string | null>(null);
	const [selectedStationId, setSelectedStationId] = useState<number | null>(null);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const cities = useMemo(() => {
		const uniqueCities = Array.from(new Set(stations.map((s) => s.city)));
		return uniqueCities.sort();
	}, [stations]);

	const filteredStations = useMemo(() => {
		if (!selectedCity) return stations;
		return stations.filter((s) => s.city === selectedCity);
	}, [stations, selectedCity]);

	const handleStationClick = (stationId: number) => {
		setSelectedStationId(stationId);
		if (sidebarOpen) setSidebarOpen(false);
	};

	const handleCityChange = (city: string | null) => {
		setSelectedCity(city);
		setSelectedStationId(null);
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />

					<p className="text-gray-600">Loading train stations...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center max-w-md">
					<AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />

					<h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Stations</h2>

					<p className="text-gray-600">{error}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="h-screen flex flex-col bg-gray-50">
			<header className="bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-6 py-4">
				<div className="flex items-center gap-3">
					<Train className="text-blue-500" size={32} />

					<div>
						<h1 className="text-2l font-bold text-gray-800">German Train Stations</h1>

						<p className="text-sm text-gray-600">
							{filteredStations.length} station{filteredStations.length !== 1 ? "s" : ""} {selectedCity ? `in ${selectedCity}` : "in Germany"}
						</p>
					</div>
				</div>

				<button className="flex items-center gap-2 p-2 rounded bg-blue-500 text-white hover:bg-blue-600" onClick={() => setSidebarOpen(true)}>
					<Filter size={18} />
					Filter
				</button>
			</header>

			<div className="flex-1 flex overflow-hidden relative">
				<aside className={`fixed top-0 left-0 z-50 bg-white transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out flex flex-col w-full h-screen md:static md:translate-x-0 md:w-96 md:h-auto`}>
					<div className="flex items-center justify-between p-4 border-b md:hidden">
						<h2 className="text-lg font-semibold">Filters & Stations</h2>

						<button onClick={() => setSidebarOpen(false)} className="p-2 rounded bg-gray-200">
							<X size={20} />
						</button>
					</div>

					<CityFilter cities={cities} selectedCity={selectedCity} onCityChange={handleCityChange} />

					<div className="flex-1 overflow-auto">
						<StationsList stations={filteredStations} selectedStationId={selectedStationId} onStationClick={handleStationClick} />
					</div>
				</aside>

				<main className="flex-1 relative z-0 min-h-[300px] md:min-h-0">
					<StationMap stations={filteredStations} selectedStationId={selectedStationId} />
				</main>

				{sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}
			</div>
		</div>
	);
}

export default App;
