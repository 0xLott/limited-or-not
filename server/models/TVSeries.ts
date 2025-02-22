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
  public type!: string;
  public status!: Status;
  public poster_path?: string;

  constructor(id: number, title: string, type: string, status: Status, poster_path?: string) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.status = status;
    this.poster_path =
      poster_path === null
        ? "https://picsum.photos/200/300"
        : `https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${poster_path}`;
  }
}
