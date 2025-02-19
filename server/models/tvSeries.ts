import { fetchData } from "../utils/fetchData";
import { TMDB_API } from "../config";

export enum Status {
  ReturningSeries = "Returning Series",
  Planned = "Planned",
  InProduction = "In Production",
  Ended = "Ended",
  Canceled = "Canceled",
  Pilot = "Pilot",
}

export class TVSeries {
  public id!: number;
  public title!: string;
  public status!: Status;
  public poster_path?: string;

  constructor(id: number, title: string, status: Status, poster_path?: string) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.poster_path = `https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${poster_path}`;
  }
}
