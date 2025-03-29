import { beforeAll, describe, expect, test } from "bun:test";
import { TVSeriesService } from "../../services/TVSeriesService";
import { TVSeries, Type, Status } from "../../models/TVSeries";

var service: TVSeriesService;

describe("Classifying tv series type", () => {
  beforeAll(() => {
    service = new TVSeriesService();
  });

  test("Should return true when series type is Miniseries", async () => {
    const series: TVSeries = await service.getTVSeriesById(87108);
    expect(service.isMiniseries(series)).toBeTrue();
  });

  test("Should return false when series type is Scripted", async () => {
    const series: TVSeries = await service.getTVSeriesById(7225);
    expect(service.isMiniseries(series)).toBeFalse();
  });

  test("Should return true when series type is Miniseries", () => {
    const series = new TVSeries(1, "Test Series", Type.Miniseries, Status.Ended);
    expect(service.isMiniseries(series)).toBe(true);
  });

  test("Should return false when series type is Talk Show", () => {
    const series = new TVSeries(3, "Test Series", Type.Talk, Status.Ended);
    expect(service.isMiniseries(series)).toBe(false);
  });

  test("Should return false when series type is Reality", () => {
    const series = new TVSeries(4, "Test Series", Type.Reality, Status.Ended);
    expect(service.isMiniseries(series)).toBe(false);
  });

  test("Should return false when series type is News", () => {
    const series = new TVSeries(5, "Test Series", Type.News, Status.Ended);
    expect(service.isMiniseries(series)).toBe(false);
  });

  test("Should return false when series type is Documentary", () => {
    const series = new TVSeries(6, "Test Series", Type.Documentary, Status.Ended);
    expect(service.isMiniseries(series)).toBe(false);
  });
});
