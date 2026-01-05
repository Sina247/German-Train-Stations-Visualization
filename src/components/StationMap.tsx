import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import { useEffect, useRef } from "react";
import { Station } from "../types/station";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

interface StationMapProps {
	stations: Station[];
	selectedStationId: number | null;
}

function MapController({ selectedStationId, stations }: StationMapProps) {
	const map = useMap();
	const previousSelectedRef = useRef<number | null>(null);

	useEffect(() => {
		if (selectedStationId !== null && selectedStationId !== previousSelectedRef.current) {
			const station = stations.find((s) => s.id === selectedStationId);

			if (station) {
				map.setView([station.lat, station.lng], 13, { animate: true });
			}

			previousSelectedRef.current = selectedStationId;
		}
	}, [selectedStationId, stations, map]);

	return null;
}

export function StationMap({ stations, selectedStationId }: StationMapProps) {
	const germanyCenter: LatLngTuple = [51.1657, 10.4515];

	return (
		<MapContainer center={germanyCenter} zoom={6} className="h-full w-full" scrollWheelZoom={true}>
			<TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

			{stations.map((station) => (
				<Marker key={station.id} position={[station.lat, station.lng]}>
					<Popup>
						<div className="text-sm">
							<div className="font-semibold">{station.name}</div>

							<div className="text-gray-600">{station.city}</div>
						</div>
					</Popup>
				</Marker>
			))}

			<MapController stations={stations} selectedStationId={selectedStationId} />
		</MapContainer>
	);
}
