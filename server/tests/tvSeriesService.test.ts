import { beforeAll, describe, expect, test } from "bun:test";
import { TVSeriesService } from "../services/tvSeriesService";
import { TVSeries } from "../models/TVSeries";
import { InvalidParameterError, ObjectNotFoundError } from "../utils/errors";

var tvSeriesService: TVSeriesService;

describe("Fetching tv series unit tests", () => {
  beforeAll(() => {
    tvSeriesService = new TVSeriesService();
  });

  test("Fetch TV series by valid ID", async () => {
    const series: TVSeries = await tvSeriesService.getTVSeriesById(7225);
    expect(series).not.toBeNull();
    expect(series.id).toBe(7225);
    expect(series.title).toBe("Merlin");
  });

  test("Fetch TV series by invalid ID", async () => {
    expect(async () => {
      await tvSeriesService.getTVSeriesById(-2147483649);
    }).toThrow(InvalidParameterError);
  });

  test("Fetch TV series with invalid input type", async () => {
    expect(async () => {
      await tvSeriesService.getTVSeriesById("invalidId" as any);
    }).toThrow(InvalidParameterError);
  });

  test("Fetch non-existent TV series", async () => {
    expect(async () => {
      await tvSeriesService.getTVSeriesById(30000000);
    }).toThrow(ObjectNotFoundError);
  });
});

describe("Searching for tv series unit tests", () => {
  beforeAll(() => {
    tvSeriesService = new TVSeriesService();
  });

  test("Search for existing TV Series", async () => {
    const searchResults = await tvSeriesService.searchTVSeriesByTitle("merlin");
    expect(searchResults).not.toBeNull();
    expect(searchResults.length).toBeGreaterThan(0);
    expect(searchResults[0].title).toBe("Merlin");
  });

  test("Search TV series with invalid input type", async () => {
    expect(async () => {
      await tvSeriesService.searchTVSeriesByTitle(999 as any);
    }).toThrow(InvalidParameterError);
  });

  test("Search for non-existent TV Series", async () => {
    const searchResults = await tvSeriesService.searchTVSeriesByTitle("nonexistentseries");
    expect(searchResults).toEqual([]);
  });

  test("Search TV series with empty title", async () => {
    expect(async () => {
      await tvSeriesService.searchTVSeriesByTitle("");
    }).toThrow(InvalidParameterError);
  });

  test("Search TV series by title case sensitivity", async () => {
    const searchResults = await tvSeriesService.searchTVSeriesByTitle("MERLIN");
    expect(searchResults).not.toBeNull();
    expect(searchResults.length).toBeGreaterThan(0);
    expect(searchResults[0].title).toBe("Merlin");
  });
});
