import { CityFilter } from "../CityFilter";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

describe("CityFilter", () => {
	const mockCities = ["Berlin", "Hamburg", "Munich"];
	const mockOnCityChange = vi.fn();

	it("renders all cities in the dropdown", () => {
		render(<CityFilter cities={mockCities} selectedCity={null} onCityChange={mockOnCityChange} />);

		const select = screen.getByRole("combobox");
		expect(select).toBeInTheDocument();

		const allCitiesOption = screen.getByRole("option", { name: "All Cities" });
		expect(allCitiesOption).toBeInTheDocument();

		mockCities.forEach((city) => {
			expect(screen.getByRole("option", { name: city })).toBeInTheDocument();
		});
	});

	it("calls onCityChange when a city is selected", async () => {
		const user = userEvent.setup();
		render(<CityFilter cities={mockCities} selectedCity={null} onCityChange={mockOnCityChange} />);

		const select = screen.getByRole("combobox");
		await user.selectOptions(select, "Berlin");

		expect(mockOnCityChange).toHaveBeenCalledWith("Berlin");
	});

	it("shows clear button when city is selected", () => {
		render(<CityFilter cities={mockCities} selectedCity="Berlin" onCityChange={mockOnCityChange} />);

		const clearButton = screen.getByRole("button", { name: /clear filter/i });
		expect(clearButton).toBeInTheDocument();
	});

	it("hides clear button when no city is selected", () => {
		render(<CityFilter cities={mockCities} selectedCity={null} onCityChange={mockOnCityChange} />);

		const clearButton = screen.queryByRole("button", { name: /clear filter/i });
		expect(clearButton).not.toBeInTheDocument();
	});

	it("calls onCityChange with null when clear button is clicked", async () => {
		const user = userEvent.setup();
		render(<CityFilter cities={mockCities} selectedCity="Berlin" onCityChange={mockOnCityChange} />);

		const clearButton = screen.getByRole("button", { name: /clear filter/i });
		await user.click(clearButton);

		expect(mockOnCityChange).toHaveBeenCalledWith(null);
	});

	it("displays selected city value in the dropdown", () => {
		render(<CityFilter cities={mockCities} selectedCity="Munich" onCityChange={mockOnCityChange} />);

		const select = screen.getByRole("combobox") as HTMLSelectElement;
		expect(select.value).toBe("Munich");
	});
});
