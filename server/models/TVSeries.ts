export enum Status {
  ReturningSeries = "Returning Series",
  Planned = "Planned",
  InProduction = "In Production",
  Ended = "Ended",
  Canceled = "Canceled",
  Pilot = "Pilot",
}

export enum Type {
  Scripted = "Scripted",
  Talk = "Talk Show",
  Reality = "Reality",
  News = "News",
  Documentary = "Documentary",
  Miniseries = "Miniseries",
}

export class TVSeries {
  public id!: number;
  public title!: string;
  public overview!: string;
  public type!: Type;
  public isMiniseries!: boolean;
  public status!: Status;
  public poster_path?: string;

  constructor(id: number, title: string, overview: string, type: Type, status: Status, poster_path?: string) {
    this.id = id;
    this.title = title;
    this.overview = overview;
    this.type = type;
    this.isMiniseries = this.type === Type.Miniseries ? true : false;
    this.status = status;
    this.poster_path =
      poster_path === null
        ? "https://picsum.photos/200/300"
        : `https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${poster_path}`;
  }
}
