import { beforeAll, describe, expect, test } from "bun:test";
import { TVSeriesService } from "../../services/tvSeriesService";
import { TVSeries } from "../../models/TVSeries";
import { InvalidParameterError } from "../../utils/errors";

var tvSeriesService: TVSeriesService;

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

    try {
      await tvSeriesService.searchTVSeriesByTitle(999 as any);
    } catch (error: any) {
      expect(error).toHaveProperty("statusCode", 400);
      expect(error.message).toBe("`seriesTitle` must be a non-empty string");
    }
  });

  test("Search for non-existent TV Series", async () => {
    const searchResults = await tvSeriesService.searchTVSeriesByTitle("nonexistentseries");
    expect(searchResults).toEqual([]);
  });

  test("Search TV series with empty title", async () => {
    expect(async () => {
      await tvSeriesService.searchTVSeriesByTitle("");
    }).toThrow(InvalidParameterError);

    try {
      await tvSeriesService.searchTVSeriesByTitle("");
    } catch (error: any) {
      expect(error).toHaveProperty("statusCode", 400);
      expect(error.message).toBe("`seriesTitle` must be a non-empty string");
    }
  });

  test("Search TV series by title case sensitivity", async () => {
    const searchResults = await tvSeriesService.searchTVSeriesByTitle("MERLIN");
    expect(searchResults).not.toBeNull();
    expect(searchResults.length).toBeGreaterThan(0);
    expect(searchResults[0].title).toBe("Merlin");
  });
});

describe("Verifying default image in case of no poster", () => {
  test("Fetch TV series with null `poster_path`", async () => {
    const seriesWithNullPoster: TVSeries = await tvSeriesService.getTVSeriesById(221284);
    expect(seriesWithNullPoster.poster_path).toBe("https://picsum.photos/200/300");
  });
});
