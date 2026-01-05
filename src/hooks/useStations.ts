import { Station } from "../types/station";
import { useState, useEffect } from "react";

const API_URL = "https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw/fc7dc242f41393845d90edaa99e32e28f1ddfe24/train-stations.json";

export function useStations() {
	const [stations, setStations] = useState<Station[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchStations = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await fetch(API_URL);

				if (!response.ok) {
					throw new Error(`Failed to fetch stations: ${response.statusText}`);
				}

				const data: Station[] = await response.json();
				setStations(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to fetch stations");
			} finally {
				setLoading(false);
			}
		};

		fetchStations();
	}, []);

	return { stations, loading, error };
}
