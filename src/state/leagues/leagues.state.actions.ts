import { ILeagueSearchParamsValues } from "./leagues.state.entities";

export class RefreshLeagues {
  static readonly type = "[Leagues] Refresh Leagues";
}

export class UpdateSearchParams {
  static readonly type = "[Leagues] Update Search Params";
  constructor(public searchParams: ILeagueSearchParamsValues) {}
}

export class ResetSearchParams {
  static readonly type = "[Leagues] Reset Search Params";
}
