import { beforeAll, describe, expect, test } from "bun:test";
import { TVSeries } from "../../models/TVSeries";
import { TVSeriesService } from "../../services/TVSeriesService";
import { InvalidParameterError, ObjectNotFoundError } from "../../utils/errors";

var service: TVSeriesService;

describe("Fetching tv series unit tests", () => {
  beforeAll(() => {
    service = new TVSeriesService();
  });

  test("Fetch TV series by valid ID", async () => {
    const series: TVSeries = await service.getTVSeriesById(7225);
    expect(series).not.toBeNull();
    expect(series.id).toBe(7225);
    expect(series.title).toBe("Merlin");
  });

  test("Fetch TV series by invalid ID", async () => {
    expect(async () => {
      await service.getTVSeriesById(-2147483649);
    }).toThrow(InvalidParameterError);

    try {
      await service.getTVSeriesById(-2147483649);
    } catch (error: any) {
      expect(error).toHaveProperty("statusCode", 400);
      expect(error.message).toBe("`seriesId` must be a valid int32");
    }
  });

  test("Fetch TV series with invalid input type", async () => {
    expect(async () => {
      await service.getTVSeriesById("invalidId" as any);
    }).toThrow(InvalidParameterError);

    try {
      await service.getTVSeriesById("invalidId" as any);
    } catch (error: any) {
      expect(error).toHaveProperty("statusCode", 400);
      expect(error.message).toBe("`seriesId` must be a valid int32");
    }
  });

  test("Fetch non-existent TV series", async () => {
    expect(async () => {
      await service.getTVSeriesById(30000000);
    }).toThrow(ObjectNotFoundError);

    try {
      await service.getTVSeriesById(30000000);
    } catch (error: any) {
      expect(error).toHaveProperty("statusCode", 404);
      expect(error.message).toBe("TV Show not found");
    }
  });
});

describe("Verifying default image in case of no poster", () => {
  test("Fetch TV series with null `poster_path`", async () => {
    const seriesWithNullPoster: TVSeries = await service.getTVSeriesById(221284);
    expect(seriesWithNullPoster.posterPath).toBe("https://picsum.photos/200/300");
  });
});
