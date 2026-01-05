import { X } from "lucide-react";

interface CityFilterProps {
	cities: string[];
	selectedCity: string | null;
	onCityChange: (city: string | null) => void;
}

export function CityFilter({ cities, selectedCity, onCityChange }: CityFilterProps) {
	return (
		<div className="p-4 bg-white border-b border-gray-200">
			<label htmlFor="city-filter" className="block text-sm font-medium text-gray-700 mb-2">
				Filter by City
			</label>

			<div className="flex gap-2">
				<select id="city-filter" value={selectedCity || ""} onChange={(e) => onCityChange(e.target.value || null)} className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
					<option value="">All Cities</option>

					{cities.map((city) => (
						<option key={city} value={city}>
							{city}
						</option>
					))}
				</select>

				{selectedCity && (
					<button onClick={() => onCityChange(null)} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" title="Clear filter">
						<X size={20} />
					</button>
				)}
			</div>
		</div>
	);
}
