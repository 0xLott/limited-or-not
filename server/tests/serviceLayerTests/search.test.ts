import { beforeAll, describe, expect, test } from "bun:test";
import { TVSeriesService } from "../../services/TVSeriesService";
import { TVSeries } from "../../models/TVSeries";
import { InvalidParameterError } from "../../utils/errors";

var service: TVSeriesService;

describe("Searching for tv series unit tests", () => {
  beforeAll(() => {
    service = new TVSeriesService();
  });

  test("Search for existing TV Series", async () => {
    const searchResults = await service.searchTVSeriesByTitle("merlin");
    expect(searchResults).not.toBeNull();
    expect(searchResults.length).toBeGreaterThan(0);
    expect(searchResults[0].title).toBe("Merlin");
  });

  test("Search TV series with invalid input type", async () => {
    expect(async () => {
      await service.searchTVSeriesByTitle(999 as any);
    }).toThrow(InvalidParameterError);

    try {
      await service.searchTVSeriesByTitle(999 as any);
    } catch (error: any) {
      expect(error).toHaveProperty("statusCode", 400);
      expect(error.message).toBe("`seriesTitle` must be a non-empty string");
    }
  });

  test("Search for non-existent TV Series", async () => {
    const searchResults = await service.searchTVSeriesByTitle("nonexistentseries");
    expect(searchResults).toEqual([]);
  });

  test("Search TV series with empty title", async () => {
    expect(async () => {
      await service.searchTVSeriesByTitle("");
    }).toThrow(InvalidParameterError);

    try {
      await service.searchTVSeriesByTitle("");
    } catch (error: any) {
      expect(error).toHaveProperty("statusCode", 400);
      expect(error.message).toBe("`seriesTitle` must be a non-empty string");
    }
  });

  test("Search TV series by title case sensitivity", async () => {
    const searchResults = await service.searchTVSeriesByTitle("MERLIN");
    expect(searchResults).not.toBeNull();
    expect(searchResults.length).toBeGreaterThan(0);
    expect(searchResults[0].title).toBe("Merlin");
  });
});

describe("Verifying default image in case of no poster", () => {
  test("Fetch TV series with null `poster_path`", async () => {
    const seriesWithNullPoster: TVSeries = await service.getTVSeriesById(221284);
    expect(seriesWithNullPoster.poster_path).toBe("https://picsum.photos/200/300");
  });
});
