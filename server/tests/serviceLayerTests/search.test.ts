import { beforeAll, describe, expect, test } from "bun:test";
import { TVSeries } from "../../models/TVSeries";
import { SearchService } from "../../services/SearchService";
import { InvalidParameterError } from "../../utils/errors";

var service: SearchService;

describe("Searching for tv series unit tests", () => {
  beforeAll(() => {
    service = new SearchService();
  });

  test("Search for existing TV Series", async () => {
    const searchResults = await service.getSearchResults("merlin");
    expect(searchResults).not.toBeNull();
    expect(searchResults.length).toBeGreaterThan(0);
    expect(searchResults[0].title).toBe("Merlin");
  });

  test("Search TV series with invalid input type", async () => {
    expect(async () => {
      await service.getSearchResults(999 as any);
    }).toThrow(InvalidParameterError);

    try {
      await service.getSearchResults(999 as any);
    } catch (error: any) {
      expect(error).toHaveProperty("statusCode", 400);
      expect(error.message).toBe("`seriesTitle` must be a non-empty string");
    }
  });

  test("Search for non-existent TV Series", async () => {
    const searchResults = await service.getSearchResults("nonexistentseries");
    expect(searchResults).toEqual([]);
  });

  test("Search TV series with empty title", async () => {
    expect(async () => {
      await service.getSearchResults("");
    }).toThrow(InvalidParameterError);

    try {
      await service.getSearchResults("");
    } catch (error: any) {
      expect(error).toHaveProperty("statusCode", 400);
      expect(error.message).toBe("`seriesTitle` must be a non-empty string");
    }
  });

  test("Search TV series by title case sensitivity", async () => {
    const searchResults = await service.getSearchResults("MERLIN");
    expect(searchResults).not.toBeNull();
    expect(searchResults.length).toBeGreaterThan(0);
    expect(searchResults[0].title).toBe("Merlin");
  });
});
