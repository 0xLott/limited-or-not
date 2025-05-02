import { beforeAll, describe, expect, test } from "bun:test";
import { Status, TVSeries, Type } from "../../models/TVSeries";
import { TVSeriesService } from "../../services/TVSeriesService";

var service: TVSeriesService;

describe("Classifying tv series type [API-sourced objects]", () => {
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
})

describe("Classifying tv series type [Local TVSeries objects]", () => {
  test("Should return true when series type is Miniseries", () => {
    const series = new TVSeries(1, "Miniseries", "Overview", Type.Miniseries, Status.InProduction, 1, "2021-10-30");
    expect(service.isMiniseries(series)).toBeTrue();
  });

  test("Should return false when series type is Talk Show", () => {
    const series = new TVSeries(4, "Talk Show", "Overview", Type.Talk, Status.Ended, 4, "2021-10-30");
    expect(service.isMiniseries(series)).toBeFalse();
  });

  test("Should return false when series type is Reality", () => {
    const series = new TVSeries(5, "Reality", "Overview", Type.Reality, Status.InProduction, 3, "2021-10-30");
    expect(service.isMiniseries(series)).toBeFalse();
  });

  test("Should return false when series type is News", () => {
    const series = new TVSeries(9, "News", "Overview", Type.News, Status.Canceled, 1, "2021-10-30");
    expect(service.isMiniseries(series)).toBeFalse();
  });

  test("Should return false when series type is Documentary", () => {
    const series = new TVSeries(14, "Documentary", "Overview", Type.Documentary, Status.InProduction, 3, "2021-10-30");
    expect(service.isMiniseries(series)).toBeFalse();
  });
})
  ;
