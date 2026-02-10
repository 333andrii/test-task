import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of, tap, throwError } from "rxjs";
import { ILeague, ILeagueBadge, ISport } from "../entities/league.entities";
import { ErrorHandlingService } from "./error-handling.service";

export const NOT_FOUND_BASE64 =
  "data:image/png;base64,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";

@Injectable()
export class LeagueApiService {
  private _cache: Record<string, string> = {};

  constructor(
    private httpClient: HttpClient,
    private errorHandling: ErrorHandlingService,
  ) {}

  getLeagues(): Observable<ILeague[]> {
    return this.httpClient
      .get<{
        leagues: ILeague[];
      }>("https://www.thesportsdb.com/api/v1/json/3/all_leagues.php")
      .pipe(
        map((res) => {
          return res.leagues;
        }),
        catchError((error) => {
          this.errorHandling.httpNetworkError("Error getting leagues", error);
          return [];
        }),
      );
  }

  getAllSports(): Observable<ISport[]> {
    return this.httpClient
      .get<{
        sports: ISport[];
      }>("https://www.thesportsdb.com/api/v1/json/123/all_sports.php")
      .pipe(
        map((res) => res.sports),
        catchError((error) => {
          this.errorHandling.httpNetworkError(
            "Error getting all sports",
            error,
          );
          return [];
        }),
      );
  }

  getLatestLeagueBadge(leagueId: ILeague["idLeague"]): Observable<string> {
    const url = `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=${leagueId}`;

    if (this._cache[url]) {
      return of(this._cache[url]);
    }

    return this.httpClient
      .get<{
        seasons: ILeagueBadge[];
      }>(url)
      .pipe(
        map((res) => {
          return res.seasons.slice(-1)[0].strBadge;
        }),
        tap((res) => (this._cache[url] = res as string)),
        catchError((error) => {
          this.errorHandling.httpNetworkError(
            "Error getting league badge",
            error,
          );
          return of(NOT_FOUND_BASE64);
        }),
      );
  }
}
