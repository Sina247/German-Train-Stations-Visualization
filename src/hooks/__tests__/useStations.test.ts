import { useStations } from "../useStations";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

const mockStations = [
	{ id: 1, name: "Berlin Hbf", city: "Berlin", lat: 52.5251, lng: 13.3694 },
	{ id: 2, name: "Hamburg Hbf", city: "Hamburg", lat: 53.5533, lng: 10.0067 },
];

describe("useStations", () => {
	beforeEach(() => {
		global.fetch = vi.fn();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("starts with loading state", () => {
		(global.fetch as ReturnType<typeof vi.fn>).mockImplementation(
			() =>
				new Promise(() => {
					return;
				})
		);

		const { result } = renderHook(() => useStations());

		expect(result.current.loading).toBe(true);
		expect(result.current.stations).toEqual([]);
		expect(result.current.error).toBe(null);
	});

	it("fetches and returns stations successfully", async () => {
		(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
			ok: true,
			json: async () => mockStations,
		});

		const { result } = renderHook(() => useStations());

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.stations).toEqual(mockStations);
		expect(result.current.error).toBe(null);
	});

	it("handles fetch error correctly", async () => {
		const errorMessage = "Network error";
		(global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error(errorMessage));

		const { result } = renderHook(() => useStations());

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.stations).toEqual([]);
		expect(result.current.error).toBe(errorMessage);
	});

	it("handles non-ok response", async () => {
		(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
			ok: false,
			statusText: "Not Found",
		});

		const { result } = renderHook(() => useStations());

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.stations).toEqual([]);
		expect(result.current.error).toContain("Failed to fetch stations");
	});
});
