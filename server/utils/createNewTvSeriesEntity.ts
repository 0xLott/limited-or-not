import { Status, TVSeries, Type } from "../models/TVSeries";

export function createNewTvSeriesEntity(data: any): TVSeries {
    return new TVSeries(data.id, data.name, data.overview, data.type as Type, data.status as Status, data.number_of_seasons as number, data.poster_path);
}
