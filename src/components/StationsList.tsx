import { MapPin } from "lucide-react";
import { Station } from "../types/station";

interface StationsListProps {
	stations: Station[];
	selectedStationId: number | null;
	onStationClick: (stationId: number) => void;
}

export function StationsList({ stations, selectedStationId, onStationClick }: StationsListProps) {
	if (stations.length === 0) {
		return <div className="flex items-center justify-center h-full text-gray-500">No stations found</div>;
	}

	return (
		<div className="h-full overflow-y-auto">
			<div className="space-y-2 p-4">
				{stations.map((station) => (
					<button key={station.id} onClick={() => onStationClick(station.id)} className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${selectedStationId === station.id ? "bg-blue-500 text-white shadow-md" : "bg-white hover:bg-gray-50 border border-gray-200"}`}>
						<div className="flex items-start gap-3">
							<MapPin className={`flex-shrink-0 mt-1 ${selectedStationId === station.id ? "text-white" : "text-blue-500"}`} size={20} />

							<div className="flex-1 min-w-0">
								<div className="font-semibold truncate">{station.name}</div>

								<div className={`text-sm ${selectedStationId === station.id ? "text-blue-100" : "text-gray-600"}`}>{station.city}</div>
							</div>
						</div>
					</button>
				))}
			</div>
		</div>
	);
}
